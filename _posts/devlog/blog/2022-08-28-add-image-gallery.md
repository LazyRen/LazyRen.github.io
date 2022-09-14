---
layout: post
title: "Add Image Gallery for the All Images in Markdown Post"
subtitle: "Add Image Gallery for the All Images in Markdown Post"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2022-08-28/gify_neo.gif
---

Recently, I got a [question] asking about the functionality to make image pop up so viewer can have
a better look at it. I'm not sure what is the common name of the functionality (*popup image? image gallery?*),
but I happens to have thought about the same feature long time ago, but never started
implementation. So I thought this would be the good time to start it!<br>
~~And it took whole friday night because I didn't know that `element.src` and
`element.getAttribute(src)` returns different thing~~

[question]: https://github.com/LazyRen/LazyRen.github.io/issues/65

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Extension Candidates

Apparently, there are many image gallery Javascript/JQuery extensions.

* [PhotoSwipe](https://photoswipe.com/)
* [LightBox](https://lokeshdhakar.com/projects/lightbox2/)
* [Magnific Popup](https://dimsemenov.com/plugins/magnific-popup/)
* ...

Since I have NO idea about which is better, I simply went to their github and tried the one that are
still actively maintained. Which was [PhotoSwipe](https://github.com/dimsemenov/photoswipe). But
it had a huge problem. [It does not support auto calculation of the image size!]

After some digging, I found a perfect candidate **[LightBox plugin for the Jekyll]**. It's very
simple and easy to play with. I had to make some change so it can be used with Hydejack theme.

I highly appreciate for the [Jekyll Codex]. Codex done all the hard work and made my day easier.
{:.note title="Appreciation"}

[It does not support auto calculation of the image size!]: https://stackoverflow.com/a/39971595/4294737
[LightBox plugin for the Jekyll]: https://jekyllcodex.org/without-plugin/lightbox/#
[Jekyll Codex]: https://jekyllcodex.org/

## What it does

The Jekyll converts markdown image syntax `![alt_txt](src_path)` to `html` like
`<p><img src="src_path" alt="alt_txt"></p>`. But what we need is `img` tag surrounded by [anchor tag].

So the modified version of `lightbox.js` parses all the `img` tag and wrap it with `a` tag before
doing anything else. If you want particular image not to be touched, put `no-lightbox` class to it.

Example:

{:.text-align-center}
![Neo with lightbox](/assets/img/2022-08-28/neo.jpg){:width="33%"}
![Neo w/o lightbox](/assets/img/2022-08-28/neo.jpg){:.no-lightbox width="33%"}

Left: LightBox on / Right: LightBox off<br>
You need bigger image to maximize *Neo*'s cuteness.
{:.figcaption}

Markdown:

```markdown
![Neo with lightbox](/assets/img/2022-08-28/neo.jpg)
![Neo w/o lightbox](/assets/img/2022-08-28/neo.jpg){:.no-lightbox}
```

[anchor tag]: https://www.w3schools.com/tags/tag_a.asp

## Implementation

If you think code speaks all, [here] is the link to the commit.

[here]: https://github.com/LazyRen/LazyRen.github.io/commit/f9b5a87bb199bc9a49048b8af222c1bc191cacd0

### Download Necessary Files

[The plugin] comes with two files. [`lightbox.js`] and [`lightbox.css`]. Save those to the
`/assets/js` & `/assets/css` accordingly.

The given link to the [`lightbox.js`] is **not identical** to the one from the original page. I have
made some changes to it and it is necessary for you to download the fixed version to run it in
Hydejack blog.
{:.note}

[The plugin]: https://jekyllcodex.org/without-plugin/lightbox/
[`lightbox.js`]: https://github.com/LazyRen/LazyRen.github.io/blob/master/assets/js/lightbox.js
[`lightbox.css`]: https://raw.githubusercontent.com/jhvanderschee/jekyllcodex/gh-pages/css/lightbox.css

### [_config.yml]

Simply puts below option to anywhere.<br>
(Somewhere around `# 3rd Party Integrations` would be sufficient)

```yml
# file: "_config.yml"
lightbox: true
```

[_config.yml]: https://github.com/LazyRen/LazyRen.github.io/blob/master/_config.yml#L227

### [links-static.html]

Add below to the end of the file so the `css` file can be linked.

```html
<!-- file: "_includes/head/links-static.html" -->
{%- raw -%}
{% if site.lightbox %}
  <link rel="stylesheet" href="/assets/css/lightbox.css">
{% endif %}
{% endraw %}
```

[links-static.html]: https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/head/links-static.html#L41

### [my-scripts.html]

Import `js` script file that we've downloaded, and use [Hydejack event listener] so the code can be
executed every time the new page gets loaded.

```html
<!-- file: "_includes/my-scripts.html" -->
{%- raw -%}
{% if site.lightbox %}
  <script src="/assets/js/lightbox.js"></script>
{% endif %}

<script>
  document
    .getElementById("_pushState")
    .addEventListener("hy-push-state-load", function () {
      apply_lightbox();
    });
</script>
{% endraw %}
```

[my-scripts.html]: https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/my-scripts.html
[Hydejack event listener]: https://hydejack.com/docs/scripts/#registering-push-state-event-listeners
