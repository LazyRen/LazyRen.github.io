---
layout: post
title: "C++ Quick Sort 구현하기"
subtitle: "C++ Quick Sort Implementation"
category: devlog
tags: algorithm
---

# C++ Quick Sort 구현하기

> Don’t reinvent the wheel; use libraries.
>
> From <The C++ Programming Language> by Bjarne Stroustrup

## 들어가기에 앞서

앞으로 게시될 일련의 게시물들은 STL을 쓰지 못하는 특정 상황을 위해 STL과 비슷하게 동작하는 container, data structure, algorithm 등을 구현한 것 들입니다.<br>
*STL* 상의 모든 함수들을 구현하지는 못하였지만(특히 iterator 관련...) 사용하는데 큰 지장은 없을 것 입니다.

*STL*을 사용할 수 있는 상황이라면 **꼭** *STL*을 사용하도록 합시다. 나보다 똑똑한 사람들이 나보다 더 많은 시간을 들여서 작성하고 최적화한 코드입니다.<br>

구현된 STL-like 자료 구조들은 [Github Repo]에서도 확인 하실 수 있습니다.

혹시나 있을 버그는 댓글 혹은 이메일로 제보해 주시면 수정하도록 하겠습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Documents

|                    Function                    |                         Description                          |
| :--------------------------------------------: | :----------------------------------------------------------: |
| `void quickSort(T arr[], int left, int right)` | Sort elements of range *[0, right]* in *arr[]*.<br> **Note** that left & right is *closed range*.[^1] |
| `void quickSort(T* arr, T* end)` | Sorts the elements in the range [arr, end) into ascending order. |

[^1]: Use `quickSort(arr, 0, N-1)` to sort all N elements in arr[].

pivot은 중간에 위치한 원소를 사용합니다. 더 최적화 하고 싶으시다면 `median-of-three`를 사용하시면 됩니다.<br>
low, mid, high 원소 중, 혹은 랜덤으로 선택된 세 원소 중 중간값을 사용하는 방법입니다.

### 잡담

`std::swap()` 함수는 C++11 이상에서 <utility> 헤더를 인클루드해야 사용이 가능 하지만, g++의 경우 <iostream> 헤더만 포함하여도 사용이 가능합니다.<br>
다만, 이런 트릭은 LLVM이나 다른 컴파일러를 사용하였을 때도 실행된다는 보장이 없기에 구현해 두었습니다.<br>
실제 `swap()` 함수에서는 `std::move()`를 사용하여 실행속도를 증가시키지만, 이 또한 <utility> 헤더를 사용해야 하기 때문에...<br>

실제로 뒤에 나올 구현이 조금 복잡한 컨테이너 클래스들은 `std::swap()`, `std::move()` 를 사용하였습니다.<br>
일단 컨테이너 클래스가 `std::move()` 를 사용하지 못할 경우 시간 상의 손해가 너무 크기에 어쩔 수 없는 선택이었습니다.<br>
Windows + mingw + g++ 에서는 구동 됨을 확인하였지만 다른 OS 혹은 컴파일로에서 동작함을 보장하지는 않습니다.<br>

정말이지 STL 없는 C++은 앙꼬 없는 찐빵입니다.

## 구현[^2]

```c++
template <typename T>
void swap(T& a, T& b) {
  T tmp = a;
  a = b;
  b = tmp;
}

/*
 * Sort all elements in arr[]; range of closed interval [left, right].
 */
template <typename T>
void sort(T arr[], int left, int right) {
  if(left >= right)
    return;

  T pivot = arr[(left+right) / 2];
  int l = left, r = right;

  while (l <= r) {
    while (arr[l] < pivot)
      l++;
    while (arr[r] > pivot)
      r--;
    if (l <= r)
      swap(arr[l++],arr[r--]);
  }

  sort(arr, left, r);
  sort(arr, l, right);
}

template<typename T>
void sort(T* arr, T* end) {
  int l = 0, r = (end - arr) - 1;
  if (l >= r)
    return;
  T pivot = arr[(l + r) / 2];
  while (l <= r) {
    while (arr[l] < pivot)
      l++;
    while (arr[r] > pivot)
      r--;
    if (l <= r)
      swap(arr[l++],arr[r--]);
  }
  sort(arr, arr + r);
  sort(arr + l, end);
}
```

[^2]: [이 블로그]의 코드를 베이스로 작성하였습니다. 코드 보고 이런 말 하면 조금 이상하지만 정말 아름답지 않습니까?

<!-- Links -->
[Github Repo]: https://github.com/LazyRen/Data-Structures
[이 블로그]: https://dpdpwl.tistory.com/46
