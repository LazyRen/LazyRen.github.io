---
layout: post
title: "깃헙 페이지 리눅스(우분투) 개발 환경 세팅하기"
subtitle: "Github Page Linux(Ubuntu) Environment Setup"
category: devlog
tags: development github-pages jekyll
image:
  path: /assets/img/2020-12-10/github_page_jekyll.png
---

[깃헙 페이지](https://jekyllrb.com/docs/) 로컬 빌드를 위해 사용되는 jekyll과 bundler 설치를 위해 ruby gem이 사용됩니다.
문제는 기본으로 깔려있는 시스템 ruby를 사용하게 될 경우 다음과 같은 권한 문제로 에러가 출력됩니다.

```console
$gem install bundler

ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /var/lib/gems/2.3.0 directory.
```

시스템 ruby는 /var/lib/gems 폴더 내에 gem install을 실행하려 하는데 기본적으로 해당 폴더 쓰기 권한이 유저에게 없기 때문에
rbenv를 통해 ruby를 다시 설치하는 과정이 필요합니다.

<!--more-->

## rbenv & ruby 설치하기

![ruby gem](/assets/img/2020-12-10/rubygems.svg){: width="20" height="20"}
[rbenv-installer](https://github.com/rbenv/rbenv-installer#rbenv-installer) 참조

1. rbenv installer를 사용해 rbenv 설치

   ```console
   # with curl
   curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
   ```

2. rbenv 명령어 인식을 위해 PATH에 경로 추가<br>
   add PATH(`$HOME/.rbenv/bin`) to ~/.bashrc or ~/.zshrc

   ```console
   echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
   ```

3. 쉘에 `rbenv init`을 입력후 나오는 데로 ~/.bashrc or ~/.zshrc에 내용 추가

   ```console
   rbenv init
   # Load rbenv automatically by appending
   # the following to ~/.bash_profile:

   eval "$(rbenv init -)"
   ```

4. rbenv를 사용하여 최신 루비 설치

   ```console
   rbenv install -l
   # 리스트 중 최신 버전의 ruby(2.7.2) 설치
   rbenv install 2.7.2
   rbenv global 2.7.2
   ```

## jekyll & bundler 설치

```console
gem install jekyll bundler
```

이후 blog가 위치한 폴더로 이동한 후 빌드해 주시면 됩니다.

```console
bundle update

bundle exec jekyll serve
```
