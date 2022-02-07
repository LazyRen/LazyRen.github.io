---
layout: post
title: "VSCode 익스텐션 추천 리스트"
subtitle: "Recommended VSCode Extension List"
category: devlog
tags: development vscode
image:
  path: /assets/img/2021-06-28/vscode.png
---

[VS Code]는 이미 text editor 프로그램의 *de facto standard*가 되어 버렸습니다. ~~R.I.P Sublime Text~~<br>
강력한 익스텐션들과 함께 사용할시 text editor를 벗어나 IDE에 가까운 모습을 보이면서도 가볍고, Mac/Windows/Linux 등 플랫폼을 가리지 않고
사용되는 모습을 보면 각성한 마이크로스프트 사가 얼마나 무서운지 보여주는 것 같습니다.

오늘은 VS Code를 최대한 잘 활용하기 위해서 필요한 추천 익스텐션 리스트를 알아볼까 합니다.<br>

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

제가 생각하기에 **필수 익스텐션** :pushpin:과, *추천 익스텐션* :heart:들이 강조되어 있으니 참고 부탁드립니다.<br>
강조되지 않았다고 필요 없는 익스텐션은 아닙니다. 특히 마이크로스프트가 자체적으로 배포하는 익스텐션들은 너무나 당연하게 추가하고 잊으면 되는
익스텐션인지라 오히려 강조하지 않았습니다.
{:.note title="들어가기에 앞서..."}

# Common

VS Code 전반에서 사용되는 추가 기능이나, UI 요소와 관련된 익스텐션들입니다.

## Extra Feature

VS Code에 새로운 기능을 추가하는 익스텐션들입니다.<br>
거의 대부분이 필수이거나 추천 익스텐션들이네요. 한번 읽어보시고 전부 설치하는걸 추천드립니다.<br>
기능들을 너무 당연하게 사용하다보니 리스트를 적으면서 *'아 이걸 따로 설치해야하는거였어?'* 라는 생각이 드네요.

### [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) :pushpin:

![Bookmarks](/assets/img/2021-06-28/bookmark-toggle.gif)

코드(파일)의 특정 부분을 북마크에 저장하고 빠르게 이동할 수 있도록 해주는 익스텐션입니다.

* Bookmarks: Jump to Previous (⌘ ⌥ J)
* Bookmarks: Toggle (⌘ ⌥ K)
* Bookmarks: Jump to Next (⌘ ⌥ L)

외의 여러가지 기능을 제공합니다.

### [Bracket Select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select) :heart:

![Bracket Select](/assets/img/2021-06-28/bracket-select.gif)

`()` / `{}` / `[]` / `""` / `''` 내의 내용을 단축키로 전부 선택할 수 있게 해주는 익스텐션입니다.

* BraSel: Select (⌥ A)
* BraSel: UndoSelect (⌥ Z)

### [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) :pushpin:

![Code Spell Checker](/assets/img/2021-06-28/code-spell-checker.gif)

제 블로그는 물론이고 HANA DB와 같이 많은 프로그래머가 참여하고,
코드 리뷰를 진행하는 production 레벨의 코드에도 정말 많은 오타가 숨어 있었습니다. (특히 주석에...)<br>
이 익스텐션을 사용하면 코드 작성시 오타를 확실하게 잡을 수 있습니다.
(덤으로 기존 코드의 오타 수정도 하지 않고는 못 베기게 되는 문제가 발생합니다.)<br>

기존 사전에 없는 단어라 할지라도 `Add word to Dictionary` 명령어를 통해 추가할 수 있습니다.
{:.note}

### [Diff](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-diff)

![Diff](/assets/img/2021-06-28/diff.gif)

빠르게 두 파일 간의 `diff`를 할 수 있습니다.

### [Diff Folders](https://marketplace.visualstudio.com/items?itemName=L13RARY.l13-diff)

![Diff Folders](/assets/img/2021-06-28/diff-folders.png)

위의 익스텐션과는 다르게 **폴더** 간의 `diff`를 보여주는 익스텐션입니다.<br>
블로그 업데이트 할 때에 요긴하게 사용하고 있습니다.

### [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) :pushpin:

![Git History](/assets/img/2021-06-28/git-history.gif)

`git log`를 VS Code내에서 보여주는 익스텐션입니다. 이외에도 file history 보기 등 여러가지 기능이 있습니다.

### [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) :pushpin:

![GitLens](/assets/img/2021-06-28/gitlens.png)

Git을 사용하여 코드 버전 관리를 하고 있다면 **필수**로 설치해야 하는 익스텐션입니다.

파일 변경 내역 확인, 버전별 diff, commit 변경 사항 확인, line blame 등등 정말 많은 기능을 제공합니다.<br>
워낙 좋은 기능들이 많기 때문에 설치하고 사용법도 한번 정독하시기를 권장드립니다.

`Current Line Blame` 옵션을 킬 경우 `word wrap` [옵션이 적용이 안되는 버그](https://github.com/Axosoft/vscode-gitlens/issues/443)가 있습니다.<br>
`word wrap` 옵션을 켜서 수평 스크롤을 없애기 원하는 분들은 `"gitlens.currentLine.scrollable": false` 세팅을 추가하여 해결할 수 있습니다.
(대신 `current line blame`이 짤려서 출력됩니다.)
{:.note}

### [Multiple clipboards for VSCode](https://marketplace.visualstudio.com/items?itemName=slevesque.vscode-multiclip)

복사-붙여넣기에 여러 기능들을 추가해주는 익스텐션입니다. `Multiclip List Buffer`를 새롭게 key binding 시켜서
이전에 복사했던 내용을 붙여넣을때 자주 사용하고 있습니다.

#### Commands

* Copy (Cmd+c on OSX or Ctrl+c on Windows and Linux)
* Merge-Copy (Cmd+Shift+c on OSX or Ctrl+Shift+c on Windows and Linux)
* Cut (Cmd+x on OSX or Ctrl+x on Windows and Linux)
* Merge-Cut (Cmd+Shift+x on OSX or Ctrl+Shift+x on Windows and Linux)
* Select clipboard to paste (Cmd+Alt+v on OSX or Ctrl+Alt+v on Windows and Linux)
* Paste and cycle through clipboard items (Cmd+Shift+v on OSX or Ctrl+Shift+v on Windows and Linux)

### [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

![Path Intellisense](/assets/img/2021-06-28/path-intellisense.gif)

파일명 자동완성을 지원하는 익스텐션입니다.

### ~~[Polacode-2020](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.polacode-2019)~~ [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) :heart:

![Path Intellisense](/assets/img/2021-06-28/polacode.gif)

코드 스크린샷을 찍어주는 익스텐션입니다.

~~기존 Polacode가 동작하지 않기 때문에 Polacode-2020을 받으셔야합니다.~~<br>
이젠 Polacode-2020도 동작하지 않으니 [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)을 사용해보세요.
{:.note title="Warning}

### [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) :pushpin:

![Project Manager](/assets/img/2021-06-28/project-manager.png)

왜 이 익스텐션은 VS Code에 default feature가 아닐까 의문이 드는 **필수 중의 필수** 익스텐션입니다.<br>
`Working Directory`를 프로젝트로 저장하여 빠르게 스위칭할 수 있도록 도와줍니다.

* Project Manager: List Projects to Open (⌘ ⌥ P)
* Project Manager: Save Project
* Project Manager: Edit Projects

### [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) :pushpin:

![Remote Development](/assets/img/2021-06-28/remote-development.gif)

로컬에서만 작업한다면 필요없지만, 서버에 접속(ssh)하여 개발해야하는 환경이라면 **필수**인 익스텐션입니다.
처음 설정이 조금 필요하지만 이후에는 간단히 `Project Manager`와 함께 사용하여 로컬에서 개발하듯 개발 할 수 있습니다.

### [Sort lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines) :heart:

![Sort Lines](/assets/img/2021-06-28/sort-lines.gif)

선택한 라인들을 정렬해주는 익스텐션입니다. 의외로(?) 종종 쓰입니다.

### [TabOut](https://marketplace.visualstudio.com/items?itemName=albert.TabOut) :heart:

![TabOut](/assets/img/2021-06-28/tab-out.gif)

따움표와 괄호에서 `tab`키로 빠져나오게 해줍니다.<br>
왜 이게 기본 기능이 아니라 익스텐션을 설치해야되는걸까요?

### [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) :heart:

![Trailing Spaces](/assets/img/2021-06-28/trailing-spaces.gif)

`trailing space`(줄 뒤의 공백 문자)들을 하이라이트 해줍니다.<br>
생각보다 많은 사람들이 불필요한 공백 문자에 대해 신경을 안 쓰는데, 이거 은근히 `diff` 뜰때나 코드 볼 때 거슬립니다...<br>
가능하면 `"files.trimTrailingWhitespace": true` 설정을 추가해서 저장할 때 불필요한 공백 문자들을 제거하는게 좋다고 생각합니다.<br>
~~대신 그러고나면 line blame이 나에게 오지...~~

<details>
<summary>추천 파일 관련 설정</summary>
<div markdown="1">
```json
"files.autoGuessEncoding": true,
"files.insertFinalNewline": true,
"files.trimFinalNewlines": true,
"files.trimTrailingWhitespace": true,
```
</div>
</details>

## UI

### [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) :heart:

![Better Comments](/assets/img/2021-06-28/better-comments.png)

주석에서 `todo` 등 설정한 키워드를 하이라이트 해주는 익스텐션입니다.

<details>
<summary>추천 설정</summary>
<div markdown="1">
```json
"better-comments.tags": [
    {
        "tag": "!",
        "color": "#FF80AB",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "*!",
        "color": "#FF80AB",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "warning",
        "color": "#FF80AB",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "* warning",
        "color": "#FF80AB",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "?",
        "color": "#82B1FF",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "*?",
        "color": "#82B1FF",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "todo",
        "color": "#FF9E80",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "* todo",
        "color": "#FF9E80",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "note",
        "color": "#F4FF81",
        "strikethrough": false,
        "backgroundColor": "transparent"
    },
    {
        "tag": "* note",
        "color": "#F4FF81",
        "strikethrough": false,
        "backgroundColor": "transparent"
    }
],
```
</div>
</details>

### [TODO Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

![TODO Tree](/assets/img/2021-06-28/todo-tree.png)

프로젝트 내에서 `TODO`나 `FIXME` 등의 주석을 찾아 트리 형태로 나타내 주는 플러그인입니다.

### ~~[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)~~ :pushpin:

![Bracket Pair Colorizer 2](/assets/img/2021-06-28/bracket-pair-colorizer.png)

~~매칭되는 괄호를 색칠해주는 익스텐션입니다.~~

<details>
<summary>추천 설정</summary>
<div markdown="1">
```json
"bracket-pair-colorizer-2.colors": [
    "#F4FF81",
    "#84FFFF",
    "#B388FF",
    "#FF80AB",
    "#CCFF90",
    "#EA80FC",
    "#FF9E80"
],
"bracket-pair-colorizer-2.activeScopeCSS": [
    "backgroundColor : {color}",
    "opacity: 0.3"
],
"bracket-pair-colorizer-2.scopeLineCSS": [
    "borderStyle : solid",
    "borderWidth : 2px",
    "borderColor : {color}",
    "opacity: 0.7"
],
"bracket-pair-colorizer-2.highlightActiveScope": true,
"bracket-pair-colorizer-2.showBracketsInGutter": true,
```
</div>
</details>

기존 Bracket Pair Colorizer에 존재하던 성능 이슈를 해결하기 위해
[2021 August Update](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization)부터
VS Code에 기본으로 Bracket Pair Colorization이 추가되었습니다.<br>
기존 익스텐션을 삭제하고 아래 설정을 적용하는 것을 권장드립니다.
{:.note}

<details>
<summary>Built-in bracket colorization 설정</summary>
<div markdown="1">
```json
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs": true,
"editor.guides.highlightActiveIndentation": true,
"editor.guides.indentation": true,
"workbench.colorCustomizations": {
    "editorIndentGuide.activeBackground": "#F4FF81",
    "editorBracketHighlight.foreground1": "#F4FF81",
    "editorBracketHighlight.foreground2": "#84FFFF",
    "editorBracketHighlight.foreground3": "#B388FF",
    "editorBracketHighlight.foreground4": "#F78C6C",
    "editorBracketHighlight.foreground5": "#CCFF90",
    "editorBracketHighlight.foreground6": "#EA80FC",
    "editorBracketHighlight.unexpectedBracket.foreground": "#FF80AB",
},
```
</div>
</details>

### [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

![Color Highlight](/assets/img/2021-06-28/color-highlight.png)

파일에서 css/web 색상이 발견되면 색칠해줍니다.

### [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) :pushpin:

![Error Lens](/assets/img/2021-06-28/error-lens.png)

워닝이나 에러 메시지를 인라인으로 표시해주는 익스텐션입니다. 가독성이 좋고 에러 메시지를 바로 확인할 수 있어 매우 유용합니다.

### [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) :heart:

![One Dark Pro](/assets/img/2021-06-28/one-dark-pro.png)

One Dark Pro Flat Theme
{:.figcaption}

현재 사용중인 Theme 입니다. 이전에는 [Material Theme]을 사용했었습니다.

~~눈이 침침해서~~ 주석 밝기를 조금 더 밝게 하는 편이 가독성이 좋은 것 같아 아래 설정을 추가해서 사용중입니다.

<details>
<summary>settings.json</summary>
<div markdown="1">
```json
"editor.tokenColorCustomizations": {
    "comments": "#777777"
},
```
</div>
</details>

[Material Theme]: https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme

### [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) :heart:

파일 확장자 별 아이콘들과 폴더 아이콘들을 새롭게 추가해주는 익스텐션입니다.

<details>
<summary>아이콘 미리보기</summary>
<div markdown="1">
![Material Icon Theme](/assets/img/2021-06-28/material-icon-theme.png)
</div>
</details>

# Programming Language Specific

특정 언어와 관련된 익스텐션들입니다. 웹(HTML/Javascript etc.) 관련은 제 전문 분야가 아닌지라 일부러 제외하였습니다.<br>
~~실제로 설치한 익스텐션도 몇 개 없어서요...~~

## [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

기본 언어 지원 익스텐션입니다.

### [C/C++ Compile Run](https://marketplace.visualstudio.com/items?itemName=danielpinto8zz6.c-cpp-compile-run)

C/C++ 파일 하나를 빠르게 컴파일/실행 할때 유용한 프로그램입니다. 학부 시절엔 항상 썼었는데 요새는 쓸 일이 없네요...

### [C/C++ Themes](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes)

C/C++ 전용 syntax highlight라고 합니다.

### [CCLS](https://marketplace.visualstudio.com/items?itemName=ccls-project.ccls) :heart:

function reference/hierarchy 등을 지원합니다. 처음 설정이 조금 복잡하지만 큰 프로젝트를 진행할때에 많은 도움이됩니다.<br>
(코드 네비게이션이 쉬워집니다.)

### [Clang-Format](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format) / [Clang-Tidy](https://marketplace.visualstudio.com/items?itemName=notskm.clang-tidy)

Clang-Format이나 Clang-Tidy를 사용해서 coding convention을 맞춰줍니다.

### [Colonize](https://marketplace.visualstudio.com/items?itemName=vmsynkov.colonize) & [Ctrl-Semicolon](https://marketplace.visualstudio.com/items?itemName=Gforcedev.ctrl-semicolon) :heart:

C/C++ 코딩하면서 줄 마지막으로 가서 `;` 치는게 귀찮은게 저만은 아니겠죠?<br>

`Colonize`는 `ctrl/alt/shift + enter`를 사용하는 키 바인딩을 제공하고 `Ctrl-Semicolon`은 이름 그대로 `ctrl (+ shift) + ;`를 사용하는 키 바인딩을 제공합니다. 취향에 맞춰서 사용하시면 됩니다.

### [Doxygen](https://marketplace.visualstudio.com/items?itemName=bbenoist.Doxygen) / [Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen) :heart:

![Doxygen Documentation Generator](/assets/img/2021-06-28/doxygen-documentation.gif)

[Doxygen](https://www.doxygen.nl/index.html)을 사용해서 프로젝트 문서화를 진행한다면 필수적인 익스텐션들 입니다.

### [CMake](https://marketplace.visualstudio.com/items?itemName=twxs.cmake) & [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

프로젝트에서 `CMake`을 사용한다면 추가해야할 익스텐션입니다.

## [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

기본 언어 지원 익스텐션입니다.

### [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)

추가적인 기능을 제공하는 언어 지원 익스텐션입니다.

### [Python Indent](https://marketplace.visualstudio.com/items?itemName=KevinRose.vsc-python-indent)

![Doxygen Documentation Generator](/assets/img/2021-06-28/python-indent.gif)

Indentation은 중요한 문제니까요.

## [Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)

기본 언어 지원 익스텐션입니다. 다만, 이 익스텐션 대신 아래의 `rust-analyzer`를 사용하기를 추천드립니다.

### [Rust Syntax](https://marketplace.visualstudio.com/items?itemName=dustypomerleau.rust-syntax)

language syntax 지원 익스텐션입니다.

### [Rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer) :pushpin:

언어 지원 익스텐션입니다. Official Rust 언어 지원 익스텐션과 둘 중 하나만 설치하셔서 사용하시면 됩니다.

### [Crates](https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates) :pushpin:

![Crates Update](/assets/img/2021-06-28/crate-update.gif)

`crates.io` dependencies checking에 유용한 익스텐션입니다.

## Markdown

### Github Markdown Preview

![Markdown Preview](/assets/img/2021-06-28/markdown-preview.png)

작성한 마크다운을 바로 preview 할 수 있게 도와주는 익스텐션입니다. 근데 마크다운에 익숙해져서 잘 쓰지는 않네요...

### [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) :heart:

마크다운 문법이 워낙 관대하다 보니 파일마다 convention이 다른 경우가 한두번이 아닙니다. 개인적으로 마크다운 문서를 작성한다면 필수라고 생각합니다.

필요없는, 혹은 해당되지 않는 워닝들은 무시하도록 설정할 수 있습니다. ([Markdownlint Rule] 참고)

[Markdownlint Rule]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md

<details>
<summary>settings.json</summary>
<div markdown="1">
```json
"markdownlint.config": {
    "MD024": { "siblings_only": true },
    "MD025": false,
    "MD026": false,
    "MD029": false,
    "MD033": false,
    "MD036": false,
    "MD046": false,
    "MD047": false
},
```
</div>
</details>

## Others

### [Better Shell Syntax](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-shellscript-syntax)

shell code syntax를 지원하는 익스텐션입니다.

### [Better TOML](https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml)

`TOML` 파일 syntax를 지원하는 익스텐션입니다.

# 마치며

이상으로 VS Code 추천 익스텐션에 대해 알아보았습니다.<br>
꽤나 긴 리스트지만 VS Code 자체적으로 [Setting Sync]를 제공하는 만큼,
처음 한번만 제대로 설정해주면 다음부터는 신경쓰지 않고 자동으로 새로운 환경에서도 설정 적용이 가능합니다.
참고하시어 자신에게 맞는 개발 환경을 구축할 수 있으면 좋겠습니다.<br>
이외에도 좋은 익스텐션이 있다면 댓글로 공유해주시면 감사하겠습니다.

<!-- Links & Abbreviation -->
[VS Code]: https://code.visualstudio.com
[Setting Sync]: https://code.visualstudio.com/docs/editor/settings-sync
*[IDE]: Integrated Development Environment, 통합 개발 환경
