---
layout:   post
title:    "Chapter 1: C++와 표준 라이브러리 초단기 속성 코스"
subtitle: "Chapter 1: C++와 표준 라이브러리 초단기 속성 코스"
category: studylog
tags:     cpp procpp
related_posts:
  - _posts/textbook/procpp/2021-08-06-professional-cpp-toc.md
---

> **이 장에서 배울 내용**
>
> * C++와 표준 라이브러리의 핵심 요소 문법 둘러보기
> * 스마트 포인터의 기초

첫 챕터답게 '기본은 알고 있니?'라고 묻고 있습니다.<br>
따로 주의 깊게 볼만한 부분은 없고, C++17에서 추가된 내용만 몇 개 기입하였습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Nested Namespace

```c++
// Using namespace alias
namespace MyFTP = MyLibraries::Networking::FTP;

// Pre C++17
namespace MyLibraries {
    namespace Networking {
        namespace FTP {
            /* ... */
        }
    }
}

// C++17
namespace MyLibraries::Networking::FTP {
    /* ... */
}
```

## [std::byte](https://en.cppreference.com/w/cpp/types/byte) (Since C++17)

> std::byte is a distinct type that implements the concept of byte as specified in the C++ language definition.<br>
> Like char and unsigned char, it can be used to access raw memory occupied by other objects (object representation),<br>
> but unlike those types, it is not a character type and is not an arithmetic type. A byte is only a collection of bits,<br>
> and the only operators defined for it are the bitwise ones.

c++17에서 추가된 1 바이트를 나타내는 자료형입니다.<br>
기존에는 보통 `unsigned char`를 써왔는데 `byte` 자료형이 추가되었다는 걸 모르고 있었네요.<br>
위에 나와있듯이 *비트 연산*은 가능하지만 *산술 연산*은 불가능합니다. 또한 `to_integer<IntegerType>`을 통해 형변환이 가능합니다.

### Example

```c++
#include <iostream>
#include <cstddef>

int main()
{
    std::byte b{42};
    std::cout << std::to_integer<int>(b) << "\n";

    // b *= 2 compilation error
    b <<= 1;
    std::cout << std::to_integer<int>(b) << "\n";
}
```

## [Scoped Enumerations](https://en.cppreference.com/w/cpp/language/enum)

enum에 비해 더 *type safety*한 열거 타입입니다.<br>
`int`로의 묵시적 형변환이 불가능하며 스코프 지정 연산자를 꼭 붙여주어야 합니다.

### Example

```c++
enum class PieceType : unsigned long {
    King = 1,
    Queen,
    Rook = 10,
    Pawn
}

// Commented out instructions will fail
// PieceType piece = 1;
// PieceType piece = King;
PieceType piece = PieceType::King;

// Implicit type conversion is not allowed
// (use static_cast<int> or static_cast<PieceType>)
// if (piece == 2) { /* ... */ }
if (piece == PieceType::King) { /* ... */ }
```

## Initializer in if/switch Statement (Since C++17)

`if`나 `switch`문 안에 `initializer`를 넣을 수 있게 되었습니다.<br>
이전까지는 if문이나 switch문 호출 전에 변수가 다 선언되어 있어야 했기 때문에
불필요하게 변수 스코프가 늘어나는 경우가 왕왕 발생하였는데 더 이상 그런 일이 없네요.<br>
for문의 *init-statement*를 생각하시면 편할 것 같습니다.

정의된 변수의 스코프는 if문/switch문 내로 한정됩니다.
{:.note}

### Example

```c++
// if (init-statement; condition) { /* ... */ }
if (Employee employee = GetEmployee(); employee().salary > 1000) { /* ... */ }

// switch (init-statement; condition)
switch (auto dev = Device{}; dev.state()) {
    case Device::SLEEP: /*...*/ break;
    case Device::READY: /*...*/ break;
    case Device::BAD:   /*...*/ break;
}
```

## [Switch Fallthrough](https://en.cppreference.com/w/cpp/language/attributes/fallthrough) (Since C++17)

switch-case 문에서 종종 `break` 하지 않고 아래 케이스까지 실행하는 경우가 있습니다. 이러한 코딩 방식은 에러를 유발하기 쉽기 때문에
컴파일러가 경고 메시지를 출력합니다. `[[fallthrough]]`를 사용함으로서 의도적인 폴스루임을 컴파일러에게 알릴 수 있습니다.

### Example

```c++
switch (backgroundColor) {
    case Color::DarkBlue:
        doSomethingForDarkBlue();
        [[fallthrough]];
    case Color::Black:
        // Both DarkBlue and Black will execute this
        doSomethingForDarkerColor();
        break;
    case Color::Red:
        [[fallthrough]];
    case Color::Green:
        // Both Red & Green will execute this
        runForRedAndGree();
        break;
}
```

Back to [전문가를 위한 C++ (Professional C++) 작성 포스트 모음](professional-cpp-toc){:.heading.flip-title}
{:.read-more}
