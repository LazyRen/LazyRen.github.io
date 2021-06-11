---
layout: post
title: "Open Bw-Tree 분석"
subtitle: "Open Bw-Tree 분석"
category: devlog
tags: bwtree
---

<iframe src="//www.slideshare.net/slideshow/embed_code/key/I9vrK2PCn6dmEu" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/ssuser42682f/bw-tree-presentation-188674259" title="Bw tree presentation" target="_blank">Bw tree presentation</a> </strong> from <strong><a href="https://www.slideshare.net/ssuser42682f" target="_blank">DaeIn Lee</a></strong> </div>

[The Bw-Tree: A B-tree for New Hardware Platforms](https://15721.courses.cs.cmu.edu/spring2017/papers/08-oltpindexes2/bwtree-icde2013.pdf) 논문을 바탕으로 [Ziqi Wang](https://hyeontaek.com/papers/openbwtree-sigmod2018.pdf)이 제작한 [Open Bw-Tree](https://github.com/wangziqi2013/BwTree)의 성능 개선을 위해 분석한 ppt 입니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

# 발표 Script

## Intro

안녕하세요. 이번 Bw-Tree 발표를 맡게 된 이대인, 강준규 입니다.

오늘 발표는 Bw-Tree의 특징, 실제 implementation, 그리고 tree 구조의 structure modification과 가능한 optimization에 대하여 다룰 예정입니다.

가장먼저 Bw-Tree의 특징입니다.

## Key Features

### Latch-free

Bw Tree는 현대 multi core CPU상에서 좋은 성능을 얻기 위하여 latch free design 을 적용시킨 트리구조입니다. data의 insert / delete / update 및 트리 구조 변경을 위하여 lock을 전혀 사용하지 않기 때문에 다른 스레드들이 yield되지 않습니다.

### Mapping Table

이러한 latch free design을 적용시키기 위하여 Bw Tree는 모든 변경을 하나의 atomic Compare and Swap instruction을 통해 수행합니다. Mapping Table은 이를 위한 helping tool로서 logical page를 physical page로 치환시킵니다. Mapping Table의 사용으로 인해 Bw Tree는 atomicity를 유지할 수 있습니다. 이에 대한 자세한 내용은 추후 implementation에서 알아보도록 하겠습니다.

### Delta Update

현대 CPU는 cache의 사용으로 data access cost를 줄여 높은 성능을 유지합니다. 그렇기 때문에 CPU cache hit ratio가 높을수록 성능이 더 좋아집니다. 이를 위해 Bw Tree는 cache invalidation을 일으키는 in place update를 지양하고 data의 변경사항을 page의 앞에 붙여 기존 데이터를 보존하는 delta update를 사용합니다.

### High Performance

즉, Bw Tree는 latch free design과 Delta Update를 통한 CPU cache hit ratio 상승으로 modern multi core CPU 상에서 높은 성능을 발휘할 수 있는 Microsoft Research가 발표한 새로운 자료구조입니다.

## Implementation

다음은 실제 Bw Tree의 implementation에 대하여 알아보도록 하겠습니다.

### Mapping Table

앞서 설명하였듯이 mapping table은 latch-free design을 적용시키기 위한 helping tool입니다. Bw Tree내에서 하나의 logical node는 parent node와 left sibling node로 부터 오는 두개의 inbound pointers를 가지고 있습니다. 두개의 pointer를 atomic하게 update하는 것은 하드웨어의 도움 없이는 불가능 하므로 Bw Tree는 mapping table을 통해 PID를 physical pointer로 변경시키는 방법을 사용합니다.
즉, parent node와 left sibling node는 logical pointer, 즉 PID를 저장하고 있고, 실제 접근이 필요할 경우 mapping table을 통해 PID를 physical pointer로 치환하여 사용합니다. 이경우 inbound pointer의 갯수와 상관없이 한번의 CaS instruction을 통해 mapping table의 physical pointer를 변경할 수 있으므로 atomicity가 보장됩니다.

### Logical Node

앞서 설명하였듯, Bw Tree는 delta update를 통해 delta chain을 유지하기 때문에 Bw Tree 구조에서 node는 delta chain과 base node가 합쳐진 logical node로 구성되어 있습니다. Base node는 일반적으로 생각하는 node구조로, 정렬된 (key, value) 배열과 metadata를 포함하고 있으며, 각각의 delta record는 data의 변경사항과 metadata를 포함하고 있습니다.

메타데이터에는 key search에 사용되는 low-key, high-key 외에도 size, depth, 변경된 data의 base node offset등 tree traversal과 SMO에 사용될 값들을 저장하고 있습니다.

Delta Chain은 singly linked list 구조로 data 변경사항을 담고 있습니다. Logical Node를 가르키고 있는 모든 inbound pointer는 delta chain의 가장 앞에 있는 Delta record를 가르키고 있어야 하며, 이를 통해 가장 최신의 delta record부터 node 탐색을 실시합니다.

### Delta Updates

모든 data의 변경, state change, SMO은 delta record를 생성하고, delta chain의 가장 앞에 붙이는 작업으로 이루어져 있습니다.

기존의 delta chain의 앞에 붙인 이후 CaS instruction을 통해 mapping table의 ptr를 변경하는 것으로 delta update가 마무리 되며, CaS instruction의 특성상 단 하나의 thread만이 이를 성공시킬 수 있습니다. 실패한 thread들은 일련의 과정을 재수행합니다.

예시를 통해 설명드리겠습니다. 다음과 같이 2개의 delta record와 base node로 이루어진 logical node가 있습니다. Mapping Table로부터 오는 inbound physical pointer는 delta chain의 가장 앞에 있는 최신의 delta record를 가르키고 있습니다.

이때 t~1~과 t~2~가 동시에 새로운 delta record를 생성함으로서 data modification을 진행한다고 가정합니다. 생성된 각각의 delta record는 기존 delta chain의 가장 앞에 있던 delta record. 즉, insert [k4, v4]를 가르키게 됩니다.

마지막으로 delta update를 마무리하기 위하여 t~1~과 t~2~ 모두 CaS instruction을 이용한 mapping table update를 시도합니다. 이때 단 하나의 스레드만이 해당 instruction을 성공시킬 수 있습니다. 지금의 경우 t~1~이 이를 성공시켰으며, t~2~는 실패합니다.

실패한 t~2~는 생성한 delta record를 삭제하고 일련의 과정을 재시도합니다. 이경우 특별히 SMO이 일어나지 않는다면, 재시도한 delta record는  t~1~이 생성한 delta record의 앞에 추가될 것 입니다.

### Page Search

다음은 page search입니다.

모든 inbound pointer는 delta chain의 head를 가르키고 있기 때문에, 저절로 가장 최신의 delta record부터 하나씩 delta chain을 이동해가며 key를 검색합니다.

만약 key가 delta chain상에 존재하고 해당 delta record가

1. insert or update라면, 검색은 성공한 것이며 해당 value를 리턴합니다.
2. delete라면, 해당 키값은 지워진 것이므로 검색은 실패한 것으로 간주되며 값이 존재하지 않다는 것을 뜻합니다.

Delta Chain에서 key를 발견하지 못할 경우, base node에 도달하게 되며, base node상의 배열에서 key를 찾기 위해 binary search를 진행합니다.

### Consolidation

앞서 살펴보았듯이 delta update는 항상 delta chain의 가장 앞에 새로운 delta record를 부착시키며, delta record가 증가할 수록 노드 검색의 오버헤드가 커집니다. 이 오버헤드를 최소화하기 위하여 Bw Tree는 delta chain의 크기가 일정 threshold를 넘어갈 경우 consolidation을 진행하여 하나의 logical node를 다시 단일 base node로 변경합니다.
thread가 tree traversing을 진행하던 도중 특정 logical node의 depth(delta chain length)가 threshold보다 큼을 감지할경우, 해당 thread는 진행 중이던 작업을 마무리 한 이후 node에 대한 consolidation을 진행합니다.

가장 먼저 기존의 base node를 복사하여 새로운 base node를 생성합니다.

이후 delta chain상에 존재하는 data 변경사항들을 새로운 base node에 적용시킵니다.

마지막으로 delta update 때와 마찬가지로 mapping table의 ptr를 CaS instruction을 통해 새로 생성한 base node로 변경시킵니다. 이때 주의해야할 점은 만약 해당 CaS instruction이 실패할 경우 thread는 consolidation 작업을 포기하고 새로 생성한 base node를 삭제합니다. 해당 logical node는 이후 임의의 thread가 접근할 경우 다시 length가 threshold를 넘어감을 확인하기 때문에 그때에 다시 consolidation을 진행하게 됩니다.
만약 성공했을 경우 기존의 logical node는 차후 설명할 epoch mechanism을 통해 deletion이 일어나도 안전해졌을 때에 deletion을 진행합니다.

### Range Search

### Garbage Collection

준규형 발표 예정

## SMO

Bw Tree 또한 tree 구조를 base로 한 자료구조이기 때문에 node의 data가 증가, 감소함에 따라 split, merge 등을 통해 한 노드 상의 data 양를 조절합니다. 지금까지와 마찬가지로, bw Tree는 이러한 structure modification을 lock을 사용하지 않고 해결합니다. 이를 위해서 SMO은 크게 두 phase로 나뉘게 되는데, 첫번째, logical phase로 특별한 delta record를 생성하여 접근하는 다른 스레드들에게 SMO이 진행중임을 알리고, 이후 두번째 physical phase에서 실제 SMO을 진행합니다.

### Node Split

SMO가 일어나는 조건은 consolidation과 비슷합니다. 다음 예제와 함께 설명하도록 하겠습니다. thread가 operation을 진행하던 도중 node L의 size가 threshold보다 큼을 확인할 경우, operation이 종료된 이후 해당 노드에 대하여 node split을 진행합니다.
가장 먼저 새로운 base node S를 생성하여 Node L이 가지고 있던 data의 상위 절반을 복사해옵니다.

기존 node L에 split delta를 추가합니다. split delta는 separator key K~s~와 새로운 Node S를 가르키는 logical pointer를 가지고 있으며, 다른 thread가 split delta를 볼 경우, SMO이 진행중임을 알 수 있습니다. 여기까지를 half split이라고도 하며, 첫번째 logical phase입니다. 만약 다른 스레드가 기존 node L에 있던 key중 K~s~보다 작은 값에 접근하길 원할 경우 정상적으로 delta chain traversing을 진행하며, 만약 K~s~보다 큰 값에 접근하길 원할 경우 split delta에 있는 logical ptr를 타고 node S에 접근합니다.

마지막으로 parent node를 업데이트함으로서 node split을 마무리할 차례입니다. parent node인 node P에 separator delta를 추가합니다. separator delta는 key K~L~과 K~S~, 그리고 새로운 Node S를 가르키는 logical ptr를 가지고 있어, 접근하고자 하는 키에 알맞은 node를 찾아갈 수 있게 도와주는 역할을 합니다.

이러한 작업은 lock 없이 진행되기 때문에 node split이 진행되는 도중에 node P에 대한 merge작업이 동시에 일어날 수 있습니다. 이때에 data가 consistent하게 유지되는 것이 중요한데, 앞서 설명드렸던 epoch mechanism에 의하여 node P는 삭제되지 않고 남아있으며, node split을 진행하는 thread는 무조건 node P의 delta chain에서 remove delta를 확인 할 수 있을 것 입니다. 이를 통해 node P의 left sibling을 찾아가 separator delta를 추가하면 됩니다.

### Node Merge

다음은 merge입니다. 마찬가지로 thread가 node size가 threshold보다 작음을 확인하였을때 시작됩니다. Bw Tree에서 merge는 항상 왼쪽 sibling과 합쳐집니다.

먼저 merge작업을 수행할 node R에 대하여 remove delta를 추가합니다. 다른 thread가 node R에 접근할 경우 remove delta를 확인하게 되며 remove delta는 node R에 대한 접근을 불허하는 역할을 하기 때문에 thread들은 node R 대신 node R이 merge될 left sibling을 찾아가 계속 작업을 수행해야합니다.(이 경우 node L입니다.)

다음으로 node L에 merge delta를 추가합니다. merge delta는 node R의 low key를 복사하여 merge key로 삼아 저장하고 있으며, node R을 가르키는 "PHYSICAL POINTER"를 가지고 있습니다. 이를 통해 만약 merge key보다 큰 key에 접근하여야 할 경우 정상적으로 node R에 바로 접근할 수 있습니다. 그렇기 때문에 merge delta가 삽입된 이후부터 node L과 node R은 하나의 logical node로 간주됩니다.

마지막으로 parent node를 업데이트하여야 합니다. parent node에 새로운 separator delta를 추가하며 해당 delta record는 merge된 node L을 위한 새로운 key range를 가지고 있습니다. 이를 통해 기존에 node L 혹은 node R에 접근해야 확인 가능한 key 값들은 모두 node L을 통하도록 변경할 수 있습니다. 이후 node R에 삽입하였던 remove delta를 제거하고 node R의 PID와 node R 자체의 삭제를 epoch mechanism이 허락하는 때에 진행합니다.

## Optimization

마지막으로 Optimization입니다. 논문을 읽으며 추가로 최적화를 진행할 수 있을 것 같은 부분에 대하여 고민해보았습니다.

첫째, instruction fail시 재시도 성능의 향상입니다. 현재 Bw tree는 특정 instruction이 실패할 경우 무조건 root부터 탐색을 재시작합니다. 이 부분을 root가 아닌 parent, 혹은 필요한 만큼만 tree를 올라가서 재검색하도록 한다면 전체적인performance가 좋아질 것입니다.

둘째, 실패한 consolidation을 버리지 않고, 추가된 delta chain만큼을 업데이트하여 consolidation을 재시도하는 것 입니다. consolidation은 traversing시에 항상 재시도 되므로 똑같은 작업을 반복수행하지 않을 수 있습니다.

셋째, consolidation을 주기적으로 수행하는 것 입니다. read-only operation에서는 delta chain이 증가하지 않기 때문에 consolidation이 수행되지 않습니다. 그렇기 때문에 당시 존재하는 delta chain의 길이는 무조건 overhead로 남아있습니다. 이러한 상황을 방지하기 위하여 주기적으로 모든 node에 대하여 consolidation을 진행하는 것도 한가지 방법이 될 수 있을 것 같습니다.

넷째, CaS 을 TaS instruction으로 변경하는 것 입니다. TaS은 항상 성공하기 때문에 CaS처럼 실패시 재시도하는 과정이 생략됩니다. 물론 이를 위하여 모든 SMO와 delta update 과정을 재설계해야하지만 그만큼 성공할 경우 가장 큰 성능향상을 이룰 수 있을 것으로 예상되는 방법입니다.

## 참고자료

[The Bw-Tree: A B-tree for New Hardware Platforms](https://15721.courses.cs.cmu.edu/spring2017/papers/08-oltpindexes2/bwtree-icde2013.pdf)<br>
[Building a Bw-Tree Takes More Than Just Buzz Words](https://hyeontaek.com/papers/openbwtree-sigmod2018.pdf)
