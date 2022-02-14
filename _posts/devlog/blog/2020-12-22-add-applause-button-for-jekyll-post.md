---
layout: post
title: "Add Applause Button for Jekyll Post"
subtitle: "Add Applause Button for Jekyll Post"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/post_end.png
---

When I revisited the [Hydejack official site](https://hydejack.com/showcase/lazyren/), I noticed little [clapping button](https://help.medium.com/hc/en-us/articles/115011350967-Claps) that set at the end of the post.<br>
It seems good idea to have light-cost (compare to commenting) way to communicate with visitors. So I gave some research on it and finally made it as above.

<!--more-->

So I ended up with [applause](https://applause-button.com/). Which is free, ([donation](https://opencollective.com/applause-button) for a good service is always an option) and easy-to-install. (not 100% true, if you ask me. I couldn't find a good guideline on how to customize it.)

![Backer](/assets/img/2020-12-22/backer.png)

I also donated $5!
{:.note title="Donation"}

Basically, I will add applause button for each-and-every post. Unless author specifically set it otherwise.<br>

4 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/346f496d80243fcfbd0f24b47daa10078efe954f))

```default
/_config.yml
/_includes/head/links-static.html
/_includes/components/dingbat.html
/_sass/my-style.scss
```

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

It's not really necessary, but I just wanted to avoid inserting `applause_button: true` to each and every posts' front matter.
If you have a post that doesn't need applause button, insert `applause_button: false` to the front matter of that post.

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

## dingbat.html

Applause button(if enabled) seats between contents and post-nodes such as author / comments.<br>
If Applause button is disabled, make sure to prints original dingbat. I've used site's accent_color (which you can change from `_config.yml`), but feel free to choose the best color for your blog.

```html
<!-- file: "/_includes/components/dingbat.html" -->
{%- raw -%}
{% if page.applause_button %}
  <applause-button class="mb6"
    color={{ site.accent_color | default:'rgb(79,177,186)' }}
    url={{ post.url | absolute_url }} >
  </applause-button>
{% else %}
  <!-- original content of dingbat.html -->
{% endif %}
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

## Append Clap Count to the Post List

![clap-count](/assets/img/2022-02-06/list.png)

Check [Append Clap Count to the Post List](append-clap-count-to-the-post-list){:.heading.flip-title} post.

Back to [How I customized Hydejack Theme](how-i-customized-hydejack-theme){:.heading.flip-title}
{:.read-more}
