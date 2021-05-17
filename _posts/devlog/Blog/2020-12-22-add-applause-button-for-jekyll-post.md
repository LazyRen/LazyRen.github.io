---
layout: post
title: "Add Applause Button for Jekyll Post"
subtitle: "Add Applause Button for Jekyll Post"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/post_end.png
---

When I revisted the [hydejack's offical site](https://hydejack.com/showcase/lazyren/), I noticed little [clapping button](https://help.medium.com/hc/en-us/articles/115011350967-Claps) that set at the end of the post.<br>
It seems good idea to have light-cost (compare to commenting) way to communicate with visitors. So I gave some research on it and finally made it as above.

<!--more-->

[@qwtel](https://github.com/qwtelhttps://github.com/qwtel), the author of this jekyll theme provides a nice [applause button service](https://getclaps.dev/), but unfortunatelly, $5 per month is too expensive to pay for this small blog.

So I ended up with [applause](https://applause-button.com/). Which is free, ([donation](https://opencollective.com/applause-button) for a good service is always an option.) and easy-to-install.(not 100% true, if you ask me. I couldn't find good guideline on how to customize it.)

Basically, I will add applause button for each-and-every post. Unless author specifically set it otherwise.<br>

4 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/346f496d80243fcfbd0f24b47daa10078efe954f))

```default
/_config.yml
/_includes/head/links-static.html
/_layouts/post.html
/_sass/my-style.scss
```

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

It's not really necessary, but I just wanted to avoid inserting `applause_button: true` to each and every posts' frontmatter.
If you have a post that doesn't need applause button, insert `applause_button: false` to the frontmatter of that post.

```yaml
# file: "/_config.yml"
defaults:
  # You can use the following to enable comments on all posts.
  - scope:
      type:            posts
    values:
      # https://applause-button.com/
      applause_button:       true
```

## links-static.html

Jekyll needs js & css files ready. So here it is. Add below code to the end of the file.

```html
<!-- file: "/_includes/head/links-static.html" -->
{%- raw -%}
{% if page.applause_button %}
  <link rel="stylesheet" href="https://unpkg.com/applause-button/dist/applause-button.css">
  <script src="https://unpkg.com/applause-button/dist/applause-button.js"></script>
{% endif %}
{% endraw %}
```

## post.html

Applause button(if enabled) seats between contents and post-nodes such as author / comments.<br>
If Applause button is disabled, make sure to prints original dingbat. I've used site's accent_color (which you can change from `_config.yml`), but feel free to choose the best color for your blog.

```html
<!-- file: "/_layouts/post.html" -->
{%- raw -%}
<!-- ... -->
{% include components/dingbat.html %}

{% if page.applause_button %}
  <applause-button
    color={{ site.accent_color | default:'rgb(79,177,186)' }}
    url={{ site.url }}{{ page.url }} >
  </applause-button>
{% else %}
  <hr class="dingbat related" />
{% endif %}

{% assign addons = page.addons | default:site.hydejack.post_addons %}
<!-- ... -->
{% endraw %}
```

## my-style.scss

Add below code to the end of the file.

* Change size
* Make button centered
* Number has same color as applause button

```css
/* file: "/_sass/my-style.scss" */
// applause-button

applause-button {
  width: 80px;
  height: 80px;
  margin: 0 auto;

  .count-container {
    color: inherit;
  }
}
```
