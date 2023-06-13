---
layout: post
title: "Oh My Zsh Basic Setup & Installation Guide"
subtitle: "Oh My Zsh Basic Setup & Installation Guide"
category: devlog
tags: development terminal
image:
  path: /assets/img/2020-12-29/omz_logo.png
---

This is a very brief summary of installing [zsh] + [Oh My Zsh] with proper font & basic plugins for the OMZ

[zsh]: https://en.wikipedia.org/wiki/Z_shell
[Oh My Zsh]: https://ohmyz.sh/
*[OMZ]: Oh MyZsh

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Zsh & Oh My Zsh Installation

[Zsh Installation Guide](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)<br>
[Oh My Zsh Installation Guide](https://github.com/ohmyzsh/ohmyzsh#basic-installation)

```shell
# Install Zsh
# For Mac
brew install zsh
# For Ubuntu
sudo apt-get install zsh
# For SUSE Linux
sudo zypper install zsh

# Change zsh as the default shell
chsh -s $(which zsh)

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install Fonts

Oh My Zsh (especially with a theme like [Powerlevel10k]) requires font with specific font ligature & icons.

I'm currently using [JetBrains Mono] for my dev. environment.
To be exact, patched version from the [Nerd Font]. They are not that differ in standard use-cases,
but powerlevel10k does require some of glyphs (icons) that [Nerd Font] provides.<br>
I highly suggest downloading both official & nerd font patched versions and use the official one as a fallback.

[JetBrains Mono]: https://www.jetbrains.com/lp/mono/
[Nerd Font]: https://github.com/ryanoasis/nerd-fonts

```shell
# For Mac
brew tap homebrew/cask-fonts
# JetBrains Nerd Font Mono
brew install --cask font-jetbrains-mono-nerd-font
# JetBrains Mono
brew install --cask font-jetbrains-mono

# For Window
# Manually download the font & unzip + install the font
# JetBrains Nerd Font Mono
https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip
# JetBrains Mono
https://github.com/JetBrains/JetBrainsMono/releases/latest

# For Linux
# JetBrains Mono
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/install_manual.sh)"
# It's a bit trickier for Linux to install/patch Nerd Font... Please check Nerd Font repo for more information.
```

Append `JetBrains Mono` after the `JetBrainsMono Nerd Font` to the font-family setting of your choice of IDE or Terminal.

```default
"fontFamily": "JetBrainsMono Nerd Font", "JetBrains Mono",
```

## Install Theme

Install the theme that you want. I personally moved from [Pure theme] to [Powerlevel10k].
(AFAIK, [Powerlevel10k] is [faster](https://gist.github.com/romkatv/7cbab80dcbc639003066bb68b9ae0bbf) than [Pure theme]
and supports various options to personalize look & functions)

[pure theme]: https://github.com/sindresorhus/pure
[Powerlevel10k]: https://github.com/romkatv/powerlevel10k

### Powerlevel10k

> [Powerlevel10k] is a theme for Zsh. It emphasizes speed, flexibility and out-of-the-box experience.

Check [get started](https://github.com/romkatv/powerlevel10k#get-started) to find your best installation option.

1. Clone this repository in oh-my-zsh's themes directory:

   ```shell
   git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
   ```

2. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`.

## OMZ Plugins

Any extension with :pushpin: attached are things that you **MUST INSTALL** for a better life.

### autojump :pushpin:

> [autojump](https://github.com/wting/autojump) - a faster way to navigate your filesystem

```shell
brew install autojump
```

### autoupdate :pushpin:

> [Oh My Zsh plugin](https://github.com/TamCore/autoupdate-oh-my-zsh-plugins) for auto-updating of git-repositories in $ZSH_CUSTOM folder

1. Clone this repository in oh-my-zsh's plugins directory:

   ```shell
   git clone https://github.com/TamCore/autoupdate-oh-my-zsh-plugins ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/autoupdate
   ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

   ```shell
   # file: "~/.zshrc"
   plugins=([plugins...] autoupdate)
   ```

The updates will be executed automatically as soon as the Oh My Zsh updater is started.
Note that this will auto-update both plugins and themes found in the $ZSH_CUSTOM folder.

You may adjust how often omz checks for the update by adjusting the below line from the `~/.zshrc` file.<br>
{:.note title="Update Frequency"}

```shell
# file: "~/.zshrc"
# Uncomment the following line to change how often to auto-update (in days).
export UPDATE_ZSH_DAYS=1
```

### fzf

> [fzf](https://github.com/junegunn/fzf) is a general-purpose command-line fuzzy finder.

```shell
brew install fzf

# To install useful key bindings and fuzzy completion:
$(brew --prefix)/opt/fzf/install
```

### ssh-agent

> [ssh-agent](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/ssh-agent) starts automatically ssh-agent to set up and load whichever credentials you want for ssh connections.

```shell
# file: "~/.zshrc"
plugins=([plugins...] ssh-agent)
```

### zsh-autosuggestions :pushpin:

> [Fish-like fast/unobtrusive autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) for zsh.

Check [Installation Guide](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

   ```shell
   git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
   ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

   ```shell
   # file: "~/.zshrc"
   plugins=([plugins...] zsh-autosuggestions)
   ```

### zsh-completions :pushpin:

> Additional completion definitions for Zsh.

Check [git repo](https://github.com/zsh-users/zsh-completions#oh-my-zsh) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

   ```shell
   git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
   ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

   ```shell
   # file: "~/.zshrc"
   plugins=([plugins...] zsh-completions)
   ```

### zsh-syntax-highlighting :pushpin:

> [Fish shell-like syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) for Zsh.

Check [Installation Guide](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) for detail.

1. Clone this repository in oh-my-zsh's plugins directory:

   ```shell
   git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
   ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

   ```shell
   # file: "~/.zshrc"
   plugins=([plugins...] zsh-syntax-highlighting)
   ```

## Others

* ZSH History related configs
  ```shell
  # file: "~/.zshrc"
  # Increase history size
  export HISTFILESIZE=1000000000
  export HISTSIZE=1000000000
  # Append history incrementally(as soon as they are entered)
  setopt INC_APPEND_HISTORY
  # Remove duplicates
  setopt HIST_FIND_NO_DUPS
  ```

* Add [git aliases](https://gist.github.com/LazyRen/89e3faaf518c137530d6d80ed5a9773a) to the zsh.

  ```shell
  # file: "$ZSH_CUSTOM/git_aliases.zsh"
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

* (WINDOWS ONLY) Remove directory highlighting for WSL.

  ```shell
  LS_COLORS="ow=01;36;40" && export LS_COLORS #WSL dir colors
  ```
