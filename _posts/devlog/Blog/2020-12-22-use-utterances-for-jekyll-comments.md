---
layout: post
title: "Use Utterances for Jekyll Comments System"
subtitle: "Use Utterances for Jekyll Comments System"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/utterances.png
---

Disqus is somewhat default comments plugin for the Hydejack and most of the static site. But I had some issues with Disqus, so I looked elsewhere to find new comments plugin.

1. Disqus loads slowly.<br>
2. link within comment is **broken**.<br>
   The most important reason I chose to move on. Disqus automatically adds prefix starting with `disq.us/url?`, the problem is.... `disq.us` is not responding so the link gets lost.

`Utterances` uses github issues to save & display comments. So you have to give proper permission to the github-bot. But once you set things up correctly, it works very smoothly and fast. Only downside I've encountered so far is that it requires user to login to the github in order to write comments, and there is no default `reply` function. (All though you can mimic reply using `>` & `@`...)

<!--more-->

It's not hard to setup [utterances](https://github.com/utterance/utterances).<br>
First of all, you should install [utterances app](https://github.com/apps/utterances) to the blog repository.
Since we are gonna migrate from disqus, proper changes must be made to `my-comments.html` & `links-static.html`.<br>

3 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/8dcf03700c7f3d0f581b27a6fcf2e8a4d8396340))

```default
/_config.yml
/_includes/my-comments.html
/_includes/head/links-static.html
```

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

If you followed [instructions from utterances](https://utteranc.es/), you will end up with simple javascript code like below.

```javascript
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        label="comments"
        theme="dark-blue"
        crossorigin="anonymous"
        async>
</script>
```

There is two choices, you can simply copy this code to the `my-comments.html`, but why not use `_config.yml` so it can be more configurable in the future?

My recommendation for the theme is, `github-light` for the light mode, `dark-blue` for the dark mode.
{.note}

```yaml
# Set which comment system to use
comments:
  # 'disqus' or 'utterances' are available
  provider:            utterances

# You must install utterances github app before use.(https://github.com/apps/utterances)
# Make sure all variables are set properly. Check below link for detail.
# https://utteranc.es/
utterances:
  repo:                "LazyRen/LazyRen.github.io"
  issue-term:          "pathname"
  label:               "Comments"
  theme:               "dark-blue"
```

Insert above variables somewhere in `_config.yml`.<br>
In my case, I've putted in `# 3rd Party Integrations` where original `disqus` variable was located.<br>
`site.comments.provide` will be used in `my-comments.html` & `links-static.html` to set up comment section of the post.

You may have different values based on your option choices.

## my-comments.html

Choose the right comment provider's code to insert based on the `site.comments.provider`.(that we've mentioned in `_config.yml`).

disqus's code will remain as-is, we only need to add utterances's code so it can parse values from `_config.yml`. If you don't want to use `_config.yml`, you may just copy & hard-code script from [utterances](https://utteranc.es/).

```html
{% raw %}
{% assign provider = site.comments.provider | default:"disqus" %}
{% if provider == "disqus" %}
  {% assign disqus = site.disqus | default:site.disqus_shortname %}
  {% if disqus %}
    <!-- original disqus codes -->
  {% endif %}
{% elsif provider == "utterances" %}
  {% assign utterances = site.utterances %}
  {% if utterances.repo %}
    <script src="https://utteranc.es/client.js"
            repo=        {{ utterances.repo }}
            issue-term=  {{ utterances.issue-term }}
            label=       {{ utterances.label }}
            theme=       {{ utterances.theme }}
            crossorigin= "anonymous"
            async>
    </script>
  {% endif %}
{% endif %}
{% endraw %}
```

## links-static.html

You don't want to link disqus if you are not using it. Wrap linking line with proper if statement.

```html
{% raw %}
{% if site.comments.provider == "disqus" and site.disqus %}
  <link rel="dns-prefetch" href="https://{{ disqus }}.disqus.com" id="_hrefDisqus">
{% endif %}
{% endraw %}
```
