---
layout: post
title: "Mac 클린 설치 이후 개발 환경 구축/세팅 하기"
subtitle: "앱 / 터미널 세팅하기"
category: devlog
tags: development mac terminal
---

Mac osX은 매년 메이저 업데이트가 진행되며 올해에도 9월 25일에 High Sierra 에서 Mojave로 새로운 버전이 출시되었습니다. 기존의 OS에서 포멧 후 클린 설치를 하지 않는 업그레이드 기능을 지원하며 해당 기능을 통해 업데이트를 진행하는 것이 매우 간단하지만 그럼에도 불구하고 메이저 업데이트는 메이저 업데이트인지라 종종 예상치 못한 곳에서 해결하기 쉽지 않은 오류들을 생성해 내곤 합니다.

그렇기에 이러한 문제를 미연에 방지하고자 많은 맥 사용자들이 메이저 업데이트가 배포될 때마다 포멧후 클린 설치를 진행하곤 합니다. 저 또한 이러한 부류에 속하는 편인데 올해에는 귀찮음을 견디지 못하고 약 한달간 업데이트 상태에서 지속적으로 사용해 오다가 오늘 큰 마음을 먹고 포멧 후 재설치를 진행하였습니다.

앞으로도 매년 이러한 현상은 반복될 것이기에 무엇보다 미래의 귀찮음과 반복작업을 줄이기 위하여 이번 포스트를 마련해 보았습니다. 포멧 후 완벽하게 깨끗한 상태에서부터 어떠한 과정을 통해 다시 개발환경을 세팅할 것인지, 미래의 나를 위한 가이드라인입니다.

하지만 그 가이드라인이 사용된 적은 없었다고 합니다.
{:.note title="미래로부터의 메시지"}

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 시작하기에 앞서

백업은 항상 필수입니다! 물론  google drive, dropbox 혹은 git을 통해 많은 데이터가 저장되어 있지만 그럼에도 불구하고 일년 이상 사용해온 맥북은 귀중한 많은 자료들을 가지고 있습니다. 나중에 포멧후에 자료가 어디갔는지 한참을 찾다가 땅을 치며 후회해도 이미 때는 늦습니다. 꼼꼼하게 놓친 자료는 없는지, 혹은 재설치 후 진행할 세팅 파일(zshrc, vimrc, *.sublime-settings 등)들은 다 챙겼는지 확인하여야 합니다.

## Clean Installation

인터넷에 많은 자료들이 있기때문에 자세한 내용은 생략하겠습니다. 요새는 윈도우와 맥 모두 booting usb를 만드는데 큰 어려움이 없어 더더욱 그렇습니다. 옛날옛적 설치용 윈도우 CD를 굽고 애지중지 보관하던 시절이 있었는데 말이죠...

## After Installation

1. 맥 설정 변경
2. 백업  자료 복구
3. App Store를 통한 앱 다운로드
4. 인터넷을 통한 앱 다운로드
5. Terminal & Brew 설정
6. Sublime Text 환경 설정

순으로 진행하겠습니다.

## 맥 설정 변경

* 가장 먼저 진행할 것은 [한영전환 키 변경](http://macnews.tistory.com/3736)입니다.
  기존의 control + space, 혹은 TABS 키보다는 **shift+space**가 손 모양을 유지한 상태에서 가장 빠르게 한영전환을 진행하기 쉬우며 이후 linux에서도 동일한 키 세팅을 하여 사용하는 것이 가장 쉽게 느껴집니다. (기존이 편하신 분들은 굳이 변경하실 필요가 없습니다.)

  1.  메뉴 > 시스템 환경설정 > 키보드 > 단축키 탭으로 이동한 다음  입력 소스 단축키를 다음과 같이 변경합니다.
     ![keyboard_setting](/assets/img/2018-10-09/Screen Shot 2018-10-08 at 3.18.34 PM.png)
  2. 파인더에서 command + shift + G 키를 사용하여 `~/Library/Preferences/` 로 이동하여 `com.apple.symbolichotkeys.plist` 파일을 엽니다.
  3. `61`을 찾아 해당 키의 파라미터 중 1048576을 찾아 **131072**로 변경합니다.
  4. 재시작 혹은 사용자 계정에서 로그아웃한 후 다시 로그인 하여 변경사항을 적용시킵니다.

* [Home Folder 이름 변경](https://support.apple.com/en-us/HT201548)<br>
  단순히 홈 폴더 이름에 대문자를 섞고 싶어서 진행했습니다. 루트 디렉토리의 이름이 바뀌는 것이기 때문에 가능하면 설치 직후에 진행하는 것이 좋습니다.

* 파인더의 설정 변경<br>
  Advanced 탭에서 파일 확장자 보기와 검색 진행을 현재 폴더로 변경합니다.<br>Download 폴더에서  `⌘` + `J` (`View` > `Show View Options`)를 선택한 후 Group By: Data Added, Sort by: Name으로 설정합니다.

* [스크린샷 저장 위치 변경](http://macnews.tistory.com/3188)<br>
  터미널에 아래 명령어를 입력합니다. {경로 ex)  `/Users/LazyRen/Pictures/ScreenShot`}

    ```shell
    defaults write com.apple.screencapture location 경로 && killall SystemUIServer
    ```

* Dashboard 사용안함

  ```shell
  defaults write com.apple.dashboard mcx-disabled -boolean YES
  killall Dock
  ```

* key hold 시 반복

  ```shell
  defaults write -g ApplePressAndHoldEnabled -bool false
  ```

* [한글에서도 ₩ 대신 \` 사용하기](https://gist.github.com/redism/43bc51cab62269fa97a220a7bb5e1103)<br>
  터미널에서 아래의 명령어를 실행시킵니다.

  ```sh
  if ! [ -f ~/Library/KeyBindings/DefaultkeyBinding.dict ]; then mkdir -p ~/Library/KeyBindings && echo '{"₩" = ("insertText:", "\`");}' > ~/Library/KeyBindings/DefaultkeyBinding.dict; fi
  ```

  이후 재실행시 설정이 적용됩니다.

* [로그인시 Other... 삭제](https://apple.stackexchange.com/questions/232449/remove-other-from-login-screen)

  ```shell
  sudo defaults write /Library/Preferences/com.apple.loginwindow SHOWOTHERUSERS_MANAGED -bool FALSE
  ```

* [cmd+ctrl+d Dictionary 실행 제거](https://apple.stackexchange.com/questions/22785/how-do-i-disable-the-command-control-d-word-definition-keyboard-shortcut-in-os-x)

  ```shell
  defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 70 '<dict><key>enabled</key><false/></dict>'
  ```

* System Preferences
  * General<br>
    Show scroll bars: Always<br>
    Ask to keep changes when closing documents : True<br>
  * Dock<br>
    Prefer tabs when opening documents: Always<br>
    Automatically hid and show Dock: True<br>
    Show recent applications in Dock: False<br>
  * Mission Control<br>
    Automatically rearrange Spaces based on most recent use: False<br>
  * Language & Region<br>
    Set English as Primary(place it on the top)<br>
  * Accessibility<br>
    * Mouse & Trackpad<br>
      Trackpad Options...<br>
      **Enable dragging with drag lock** 설정시 드래그 도중 손을 떼어도 드래그가 해체되지 않습니다.<br>
  * Security & Privacy - General<br>
    Show a message when the screen is locked : True<br>
  * Bluetooth<br>
    Show Bluetooth in menu bar : True<br>
  * Keyboard<br>
    * Keyboard<br>
      Touch Bar shows F1, F2, etc. Keys<br>
      Press Fn key to Show Control Strip<br>
    * Text<br>
      All set to False<br>
    * Shortcuts<br>
      Full Keyboard Access: All controls<br>
      * Mission Control<br>
        Switch to Desktop x : Enable<br>
      * Spotlight<br>
        Disable all (use Alfred instead)<br>
  * Trackpad<br>
    * Point & Click<br>
      All set to True<br>
    * More Gestures<br>
      Swipe between full-screen apps : three fingers<br>
      Mission Control : four fingers<br>
  * Sharing<br>
    Change Computer Name as desire.<br>
  * Battery<br>
    * Power Adapter<br>
      // For the clamshell mode<br>
      Prevent computer from sleeping automatically when the display is off : Enable<br>

## 백업 자료 복구

필요한 자료들을 복구합니다. 특정 앱들은 sync folder를 통한 영혼 백업이 가능하므로 사용하여 귀찮은 설정 파트를 생략할 수 있습니다.

## App Store를 통한 앱 다운로드

* Xcode

  솔직히 IDE로서 Xcode가 좋은지는 잘 모르겠습니다. iOS앱 개발을 하며 써보았지만 원래 IDE를 무거워서 싫어할 뿐더러 이게 애플이 정식으로 출시한 제품이 맞는지 싶을 정도로 완성도가 떨어진다는(특히 플레이그라운드 사용시) 생각이 드네요. 그럼에도 불구하고 개발자 도구 사용을 위하여 Xcode는 필수적으로 설치하여야합니다.

  iOS 앱 개발하는 친구가 Xcode 업데이트만 나오면 오류가 뿜어져나온다고 'x발 x발' 하는 것을 보니 바뀐건 없는 모양입니다.
  {:.note title="미래로부터의 메시지"}

* Spark

  기본 메일 앱은 사이드바 환경설정도 불가능해서 찾은 대안품입니다. 사실 브라우저를 통해 메일 사용하는 경우가 가장 잦지만 메일 작성은 아무래도 브라우저보다는 앱을 사용하는 것이 더 편합니다.

* App Cleaner & Uninstaller

  다들 하나쯤은 사용한다는 앱 제거용 앱입니다.

* Microsoft Remote Desktop

  크롬 원격 접속 프로그램도 많이 사용한다고 들었는데 개인적으로 이 프로그램이 원격접속을 위해 가장 좋다고 생각합니다. 마이크로소프트에서 공식적으로 무료 배포하는 프로그램이며 원격접속을 위한 세팅도 쉽습니다.(하지만 WOL 세팅은 쉽지 않지…) 집에 있는 윈도우와 원격접속을 열어놓으면 VM을 사용해 윈도우를 깔아둘 필요성이 전혀 없어집니다.

* Rocket Fuel

  맥 화면꺼짐 방지 앱. 장시간 비사용 상태로 맥을 켜놔도 화면이 계속 켜져있도록 하는 프로그램입니다.

* Keynote, Pages, 한컴오피스 한글 2014 VP 뷰어

  개인적으로 이제 키노트는 파워포인트보다 편합니다. 다만 제공하는 기능은 파워포인트가 더 많은 듯 싶습니다.<br>
  한글은 맥을 사용하면서 정말 애증의 존재이죠. 윈도우용 한글 2018은 구매하였지만 맥용 한글을 위해 추가지출을 하기에는 부담되는데 학교에서 주는 자료들은 항상 한글이고… 일단 다른 앱들은 .hwp를 읽지도 못하기 때문에 필수적으로 뷰어라도 설치해 두도록 합시다.

* GoodNotes

  아이패드용 필기앱으로 구매한 이후 맥에도 구매하여 잘 사용하고 있습니다. 동기화가 매우 우수한 편이며 만원 남짓한 가격이 절대 아깝지 않은 앱으로 내가 아이패드로 필기하는 모습을 보고 아이패드를 구매한 많은 친구들에게 꼭 설치하라고 권유해주는 앱입니다. 아쉬운 점이 있다면 윈도우용 GoodNote가 존재하지 않는다는 것?

* Choosy

  유료 프로그램. 링크를 열때 어떤 브라우저를 사용할지 정하게 할 수 있는 프로그램입니다. Chrome과 Safari 두 개를 병행해서 사용하다보니 필요해서 구매해 사용하고 있습니다.

* Keka

  유료 압축해제 프로그램. 윈도우에서는 반디집을 애용하고 있지만 맥용 반디집은 매우 비쌉니다. 원래 아이콘이 많이 징그러웠는데 업데이트 이후 많이 귀여워졌습니다.

* KakaoTalk

  맥용 카카오톡이 출시되었을 때 정말 기뻤죠. 한국인이라면 필수 어플 아닐까요?

* ~~Wunderlist~~

  ~~기억력이 나쁜 저에게 필수적인 어플입니다. 할일 관리를 위한ToDo App이며 마이크로소프트가 인수한 이후 Microsoft Todo를 내면서 지원이 중단되었지만 해당 어플이 아직까지도 공식 맥용 앱이 없는 관계로 아이폰, 아이패드, 맥에서 Wunderlist를 사용하고 있습니다.~~

* Microsoft To Do
  맥용 마이크로소프트 공식 To Do 앱이 나왔습니다. 이후 폰/패드/크롬을 포함하여 모두 Wunderlist에서 To Do로 갈아탔습니다. 매우 만족하며 사용중인 앱.

  끝까지 캘린더 서포트를 안해줘서 `Timeblocks`라는 앱으로 갈아탔습니다. 근데 또 이직하고 나니 MS Teams/Outlook 위주로 사용해서 병행해서 사용중입니다.
  {:.note title="미래로부터의 메시지"}

* Clear

  간단한 메모 용도로 사용중인 앱. 이 앱 또한 아이폰, 아이패드용 앱이 존재합니다.

* Day One

  일기장 앱. 일기를 위해 도대체 얼마를 투자하는 건지 모르겠지만(Plus 계정이 단돈 6.5만원!) 그럼에도 불구하고 일기는 써둘 가치가 있는 것 같습니다. 정말 슬프게도 난 기억력이 나쁘기에 일기마저 쓰지 않으면 단 일주일전에 내가 무엇을 했었는지 기억이 안날때가 많기 때문에... 또한 나중에 일기를 읽고 있자면 다시 그때의 추억이 떠올라서 생각보다 재밌습니다. '소중한 나의 병영일기' 속칭 소나기는 읽고 있으면 홧병 날 수도 있지만…<br>
  하여튼 일기를 쓰는 버릇은 정말 좋죠!<br>
  초등학교때 단 한번도 일기 과제를 안해가서 매주 복도 청소를 해온 내가 할 말은 아니지만!

* Movist

  약 일년동안 업데이트가 없는 앱이지만, 개발자님께서 꾸준히 베타버전 업데이트를 통해 곧 정식 버전 업데이트가 나올 것으로 기대하고 있는 앱. 맥에서 동영상을 보는데 좋은 앱이라고 생각합니다.

* Keyboard Pilot

  앱으로 포커스를 옮길때마다 자동으로 키보드 언어를 설정해주는 어플입니다. 여러 앱에 적용시키면 일관성이 떨어지고 타이핑 시 무슨 언어가 나올지 스스로가 헷갈릴 수 있지만 다른 무엇보다 terminal에 한하여 English는 무조건 적으로 설정하는 편이 좋습니다. 일단 terminal은 한국어를 쓸 일이 거의 없는 데다가 다른곳에서 한글 치다가 돌아와서 한글이 쳐지면 백스페이스 누르면서 화가 치솓습니다.

## 인터넷을 통한 앱 다운로드

* [Chrome](https://www.google.com/intl/ko_ALL/chrome/)

  크롬은 윈도우와 맥에서의 연속성 유지뿐 아니라 한국 사이트 접속을 위한 필수 앱입니다. 아직도 몇 한국 사이트들은 사파리에서 제대로 동작하지 않는 경우가 있습니다.

* [Alfred](https://www.alfredapp.com/)

  이 앱을 사용하지 않는 유저는 맥을 100% 활용하는 것이 아니다라고 확신할 수 있습니다. 정말 자잘한 부분에서 많은 시간을 세이브해주는 앱입니다. 해당 앱의 사용법은 워낙 방대한지라 생략하지만, Powerpack 구매이후 조금만 학습해보면 정말 여러모로 도움이 많이 된다는 것을 알 수 있습니다.

* [Sublime Text](https://www.sublimetext.com/)

  업데이트는 자주 해주지 않지만 대학교 들어와서 가장 많이, 가장 오랫동안 사용해온 앱. 단순한 텍스터 에디터이지만 패키지를 설치하고 셋팅함으로서 IDE 못지않은 나만의 텍스터 에디터로 발전해 나아갈 수 있습니다. 가벼운 프로그램이기에 빠른 동작속도는 덤이죠. 대항마로서 github에서 만든 Atom이 있지만 처음 실행시에 굼뜬 듯한 느낌을 받아서 몇 번 사용하다가 다시 서브라임 텍스트로 넘어왔습니다.

  서브라임 텍스트 설정은 [따로 포스팅](/devlog/sublime-text-setting)해야할만큼 길다. 그만큼 스스로에게 딱 맞는 텍스트 에디터로 커스텀할 수 있다는 장점을 가지고 있다.

  **이제 대세는 [vscode](https://code.visualstudio.com/)입니다!** 넘어가는게 정말 귀찮았지만 아주 잘 쓰고 있습니다. 무엇보다, 라이센스에서 자유로워 회사에서도 눈치 보지 않고 다운받아 사용할 수 있습니다.

* [Typora](https://typora.io/)

  마크다운 에디터. 처음에는 마크다운 문서도 서브라임 텍스트를 통해 raw format으로 필기해 왔는데 Typora를 사용하니 변환이 실시간으로 되어 훨씬 문서 작성이 쉬워졌습니다. 이제 화려할 필요가 없는 문서들은 마크다운으로 만든 이후 pdf 변환하여 제출하는 것이 편할 정도. 일단 한번 써보면 압니다. 마크다운을 자주 접해야한다면 필수적으로 사용해야 할 앱.

* [Google Drive](https://www.google.com/drive/download/)

  구글 드라이브는 15GB 라는 넉넉한 무료 용량을 제공합니다. 그렇기에 개인적인 용도의 Sync로 사용하는데에 전혀 무리가 없습니다. 구글 드라이브를 통해 필요한 파일들을 집에 있는 윈도우 컴퓨터에서, 맥북, 아이폰, 아이패드에서 동일하게 접속하고 변경할 수 있다는 것은 큰 축복이죠. 또한 저장용량 업그레이드 가격도 비싼 편이 아니기 때문에 필요시에는 업그레이드할 의향도 있습니다. 아직까진 15GB가 모자르지 않아 그대로 사용중이지만..

* [Dropbox](https://www.dropbox.com/ko/downloading)

  개인적인 사용으로는 Google Drive를 사용하지만, 무료 용량의 압박이 있어 지난 학기 Goodnote Backup 및 특정 앱들(Alfred라던지)은 설정파일 공유를 위하여 사용합니다.

* [Better Touch Tool](https://folivora.ai/)

  키보드, 마우스를 사용한 단축키 및 트랙패드 제스쳐 추가, 창 사이즈 조절등 여러 부가기능이 포함된 프로그램. 한번 설정하고 나면 꾸준히 알게모르게 해당 기능을 사용하고 있게 됩니다. 나중가면 이게 맥 기본 기능이었나 싶을 정도로 알게 모르게 많이 사용되는 프로그램입니다.

  ![BTT-1](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.19.47 PM.png)

  ![BTT-2](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.19.49 PM.png)

  ![BTT-3](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.19.51 PM.png)

  ![BTT-4](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.19.53 PM.png)

* [Bartender](https://www.macbartender.com/)

  많은 프로그램을 다운받고 사용하다보면 맥의 상단 메뉴바가 엄청나게 더러워짐을 확인할 수 있습니다. Bartender는 필요없는 메뉴 아이콘을 숨기거나, 토글 할 수 있게 해줍니다.

  ![Bartender Show](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.17.52 PM.png)

  ![Bartender Hide](/assets/img/2018-10-09/Screen Shot 2018-10-09 at 4.18.00 PM.png)

* [SwitchResX](https://www.madrau.com)

  맥북은 의외로 디스플레이 설정을 기본적으로 만질 수 있는게 많지 않습니다. 기껏해야 기본 해상도 몇개 중에서 선택할 수 있는 옵션을 줄 뿐이죠.<br>
  외부 모니터나 기본 디스플레이의 해상도 / refresh rates를 원하는 대로 변경할 수 있도록 하는 프로그램입니다. 특히나 외부 모니터를 사용할때 좋습니다.

* [iStat Menus](https://bjango.com/mac/istatmenus/)

  시스템 모니터링용 앱입니다. 시스템 정보들을 위젯 혹은 메뉴 막대에서 확인 가능하며 매일 아침 날씨 기능 알림을 보내줍니다. 이외에 배터리, 시계 등 메뉴바에 올라가는 기본 메뉴들도 다 iStat에서 제공하는 메뉴들로 사용하고 있습니다.

* [Karabiner](https://pqrs.org/osx/karabiner/)

  키보드 맵핑 프로그램으로, 개인적으로는 터미널에서 단축키 추가와 remote desktop 사용시 왼쪽 command 와 option key swap 용으로 사용하고 있습니다.

* [Jettison](https://www.stclairsoft.com/Jettison/)

  usb 나 다른 외장 하드를 사용하다가 잠들기 모드로 들어갈경우 맥은 해당 장치가 정상적으로 추출되지 않았다는 에러 메시지를 띄웁니다. 잠들기나 종료, 재시작 등을 진행할때에 자동으로 장치를 추출하기 위해 사용하는 앱입니다.

* [Scroll Reverser](https://pilotmoon.com/scrollreverser/)

  Trackpad 의 스크롤 방향은 매우 직관적입니다. 하지만 맥북에 마우스를 연결하게 되면 휠 방향이 평소 윈도우에서 사용하던 때와 반대로 됩니다. 이러한 상황을 해결하기 위한 앱으로, Trackpad, Mouse 각각의 휠 방향 지정을 따로 해줄 수 있습니다. 단점이라면 가끔 가다가 설정이 풀린다는 것인데, 설정을 해제했다가 다시 해주면 해결됩니다.

* [AltTab](https://alt-tab-macos.netlify.app)

  맥은 기본으로 모든 workspace에서 열려 있는 앱들을 cmd-tab으로 순환합니다. 이보다는 현재 위치한 워크스페이스 내의 앱들만 순환하고 싶은데, 옵션으로 제공해주지 않습니다. AltTab 앱을 사용하면 윈도우와 비슷하게 cmd-tab을 사용할 수 있도록 설정이 가능합니다.

* [BeardedSpice](http://beardedspice.github.io)

  touch bar의 멀티미디어 키나 추가 세팅한 단축키를 이용해 모든 멀티 미디어(iTunes는 물론이고 Genie, 멜론, Youtube...)를 컨트롤 할 수 있게 해주는 훌륭한 프로그램입니다. Safari/Chrome 사용시 처음에 한해 [애플이벤트의 자바스크립트 허용](https://github.com/beardedspice/beardedspice/wiki/Won't-work-issue-after-Chrome-Update-(68.0.3440.75-and-later))을 해줘야합니다.

* [Mac Fan Control](https://www.crystalidea.com/macs-fan-control)

  더위에 고생하는 맥북을 위한 앱. 2017년형 맥북프로를 처음 사고 놀랐던건 정말 아무것도 안하고 외장 디스플레이만 하나 연결했을 뿐인데 너무 뜨거워진다는 거였습니다. 2018년형은 발열 문제가 더 심하다고 하니... 조금 시끄럽더라도 팬을 더 열심히 돌리기 위해 설치하는 앱. 기본 팬 센서를 유지하고 싶으면 안깔아도 무방합니다.

## Terminal & Brew 설정

su 명령어 사용을 위하여 아래 명령어를 사용힙니다.

```sh
sudo -s
passwd root
```

* 명령어 도구 설치
  `xcode-select --install`

* [brew](https://brew.sh/index_ko) 설치

  ```shell
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

* [git](https://git-scm.com/) 설치

  ```shell
  brew install git git-lfs
  ```

  설정

  ```shell
  git config --global user.name "Your Name"
  git config --global user.email "yourID@your-domain.com"
  git config --global core.precomposeunicode true
  git config --global core.quotepath false
  ```

* [oh-my-zsh](https://ohmyz.sh/) 설치

  ```shell
  brew install zsh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
  ```

  * [Pure 테마](https://github.com/sindresorhus/pure) 설치

    ```shell
    brew install nodejs
    npm install --global pure-prompt
    echo 'autoload -U promptinit; promptinit
    prompt pure' >> ~/.zshrc
    ```

  * [zsh 관련 플러그인 설치](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html)

    * 자동완성 플러그인 [zsh-completion](https://github.com/zsh-users/zsh-completions), [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
    * 하이라이팅 플러그인 [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

  * [git aliases 추가](https://gist.github.com/LazyRen/89e3faaf518c137530d6d80ed5a9773a)

  * 기타 `~/.zshrc` 추가

    ```shell
    DISABLE_UPDATE_PROMPT="true"
    DISABLE_AUTO_TITLE="true"

    # You may need to manually set your language environment
    export LANG=en_US.UTF-8
    export LC_ALL=en_US.UTF-8

    # Preferred editor for local and remote sessions
    if [[ -n $SSH_CONNECTION ]]; then
      export EDITOR='vim'
    else
      export EDITOR='code -n -w'
    fi

    # Get OS X Software Updates, and update installed Homebrew, Ruby, npm, oh_my_zsh and pip
    alias update='echo sudo softwareupdate; sudo softwareupdate -i -a;
     echo brew update; brew update; echo brew upgrade; brew upgrade;
     echo brew cask upgrade; brew cask upgrade;
     echo brew cleanup; brew cleanup;
     echo sudo gem update --system; sudo gem update --system; echo sudo gem update; sudo gem update;
     echo sudo npm update -g; sudo npm update -g;
     echo upgrade_oh_my_zsh; upgrade_oh_my_zsh;
     echo pip3 install --upgrade pip; pip3 install --upgrade pip;
     echo pip install --upgrade pip; pip install --upgrade pip;
     echo pip3update; pip3update;
     echo pipupdate; pipupdate;'

    pipupdate() {
     pip list --outdated | cut -d ' ' -f1 | xargs -n1 pip install -U --user;
    }

    pip3update() {
     pip3 list --outdated | cut -d ' ' -f1 | xargs -n1 pip3 install -U --user;
    }

    alias convmvnfc='convmv -r -f utf8 -t utf8 --nfc --notest .'
    alias zshrc='code ~/.zshrc'
    alias diff='diff -ibE'\
    alias rmout='find . -type f -name \"*.out\" -delete'
    ```

* 기타 개발용 소프트웨어 설치

  ```shell
  # Ruby 및 Bundler 설치
  brew install ruby
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
  sudo gem install bundler

  # Python3 설치
  brew install python3

  # 코딩용 폰트 설치
  brew tap homebrew/cask-fonts
  brew install --cask font-jetbrains-mono
  brew install --cask font-source-code-pro
  brew install --cask font-source-code-pro-for-powerline

  # Terminal 앱 Hyper 설치
  brew cask install hyper

  # convmv (NFD to NFC 유니코드 변경)
  brew install convmv
  # convmv -r -f utf8 -t utf8 --nfc --notest .
  ```

* Hyper Config

```js
module.exports = {
  config: {
    fontSize: 14,
    fontFamily: '"JetBrains Mono", D2Coding, Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
    macOptionSelectionMode: 'force',
    hyperline: {
      plugins: [ "ip", "cpu", "memory", "network" ]
    },
    alwaysOnTop: { default: false }
  },
  modifierKeys: { altIsMeta: true },

  // themes: "hyper-one-dark-vivid" / "hyper-one-dark" / "hyper-one-dark-vivid" / "hyperterm-atom-dark"
  plugins: ["hyper-one-dark-vivid", "hyper-font-ligatures", "hyperline" , "hyper-pane", "hyper-quit", "hyper-search", "hypercwd", "hyper-drop-file", "hyper-always-on-top"]
}
```

  `macOptionSelectionMode`를 `force`로 바꿈으로서 `tmux`나 `vim`에서 `option` + 마우스 드래그 후 copy-paste를 system clipboard 상에서 진행할 수 있습니다.

* [기본 맥 터미널 용 테마 다운로드/설치](https://github.com/lysyi3m/macos-terminal-themes)

  터미널 설정(cmd + ,)에서 원하는 프로파일을 default로 설정

* [서브라임 텍스트 심볼릭 링크 등록](https://beomi.github.io/2017/07/04/Call-Sublime-from-Terminal/)(subl)

  ```shell
  ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
  ```

## Sublime Text 환경 설정

서브라임 텍스트 설정은 그 자체만으로 하나의 포스트를 적어야 할 분량이 나오기 때문에 [다른 포스트](/devlog/sublime-text-setting)에서 다루기로 하겠습니다.

## References

많은 선배님들의 좋은 포스트가 있었기에 그래도 수월하게 셋업을 마칠 수 있었습니다. 아래 포스트들을 많이 참고하였으며, 조금 더 발전시킬 수 있을 것 같은 부분은 발전시켜 포스팅해봤습니다.

* [Back to the Mac](http://macnews.tistory.com/)
* [본격 macOS에 개발 환격 구축하기](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html) by subicura
* [상대적이면서도 절대적인 개인취향이 반영된 어떤 개발자의 맥 환경](https://github.com/doortts/env-of-mac)

이외에도 많은 자료들을 참고하였으며 가능한 한 해당 글/자료들의 링크를 포스트에 첨부시켜 놓았습니다.
