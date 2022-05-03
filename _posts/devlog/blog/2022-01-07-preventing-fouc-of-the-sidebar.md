---
layout: post
title: "Preventing FOUC of the Sidebar"
subtitle: "Preventing FOUC of the Sidebar"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2022-01-07/comparison.gif
---

I always hated the sudden glitch of the sidebar at the very beginning of the web page loading.
Yes, it only happens on the very first page of my blog, yet it really bugs me. They even have a name for it. **FOUC**.
Stands for *flash of unstyled content*. Let's ease the symptom for the sidebar at least a little.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Find the cause of the problem

![FOUC](/assets/img/2022-01-07/fouc.gif){:.centered width="25%"}

I have inlined the CSS file for the sidebar content.
Using `my-inline.scss` instead of `my-style.scss` helped me ease the symptom a little. But couldn't stop it from
happening. For some reason, `padding-top` is applied after content is loaded so I can see that the content is loaded at
the very top, and flashes back to the coded location.

```css
/* file: "/_sass/my-inline.scss" */
.sidebar-sticky {
  height: 100%;
  padding-top: 5%;
  position: absolute;
}
```

## Solution

I found a [workaround solution] that enforces code to slowly appear to give time for it to load & apply CSS properly.
I know this is just a workaround, and the problem still lies below, but as long as I don't see it, I'm okay with it...

You may check my [commit]. The implementation is very simple. I'll give `fadeIn` animation to the web element that is
suffering the *FOUC* problem. So viewers won't notice it.

### Implementation

There are only two files to touch.

```default
/_includes/body/sidebar-sticky.html
/_sass/my-inline.scss
```

#### sidebar-sticky.html

Add `no-fouc` class to the `sidebar-sticky`.

```html
<!-- file: "/_includes/body/sidebar-sticky.html" -->
<!-- ...-->
<div class="sidebar-sticky no-fouc">
<!-- ...-->
```

#### my-inline.scss

Append below code to the `my-inline.scss` file.<br>
Any web element with `no-fouc` class will have `fadeIn` animation for a 1 second.
This will likely hide *FOUC* happening.

```css
/* file: "/_sass/my-inline.scss" */
// Prevent FOUC

@keyframes fadeIn {
  0% { opacity: 0; }
  20% { opacity: 0; }
  40% { opacity: 0.4; }
  60% { opacity: 0.6; }
  80% { opacity: 0.8; }
  100% { opacity: 1; }
}

.no-fouc {
  -webkit-animation-duration: 1s;
  -webkit-animation-name: fadeIn;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-name: fadeIn;
  opacity: 0;
  // This line forces the browser to set the opacity to 1 after executing/finishing the animation
  opacity: 1;
}
```

## Side to Side Comparison

I'm personally very satisfied with the outcome :)

{:.text-align-center}
![FOUC](/assets/img/2022-01-07/fouc.gif){:width="33%"}
![FOUC Fixed](/assets/img/2022-01-07/fouc-fixed.gif){:width="33%"}

I still couldn't figure out why the background image of the sidebar is moving left & right for a brief moment.
If anyone can help me with this issue, please leave me a comment. It would be very much appreciated. :)
{:.note}

Back to [How I customized Hydejack Theme](how-i-customized-hydejack-theme){:.heading.flip-title}
{:.read-more}

[workaround solution]: https://stackoverflow.com/questions/33587623/prevent-fouc-in-firefox-and-ie/55106593#55106593
[commit]: https://github.com/LazyRen/LazyRen.github.io/commit/a53b484da6b376a656655515162fae8a1c2335c8
