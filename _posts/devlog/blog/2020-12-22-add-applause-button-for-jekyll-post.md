---
layout: post
title: "Add Applause Button for Jekyll Post"
subtitle: "Add Applause Button for Jekyll Post"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/post_end.png
---

When I revisited the [Hydejack official site], I noticed a little [clapping button] that set at the end of the post.<br>
It seems a good idea to have a light-cost (compare to commenting) way to communicate with visitors. So I gave some
research on it and finally made it as above.

<!--more-->

So I ended up with [applause].<br>
Which is free, ([donation] for a good service is always an option) and easy-to-install.<br>
(not 100% true, if you ask me. I couldn't find a good guideline on how to customize it.)

![Backer](/assets/img/2020-12-22/backer.png)

I also donated $5!
{:.note title="Donation"}

Basically, I will add an applause button for the each-and-every post. Unless the author specifically set it otherwise.

4 files to be modified. (check [related commit])

```default
/_config.yml
/_includes/head/links-static.html
/_includes/components/dingbat.html
/_sass/my-style.scss
```

[Hydejack official site]: https://hydejack.com/showcase/lazyren/
[clapping button]: https://help.medium.com/hc/en-us/articles/115011350967-Claps
[applause]: https://applause-button.com/
[donation]: https://opencollective.com/applause-button
[related commit]: https://github.com/LazyRen/LazyRen.github.io/commit/346f496d80243fcfbd0f24b47daa10078efe954f

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

It's not really necessary, but I just wanted to avoid inserting `applause_button: true` to every post's front matter. If
you have a post that doesn't need an applause button, insert `applause_button: false` to the front matter of that post.

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

Jekyll needs js & CSS files ready. So here it is. Add the below code to the end of the file.

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
If the Applause button is disabled, make sure to print the original dingbat. I've used the site's accent_color (which
you can change from `_config.yml`), but feel free to choose the best color for your blog.

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

Add the below code to the end of the file.

* Change size
* Make button centered
* Number has the same color as applause button

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
