---
layout: post
title: "oh-my-zsh 설치 및 세팅하기"
subtitle: "oh-my-zsh Basic Setup Guide"
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
brew install zsh

# Change zsh as default sh
chsh -s $(which zsh)

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install Fonts

oh-my-zsh (especially with theme like Powerlevel10k) requires font with specific font ligature & icons.
You can get them from [Nerd Font](https://github.com/ryanoasis/nerd-fonts#font-installation).

```shell
brew tap homebrew/cask-fonts
brew install --cask font-jetbrains-mono-nerd-font
```

I'm currently using `JetBrainsMono Nerd Font Mono`. Feel free to choose what suits you the best.
{:note}

## Install Theme

Install theme that you want. I personally moved from pure them to Powerlevel10k.
(AFAIK, Powerlevel10k is [faster](https://gist.github.com/romkatv/7cbab80dcbc639003066bb68b9ae0bbf) than Pure theme)

### Powerlevel10k

> [Powerlevel10k](https://github.com/romkatv/powerlevel10k) is a theme for Zsh. It emphasizes speed, flexibility and out-of-the-box experience.

Check [get started](https://github.com/romkatv/powerlevel10k#get-started) to find your best installation option.

1. Clone this repository in oh-my-zsh's themes directory:

    ```shell
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
    ```

2. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`.

## OMZ Plugins

### autoupdate

> [oh-my-zsh plugin](https://github.com/TamCore/autoupdate-oh-my-zsh-plugins) for auto updating of git-repositories in $ZSH_CUSTOM folder

1. Clone this repository in oh-my-zsh's plugins directory:

    ```shell
    git clone https://github.com/TamCore/autoupdate-oh-my-zsh-plugins ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/autoupdate
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```shell
    plugins=([plugins...] autoupdate)
    ```

The updates will be executed automatically as soon as the oh-my-zsh updater is started.
Note that this will auto update both plugins and themes found in the $ZSH_CUSTOM folder.
{:.note}

### zsh-syntax-highlighting

> [Fish shell-like syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) for Zsh.

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

> [Fish-like fast/unobtrusive autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) for zsh.

Check [Installation Guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

    ```shell
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```shell
    plugins=([plugins...] zsh-autosuggestions)
    ```

### zsh-completions

> Additional completion definitions for Zsh.

Check [git repo](https://github.com/zsh-users/zsh-completions#oh-my-zsh) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

    ```shell
    git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```shell
    plugins=([plugins...] zsh-completions)
    ```

### Autojump

> [autojump](https://github.com/wting/autojump) - a faster way to navigate your filesystem

```shell
brew install autojump
```

### fzf

> [fzf](https://github.com/junegunn/fzf) is a general-purpose command-line fuzzy finder.

```shell
brew install fzf

# To install useful key bindings and fuzzy completion:
$(brew --prefix)/opt/fzf/install
```

### enhancd

> [A next-generation cd](https://github.com/b4b4r07/enhancd) command with an interactive filter ✨

```shell
zplug "b4b4r07/enhancd", use:init.sh
```

### exa

> [exa](https://github.com/ogham/exa) is a modern replacement for ls.

```shell
brew install exa
```

## Others

* Remove directory highlighting for WSL.

    ```shell
    LS_COLORS="ow=01;36;40" && export LS_COLORS #WSL dir colors
    ```

* Add [git aliases](https://gist.github.com/LazyRen/89e3faaf518c137530d6d80ed5a9773a) to the zsh.

    ```shell
    # Create .zsh file in the $ZSH_CUSTOM folder.

    alias ga="git add"
    alias gaa="git add --all"
    alias gb="git branch"
    alias gba="git branch -a"
    alias gc="git commit"
    alias gca="git commit --amend"
    alias gcm="git commit -m"
    alias gco="git checkout"
    alias gd="git diff"
    alias glog="git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit"
    alias gm="git merge"
    alias gp="git push"
    alias gpl="git pull"
    alias gs="git status"

    # Gerrit
    gpg() {
        if [ -z "$1" ]; then
            BRANCH_NAME="$(git for-each-ref --format='%(upstream:short)' "$(git symbolic-ref -q HEAD)" | cut -d '/' -f2)"
        else
            BRANCH_NAME="$1"
        fi
        git push origin HEAD:refs/for/$BRANCH_NAME
    }

    gpgwip() {
        if [ -z "$1" ]; then
            BRANCH_NAME="$(git for-each-ref --format='%(upstream:short)' "$(git symbolic-ref -q HEAD)" | cut -d '/' -f2)"
        else
            BRANCH_NAME="$1"
        fi
        git push origin HEAD:refs/for/$BRANCH_NAME%wip
    }

    gpgready() {
        if [ -z "$1" ]; then
            BRANCH_NAME="$(git for-each-ref --format='%(upstream:short)' "$(git symbolic-ref -q HEAD)" | cut -d '/' -f2)"
        else
            BRANCH_NAME="$1"
        fi
        git commit --amend --no-edit
        git push origin HEAD:refs/for/$BRANCH_NAME%ready
    }
    ```
