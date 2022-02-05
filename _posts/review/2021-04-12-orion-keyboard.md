---
layout: post
title: "오리온 2.5 키보드 리뷰"
subtitle: "Orion 2.5 Keyboard Review"
category: review
tags: hardware keyboard
image:
  path: /assets/img/2021-04-12/orion_led.gif
---

LED의, LED에 의한, LED를 위한 [커스텀 키보드 오리온 2.5](http://kbd4u.cafe24.com/product/detail.html?product_no=101&cate_no=39&display_group=1)입니다.
{:.figcaption}

| Keyboard | Layout | PCB | Plate |
|----------|--------|-----|-------|
| Orion 2.5 | Winkey | Snow-Pro | FR4 |

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 소개

![Orion layout](/assets/img/2021-04-12/orion_layout.jpg){:.centered}

사실 커스텀 키보드를 원했던 이유는 외형이 아닌, 'fn키를 활용하여 텐키레스 키보드에서도 65배열과 같은 효과를 낼 수 없을까?'라는 생각에서 였습니다.
`INSERT` ~ `PAGE DOWN` 등의 특수 키도 자주 사용하지만, 알파열 내에서 오른손이 화살표까지 이동하는게 생각보다 자주 불편하다는 느낌을 받았거든요.

이러던 와중에 이미 지나가버린 [오리온 2.5 공제](https://kbdlab.co.kr/index.php?mid=board_gb_do&document_srl=6180724)를 보았고, LED의 자태를 보는 순간 '커스텀 키보드는 이걸 사야겠구나' 라는 생각밖에 안들었습니다.
가격이 꽤나 나갔지만... 하루에 못해도 8 시간은 사용할텐데, 한 번 큰 마음 먹고 사지 뭐... 라는 생각과 함께요.

갈축, 저적, 흑축 등 여러 기계식 키보드를 근 10년 동안 사용하였지만 스프링 교체 및 윤활을 진행한 키보드는 처음 사용해보았는데... **신세계**를 보았습니다.
조약돌 소리가 무엇인지, 스페이스나 엔터와 같이 스테빌이 들어가는 특수키들이 이렇게 *"정갈"*할 수가 있는지 (전 소리에 정갈하다는 단어를 왜 붙이는건지 이해를 못 했었습니다) 놀라울 따름입니다. 돈은 많이 들었지만 아까운 느낌은 전혀 없네요.

예상은 하였지만 오히려 LED를 잘 사용하지 않습니다. 키보드 기본 RGB LED만 켜두고 알파열의 LED는 꺼놓는 경우가 부지기수입니다.

### Garbage Collection 키보드 루프

![Keyboard Roof](/assets/img/2021-04-12/gc_keyboard_roof.jpg){:.centered}

고양이를 키우다 보니 털이 너무 많이 날려서 키보드 보호를 위해서 반 강제적으로 구매한 키보드 루프입니다.
아크릴로 여러 키보드 사이즈에 맞춰서 커스텀하여 나오는 [가비지 컬렉션사의 키보드루프](http://garbagecollection.co.kr/goods/goods_view.php?goodsNo=1000000000)를 구매하였습니다.

*선택 21*5에 *Orion V3*가 있어 해당 옵션으로 구매하였는데, 루프의 가로가 1mm 정도 더 깁니다.
참고하셔서 구매하실 분은 루프 가로를 1~2mm 정도 줄여서 제작해달라고 부탁드리는게 좋을 것 같습니다.

### Snow Pro 기판 - Snow Tool

키보드와 함께 [Snow-Pro 기판](https://kbdlab.co.kr/index.php?mid=board_gqHn82&document_srl=4823632)을 구매하여 조립하였습니다.
기본 기판보다 RGB LED가 더 많이 달려있고, [자체 프로그램(Snow Tool)](https://kbdlab.co.kr/index.php?mid=board_sw&document_srl=4396654)이 있어 키맵핑 및 LED 설정이 더 쉽다고 합니다. (Snow Pro 기판만 오리온 2.5 키보드의 화살표 위 5개의 인디케이터 모두 켤 수 있는 것으로 알고 있습니다.)

### Key Mapping

![Key Mapping - Normal Layer](/assets/img/2021-04-12/snow_tool_normal_layer.png){:.centered}

Normal Layer 키 맵핑
{:.figcaption}

기본 레이아웃에서 Caps Lock 키를 FN키로 맵핑하였습니다. Caps Lock의 경우 자주 사용하지도 않는데 너무나 좋은 위치에 있는 키인데요, 이렇게 FN키로 맵핑하면 왼손만으로
Caps Lock + wasd로 이동을 할 수 있는등 오른쪽 하단열에 위치한 FN키 대신 사용하기에 매우 편리합니다.

![Key Mapping - FN Layer](/assets/img/2021-04-12/snow_tool.png){:.centered}

FN Layer 키 맵핑
{:.figcaption}

이외에는 wasd / hjkl에 화살표 맵핑을 해주고, Home/End 와 Page Up/Down 키 맵핑을 적절한 위치에 해줬습니다.

LED Bypass와 LED Mode는 별개로 키 맵핑을 해주는 것이 좋습니다. LED Bypass를 통해 LED를 끌 경우 키보드 응답속도가 더 빨라진다고 하니 참고하시면 좋을 것 같습니다.

간혹가다 키보드 자체 렉이 발생하는 경우가 있습니다. 현재 USB switcher를 사용중인데 전류가 부족해서 발생하는 현상이 아닐까 생각됩니다. 이럴때를 대비해서 `restart` 버튼도 키맵핑하셔서 `soft reset`을 진행하시는게 좋습니다.
{:.note title="TIP"}

![Indicator Setting](/assets/img/2021-04-12/snow_tool_indicator.png){:.centered}

Layer1 ~ 4와 Indicator를 `None`으로 둘 경우 RGB LED의 색변환과 함께 화살표 위 5개의 LED 색이 변합니다. 이렇게 두는 게 심미적으로 훨씬 예쁘더라구요.
Snow pro 기판의 추가적인 기능들을 사용하지 않기 때문에 기존에 있던 설정들을 다 재외시켰습니다.

## 가격

| 아이텀 | 가격(만원) |
|-------|-----------|
| 오리온 2.5 | 48 |
| Snow Pro + FR4 보강판 | 12 |
| [모닝 공방](https://kbdlab.co.kr/index.php?mid=page_ZpVE14) 조립비 | 9 |
| 무게추 | 6.7 |
| 스위치 | 5.3 |
| 키보드루프 | 3.5 |
| LED/필름/스테빌 등 잡템 | 3 |
| **총합** | **87.5** |

네... 키보드 하나에 87.5만원(+a)를 태웠네요. 고장 안내고 10년 쓰면 연당 10만원 아래로 떨어지니 이득입니다. 네.
