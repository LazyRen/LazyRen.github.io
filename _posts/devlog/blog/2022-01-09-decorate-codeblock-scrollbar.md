---
layout: post
title: "Decorate Codeblock Scrollbar"
subtitle: "Decorate Codeblock Scrollbar"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2022-01-09/scrollbar.gif
---

The default scrollbar shown for code block in the Hydejack theme is clunky.<br>
Let's change it to a fancier version like above. It's plain simple.

![Default Scrollbar](/assets/img/2022-01-09/default_scrollbar.png)

Hydejack Default Codeblock Scrollbar
{:.figcaption}

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## File to modify

There are few files you need to edit/add for this.<br>

```default
/_sass/my-style.scss
```

## my-style.scss

Append the below code to the `my-style.scss`. And we are done!

```css
/* file: "/_sass/my-style.scss" */
// Fancy Codeblock Scrollbar

pre {
  border-color: transparent;
  transition: border-color 0.5s ease;

  &::-webkit-scrollbar {
    height: 8px;
    width: auto;
  }

  &:hover {
    border-color: var(--gray);
    transition: border-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-color: inherit;
    border-radius: 10px;
    border-right-style: inset;
    border-right-width: calc(100vw + 100vh);
  }
}
```

## Playground

Feel free to play with decorated code block by yourself!

```default
This is a new decorated version of the code block scrollbar.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo fringilla massa imperdiet pretium. Vestibulum sit amet quam sem. Aliquam lectus orci, tincidunt ut nunc in, placerat viverra felis. Etiam volutpat pretium purus, ac hendrerit felis faucibus eu. Quisque aliquet lacus tortor, eu gravida mi pretium sit amet. Proin at sem nec ligula laoreet cursus eget nec erat. Praesent porttitor placerat tortor, a tincidunt velit volutpat et. Integer molestie libero vitae erat feugiat pellentesque. Morbi turpis purus, volutpat ut sem nec, pharetra tristique sapien.

Quisque tristique porta ex, eu tincidunt lacus pulvinar vitae. Pellentesque est turpis, pharetra sit amet lectus a, gravida blandit massa. Vivamus vestibulum, metus at imperdiet sodales, nisl dui consectetur leo, vitae dignissim nibh diam egestas ligula. Pellentesque feugiat rutrum nisi. Maecenas nec bibendum nulla, at ultricies augue. Nullam magna massa, tincidunt in enim eget, finibus tincidunt mauris. Pellentesque quis aliquam urna. Sed in erat id metus accumsan hendrerit. Phasellus aliquet pretium porttitor. Ut id magna et dui tempus congue. Phasellus tempor malesuada felis, quis rutrum quam condimentum facilisis.

Aenean consectetur auctor ex, molestie porttitor massa lobortis quis. Ut ac risus feugiat, placerat magna eu, rutrum orci. Nam ultricies, metus eu malesuada rhoncus, metus arcu placerat eros, vitae euismod purus augue ullamcorper lorem. Nam semper elit eu mauris molestie convallis. Aliquam placerat, mauris non malesuada dignissim, velit mi suscipit sapien, id feugiat arcu est id neque. Vivamus mattis molestie pellentesque. Cras ullamcorper euismod lorem eu luctus. Aenean hendrerit justo ex, eget hendrerit risus euismod sit amet. Maecenas nibh purus, tempor nec dolor nec, feugiat lobortis sapien. Integer eu dolor mauris. Etiam eleifend mollis nisl sit amet luctus. Vestibulum porttitor condimentum enim eget lobortis. Phasellus viverra leo a felis suscipit, vitae tempus metus consectetur. In a tincidunt ante.

Nullam sit amet malesuada quam. Morbi sollicitudin odio at leo dapibus scelerisque. Donec bibendum porta lectus quis mattis. Cras sed libero eu nibh facilisis semper nec a tellus. Nullam tincidunt eu purus vel interdum. Sed imperdiet leo nisl, nec finibus velit blandit quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas nec viverra enim.

Sed vitae felis sit amet elit rhoncus blandit nec vitae nunc. Morbi iaculis ligula sed est ornare, in tempor neque semper. Praesent at quam ullamcorper ante laoreet consectetur. Pellentesque posuere massa diam, quis consequat nisl pellentesque vitae. In in volutpat dui, non molestie nulla. Phasellus et egestas sem, vitae tempus quam. Sed sapien massa, pharetra et lorem at, molestie tincidunt augue. Aliquam viverra congue sapien, id congue tellus gravida sit amet.
```

* [Hide code block scroll bar until cursor is in block?](https://github.com/cotes2020/jekyll-theme-chirpy/issues/414)
{:.note title="Reference"}

Back to [How I customized Hydejack Theme](how-i-customized-hydejack-theme){:.heading.flip-title}
{:.read-more}
