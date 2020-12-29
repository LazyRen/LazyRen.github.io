---
layout: post
title: "Linux(Ubuntu)에서 oh-my-zsh 설치 및 세팅하기"
subtitle: "Linux(Ubuntu) oh-my-zsh Basic Setup Guide"
category: devlog
tags: development terminal
image:
  path: /assets/img/2020-12-29/omz_logo.png
---

oh-my-zsh 설정 및 추천 플로그인들의 설치 방법입니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Zsh & Oh My Zsh Installation

[Zsh Installation Guide](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)<br>
[Oh My Zsh Installation Guide](https://github.com/ohmyzsh/ohmyzsh#basic-installation)

```shell
# Install Zsh
apt install zsh

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Pure Theme

> [Pretty, minimal and fast ZSH prompt](https://github.com/sindresorhus/pure)

### Installing Node.js (for npm)

[Check latest nvm version](https://github.com/nvm-sh/nvm#install--update-script)

```shell
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# Install Node.js
nvm install node --lts
```

### Install Pure Theme

Check [installation guide](https://github.com/sindresorhus/pure#install) for detail.

```shell
npm install --global pure-prompt
```

add below code to the `~/.zshrc`.

```shell
# .zshrc

ZSH_THEME=""

autoload -U promptinit; promptinit
prompt pure
```

## OMZ Plugins

### zsh-syntax-highlighting

> [Fish shell-like syntax highlighting for Zsh.](https://github.com/zsh-users/zsh-syntax-highlighting)

Check [Installation Guide](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

    ```shell
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```shell
    plugins=([plugins...] zsh-syntax-highlighting)
    ```

### zsh-autosuggestions

> [Fish-like fast/unobtrusive autosuggestions for zsh.](https://github.com/zsh-users/zsh-autosuggestions)

Check [Installation Guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

    ```shell
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```shell
    plugins=([plugins...] zsh-autosuggestions)
    ```

### Autojump

> [autojump](https://github.com/wting/autojump) - a faster way to navigate your filesystem

```shell
apt install autojump

# Follow instructions
cat /usr/share/doc/autojump/README.Debian

# add following line to ~/.zshrc
. /usr/share/autojump/autojump.sh
```

## Others

* Remove directory highlighting for WSL.

    ```shell
    LS_COLORS="ow=01;36;40" && export LS_COLORS #WSL dir colors
    ```

* Add [git aliases](https://gist.github.com/LazyRen/89e3faaf518c137530d6d80ed5a9773a) to the zsh.

    ```shell
    # Create .zsh file in the $ZSH/custom folder.
    ```
