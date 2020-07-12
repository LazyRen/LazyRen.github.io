---
layout: post
title:  "Mac Sublime Text C/C++/Python Build & Execute"
subtitle:   "Mac Sublime Text C/C++/Python Build & Execute"
category: devlog
tags: development mac sublime-text
---

서브라임 텍스트에서 C/C++/Python 빌드 / 실행 시키는 sublime-build 코드들은 쉽게 찾을 수 있지만 이들의 문제는 해당 프로그램이 루트 디렉토리에서 실행된 다는 것입니다.<br>
코딩하다보면 상대경로가 월등히 편한경우가 많아 상대경로를 사용하도록 프로그램을 짰을 경우 이런 사소한 점이 큰 불편을 초래합니다.<br>
그래서 쉘 스크립트와 ST의 빌드 시스템을 이용하여 컴파일 이후 프로그램이 위치한 폴더를 현재경로로 설정하여 프로그램이 실행하도록 만들었습니다.<br>

<!--more-->

[c_cmd.sh](https://gist.github.com/LazyRen/da3cac957c5e203d99605b0815ca5ff8)<br>
[cpp_cmd.sh](https://gist.github.com/LazyRen/6e33fb372bf19c171f4b722cc2d90dd5)<br>
[python_cmd.sh](https://gist.github.com/LazyRen/4e3a89ac10dcac82ebaaadade445c659)<br>

해당 .sh 파일을 원하는 위치에 저장하신 후 (`/Users/사용자명/Library/Application Support/Sublime Text 3/Packages/User` 를 추천드립니다.<br>
ST가 자체적으로 관리하는 user config.를 모아놓은 곳입니다.)

![New Build System](/assets/img/2018-08-23/build_system.png)

ST의 new build system에 아래 내용을 붙여넣으시면 됩니다. (혹은 위의 경로에 집어넣으셔도 됩니다.)<br>

[C cmd.sublime-build](https://gist.github.com/LazyRen/ab6d6d63eb19767e6b932c47847604db)<br>
[C++ cmd.sublime-build](https://gist.github.com/LazyRen/7c85044220d324bdf405e93405b41f84)<br>
[Python cmd.sublime-build](https://gist.github.com/LazyRen/1bb565bc42560a921af3fb63300b56f8)<br>

주의하실 점은 해당 sublime-build에서<br>

```shell
sh /Users/LazyRen/Documents/Programming/c_cmd.sh
```

이부분을

```shell
sh /sh파일/저장하신/경로/sh파일명
```

으로 바꾸셔야합니다.
