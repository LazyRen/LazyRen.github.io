---
layout: post
title: "VSCode 리모트 SSH code 명령어 사용하기"
subtitle: "VSCode Remote SSH code Command Installation"
category: devlog
tags: development terminal vscode translation
---

VSCode Remote SSH와 터미널을 함께 사용하여 서버에서 개발할 때, VSCode Integrated terminal이 아닌
별개의 터미널 프로그램을 사용할경우 `code` 명령어를 사용하여 VSCode 창을 열 수가 없습니다.
`git commit`등의 명령어도 기본 에디터로 `vim`을 열게됩니다.

[블로그 포스트](https://ianloic.com/2021/02/16/vscode-remote-and-the-command-line/)를 참조하여 서버에 ssh로 연결하였을 때도
`code` 명령어를 사용하는 방법에 대해 알아보겠습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Prerequisite

* `zsh`
* `VSCode Remote-SSH` (`code`명령어 사용할 때 리모트 세션이 열려있어야합니다.)

## Command Installation

아래 스크립트를 $PATH 폴더 중 한 곳에 파일명 `code`로 저장해주세요. (e.g. `~/.bin`)

`$PATH`에서 어떤 폴더들을 지원하는지 확실하지 않다면 `echo $PATH`로 확인할 수 있습니다.
{:.note}

```shell
# file: "$PATH/code"
#! /usr/bin/env zsh

local script=$(echo ~/.vscode-server/bin/*/bin/code(*oc[1]N))
if [[ -z ${script} ]]
then
    echo "VSCode remote script not found"
    exit 1
fi
local socket=$(echo /run/user/$UID/vscode-ipc-*.sock(=oc[1]N))
if [[ -z ${socket} ]]
then
    echo "VSCode IPC socket not found"
    exit 1
fi
export VSCODE_IPC_HOOK_CLI=${socket}
echo $script $@
${script} $@
```

ssh 접속된 터미널에서 `code` 명령어를 사용할 때, 최소 하나의 `VSCode Remote - SSH` 세션이 연결되어 있어야합니다.
{:.note title="Warning"}

## Git 설정

아래 명령어를 사용하여 git이 기본 에디터로 VSCode를 사용하게 합니다.

```shell
git config --global core.editor "code --wait"
```

* [Ian McKellar 블로그 포스트](https://ianloic.com/2021/02/16/vscode-remote-and-the-command-line/)
{:.note title="출처"}
