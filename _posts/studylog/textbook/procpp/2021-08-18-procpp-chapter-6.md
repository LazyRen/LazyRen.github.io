---
layout:   post
title:    "Chapter 6: 재사용을 고려한 디자인"
subtitle: "Chapter 6: 재사용을 고려한 디자인"
category: studylog
tags:     cpp procpp
related_posts:
  - _posts/textbook/procpp/2021-08-06-professional-cpp-toc.md
---

> **이 장에서 배울 내용**
>
> * 재사용 철학: 코드를 재사용하도록 디자인 해야 하는 이유
> * 코드 재사용을 위한 디자인 방법
> * SOLID 원칙

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 재사용 철학

* 작성은 한 번, 사용은 여러 번
* 무슨 수를 쓰더라도 코드 중복은 피한다.
* 같은 일을 반복하지 않는다.

작성한 코드는 반드시 팀 내 다른 프로그래머도 활용할 수 있어야 합니다. 잘 디자인 된 코드는 보기도 좋고, 이해하기도 좋고, 사용하기도 좋습니다.<br>
재사용성이 낮으면 중복된 코드가 늘어납니다. 중복된 코드가 늘어나면 코드 파악 및 유지보수가 힘들어집니다.

## 코드를 재사용할 수 있도록 디자인하는 방법

1. 용도나 분야가 약간 달라도 충분히 사용할 수 있도록 범용성을 갖춰야 합니다.

    이 의견에는 100% 동의하기 힘든 것 같습니다. 범용성을 갖추기 위해서 성능을 희생해야 하는 경우가 종종 있는데,
    개발중인 아이템에 따라 (*HANA DB* 라던가...) 범용성보다 성능이 우선시 되는 경우가 있지 않을까요. 특정한 용도에 특화된 컴포넌트가 꼭
    나쁘지만은 않다고 생각합니다.
    {:.note title="개인적인 생각"}

2. 재사용 가능한 코드는 사용하기 쉽게 만들어야 합니다. 인터페이스와 기능을 금방 이해할 수 있어야 합니다.

재사용할 수 있는 코드를 디자인하는데 가장 중요한 부분은 **추상화** 입니다.
인터페이스와 내부 구현을 분리하는 것은 클라이언트[^1] 뿐만이 아니라 개발자에게도 큰 도움이 됩니다.

* 코드 작성자 입장에서 코드의 주요 기능과 사용법에 대해 명시하여 작성자의 의도와 다르게 코드를 사용해서 *예상치 못한 동작<sup>Unexpected Behavior</sup>*이나 버그가 발생하는 상황을 막을 수 있습니다.
* 추후 인터페이스를 건드리지 않고 구현을 변경하거나 수정할 수 있어 유지보수가 쉬워집니다.

## 추상화 기법

### Handle

한 인터페이스에서 리턴한 정보를 다른 곳에 전달하기 위해 코드에서 보관하는 정보를 *핸들<sup>Handle</sup>*이라 칭합니다.<br>
라이브러리에서 여러 함수나 메서드를 호출하는 과정에서 상태를 유지해야 하는 특정 인스턴스를 구현하는 용도로 사용되며
내부 데이터에 사용자가 직접 접근하지 못하도록 *불투명<sup>Opaque</sup> 클래스*로 구현합니다.

### Single Responsibility Principle

컴포넌트는 반드시 한 작업만 처리하거나 여러 작업의 경우 서로 성격이 같은 것들만 처리하도록 디자인해야 합니다.<br>
각각의 컴포넌트는 논리적으로 구분되어 독립적으로 재사용할 수 있도록 만드는 것이 좋습니다.

### 클래스 계층을 사용해서 논리적으로 나누기

클래스 관점에서도 서로 관련 없는 개념이 한데 엮이지 않도록 해야 합니다.<br>
가령 자율주행 자동차에 대한 클래스를 작성한다면, 자동차의 기본 기능을 표현하는 베이스 클래스와 자율주행 기능을 구현하는 데 필요한 모든 알고리즘을 제공하는 믹스인 클래스를 따로 작성하여
필요할 경우 두 클래스 모두 상속 받도록 사용하는 편이 하나의 클래스에 자동차와 자율주행 기능 모두를 담는 것보다 좋은 방법입니다.

```default
   _____________Self-driving_____________
  |                                      |
  |                                      |
  |                                      |
  |                Vehicle               |
  |                   |                  |
  |   Sedan----------------------Truck   |
  |     |                          |     |
Self-driving Sedan        Self-driving Truck
```

### 집합 관계를 사용해서 논리적으로 나누기

객체가 제공하는 기능의 일부분을 수행하는 (*has-a* 관계를 가진) 객체를 따로 두는 겁니다.

### 사용자 인터페이스에 대한 종속성 제거하기

데이터를 관리하는 라이브러리를 만들 때는 특정한 사용자 인터페이스의 타입에 종속되어서는 안됩니다. 그것이 standard I/O라 할지라도요.

### 제네릭 데이터 구조와 알고리즘을 템플릿으로 구현하기

가능하면 데이터 구조와 알고리즘을 구현할 때 특정 타입에 종속되도록 하지 않고 *템플릿<sup>Template</sup>*을 사용하여 모든 타입에 사용될 수 있는
제네릭 데이터 구조와 알고리즘을 제공하도록 구현 합니다. C++ std가 좋은 예라 할 수 있겠습니다.

### Open/Closed Principle

클래스는 다른 클래스가 상속해서 확장하는 데는 열려 있으면서, 구현을 수정하는 데는 폐쇄적인 방식으로 동작을 확장할 수 있게 디자인 해야 합니다.

#### 예시

```c++
class Shape {
public:
    virtual void render() = 0;
}

class Square : public Shape {
public:
    virtual void render() override { /* Render Square */}
}

class Circle : public Shape {
public:
    virtual void render() override { /* Render Circle */}
}

class Renderer {
public:
    void render(const vector<shared_ptr<Shape>>& objects) {
        for (auto& obj : objects)
            obj->render();
    }
}
```

위 코드를 사용하면 다른 도형을 추가할 때 `Shape`만 상속 받아 `render()` 메서드를 구현하도록 정의하면 `Renderer` 클래스는 변경 없이
새로운 도형을 렌더링 할 수 있습니다.

## 사용성 높은 인터페이스 디자인

* 필요한 기능 빼먹지 않기
* 군더더기 없는 인터페이스 제공하기
* 문서와 주석 제공하기
* 익숙한 방식 따르기<br>
    사용하기 쉬운 인터페이스를 개발하는 방법 중 하나는 사용자에게 익숙한 표준 방식을 따르는 것 입니다.<br>
    C++ std의 예시를 따르면 기존 C++ 사용자들이 인터페이스를 보고 사용하기 쉽겠죠.

## SOLID 원칙

객체지향 디자인의 기본 원칙 5가지 입니다.

<style type="text/css">
</style>
<table>
<thead>
  <tr>
    <th>Principle</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Single Responsibility Principle</td>
    <td>단일 책임성 원칙<br>
        컴포넌트마다 하나의 잘 정의된 책임을 가지며 관련 없는 기능을 합치지 않는다.
    </td>
  </tr>
  <tr>
    <td>Open/Closed Principle</td>
    <td>개방/폐쇄 원칙<br>
        클래스는 (상속을 통해) 확장에는 개방적이고, 수정에는 폐쇄적이어야 한다.
    </td>
  </tr>
  <tr>
    <td>Liskov Substitution Principle</td>
    <td>리스코프 치환 원칙<br>
        어떤 객체의 자리를 그 객체의 서브타입 인스턴스로 치환할 수 있어야 한다.
    </td>
  </tr>
  <tr>
    <td>Interface Segregation Principle</td>
    <td>인터페이스 분리 원칙<br>
        인터페이스는 깔끔하고 간결해야 한다.
        거대한 범용 인터페이스보다는 작지만 잘 정의된 인터페이스 여러 개로 구성하는 것이 좋다.
    </td>
  </tr>
  <tr>
    <td>Dependency Inversion Principle</td>
    <td>의존성 역전 원칙<br>
        인터페이스로 의존 관계를 역전시킨다. 상위 클래스는 하위 클래스에 의존해서는 안된다.
        (e.g. 의존성 주입)
    </td>
  </tr>
</tbody>
</table>

Back to [전문가를 위한 C++ (Professional C++) 작성 포스트 모음](professional-cpp-toc){:.heading.flip-title}
{:.read-more}

[^1]: 프로그램을 실행하는 유저가 아닌 작성한 코드를 사용하는 프로그래머를 뜻합니다.
