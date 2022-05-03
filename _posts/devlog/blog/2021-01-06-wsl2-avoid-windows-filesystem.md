---
layout: post
title: "WSL2 - Avoid using Jekyll on Windows Filesystem"
subtitle: "Bundle Jekyll is too slow on Windows"
category: devlog
tags: blog jekyll
image:
  path: /assets/img/2021-01-06/bundler.png
---

If any of you find Jekyll compile-time(`bundle exec jekyll serve`) is too slow on your *Windows - WSL environment*,
make sure that your blog is **NOT** located on **Windows Filesystem**!

## TL;DR

[WSL2 is very slow in Windows filesystem] (`/mnt/c`).<br>
Clone your blog repo to the Linux filesystem (starting with `~/`).<br>
[Access Linux filesystem] via explorer with a path like below.

[WSL2 is very slow in Windows filesystem]: https://github.com/microsoft/WSL/issues/4197
[Access Linux filesystem]: https://devblogs.microsoft.com/commandline/whats-new-for-wsl-in-windows-10-version-1903/

```default
\\wsl$\{distro_name}\home\{user_name}

# My case
\\wsl$\Ubuntu\home\lazyren
```

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Windows Filesystem

![Window Jekyll Compile Time](/assets/img/2021-01-06/windows_fs_jekyll.png){: style="height: 800px;"}

There is a known issue [WSL2 filesystem performance is much slower than WSL2 in /mnt].

That being said, simple Jekyll compile takes about 40 seconds with my brand new $3000 computer.<br>
Solution? Migrate your blog to the Linux filesystem. Re-clone your repo.

[WSL2 filesystem performance is much slower than WSL2 in /mnt]: https://github.com/microsoft/WSL/issues/4197

## Linux Filesystem

![Linux Jekyll Compile Time](/assets/img/2021-01-06/wsl2_native_fs_jekyll.png){: style="height: 800px;"}

By simply migrating to the Linux filesystem, the compile-time has been reduced to 1/10(2.6 sec).<br>
But you need some settings to fully take advantage of WSL2.

## Additional Settings

### Explorer

We need to navigate to the folder freely with explorer.<br>
[Access Linux filesystem] via explorer with a path like below.

[Access Linux filesystem]: https://devblogs.microsoft.com/commandline/whats-new-for-wsl-in-windows-10-version-1903/

```default
\\wsl$\{distro_name}\home\{user_name}

# My case
\\wsl$\Ubuntu\home\lazyren
```

Make a shortcut to the blog folder or root folder for the future.

### Windows Terminal

Change starting directory to the root folder of the user.
Add the below line to the ubuntu profile from `settings.json`.

```json
//file: "settings.json"
"startingDirectory": "//wsl$/Ubuntu/home/lazyren"

# Profile will look like below.
# {
#     "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
#     "hidden": false,
#     "name": "Ubuntu",
#     "source": "Windows.Terminal.Wsl",
#     "startingDirectory": "//wsl$/Ubuntu/home/lazyren"
# }
```
