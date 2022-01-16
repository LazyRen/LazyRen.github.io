---
layout: post
title: "C++ 이진 탐색/이분 탐색(Binary Search)"
subtitle: "C++ Binary Search"
category: devlog
tags: algorithm
image:
  path: /assets/img/2020-08-17/soju.jpg
---

> 병뚜껑 치기 후에는 업 앤 다운이 국룰입니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 이진 탐색이란

이진 탐색은 **정렬된** 배열 내에서 데이터를 *(log<sub>2</sub>N)*의 시간 내에 찾을 수 있는 검색 알고리즘입니다.<br>
데이터가 **정렬**되어 있어야 한다는 기저 조건이 붙지만, 시간 복잡도가 *O(log<sub>2</sub>N)* 밖에 안되기 때문에 매우 유용하게 사용됩니다.<br>

뿐만 아니라 생각보다 많은 면접에서 '이진 탐색을 A4용지에 손코딩으로 구현해 보세요.' 라는 문제를 내기도 하는 단골 출제 유형이기도 합니다.<br>
(실제로 취준생 때 4곳의 면접 중 2번이나 이진 탐색 구현을 요청 받았습니다.)<br>

아마 많은 분들이 실제 이론을 접하지 못했더라도, 술게임 *업 앤 다운*을 하면서 본능적으로 사용하셨을 겁니다.<br>
1~50 사이의 숫자가 적혀 있는 소주 병뚜껑의 번호를 맞추는 데에는 (트롤이 없다는 가정하에) 6번 안에 무조건 숫자를 맞출 수 잇습니다.

## 이론

이론은 매우 간단합니다.<br>
주어진 범위의 중앙값과 찾으려는 값을 비교해서, 둘이 같다면 값이 존재하는 것이고,<br>
찾으려는 값이 중앙값보다 작다면 범위를 왼쪽 절반으로 한정시켜 다시 중앙값과 비교하고,<br>
찾으려는 값이 중앙값보다 크다면 범위를 오른쪽 절반으로 한정시켜 비교를 진행합니다.<br>

한 번의 비교 연산으로 범위가 절반으로 줄어들기 때문에 *O(log<sub>2</sub>N)*이 됩니다.<br>
즉, 크기가 1,000,000,000(10억)인 배열에서 원하는 값의 존재 여부를 찾는데 30번의 비교 연산밖에 안걸립니다.

## 구현

```c++
/*
  If data 'x' exists within the given array, return true.
  Else return false.
*/
template <typename T>
bool binary_search(T arr[], int left, int right, const T& x) {
  int l = left, r = right;
  while (l <= r) {
    int m = (l + r) / 2;  // Use r - ((r - l) / 2) to prevent overflow
    if (arr[m] == x)      // Number Found
      return true;
    else if (arr[m] < x)
      l = m + 1;          // Search for upper half
    else
      r = m - 1;          // Search for lower half
  }
  return false;           // Number Not Found
}

template<typename T>
bool binary_search(T* arr, T* end, const T& x) {
  int l = 0, r = (end - arr) - 1;
  while (l <= r) {
    int m = (l + r) / 2;  // Use r - ((r - l) / 2) to prevent overflow
    if (arr[m] == x)      // Number Found
      return true;
    else if (arr[m] < x)
      l = m + 1;          // Search for upper half
    else
      r = m - 1;          // Search for lower half
  }
  return false;           // Number Not Found
}
```
