---
layout:   post
title:    "49인치 32:9 모니터 오디세이 G9 리뷰(feat. Magic Borderless & PowerToys)"
subtitle: "49인치 32:9 모니터 오디세이 G9 리뷰(feat. Magic Borderless & PowerToys)"
category: review
tags:     hardware software
image:
  path:   /assets/img/2020-06-28/g9.jpg
---

> 누군가가 그랬다.<br>
> TV와 모니터는 거거익선이라고...

블로그 리뷰 글의 영광스런 첫 타자는 **[삼성 오디세이 G9](https://www.samsung.com/sec/monitors/gaming-lc49g95tsskxkr/)** 이다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

### 상품 상세정보

| 분류 | 스펙 |
|-----|------|
| 화면 사이즈 | 49 인치 / 123.8 cm |
| 화면 곡률 | 1000R |
| 화면 비율 | 32:9 |
| 패널 타입 | VA |
| HDR | 1000 |
| 주사율 | Max 240 Hz |
| G-Sync | Compatible |

## 구입 하기에 앞서

사실 원래는 LG의 38인치 21:9 모니터 **[38GN950](https://www.lg.com/us/monitors/lg-38gn950-b-gaming-monitor)**을 살려고 했었다.<br>
32:9는 상대적으로 지원하는 게임도 적고, 기존에 사용하던 32인치 16:9 모니터와 비슷한 세로 길이를 가진 21:9가 낫지 않을까 라는 생각이 들었다.<br>

그러던 어느날 삼성 임직원몰(패밀리넷)에 등록된 G9을 보았다.<br>
보고 그냥 지나칠 수 없는 너무나 착한 가격이었다.<br>
이건 사는 순간 내가 돈을 쓰는게 아니라 회사가 나에게 돈을 쓰는 거라는 자가 최면을 걸며, 임직원몰에서 보자마자 바로 구매해 버렸다.<br>
특이하게도 외부 출시 전에 패밀리넷에 사전 출시되어 빠르게(20/06/20) 받을 수 있어 나에게 주는 생일 선물이라고 생각하기로 했다.

## 설치

![첫 모습](/assets/img/2020-06-28/g9_delivered.jpg)
난 처음에 당연히 배달해주신 분이 설치도 같이 진행해 주시는 줄 알았는데(인터넷에서 그랬는데...) 그냥 문 앞에 놔주시며 "엄청 큰 거 사셨네요~" 하고 가셨다.<br>
설치하고 혼자서 책상위로 옮기면서 패널이 깨지지는 않을까 조심 조심 옮기는데 땀이 뻘뻘 쏟아졌다.<br>
다행이도 설치 후 **[액정 테스트](http://www.monitor.co.kr/)**까지 진행한 결과 **양품 당첨!**

## 실 사용기

우선적으로 밝혀두자면, 32:9 모니터를 100% 활용하기 위해서는 다음 프로그램 2개가 필요하다.

* **[Microsoft PowerToys](https://github.com/microsoft/PowerToys)**<br>
    마소에서 개발중인 Alfred + windows resizer + keyboard manager 등등 여러 기능들을 탑재한 프로그램이다.<br>
    우리가 사용할 기능은 이 중에서도 **[FancyZones](https://github.com/microsoft/PowerToys/wiki/FancyZones-Overview)**이다.
* **[Magic Borderless](https://store.steampowered.com/app/1022230/Magic_Borderless/)**<br>
    스팀에서 판매중인 2900원짜리 프로그램이다.<br>
    가격도 착하고 기능도 좋고, 심지어 한글화도 잘 되어 있는데 유일한 *단점*이라면 항상 스팀에 *playing*으로 표시된다.<br>
    비슷하게 항상 켜둬야 하는 프로그램인 Wallpaper Engine은 그렇지 않은데...<br>
    개발자도 [해당 문제를 인지](https://steamcommunity.com/app/1022230)하고 있고 해결하려 노력중이라고 한다.

두 프로그램이 필요한 이유는 간단하다.<br>
우려했던 대로 32:9를 지원하는 게임이 많지 않다!

내 인생 가장 오랫동안 즐겨했던 CoH2를 예로 들자면
![CoH2 Loading](/assets/img/2020-06-28/coh2_loading.jpg)<br>
위와 같이 로비/로딩 중에는 16:9로 나오고,
![CoH2 Ingame Play](/assets/img/2020-06-28/coh2_ingame.jpg)<br>
인게임에서는 32:9를 지원하지만 보이는 것과 같이 양 사이드로 갈수록 옆으로 많이 늘어나 매우 거슬리게 보인다.<br>
가운데에 있는 유닛과 오른쪽에 있는 유닛은 거의 일직선상에 위치해 있는데도 불구하고 오른쪽이 훨씬 크게 보인다!

그렇기 때문에 게임에 맞춰 창모드로 즐기면서, 21:9 / 16:9 + 멀티 태스킹을 할 수 있어야 한다.<br>
마치 다음과 같이 말이다.

![Apex Legend](/assets/img/2020-06-28/apex_split.png)

## 멀티 태스킹 환경 설정

### [Microsoft PowerToys](https://github.com/microsoft/PowerToys)

![FancyZones Setting](/assets/img/2020-06-28/fancyzones_setting.png)<br>
먼저 파워토이를 설치한 이후에 위와 같이 세팅을 해준다.<br>
이후 `window + ~` 키를 누를 때마다 아래와 같은 창이 뜰 텐데, 상황에 맞춰 설정을 변경해 주면 된다.<br>
이후 생성된 윈도우 창들은 `window + arrow keys`를 통해 각 그리드를 옮겨 가며 사용할 수 있다.

![FancyZones Testing](/assets/img/2020-06-28/fancyzone.gif)

* **멀티 태스킹**<br>
    ![Grid 3](/assets/img/2020-06-28/grid3.png)<br>
    3칸 짜리 Grid를 선택하면 된다.<br>
    32:9의 광활한 화면은 3분할 하였을 때 가장 웹서핑 하기 좋은 크기가 만들어진다.<br>
    개발 할 때는 VS Code / 구글 / 터미널 하나씩 열어두면 좋다.
    ![Multi Tasking](/assets/img/2020-06-28/blog.png)
* **16:9 게임**<br>
    3칸 짜리 Grid 중 Priority Grid를 선택한다. 이 경우 가운데에 16:9 Grid가 위치하게 된다.<br>
    혹은 2칸 짜리 Grid를 선택하면 16:9 화면 2개로 분할된다.
    ![Priority Grid 3](/assets/img/2020-06-28/coh2_split.png)
* **21:9 게임**<br>
    ![Priority Grid 2](/assets/img/2020-06-28/grid2.png)<br>
    2칸 짜리 Priority Grid를 선택하면 된다.<br>
    ![Lostark](/assets/img/2020-06-28/lostark.png)
    *아직 만난 적 없는 모코코를 알탭 없이 찾고 있어...*{:.figure}

    게임을 위와 같이 플레이하기 위해서는 **창모드**로 게임을 플레이 해야 한다.<br>
    **전체 화면**도, **전체 창 모드(borderless window)**의 경우 강제로 한 모니터의 전체 화면을 사용하기 때문에 사용해서는 안된다.<br>
    문제는 창모드로 게임을 할 경우, 상단에 거슬리는 바와, 마우스를 아래로 내렸을 때 튀어나오는 작업 표시줄에 고통 받기 마련이다.<br>
    이러한 문제점을 해결하기 위한 것이 아래 소개한 **Magic Borderless** 이다.

### [Magic Borderless](https://store.steampowered.com/app/1022230/Magic_Borderless/)

![Magic Borderless](/assets/img/2020-06-28/magic_borderless.gif)<br>
거추장 스러운 상단바를 없애주고, 프로그램 정렬 / 마우스 가두기 / 작업 표시줄 비활성화 등 사실상 창모드 게임을 위해 필요한 모든 기능을 제공하는 프로그램이다.<br>
(당연하게도) 개발자에게서 받은 거라곤 하나도 없지만 이런 좋은 프로그램은 열심히 홍보해야 하니 다들 커피 한 잔 아껴서 구매해 보시길...

사용법도 간단하다. 프로그램을 창모드로 실행할 경우 자동으로 감지하고(못한다면 트레이에서 열자) 실행된다.
![Magic Borderless Setting 01](/assets/img/2020-06-28/magic_borderless_01.png)<br>
프로그램 리스트 중 설정하고자 하는 프로그램을 선택하여 다음과 같이 설정한다.
![Magic Borderless Setting 02](/assets/img/2020-06-28/magic_borderless_02.png)<br>

* 테두리 없는 창(보더리스)<br>
    첫번째 옵션을 선택해주면 된다.
* 작업 표시줄 관리<br>
    두번째 옵션을 선택해주면 된다.<br>
    간혹 가다 창모드로 플레이하다가 마우스가 하단에 닿을 때 작업 표시줄이 표시되어 짜증나는 경우가 있다.<br>
    (작업 표시줄 가리기 옵션 사용시) 이를 방지해 주는 기능이다.
* 창 위치 조절<br>
    창을 어디다가 위치 시킬지 결정하는 옵션이다.<br>
    개인적으로는 21:9의 경우 왼쪽, 16:9는 중앙 정렬을 시켜 사용하고 있다.<br>
    지금 보이는 옵션은 21:9로 실행하고 있는 Apex Legend 이기 때문에 왼쪽 정렬이 선택되어 있다.
* 창 사이즈 직접 설정<br>
    보통 비율 유지로 두면 되지만, 로스트아크와 같이 특정 프로그램들은 문제가 발생하는 경우가 있다.<br>
    이 경우 임의 크기 선택 후 가로 / 세로를 공란으로 두면 된다.

## 마치며

내 인생 처음으로 100만원이 넘어가는 모니터를 사보았다. 이 모니터는 못해도 10년은 사용해야 하지 않을까...<br>
이 모니터의 유일한 단점이라면, 회사에서도 49인치 32:9 모니터를 쓰고 싶게 만든다는 것 뿐이다.<br>
게임들이 32:9를 지원하지 않을까 걱정하지 말고, 무조건 큰 걸로 사자.<br>
21:9 모니터 샀으면 땅을 치고 후회할 뻔했다.<br>
모니터는 참으로 **거거익선**이다.
