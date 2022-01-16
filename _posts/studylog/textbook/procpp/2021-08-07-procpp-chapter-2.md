---
layout:   post
title:    "Chapter 2: 스트링과 스트링 뷰 다루기"
subtitle: "Chapter 2: 스트링과 스트링 뷰 다루기"
category: studylog
tags:     cpp procpp
related_posts:
  - _posts/textbook/procpp/2021-08-06-professional-cpp-toc.md
---

> **이 장에서 배울 내용**
>
> * raw string literal
> * C++와 표준 라이브러리의 핵심 요소 문법 둘러보기
> * C++의 std::string 클래스 자세히 들여다보기
> * std::string_view의 용도

C 스타일 스트링과 스트링 리터럴, C++ `std::string` 및 `std::string_view`(since C++ 17)에 대해서 다루고 있습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## C Style String

C언어는 스트링을 단순히 문자 배열로 표현했습니다. 스트링의 마지막에 `NUL` 문자(`\0`)를 붙여서 스트링의 마지막을 나타냅니다.<br>

C 스타일 스트링에 관련된 연산은 [`<cstring>` header](https://cplusplus.com/reference/cstring/?kw=cstring)에서 확인할 수 있습니다.

## String Literal

```c++
cout << "hello, world!" << endl;
```

위 예제에서 `"hello, world!"`처럼 변수에 담지 않고 곧바로 값으로 표현한 스트링을 *string literal*이라 칭합니다.<br>
스트링 리터럴은 내부적으로 메모리의 읽기 전용 영역에 저장되기 때문에 변경할 수 없습니다.
컴파일러는 내부적으로 동일한 스트링 리터럴이 반복되서 나올 경우 동일한 레퍼런스를 재사용하여 메모리를 절약합니다.

C++에서 스트링 리터럴은 *const char이 n개인 배열*으로 정의하고 있습니다.<br>
그렇기 때문에 스트링 리터럴을 참조할 때에는 `const char*`을 사용하는 것이 안전합니다. 스트링 리터럴에 쓰기 작업을 하려는 것을 막아주니까요.
{:.note}

아래와 같이 문자 배열(`char[]`)의 initialization을 진행할때 사용되는 스트링 리터럴은 읽기 전용 메모리에 넣지 않으며 재사용되지도 않습니다.

```c++
char arr[] = "hello";
```

### Raw String Literal

```c++
const char* str = R"(Hello "world"!
Line2
Line3)";
```

`R"(`로 시작해서 `)"`로 끝나는 *raw string literal*은 여러 줄에 걸쳐 작성할 수 있고,
`"`, `\n`, `\t` 등이 *escape sequence*로 사용되지 않고 일반 텍스트로 취급됩니다.

#### Extended Raw String Literal

로 스트링 리터럴은 기본으로 `R"(`와 `)"`를 구분자 시퀸스(*delimiter sequence*)로 사용합니다.
하지만 로 스트링 리터럴 내부에서 `R"(`나 `)"`를 사용해야하는 경우가 생길 수도 있지 않을까요?

```c++
R"d-char-sequence(blah-blah)d-char-sequence" // = "blah-blah"
```

위와 같이 임의의 구분자 시퀸스(`"d-char-sequence(` / `)d-char-sequence"`)를 사용하여 스트링 리터럴을 나타내는 것을 *extended raw string literal*이라 칭합니다.
이때 구분자 시퀸스는 최대 16개의 문자를 사용할 수 있으며 로 스트링 리터럴 안에서 나오지 않는 값이어야 하고 시작과 끝에 똑같이 나와야합니다.

### C++ String Literal

표준 사용자 정의 리터럴 `s`를 사용하면 스트링 리터럴을 `std::string`으로 만들 수 있습니다.

```c++
auto str1 "Hello World!"; // const char*
auto str2 "Hello World!"s; // std::string
```

## std::string_view Class (Since C++17)

읽기 전용(read-only) 스트링을 받는 함수나 메서드의 매개변수 타입은 `const std::string&`이나 `const char*` 대신 `std::string_view`를 사용하는 것이 좋습니다.
{:.note title="TL; DR"}

Rust, Python, Java 등 String 클래스가 기본으로 사용되는 여타 프로그래밍 언어들과 달리 C++는 태생적으로 C 스타일 스트링(문자 배열)과의
호환성을 고려해야 했기 때문에 여러가지 귀찮음이 존재했습니다.<br>
그 중 하나가 읽기 전용(read-only) 스트링을 받는 함수의 매개변수 타입을 결정하는 일입니다.
`const char*`로 지정할 경우 `std::string`을 사용하는 클라이언트는 `c_str()`이나 `data()`를 이용하여 `string`을 `const char*`로 변환해서 호출해야 합니다.
이 경우 `std::string`의 이점인 헬퍼 메서드를 사용할 수 없게 됩니다.<br>
반대로 `const std::string&`로 지정할 경우 `std::string`만 사용해야 합니다. 스트링 리터럴을 지정할 경우 새로운 `string` 객체를 생성해서 함수로 전달하는 오버헤드가 발생합니다.

C++17에서 추가된 `std::string_view` 클래스를 사용하여 이러한 문제를 해결할 수 있습니다. `<string_view>` 헤더에 정의되어 있으며
`const std::string&` 대신 사용되고 스트링이 복사되지 않기 때문에 오버헤드가 없습니다.

또한 스트링 뷰는 스트링에 대한 포인터와 길이만 가지고 있기 때문에 *pass-by-value*로 값이 복사되어도 효율적입니다.

`string_view`는 자동으로 `string`으로 형변환 되지 않습니다. 스트링 생성자를 호출하거나 `string_view::data()`로 생성해야합니다.
{:.note}

### Example

```c++
string_view extractExtension(string_view fileName) {
    return fileName.substr(fileName.rfind('.'));
}
```

Back to [전문가를 위한 C++ (Professional C++) 작성 포스트 모음](professional-cpp-toc){:.heading.flip-title}
{:.read-more}
