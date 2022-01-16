---
layout:   post
title:    "Chapter 3: 코딩 스타일"
subtitle: "Chapter 3: 코딩 스타일"
category: studylog
tags:     cpp procpp
related_posts:
  - _posts/textbook/procpp/2021-08-06-professional-cpp-toc.md
---

> **이 장에서 배울 내용**
>
> * 코드 문서화의 중요성과 다양한 주석 스타일
> * 분할의 의미와 적용 방법
> * 명명 규칙
> * 포메팅 규칙

~~방청소 빼고~~ 세팅과 정리에 집착하는 제게 중요한 챕터입니다.
근데 그다지 새롭게 배울 내용은 없기에 책 내용 위주로 정리하기보다는 제 코딩 스타일을 간단히 정리해보았습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Documentation

[Doxygen](https://www.doxygen.nl/index.html)을 사용하도록 합니다.<br>

꼭 Doxygen으로 문서를 만들어내지 않아도 정리된 가이드라인에 따라 주석이 작성되기 때문에 통일성있게 정보를 전달할 수 있게됩니다.

여담이지만 [Rust](https://www.rust-lang.org)를 접하면서 새로운 언어들이 확실히 문서화나 포메팅, 외부 모듈(crate) 등을 오피셜하게 지원한다는 점이 참 부럽게
느껴졌습니다. C++도 가능은 하나... 직접 찾아보고, 설치하고, 세팅해야하죠.<br>
Doxygen이 한번 설정해주면 잘 나오기는 합니다.

![Doxygen Example](/assets/img/2021-08-08/doxygen.png)

~~결과물이 너무 안 예뻐서 그렇지...~~
{:.figcaption}

### 주석

주석에는 코드로 나타낼 수 없는 정보나 코드에 적용된 알고리즘의 개략적인 설명 정도만 추가하도록 합니다.
쓸데없는(반복적인) 주석은 읽어야할 라인 수만 늘릴 뿐 코드를 이해하는데에 도움이 되지 않습니다.<br>
그렇다고 코드만 남겨두진 않았으면 좋겠습니다. 4자리 수가 넘어가는 라인 수의 파일에 주석 하나 없이 코드만 있으면... 뉴비는 오늘도 웁니다.

상용 프로그램의 소스 코드도 오타를 벗어날 순 없습니다. 대부분의 오타는 주석과 `string`에서 발생합니다.
[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 등의 익스텐션 사용을 추천드립니다.
{:.note}

## Naming Convention & Formatting

어떤 명명 규칙을 따르든, 프로젝트 내에서는 동일한 컨밴션을 모두가 따르는 것이 중요합니다.
비록 그 네이밍 컨밴션에 `snake_case`와 `camelCase`, `PascalCase`, `Hungarian Notation`이 다 나온다고 해도 말이죠...
혼자 프로젝트를 진행할 때에는 [Google C++ Style Guideline](https://google.github.io/styleguide/cppguide.html)을 조금 참고했었는데
회사에서는 [Webkit Code Style Guideline](https://webkit.org/code-style-guidelines/)을 베이스로 작업하고 있습니다.
널리 쓰이는 가이드라인은 아닌 것 같은데, 간단하고 대체로 제 취향과 맞아서 좋습니다.

Code Style Guideline을 강제화 시키기 위해 [clang-format](https://clang.llvm.org/docs/ClangFormat.html)과 [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) 같은 프로그램들의 도움을 받는 것을 추천드립니다.
{:.note}

### WAAAGH!!

> 이 책에서는 어떤 스타일이 좋은지에 대한 의견은 밝히지 않는다. 그런 문제로 항의 메일을 받고 싶지 않다.

전쟁! 결코 다시 전쟁! 나와 다른 놈들은 전부 **이단**이다!!

* 중괄호 정렬에 관련된 논쟁

    ```c++
    // 1
    void someFunction() {
        if (condition) {
            cout << "true" << endl;
        } else {
            cout << "false" << endl;
        }
    }

    // 2
    void someFunction()
    {
        if (condition)
        {
            cout << "true" << endl;
        }
        else
        {
            cout << "false" << endl;
        }
    }
    ```

    아.. 여기까진 취향차로 이해할 수 있지만 제 취향은 *1*입니다. *2*는 괜히 쓸데없이 라인만 늘려나서 오히려 가독성이 떨어진다고 생각합니다.<br>
    ~~저는 당신의 의견을 존중합니다. 물론 내가 맞고 니가 틀렸지만.~~

* One-line if statement

    ```c++
    // 1
    if (condition)
        cout << "no bracket" << endl;
    else
        cout << "for one line" << endl;

    // 2
    if (condition) {
        cout << "no bracket" << endl;
    } else {
        cout << "for one line" << endl;
    }

    // 3
    if (condition) cout << "no bracket" << endl;
    else cout << "for one line" << endl;

    // 4
    if (condition) { cout << "no bracket" << endl; }
    else { cout << "for one line" << endl; }
    ```

    원래는 *1*이었는데, Rust에서는 `{}` 생략을 허용하지 않습니다. 그래서 요즘은 '통일성을 생각하면 2가 맞지 않나...' 라고 생각하고 있습니다.
    *3*, *4*의 경우 한 줄 짜리 if가 엄청나게 많을때라면 모를까 좋아하는 형태는 아닙니다. 설정해놓은 `clang-format`에 숙청 대상이기도 하구요.

* 스페이스와 소괄호에 대한 논쟁

    ```c++
    // 1
    if (i == 2) {
        j = i + (k / m);
    }

    // 2
    if(i == 2) {
        j = i + k / m;
    }
    ```

    항의 메일 받기 싫다는 저자도 다음과 같이 적어놓았습니다.

    > 둘 중 어느 것이 나은지에 대한 판단은 독자에게 맡긴다. 단지 if는 함수가 아니라는 것만 지적하고 싶다.

    네... `if`, `while`, `switch` 등에는 *1* 씁시다 제발.

* tab vs space<br>
    스페이스입니다. 스페이스 2개를 쓰냐 4개를 쓰냐로 논쟁할 순 있어도 탭을 사용하는 케이스는 별로 못 본 것 같습니다.<br>
    `indentation`에 탭을 사용할 경우 align을 위해 스페이스를 사용한 라인들이 사용자마다 세팅 값의 차이로 인해 중구난방이 되버리기 때문에
    추천드리지 않습니다.<br>
    물론 최악은 둘이 혼용되서 사용되는 케이스입니다.

Back to [전문가를 위한 C++ (Professional C++) 작성 포스트 모음](professional-cpp-toc){:.heading.flip-title}
{:.read-more}
