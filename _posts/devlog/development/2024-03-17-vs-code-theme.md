---
layout: post
title: "VS Code Theme Recommendation"
subtitle: "VS Code Theme Recommendation"
category: devlog
tags: cpp development vscode
image:
  path: /assets/img/2024-03-17/one-dark-pro-modified.png
---

In this article, I'll present you my current favorite VS Code theme (modified) [One Dark Pro]

[One Dark Pro]: https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Modification

I use `One Dark Pro Flat` theme from [One Dark Pro].

* Default<br>
  ![Default](/assets/img/2024-03-17/one-dark-pro-default.png)

* Modified<br>
  ![Modified](/assets/img/2024-03-17/one-dark-pro-modified.png)

It's not a big change, but as you can see, I can easily detect difference between `variable` & `parameter` with a color and dimmed `variable` color a bit. And user defined types have same syntax color as a native type.

This however, require a help from a language server as this is done by overwriting `semantic token color`.

<details>
<summary>settings.json</summary>
<div markdown="1">
```json
"editor.semanticTokenColorCustomizations": {
  "[One Dark Pro Flat]": {
    "rules": {
      "parameter": "#B392F0",
      "property": "#82B1FF",
      "type": "#C678DD",
      "variable": "#E06C75"
    }
  }
},
```
</div>
</details>

### Bracket Highlights

* Default<br>
  ![Default](/assets/img/2024-03-17/bracket-default.png)

* Modified<br>
  ![Modified](/assets/img/2024-03-17/bracket-modified.png)

<details>
<summary>settings.json</summary>
<div markdown="1">
```json
"workbench.colorCustomizations": {
  "editorBracketHighlight.foreground1": "#E5C07B",
  "editorBracketHighlight.foreground2": "#B392F0",
  "editorBracketHighlight.foreground3": "#61AFEF",
  "editorBracketHighlight.foreground4": "#98C379",
  "editorBracketHighlight.foreground5": "#87cefa",
  "editorBracketHighlight.foreground6": "#CCFF90",
  "editorBracketHighlight.unexpectedBracket.foreground": "#F44747"
},
```
</div>
</details>

## Material Icon Theme

Download [Material Icon Theme] and apply it from a command palette(`Preferences: File Icon Theme` & `Preferences: Product Icon Theme`)

<details>
<summary>View icons</summary>
<div markdown="1">
* File Icons<br>
  ![Material File Icons](/assets/img/2024-03-17/material-theme-fileIcons.png){:.centered}
* Folder Icons<br>
  ![Material Folder Icons](/assets/img/2024-03-17/material-theme-folderIcons.png){:.centered}
</div>
</details>

[Material Icon Theme]: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme

## Other VS Code Themes

You may check [VS Code Themes] site for a brief look of each themes sorted in a install count.

Some other themes I also considered are:

<br>![GitHub Theme](/assets/img/2024-03-17/github-dark.svg)

[GitHub Theme]
{:.figcaption}

<br>![Dracula Official](/assets/img/2024-03-17/dracula.svg)

[Dracula Official]
{:.figcaption}

<br>![Material Theme](/assets/img/2024-03-17/material-theme-darker.svg)

[Material Theme]
{:.figcaption}

<br>![Night Owl](/assets/img/2024-03-17/night-owl.svg)

[Night Owl]
{:.figcaption}

<br>![Catppuccin](/assets/img/2024-03-17/catppuccin-mocha.svg)

[Catppuccin]
{:.figcaption}

I have tried several others, but I always come back to the One Dark Pro.<br>
For some, they don't highlight all semantic tokens as I want, and others just don't feel right to me.

[VS Code Themes]: https://vscodethemes.com/?language=cpp&type=dark&sortBy=installs
[GitHub Theme]: https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme
[Dracula Official]: https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula
[Material Theme]: https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme
[Night Owl]: https://marketplace.visualstudio.com/items?itemName=sdras.night-owl
[Catppuccin]: https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc

## One Dark Pro for Iterm2

Download `One Dark Pro.itermcolors` from [repository] or make one from below scripts and import it from a Iterm2.

![Setting](/assets/img/2024-03-17/iterm2.png){:.centered}

<details>
<summary>itermcolors</summary>
<div markdown="1">
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
 <key>Ansi 0 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.32246223092079163</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.26643401384353638</real>
  <key>Red Component</key>
  <real>0.24329492449760437</real>
 </dict>
 <key>Ansi 1 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.36486649513244629</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.27919146418571472</real>
  <key>Red Component</key>
  <real>0.94884318113327026</real>
 </dict>
 <key>Ansi 10 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.39388945698738098</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.891704261302948</real>
  <key>Red Component</key>
  <real>0.56875580549240112</real>
 </dict>
 <key>Ansi 11 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.26780635118484497</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.54989564418792725</real>
  <key>Red Component</key>
  <real>0.86179488897323608</real>
 </dict>
 <key>Ansi 12 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>1</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.69005459547042847</real>
  <key>Red Component</key>
  <real>0.090461708605289459</real>
 </dict>
 <key>Ansi 13 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.87639153003692627</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.47924214601516724</real>
  <key>Red Component</key>
  <real>0.84598284959793091</real>
 </dict>
 <key>Ansi 14 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.87735253572463989</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.81886249780654907</real>
  <key>Red Component</key>
  <real>0.007810110691934824</real>
 </dict>
 <key>Ansi 15 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.99999994039535522</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.99999994039535522</real>
  <key>Red Component</key>
  <real>0.9999966025352478</real>
 </dict>
 <key>Ansi 2 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.39374667406082153</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.8915981650352478</real>
  <key>Red Component</key>
  <real>0.57432925701141357</real>
 </dict>
 <key>Ansi 3 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.26780635118484497</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.54989564418792725</real>
  <key>Red Component</key>
  <real>0.86179488897323608</real>
 </dict>
 <key>Ansi 4 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>1</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.69005459547042847</real>
  <key>Red Component</key>
  <real>0.090461708605289459</real>
 </dict>
 <key>Ansi 5 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.87639153003692627</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.47924214601516724</real>
  <key>Red Component</key>
  <real>0.84598284959793091</real>
 </dict>
 <key>Ansi 6 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.87775212526321411</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.81978398561477661</real>
  <key>Red Component</key>
  <real>0.0</real>
 </dict>
 <key>Ansi 7 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.79459840059280396</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.75171965360641479</real>
  <key>Red Component</key>
  <real>0.72623991966247559</real>
 </dict>
 <key>Ansi 8 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.51439088582992554</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.46512907743453979</real>
  <key>Red Component</key>
  <real>0.43546438217163086</real>
 </dict>
 <key>Ansi 9 Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.3651004433631897</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.27986931800842285</real>
  <key>Red Component</key>
  <real>0.94453364610671997</real>
 </dict>
 <key>Background Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.20697581768035889</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.17255491018295288</real>
  <key>Red Component</key>
  <real>0.15368783473968506</real>
 </dict>
 <key>Badge Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>0.5</real>
  <key>Blue Component</key>
  <real>0.0</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.1491314172744751</real>
  <key>Red Component</key>
  <real>1</real>
 </dict>
 <key>Bold Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.79459840059280396</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.75171965360641479</real>
  <key>Red Component</key>
  <real>0.72623991966247559</real>
 </dict>
 <key>Cursor Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.78104829788208008</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.78105825185775757</real>
  <key>Red Component</key>
  <real>0.7810397744178772</real>
 </dict>
 <key>Cursor Guide Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>0.25</real>
  <key>Blue Component</key>
  <real>1</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.9268307089805603</real>
  <key>Red Component</key>
  <real>0.70213186740875244</real>
 </dict>
 <key>Cursor Text Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>1</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>1</real>
  <key>Red Component</key>
  <real>0.99999600648880005</real>
 </dict>
 <key>Foreground Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.88178509473800659</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.81525641679763794</real>
  <key>Red Component</key>
  <real>0.76566249132156372</real>
 </dict>
 <key>Link Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.99828165769577026</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.69009816646575928</real>
  <key>Red Component</key>
  <real>0.087849192321300507</real>
 </dict>
 <key>Selected Text Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.88072347640991211</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.81633096933364868</real>
  <key>Red Component</key>
  <real>0.76351004838943481</real>
 </dict>
 <key>Selection Color</key>
 <dict>
  <key>Alpha Component</key>
  <real>1</real>
  <key>Blue Component</key>
  <real>0.30914402008056641</real>
  <key>Color Space</key>
  <string>sRGB</string>
  <key>Green Component</key>
  <real>0.27484309673309326</real>
  <key>Red Component</key>
  <real>0.24596336483955383</real>
 </dict>
</dict>
</plist>
```
</div>
</details>
<br>

[repository]: https://github.com/chinhsuanwu/one-dark-pro-iterm
