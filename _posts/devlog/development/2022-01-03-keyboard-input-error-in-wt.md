---
layout: post
title: "윈도우 터미널(WT)에서 키보드 인풋이 단어 단위로 입력될 때 해결법"
subtitle: "Keyboard Input is Buffered in Windows Terminal"
category: devlog
tags: development windows terminal
image:
  path: /assets/img/2022-01-03/input_buffered.gif
---

마소에서 제공하는 [Windows 터미널]에 [WSL2]를 설치해서 잘 쓰나 싶었는데 위 gif와 같이 모든 키보드 인풋이 단어 단위로 입력되는 기이한
현상을 겪었습니다. 생각보다 오랜 웹 서칭 끝에 [해결법]을 찾아 공유해드립니다.

[Windows 터미널]: https://docs.microsoft.com/ko-kr/windows/terminal/
[WSL2]: https://docs.microsoft.com/ko-kr/windows/wsl/
[해결법]: https://github.com/microsoft/terminal/issues/8877

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## TL;DR

**한컴 입력기**<sup>Input Method Editor</sup>와 WT 간의 호환성 문제입니다.<br>
한컴 입력기를 제거하고 **Microsoft 입력기**를 사용하면 문제가 해결됩니다.

## 한컴 입력기 삭제 하는 방법

윈도우 11 기준이므로 이전 버전들에서는 조금씩 다를 수 있습니다.
{:.note}

1. `윈도우 설정` ➜ `시간 및 언어` ➜ `언어 및 지역`에 들어갑니다.
   ![step1](/assets/img/2022-01-03/step1.png)
2. `언어` 중 `한국어`를 찾아 오른쪽 끝에 위치한 더보기 아이콘**⋯**을 클릭해 `언어 옵션`을 선택합니다.
   ![step2](/assets/img/2022-01-03/step2.png)
3. `키보드` 에서 `한컴 입력기`를 찾아 더보기 아이콘을 클릭해 `삭제` 합니다.[^1]
   ![step3](/assets/img/2022-01-03/step3.png)

* [Windows Terminal Issue #8877](https://github.com/microsoft/terminal/issues/8877)
{:.note title="출처"}

*[WT]: Windows Terminal
[^2]: 저는 이미 삭제하여 `한컴 입력기`가 없어 `Microsoft 입력기`로 예시를 만들었습니다.
