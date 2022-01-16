---
layout:   post
title:    "Chapter 7: 메모리 관리"
subtitle: "Chapter 7: 메모리 관리"
category: studylog
tags:     cpp procpp
related_posts:
  - _posts/textbook/procpp/2021-08-06-professional-cpp-toc.md
---

> **이 장에서 배울 내용**
>
> * 다양한 메모리 사용 및 관리 방법
> * 스마트 포인터의 개념과 사용법
> * Garbage Collection
> * 흔히 발생하는 메모리 문제

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 들어가기전에

언어의 기본 문법(`new`/`delete` 등...)이나 배열 할당 등 기본적인 내용에 대해서는 다루지 않고 넘어가도록 하겠습니다.<br>
어디까지나 새로 배운 혹은 나중에 다시 보더라도 짚고 넘어가야할만한 내용들을 정리해보자는 목적에 충실하기 위함입니다.

## 동적 메모리 다루기

* 메모리 할당(`new`)한 경우 해제(`delete`)를 꼭 해줄 것
  * 메모리 할당 해제 시 포인터를 `nullptr`로 초기화하여 *dangling pointer* / *use after free* / *double free* 방지
* `nullptr`에 대한 `delete`는 **NOOP**입니다. (은근히 이거 체크하고 `delete` 콜하는 경우가 많던데 불필요한 코드입니다.)
* **RAII**<sup>resource acquisition is initialization</sup> 기법을 활용할 것<br>
    *자원 할당은 초기화이다.* 라는 이 애매한 기법은 실제로도 많이 사용되는 C++ 중요한 기법인데요,
    사실 이보다는 *scope guard*라는 말이 더 와닿는 용어 일 것 같습니다. 클래스의 생성자에서 객체에 필요한 자원들을 할당하고, 소멸자에서
    할당받은 자원들을 전부 해제함으로서 객체의 수명(*lifetime*)에 따라 자원의 할당/해제가 자동적으로 이루어지게 하는 기법으로
    `memory leak`을 방지하는데 매우 효과적이거든요. 이러한 "자원"에는 메모리 뿐만이 아니라 `mutex`등의 락이 사용될 수도 있다는 점에서
    정말로 자주 사용되는 기법입니다.

### 포인터 연산

C++ 컴파일러는 포인터 연산을 수행할 때 포인터에 선언된 타입을 이용합니다.
포인터를 `int`로 선언하고 그 값을 1만큼 증가시키면 포인터는 메모리에서 한 바이트가 아닌 `int` 크기만큼 이동합니다.

```c++
int* my_array = new int[8];

my_array[2] = 22;
printf("%d\n", *(my_array + 2)); // 22
```

포인터 연산은 뺄셈도 유용합니다. 한 포인터에서 같은 타입의 포인터를 빼면 두 포인터 사이에 몇 바이트가 있는지가 아니라 *포인터에 지정한 타입의
원소가 몇 개 있는지 알 수 있습니다.*

## Garbage Collection

GC를 제공하는 환경이라면 프로그래머가 객체에 할당된 메모리를 직접 해체하기 보다는 더 이상 참조하지 않는 객체를 *garbage collector*가
주기적으로 확인하여 자동으로 해제합니다. C++은 GC가 기본으로 구현되어 있지 않는데, 이는 GC가 성능 저하 뿐만 아니라 몇가지 단점을 가지고 있어
언어 차원에서 기본적으로 제공하기에는 부적절하기 때문입니다. (C++는 low level programming에도 많이 사용되니까요.)

메모리 자동 해체를 위해서 사용되는 기법 몇가지를 소개해드리자면

1. *Object Pool*<br>
    메모리 할당/해제 횟수가 줄어들기 때문에 성능면에서도 이득을 주는 기법입니다. 한 번에 다수의 객체를 할당받아 `Object Pool`로 사용하여
    필요할때마다 풀에서 받아서 사용하고, 필요없어진 객체는 다시 풀에 반환하는 형식입니다.
2. *Smart Pointer* (*reference counted pointer*)<br>
    C++에서 기본으로 제공하는 `unique_ptr`나 `shared_ptr`등을 사용하거나 직접 *reference counting*을 구현하여 만드는 방법등이 이에
    속합니다. 구현도 (생각보다..?) 쉽고 사용도 쉬워 많이 사용됩니다.
3. 직접 GC 구현 (**Epoch Based Reclamation** 이라던지...)<br>
    일반적인 GC는 multi thread 환경에 적합하지 않는 경우가 있습니다. *reference_counting*도 결국 *atomic operation*이 동반되기
    때문에 일반 포인터보다는 성능 저하를 불러일으킬 수 있습니다. 이런 경우에 적합한 GC를 구현하는 것도 한가지 방법입니다.
    (관심이 있으시다면 **EBR** 관련된 논문 몇 개 찾아보시는 것을 추천드립니다.)

## 흔히 발생하는 메모리 문제

### Underallocation

C 스타일 스트링에서 가장 흔히 발생하는 문제인 *과소 할당*<sup>underallocation</sup>입니다. `NULL` 문자 `'\0'`가 들어갈 공간을 빼먹고
공간을 할당할 때 발생하는데요, 직접적인 할당 문제도 있지만, *null-terminated*(스트링의 끝에 `NULL`이 존재함)를 보장하지 않는 API를
사용하면서 `null` 문자가 있을 것이라고 어림짐작하고 코드를 짜는 경우에도 발생할 수 있습니다. (이런 경우 문제를 잡기가 더더욱 힘든 경우가
많은데 대부분의 API 호출시에는 `null`문자가 들어있지만 간혹가다 없는 경우가 발생하기 때문입니다.)

### 메모리 경계 침범

배열의 경계를 벗어나는 *buffer overflow*, 혹은 스트링에서 앞선 문제와 겹쳐서 발생할 수 있는 문제입니다. 의도한 메모리를 넘어서는 영역을
읽거나 쓰면서 발생하는 문제들의 총칭으로 `SIGSEGV` 시그널을 받고 프로그램이 죽거나 *Undefined behavior*로 빠져듭니다.

### Memory Leak

메모리를 할당하였으나 해제하지 않은 채 해당 메모리를 가르키는 모든 포인터가 사라지는 경우 *메모리 누수*<sup>memory leak</sup>가
발생한다고 합니다. 문제가 발생하여도 어디가 문제인지, 어떻게 해결하는지 찾기 어렵기 때문에 최대한 *raw pointer* 사용을 지양하고
*smart pointer* 사용, *RAII* 기법등을 활용하는 것이 중요합니다.

{:.note}
`new` / `delete` 커플링이 완벽하여도 *memory leak*은 발생할 수 있습니다.
아래 간단한 예제에서는 2가지 *memory leak*이 발생할 수 있습니다.

1. `int* ptr2 = new int(2);`에서 메모리 할당을 하다가 `OOM`등의 예외를 만날 경우 이미 할당이 완료된 `ptr1`이 가르키던 객체에 접근할 수
없게 되어 *memory leak*이 발생합니다. 아래 단순한 예제에서는 *exception* 발생시 프로그램이 바로 종료되기 때문에 큰 문제는 없지만
*exception handling*을 하는 경우에도 꼭 `ptr1`에 대한 체크 후 할당 해제를 진행하여야 합니다.
2. `do_something2()`에서 메모리 할당 해제를 하지 않은 채로 `ptr`에 새로운 객체를 덮어 씌우고 있습니다. 기존 객체에 접근할 방법이 없습니다.
위에 비하면 단순한 코딩 실수입니다.

```c++
void do_something1(int* ptr1, int* ptr2) {
    // ...
}

void do_something2(int* ptr) {
    // Memory Leak: Original object from `ptr` cannot be reached after this line.
    ptr = new int(3)
}

int main() {
    int* ptr1 = new int(1);
    // What if OOM happens at next line? object pointed by ptr1 is leaked!
    int* ptr2 = new int(2);

    do_something1(ptr1, ptr2);
    do_something2(ptr1);

    delete ptr1;
    delete ptr2;
}
```

### Double Free & Dangling Pointer

`delete`로 포인터에 할당된 메모리를 해제하였지만 해당 메모리 주소를 가르키는 포인터(*dangling pointer*라 부릅니다)가 남아 있어
이를 사용하였을 경우(*use-after-free*) 혹은 다시 `delete`를 실행하는 경우(*double free*) 문제가 발생합니다.
해결법으로는

1. 메모리 할당 해제 후에는 바로 `nullptr`로 초기화를 진행해줍니다.
2. 같은 메모리 주소를 가르키는 포인터가 많은 경우 *smart pointer*를 사용합니다.

등이 있습니다.

Back to [전문가를 위한 C++ (Professional C++) 작성 포스트 모음](professional-cpp-toc){:.heading.flip-title}
{:.read-more}
