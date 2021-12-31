---
layout: post
title: "Use Utterances/Giscus for Jekyll Comments System"
subtitle: "Use Utterances for Jekyll Comments System"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/utterances.png
---

Disqus is used as default comments plugin for the Hydejack and most of the static site.
But I had some issues with Disqus, so I looked elsewhere to find new comments plugin.

1. Disqus loads slowly.<br>
2. link within comment is **broken**.<br>
   The most important reason I chose to move on. Disqus automatically adds prefix starting with `disq.us/url?`, the problem is.... `disq.us` is not responding so the link gets lost.

[Utterances] uses github issues to save & display comments. So you have to give proper permission to the github-bot. But once you set things up correctly, it works very smoothly and fast. Only downside I've encountered so far is that it requires user to login to the github in order to write comments, and there is no default `reply` function. (All though you can mimic reply using `>` & `@`...)

[Giscus] is almost identical to the `Utterances` except that it uses `github discussion` instead of `issues`.<br>
I have once again migrated to giscus from utterances. It seems 'discussions' is more appropriate than 'issues' to place comments.

[Utterances]: https://utteranc.es/
[Giscus]: https://giscus.vercel.app/

<!--more-->

It's not hard to setup [utterances](https://github.com/utterance/utterances) or [giscus](https://github.com/laymonage/giscus).<br>
First of all, you should install [utterances app](https://github.com/apps/utterances)/[giscus app](https://github.com/apps/giscus) to the blog repository.
After that, since we are gonna migrate from disqus, proper changes must be made to `my-comments.html` & `links-static.html`.<br>

3 files to be modified. (check [utterance commit] or [giscus commit])

[utterance commit]: https://github.com/LazyRen/LazyRen.github.io/commit/8dcf03700c7f3d0f581b27a6fcf2e8a4d8396340
[giscus commit]: https://github.com/LazyRen/LazyRen.github.io/commit/053deedc4a5a3f49cf04cb8e8b496120aeab24a1

```default
/_config.yml
/_includes/my-comments.html
/_includes/head/links-static.html
/_sass/my-style.scss
```

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

If you followed [instructions from utterances](https://utteranc.es/)/[giscus](https://giscus.vercel.app/),
you will end up with simple javascript code like below.

* utterances

    ```javascript
    <script src="https://utteranc.es/client.js"
            repo="[ENTER REPO HERE]"
            issue-term="pathname"
            label="comments"
            theme="photon-dark"
            crossorigin="anonymous"
            async>
    </script>
    ```

    My recommendation for the utterances theme is, `github-light` for the light mode, `photon-dark` for the dark mode.
    {:.note}

* giscus

    ```javascript
    <script src="https://giscus.app/client.js"
            data-repo="[ENTER REPO HERE]"
            data-repo-id="[your-repo-id]"
            data-category="Comments"
            data-category-id="[your-category-id]"
            data-mapping="pathname"
            data-reactions-enabled="1"
            data-theme="dark_dimmed"
            crossorigin="anonymous"
            async>
    </script>
    ```

There is two choices,

1. Hard coding: you can simply copy this code to the `my-comments.html`.
2. You can use `_config.yml` so it can be more configurable.

I'll go with the second choice. Either way, you have to put `comments: provider:` to the `_config.yml`.

```yaml
# file: "/_config.yml"
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

# You must install giscus github app before use.(https://github.com/apps/giscus)
# Make sure all variables are set properly. Check below link for detail.
# https://giscus.vercel.app/
giscus:
  repo:                "LazyRen/LazyRen.github.io"
  repo-id:             "[your-repo-id]"
  category:            "Comments"
  category-id:         "[your-category-id]"
  mapping:             "pathname"
  reaction-enabled:    "1"
  theme:               "dark_dimmed"
  crossorigin:         "anonymous"
```

Insert above variables somewhere in `_config.yml`.<br>
In my case, I've putted in `# 3rd Party Integrations` where original `disqus` variable was located.<br>
`site.comments.provide` will be used in `my-comments.html` & `links-static.html` to set up comment section of the post.

You may have different values based on your option choices.

## my-comments.html

Choose the right comment provider's code to insert based on the `site.comments.provider`.(that we've mentioned in `_config.yml`).

disqus's code will remain as-is, we only need to add utterances/giscus's code so it can parse values from `_config.yml`.
If you don't want to use `_config.yml`, you may just copy & hard-code script from [utterances](https://utteranc.es/)[giscus](https://giscus.vercel.app/).

```html
<!-- file: "/_includes/my-comments.html" -->
{%- raw -%}
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
            repo={{ utterances.repo }}
            issue-term={{ utterances.issue-term }}
            label={{ utterances.label }}
            theme={{ utterances.theme }}
            crossorigin= "anonymous"
            async>
    </script>
  {% endif %}
{% elsif provider == "giscus" %}
  {% assign giscus = site.giscus %}
  {% if giscus.repo %}
    <script src="https://giscus.app/client.js"
            data-repo={{ giscus.repo }}
            data-repo-id={{ giscus.repo-id }}
            data-category={{ giscus.category }}
            data-category-id={{ giscus.category-id }}
            data-mapping={{ giscus.mapping }}
            data-reactions-enabled={{ giscus.reaction-enabled }}
            data-theme={{ giscus.theme }}
            crossorigin={{ giscus.crossorigin }}
            async>
    </script>
  {% endif %}
{% endif %}
{% endraw %}
```

## links-static.html

You don't want to link disqus if you are not using it. Wrap linking line with proper if statement.

```html
<!-- file: "/_includes/head/links-static.html" -->
{%- raw -%}
{% if site.comments.provider == "disqus" and site.disqus %}
  <link rel="dns-prefetch" href="https://{{ disqus }}.disqus.com" id="_hrefDisqus">
{% endif %}
{% endraw %}
```

## my-style.scss

To [adjust size of utterances](https://github.com/utterance/utterances/issues/160)/[giscus](https://github.com/laymonage/giscus/issues/90) to fit into the blog content-width, insert below code into `_sass/my-style.scss`.

```css
/* file: "/_sass/my-style.scss" */
.utterances {
  max-width: 100%;
}

.giscus, .giscus-frame {
  width: 100%;
}

.giscus-frame {
  border: none;
}
```
