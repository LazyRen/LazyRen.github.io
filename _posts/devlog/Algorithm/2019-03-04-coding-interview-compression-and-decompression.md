---
layout: post
title: "Coding Interview Question: Compression and Decompression"
subtitle: "Compression and Decompression"
category: devlog
tags: algorithm coding-interview
---

![Question]

[문제보기]

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

`number[string]` 의 형태로 압축되어 있는 문자열을 압축 해제하는 것이 목표입니다.<br>
Invalid Input은 주어지지 않는다고 하였기 때문에 `[` 와 `]` 의 갯수가 다르다던지, 문법에 어긋나는 형태의 문자열은 없을거라 가정합니다.

`[` 와 `]` 로 감싸져 있는 `string` 내부에 동일한 형태가 중첩될 수 있기 때문에 재귀 함수를 이용하여 문제를 해결하였습니다.<br>
e.x.) `2[3[a]b]` == `aaabaaab`

문제의 input은 `3[abc]4[ab]c` / `10[a]` / `2[3[a]b]` 와 같은 형태로 주어집니다.<br>
실제 decomp 함수가 해독하기에 앞서 문자열 해독에 일관성을 주기 위하여 주어진 문자열을 `1[]` 으로 감쌌습니다.<br>이는 주어진 문자열을 1번 반복한다는 뜻이기 때문에 최종 결과물에 영향을 주지 않습니다.

```c++
int main()
{
  string inp, ans;

  cin >> inp;
  // inp = "3[abc]4[ab]c";
  // inp = "10[a]";
  // inp = "2[3[a]b]";
  inp = "1[" + inp + "]";
  cout << decomp(inp) << endl;
}
```

e.x) given input `3[abc]4[ab]c` --> `1[3[abc]4[ab]c]`

## 문제 풀이

![CaD example]

decomp() 함수는 한번에 하나의 `[string]` 을 처리합니다. 위의 그림은 주어진 예제 `3[abc]4[ab]c` 를 해결하는 모습을 그린 것 입니다. 화살표마다 decomp() 함수가 실행됩니다.

```c++
string decomp(string str)
{
  size_t pos;
  int prefix;
  int endpt = 0;
  string ret;
  while (true) {
    // cout << str << endl;
    try {
      prefix = stoi(str, &pos);
    } catch (invalid_argument& e) {// cannot find starting number
      // parse string within '[]' or standalone string
      bool isFound = false;
      for (int idx = 0; idx <= str.length(); idx++) {
        if (idx == str.length()) {
          ret += str;
          return ret;
        }
        else if ('0' <= str[idx] && str[idx] <= '9') {//char at idx is number
          ret += str.substr(0, idx);
          str = str.substr(idx);
          isFound = true;
          break;
        }
        else if (str[idx] == ']') {
          if (str[endpt-1] == '[')// empty bracket '[]' handling
            ret += str.substr(0, idx - 2);
          else
            ret += str.substr(0, idx - 1);
          str = str.substr(idx+1);
          isFound = true;
          break;
        }
      }// idx for loop done
      if (isFound)
        continue;
    }// catch (invalid_argument& e) done
    string content = decomp(str.substr(pos+1, findMatchingBracket(str, 0) - pos - 1));
    ret += multiplyString(prefix, content);
    endpt = findMatchingBracket(str, 0);
    str = str.substr(endpt+1);
  }

  return ret;
}
```

decomp 함수가 가장 먼저 하는 일은 prefix number를 파싱하는 작업입니다. 만약 해당 작업이 실패할 경우 (`invalid_argument error`) 현재 파싱하는 문자열이 `number[string]` 꼴이 아닌 [] 내의 문자열 이거나 standalone 문자열일 것 입니다.<br>@ standalone string 이란?<br>편의상 붙인 이름으로 `2[3[a]b]` 에서 마지막 `b` / `1[ab]cde2[fg]` 에서 가운데 있는 `cde`  같은 문자열들을 의미합니다.

1. prefix number 파싱 성공<br>숫자 파싱에 성공하였다는 것은 현재의 문자열의 `number[string]` 꼴을 띄고 있다는 것을 의미합니다.<br>`string content = decomp(str.substr(pos+1, findMatchingBracket(str, 0) - pos - 1));` 라인을 통해 `[string]` 에서 string에 해당하는 부분을 재귀적으로 파싱합니다. 이때 파싱한 string은 앞서 받아온 prefix number 만큼 반복되어 리턴 값에 추가 됩니다.<br>하나의 string 내의 여러 부분 string을 파싱하기 위해 일련의 과정은 while문 내에 존재합니다.
2. prefix number 파싱 실패 (== string parsing)<br>`invalid_argument error`를 통해 파싱이 실패하였을 경우 문자열 파싱을 진행합니다.<br>앞서 설명한 두가지 꼴 ([] 내의 문자열 이거나 standalone 문자열) 인 경우를 구분하여 파싱을 진행합니다.

### Corner Cases

* `100[a]`<br>aaaaaaaaa.... a 100개
* `a[]b`<br>ab
* `2[1[a]0[cd]2[efg]]`<br>aefgefgaefgefg
* standalone string
  * `3[abc]4[ab]c`<br>abcabcabcababababc
  * `2[hij]klm3[nop]`<br>hijhijklmnopnopnop

### 기타 함수

#### multiplyString() 함수

```c++
string multiplyString(int times, string str)
{
  string ret;
  for (int i = 0; i < times; i++)
    ret += str;
  return ret;
}
```

#### findMatchingBracket() 함수

```c++
/*
 Assume there is no invalid input, finds ']' that matches to the
 first '[' from the given start index.
*/
int findMatchingBracket(string str, int start)
{
  int left = 0, right = 0;
  for (int i = start; i < str.length(); i++) {
    if (str[i] == '[') {
      left++;
    } else if (str[i] == ']') {
      right++;
      if (left == right)
        return i;
    }
  }
  return -1;
}
```

<!-- Links -->
[문제보기]: https://techdevguide.withgoogle.com/resources/former-interview-question-compression-and-decompression "Former interview question: compression and decompression"
[Question]: /assets/img/2019-03-04/question.png
[CaD example]: /assets/img/2019-03-04/CaDexample.jpeg
