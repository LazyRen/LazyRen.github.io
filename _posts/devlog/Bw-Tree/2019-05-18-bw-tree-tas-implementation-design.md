---
layout: post
title: "Bw-Tree TaS Implementation Design"
subtitle: "Bw-Tree TaS Implementation Design"
category: devlog
tags: bwtree
---

<iframe src="//www.slideshare.net/slideshow/embed_code/key/1teMIXPcYLNpfd" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/ssuser42682f/bwtree-tas-implementation-design-146409732" title="Bw-Tree TaS Implementation Design" target="_blank">Bw-Tree TaS Implementation Design</a> </strong> from <strong><a href="https://www.slideshare.net/ssuser42682f" target="_blank">DaeIn Lee</a></strong> </div>

<!--more-->

## Bw-Tree Mapping Table Atomic Instruction Modification

기존 CaS 명령어을 사용하여 맵핑 테이블을 업데이트 할 경우 abort-retry가 빈번하게 발생하여 생기는 오버헤드를 최소화 하기 위해 TaS(Test and Set)을 사용해 abort를 최소화 시키는 방안의 디자인입니다.<br>
TaS의 특성상 모든 *델타 노드 삽입*은 성공하게 됩니다. 이때 동시에 여러 개의 델타 노드가 동시에 삽입되었을 때 Bw-Tree의 invariant가 깨지는 것을 방지하기 위하여 새로 삽입된 델타 노드들에 한하여 **invalidation check**를 진행하여야 합니다.(slide 1-4)<br>

**Invalidation Check**는 TaS을 사용하면서 생기는 새로운 오버헤드이지만 동시에 생성된 노드들에 한하여 traverse를 진행하고, 이 때 길이의 최대값은 실행가능한 스레드의 숫자와 같기 때문에 오버헤드가 그리 크지 않을 것으로 판단됩니다.<br>

![Delta Node](/assets/img/2019-05-18/delta_node.png)<br>
또한 모든 델타 노드가 기본적으로 가지고 있는 베이스 노드의 메타데이터에 대한 업데이트(**Metadata Update**)를 **Invalidation Check**를 진행하면서 함께 진행하여야 합니다.

## Traverse

여러 개의 스레드가 동시에 *델타 노드 삽입*을 진행하고 있을 때 다른 스레드가 page lookup을 진행해도 일련의 명령들이 모두 정상적으로 진행됨을 보여주는 예제가 포함되어 있습니다.(slide 7-14)
