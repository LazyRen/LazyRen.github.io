---
layout: post
title: "다양한 키보드 레이아웃에 관하여"
subtitle: "Various Keyboard Layouts"
category: review
tags: hardware keyboard
image:
  path: /assets/img/2021-01-06/ansi.jpg
---

세상에는 정말 다양한 키보드가 있습니다.<br>
단순히 풀배열/텐키리스로만 구분하던 때를 지나서 커스텀 키보드와 키캡의 세계로 들어가보면 75%/65%/60%/40%,
104키/87키/67키/66키 등등 이제 슬슬 저 숫자가 뭘 의미하는건지도 모를 것들이 나타나게 됩니다.

이 포스트를 통해서 기본적인 키보드 키캡과 레이아웃에 대한 정보를 공부하는 겸 정리해보고자 합니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 기본 정보

### Terminology

![Key Names](/assets/img/2021-01-06/keynames.png)

* <span style="color:yellow">Alpha Keys</span> : 가장 기본적인 숫자/알파벳 키들 (알파키, 알파열)
* <span style="color:red">Modifier/Control Keys</span> : shift, ctrl, windows, alt, fn (모디키, 모디열)
* <span style="color:green">Navigation Keys</span> : insert, delete, home, end, page up/down, arrows
* <span style="color:mediumpurple">Function Keys</span> : f1 ~ f12 (펑션키, 펑션열)

### 프로파일과 키캡 크기

![Basic Keycap Size](/assets/img/2021-01-06/basic_keycap_size.jpg)

지금 위에 나와있는 이미지는 가장 기본적인 풀배열 윈키인 104키...가 아니라 텐키 위에 멀티미디어 키가 4개 추가된 108키입니다.

R1~R4 까지 와 1x1부터 1x6.25까지 각각의 숫자가 무엇을 의미하는지 헷갈리실텐데요, 각각은 키보드 키캡에 적용된 [프로파일]에 따른 열과 키캡의 크기를 의미합니다.
예를 들어 일반 알파키의 크기를 1x1이라 하였을 때 스페이스바는 같은 높이(1)에 알파키 6.25개 만큼의 너비를 가지고 있다는 의미입니다.

#### 프로파일

![OEM Profile](/assets/img/2021-01-06/oem_profile.jpg){: width="33%"}
![SA Profile](/assets/img/2021-01-06/sa_profile.jpg){: width="33%"}
![Cherry Profile](/assets/img/2021-01-06/cherry_profile.jpg){: width="33%"}
{: style="background-color: white;"}

위 3개의 프로파일은 가장 대표적인 키캡 프로파일들로 키보드에 장착했을때 가운데가 오목해지도록 인체공학적으로 설계되어있습니다.
(스텝 스컬쳐2<sup>Step Sculpture2</sup>라고 부릅니다)<br>
프로파일의 열은 R0 ~ R5까지 있습니다. 꼭 모든 열이 사용되는 것은 아니고, 키캡마다 부르는 방식(top-down or bottom-up)도 다릅니다.
위 이미지에서는 하단이 R1으로 시작하지만 [dev/tty]나 [GMK Carbon] 키캡을 보시면 최상단 펑션열이 R0, 최하단이 R4 혹은 R5라고 적혀있습니다.
(프로파일 그림에서는 좌측이 R0, 우측이 R4가 됩니다)<br>
키캡을 변경할때 중요한 점은 각 키캡이 어떤 열로 제작되었냐에 따라 같은 1x1이라 할지라도 장착하였을때 주위 열과 각도가 다를 수 있음에 주의해야한다는 점입니다.
이는 뒤에서 레이아웃을 설명하며 한번 더 말씀드리겠습니다.

#### 키캡 크기

![1u Size](/assets/img/2021-01-06/1u_keycap_size.png){: .centered}

알파열의 일반 키 1x1에서부터 최하단 모디키 1x1.25, 우 쉬프트 1x2.75 등은 키캡의 크기를 나타내는 방법입니다.<br>
가장 기본이 되는 크기를 **1u(unit)**이라고 합니다. 일반 문자열의 키보드 크기인데요, 스위치를 중심으로 *19.05mm*이며 실제 키캡은 *18mm*로 키캡 사이에 공백이 존재합니다.
1u가 아닌 키캡들의 크기는 대략 19.05에 유닛을 곱해주시면 실제 크기가 나옵니다.
기본적으로 알파열의 너비(`부터 백스페이스까지)는 **15u** 입니다. 즉, 한 열의 키캡 크기(유닛)들을 모두 더하면 15가 나와야합니다.
일반적인 배열일때보다는 ~~변태 배열~~ 미니 배열 키보드에 키캡을 변경할때 주의해서 보셔야합니다. 모디열들의 크기가 평범하지 않은 경우가 많거든요.

## 키보드 레이아웃

이제부터 풀배열부터 텐키리스, 75%, 60% 미니배열들까지 각각의 레이아웃에 대해 알아보겠습니다.

### 풀배열 / 100%

![ANSI](/assets/img/2021-01-06/ansi.jpg){: .centered}

ANSI(American National Standards Institute) 스탠다드 키보드
{:.figcaption}

가장 기본이 되는 **ANSI 104키 키보드**입니다. *1.25u 크기의 하단 모디키 7개*와 *6.25u의 스페이스*를 가지고 있습니다.<br>
윈도우를 설치할때 **101/104키**라고 나오는데요, 이는 *101 + 윈키 * 2 + FN키 = 104* 이기 때문입니다.
이제 이 배열에서 노란색 부분을 제하면 텐키리스(87키), 녹색부분까지 제하면 60% 배열(61키)의 키보드가 됩니다.

한국 한정 하단에 한/영과 한자 전환키 각각이 추가된 106키 풀배열이 존재했었습니다. 이제는 잘 보이지 않네요.
{:.note}

### 텐키리스 / 80%

![Winkeyless](/assets/img/2021-01-06/80_winkeyless.jpg){: .centered}

윈키리스(84키) 키보드
{:.figcaption}

앞서 나왔던 풀배열에서 노란색 넘패드를 제외한 키보드가 일반 윈키 텐키리스(TKL이라고도 불립니다)입니다.<br>
지금 보시는 레이아웃은 하단 모디열에서 윈도우 키를 제외하여 윈키리스<sup>winkeyless</sup> 혹은 이빨(튀어나온게 이빨 닮아서...)이라고 불리우는 레이아웃입니다.
하단 모디열이 *1.5u 모디 키 4개*와 *7u 스페이스바*로 구성되어 있습니다.

이 레이아웃과 앞으로 나올 레이아웃에서 <span style="color:red">빨간색 키</span>는 표준과는 다른 키캡들을 의미합니다. (크기가 다르거나 스텝 스컬쳐 열이 다름)
{:.note}

### 미니배열 / Compact

40%(알파열만 존재)를 제외한 60% ~ 75% 배열만 다루도록 하겠습니다.<br>
그중에서도 자주 보이거나 괜찮아 보인다 싶은 배열들만 모아봤습니다. 혹시 추가하고 싶은 배열이 있으면 댓글 부탁드립니다.

#### 75%

![Duck Octagon](/assets/img/2021-01-06/75_duck_octagon.jpg){: .centered}

Duck Octagon(84키)
{:.figcaption}

최소한의 크기에 텐키리스를 담아낸 레이아웃입니다.<br>
[QMK] 등으로 키보드 펌웨어 업데이트가 가능한 커스텀 키보드에서 사용할 경우
잘 사용하지 않는 우윈도우, 스크롤락, PA/BR 키 3개를 제외하고 텐키리스의 모든 키를 담아낼 수 있습니다.

이를 위해 하단 우측 모디키 하나가 삭제되었고, 나머지 우측 모디키 3개도 1u로 크기가 변경되었습니다.
문제는 1.75u 크기의 우 쉬프트입니다. 따로 커스텀 키캡 공제를 타지 않는 이상 구하기 쉽지 않습니다.
내비키들도 크기는 1u로 동일하지만 기존 R1, R2가 아닌 열들로 이동하기 때문에 스텝 스컬쳐를 맞추기 까다롭습니다.

개인적으로 한번쯤 사용해보고 싶은 키보드 레이아웃입니다. 컴팩트한 크기에 들어갈 건 다 들어가 있다는 점이 매력적입니다.

#### 65%

![FC 660M](/assets/img/2021-01-06/65_fc660m.jpg){: .centered}

Leopold FC660M(66키)
{:.figcaption}

좌슆과 우슆의 길이가 동일한 2.25u입니다. 오른쪽 모디키(윈도우) 하나도 크기가 1u으로 변경되었습니다.<br>
이를 통해 어떻게든 방향키를 낑겨넣은 모습이 인상적입니다.

![Varmilo VA68M](/assets/img/2021-01-06/65_varmilo_va68m.jpg){: .centered}

Varmilo VA68M(68키)
{:.figcaption}

최대한 표준 키캡 크기들을 준수하면서 사이즈를 줄인 모습입니다. 우 컨트롤 키와 방향키 사이의 작은 여백이 아쉽습니다.<br>
~~차라리 키캡 구해서 660M을 쓰고 말지~~

![Whitefox Vanilla](/assets/img/2021-01-06/65_whitefox_vanilla.jpg){: .centered}

Whitefox Vanilla(68키)
{:.figcaption}

75% 배열(84키)에서 최상단 펑션열이 빠졌습니다.<br>
마음에 드는 배열이지만 75%와 마찬가지로 맞는 키캡 구하기가 힘들다는 단점 또한 그대로입니다.

![Whitefox Aria](/assets/img/2021-01-06/65_whitefox_aria.jpg){: .centered}

Whitefox Aria(67키)
{:.figcaption}

바로 위의 배열에서 1u * 3 모디키들만 일반 1.25u 크기의 2개의 모디키로 변경된 버전입니다.

![Rama M65-A](/assets/img/2021-01-06/65_rama_m65_a.jpg){: .centered}

Rama M65-A
{:.figcaption}

~~변태 배열의 끝판왕입니다.~~<br>
1.5u * 4개의 모디키, 7u 크기의 스페이스, 1.75u 크기의 우 쉬프트와 스텝 스컬처가 다른 내비키들까지...<br>
윈도우 키도 없고 펑션키도 없는데 맵핑은 어떻게 하는걸까요? 저라면 누가 공짜로 줘도 못 쓸 것 같습니다.

#### 60%

![Happy Hacking Keyboard](/assets/img/2021-01-06/60_hhkb.jpg){: .centered}

HHKB(Happy Hacking KeyBoard)
{:.figcaption}

그 유명한 해피해킹 키보드입니다.<br>
방향키 없이 1.75u 크기의 우 쉬프트 옆에 fn키가 붙어있습니다. 하단 또한 1u크기의 alt가 눈에 띄네요.
하단 모디열에서 3개의 키가 사라지고 크기도 줄어 특유의 여백을 남겨놓았습니다. ~~HHKB 각인시켜야하거든요.~~

![Filco Minila](/assets/img/2021-01-06/60_filco_minila.jpg){: .centered}

Filco Minila
{:.figcaption}

~~이건 또 무슨 변태야~~<br>
처음으로 좌 쉬프트 크기가 변경되었네요. 2u에 우 쉬프트는 아예 1u입니다.
백스페이스도 1u가 되어 최상단에 위치하네요.
1.75u 크기의 ~~미친~~ 컨트롤키, 3u 크기의 귀여운 스페이스바가 보입니다.

## 출처

* [Physical Keyboard Layouts Explained In Detail](https://drop.com/talk/947/physical-keyboard-layouts-explained-in-detail?utm_source=linkshare&referer=MUP8N5)
* [Keyboard LAB - 키캡규격](https://kbdlab.co.kr/index.php?mid=board_keycap&document_srl=2576)
* [Matt3o - Anatomy of a Keyboard](https://matt3o.com/anatomy-of-a-keyboard/)

<!-- Links -->
 [프로파일]: https://namu.wiki/w/%ED%82%A4%EB%B3%B4%EB%93%9C/%ED%82%A4%EC%BA%A1?from=%ED%82%A4%EC%BA%A1#s-2.4
 [dev/tty]: https://drop.com/buy/drop-matt3o-devtty-custom-keycap-set#imagecarousel
 [GMK Carbon]: https://drop.com/buy/gmk-carbon-custom-keycap-set#imagecarousel
 [QMK]: https://docs.qmk.fm/#/
