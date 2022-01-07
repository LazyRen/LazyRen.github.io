---
layout: post
title: "How to Center an Image in Markdown"
subtitle: "Centering Image in Jekyll Blog with CSS"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2022-01-07/centered-image.png
---

From time to time, we want to align image center within the Jekyll post. But applying `CSS` style directly into the
markdown file with `HTML` tag is cumbersome and not pretty. And I'm [not the only one searching for the way]!
In this article, I'll guide you a easy solution to center an image within Jekyll blog post.

[not the only one searching for the way]: https://stackoverflow.com/questions/23819197/jekyll-blog-post-centering-images

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Kramdown

If you look at [Jekyll's official doc], Jekyll uses [Kramdown] with [GFM] preprocessor. The good thing about Kramdown is
that it gives you an extra option to modify markdown file. Check [Kramdown Quick Reference] or my [posting tip post].
As you may have found it, [Kramdown supports inline attributes]!

[Jekyll's official doc]: https://jekyllrb.com/docs/configuration/markdown/
[Kramdown]: https://kramdown.gettalong.org/quickref.html
[GFM]: https://github.com/kramdown/parser-gfm
[Kramdown Quick Reference]: https://kramdown.gettalong.org/quickref.html
[posting tip post]: https://lazyren.github.io/devlog/hydejack-post-writing-tips-tricks.html
[Kramdown supports inline attributes]: https://kramdown.gettalong.org/quickref.html#inline-attributes

## Using Kramdown Inline Attributes

The syntax for the inline attribute is very easy. Add whatever you want to the `{: }` syntax as below.

```markdown
This is *red*{: style="color: red"}.
```

### Create CSS Classes

You can also add `CSS Class` to the element. the syntax is `{:.class-name}`. I have created two class for the image
alignment. Append below code to the `_sass/my-style.scss`

```css
/* file: "/_sass/my-style.scss" */
// Image centering

.text-align-center {
  text-align: center;
}

img.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

There is also a way to do it without `class`. And I'll post both way, so please skip the part if you don't want
`CSS class`.
{:.note}

### Centering One Image

If you have installed `CSS Class` as above, you may choose to use first markdown example. If not, go with the second
option. Either way the outcome is the same. And if you wish to apply one-time attribute to the element, *say adjusting
`width` or `height` of the image*, it won't hurt to know the second option.

Example:

![FOUC](/assets/img/2022-01-07/fouc.gif){:.centered width="25%"}

Markdown:

```markdown
* With CSS class installed
    ![FOUC](/assets/img/2022-01-07/fouc.gif){:.centered width="25%"}

* Pure inline attribute used
    ![FOUC](/assets/img/2022-01-07/fouc.gif){:style="display:block; margin-left:auto; margin-right:auto" width="25%"}
```

### Centering Multiple Image

Example:

{:.text-align-center}
![FOUC](/assets/img/2022-01-07/fouc.gif){:width="25%"}
![FOUC Fixed](/assets/img/2022-01-07/fouc-fixed.gif){:width="25%"}

Markdown:

```markdown
* With CSS class installed
    {:.text-align-center}
    ![FOUC](/assets/img/2022-01-07/fouc.gif){:width="25%"}
    ![FOUC Fixed](/assets/img/2022-01-07/fouc-fixed.gif){:width="25%"}

* Pure inline attribute used
    {:style="text-align:center;"}
    ![FOUC](/assets/img/2022-01-07/fouc.gif){:width="25%"}
    ![FOUC Fixed](/assets/img/2022-01-07/fouc-fixed.gif){:width="25%"}
```

## Center All Images by Default

If you want all images to be centered by default, append below `CSS` code to the `_sass/my-style.scss`. But it may have
unexpected side effects. I have not tested it for long time.

```css
/* file: "/_sass/my-style.scss" */
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

Back to [How I customized Hydejack Theme](2020-08-02-how-i-customized-hydejack-theme.md){:.heading.flip-title}
{:.read-more}
