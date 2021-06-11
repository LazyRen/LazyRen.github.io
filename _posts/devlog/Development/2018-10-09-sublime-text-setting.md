---
layout: post
title: "Sublime Text 세팅하기"
subtitle: "Sublime Text Packages & Keybindings & Build System Setting"
category: devlog
tags: development mac sublime-text
---

서브라임 텍스트는 맥을 사며 코딩을 시작한 이후부터, 가장 오랫동안 가장 많이 사용해온 텍스트 에디터입니다.<br>
기본 기능은 거의 없다시피 하지만 패키지 컨트롤과 약간의 설정을 더해주면 IDE 못지 않은 편의성을 제공해주기 때문에 매우 편리합니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Package Control Installation

서브라임 텍스트 콘솔(ctrl + `)창에 아래 내용을 복사 & 붙여넣기 하여 실행하면 Package Control이 설치됩니다.

```python
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

이후 `cmd + shift + p` `Package Control: Install Package`를 통해 새로운 패키지들을 설치할 수 있습니다.

## Package Installation

이제부터 Package Control을 이용하여 아래 목록의 패키지들을 설치합니다.<br>
![Package List](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 5.35.56 PM.png)

* [A File Icon](https://packagecontrol.io/packages/A%20File%20Icon)<br>
  사이드바를 더 예쁘게 꾸며주기 위해 사용하는 패키지입니다.

* [All Autocomplete](https://packagecontrol.io/packages/All%20Autocomplete)<br>
  현재 열러있는 모든 파일을 체크하도록 autocomplete의 범위를 확장시킵니다.

* [git](https://packagecontrol.io/packages/Git) & [git gutter](https://packagecontrol.io/packages/GitGutter)<br>
  깃 사용에 도움을 주는 패키지들입니다.

* [Material Theme](https://packagecontrol.io/packages/Material%20Theme)<br>
  몇년 째 사용중인 테마. Darker를 바탕으로 조금의 변경을 가해서 사용중입니다. 다만 개발자가 ST는 이미 deprecated된 텍스트 에디터라며 신랄하게 까고 VSC나 atom 쓰라고 충고해주고 업데이트를 그만둬서... ayu와 같이 괜찮은 다른 테마들도 많습니다. 자신의 취향에 맞는 테마를 쓰는 게 중요하니 여러 테마를 사용해보고 맞는 테마를 찾는 편이 좋습니다.

* [PackageResourceViewer](https://packagecontrol.io/packages/PackageResourceViewer)<br>
  패키지를 커스터마이즈 하기 위해 필요한 패키지입니다. 해당 패키지를 이용해서 패키지가 사용하는 파일들을 열고, 변경할 수 있습니다. 변경한 파일들은 대체로 /packages/user에 들어가는 듯 싶습니다.

* [Project Manager](https://packagecontrol.io/packages/ProjectManager)<br>
  간혹 서브라임 텍스트를 사용하면서 프로젝트 기능을 아예 사용하지 않는 친구들을 보았습니다. 프로젝트 기능은 각 과목 혹은 프로젝트 별로 working directory를 설정하고 별개의 옵션을 주고, 빠른 속도로 전환이 가능한 좋은 builtin 기능입니다. 다만 많은 부분 설정을 하기 위해선 직접 파일에 접근해야하기 때문에 이러한 설정을 조금 더 쉽게 하기 위해 사용하는 패키지입니다.

* [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) & [SublimeLinter-gcc](https://packagecontrol.io/packages/SublimeLinter-gcc)<br>
  코드 린팅을 위한 프로그램. 묻지도 따지지도 말고 설치하는 편이 좋습니다. 각 언어별로 사이드 패키지들이 존재합니다. 필요한 언어별 패키지는 따로 설치하고 세팅하는 것이 좋습니다. 다음은 현재 사용준인 제 세팅입니다.

  ```json
  // SublimeLinter Settings - User
  {
   "debug": true,
   "delay": 0.25,
   "paths": {
    "linux": [],
    "osx": ["/usr/local/var/pyenv/shims/cmakelint"],
    "windows": []
   },
   "linters":
   {
    "gcc": {
     "disable": false,
     // C-specific settings
     "c_executable": "gcc",
     "c_extra_flags": [
      "-fsyntax-only",
      "-std=c99",
     ],
     // C++-specific settings
     "c++_executable": "g++",
     "c++_extra_flags": [
      "-fsyntax-only",
      "-std=c++17",
     ],
     // include_dirs for both C and C++
     "include_dirs": [
      "${project_path}",
      "${project_path}/include",
      "${project_path}/lib",
      "${file_path}",
      "${file_path}/include",
      "${file_path}/lib",
      "${file_path}/../include",
      "${file_path}/../lib",
      "/usr/local/include",
     ],
    },
   },
  }

  ```

* [Trailing Spaces](https://packagecontrol.io/packages/TrailingSpaces)<br>
  라인 끝에 있는 불필요한 공백문자를 체크하고 (설정한다면) 지워주는 패키지. 호불호가 갈리는 패키지인데 개인적으로는 세이브 시마다 불필요한 공백을 지우게 설정하고 사용하고 있습니다.

* [ConvertToUTF8](https://packagecontrol.io/packages/ConvertToUTF8) & [Codecs33](https://packagecontrol.io/packages/Codecs33)<br>
  한국어를 정상적으로 사용하고 싶다면 꼭! 필수적으로 사용해야하는 패키지입니다.

* [SublimeCodeIntel](https://packagecontrol.io/packages/SublimeCodeIntel)<br>
  Code Intelligence Engine인 codeintel을 사용하기 위해 필요한 패키지. 설치 전에 codeintel을 먼저 설치해야하기 때문에 꼭 패키지 내용을 읽고 따라해야합니다.

* [Terminal](https://packagecontrol.io/packages/Terminal)<br>
  현재 파일, 혹은 프로젝트 루프 폴더위치를 터미널로 열어주는 패키지. 이 패키지와 Alfred의 terminal open과 함께라면 터미널에서 불필요한 cd 치고 다니는걸 방지할 수 있습니다. 앞으로 많은 시간을 아껴줄 중요한 패키지입니다.
  기본 keybinding이 cmd+shift+t로 되어 있습니다. 탭 되살리기와 동일하기 때문에 바꾸는 편이 좋습니다. 개인적으로는 cmd+shift+c를 사용하고 있습니다.

* [SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements)<br>
  사이드바에서 추가 액션을 할 수 있도록 도와주는 패키지입니다.

* [MarkAndMove](https://packagecontrol.io/packages/MarkAndMove)<br>
  키보드만으로 multiple selection, modification을 쉽게 도와주는 패키지. mark_and_move_do_it_all을 cmd+e로 두고 사용중인데 매우 편리합니다.

## Settings

### Sublime Text Preferences

`shift + ,`를 통해 나오는 기본 세팅에 다음을 copy & paste 합니다.

<script src="https://gist.github.com/LazyRen/ab276403db99c2b997f6bc85e487269b.js"></script>

아래의 스크립트는 key binding에 copy & paste 합니다.

<script src="https://gist.github.com/LazyRen/7631b90e90e7c45908816555a4e71408.js"></script>

아래 두 파일을 /Users/{USERNAME}/Library/Application Support/Sublime Text 3/Packages/User 에 복사하도록 합니다.
각각 위의 key binding과 합쳐져 super+; 혹은 super+:로 라인의 맨 끝에 `;`, `:`를 붙여주는 역할을 합니다.

[*superEndLineWiSemiColin*](https://gist.github.com/LazyRen/df65d14accce6bb88c1d673731859f57)

[*superEndLineWiColin.sublime-macro*](https://gist.github.com/LazyRen/d104f216e2164a1fe59f9328709867d9)

## Build System Setting

기존에 작성하였던 [포스트](/devlog/sublime-build-and-execute)를 참고하도록 합니다.
