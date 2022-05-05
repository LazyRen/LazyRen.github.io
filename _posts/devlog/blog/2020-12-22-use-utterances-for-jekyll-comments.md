---
layout: post
title: "Use Utterances/Giscus for Jekyll Comments System"
subtitle: "Use Utterances/Giscus for Jekyll Comments System"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/utterances.png
---

Disqus is used as the default comments plugin for the Hydejack and most of the static sites. But I had some issues with
Disqus, so I looked elsewhere to find new comments plugin.

1. Disqus loads slowly.<br>
2. link within the comment is **broken**.<br>
   The most important reason I chose to move on. Disqus automatically adds prefix starting with `disq.us/url?`,
   the problem is.... `disq.us` is not responding so the link gets lost.

[Utterances] uses GitHub issues to save & display comments. So you have to give proper permission to the GitHub bot.
But once you set things up correctly, it works very smoothly and fast. The only downside I've encountered so far is that
it requires a user to log in to GitHub to write comments, and there is no default `reply` function.
(All though you can mimic reply using `>` & `@`...)

[Giscus] is almost identical to the `Utterances` except that it uses `GitHub discussion` instead of `issues`.<br>
I have once again migrated to Giscus from Utterances. It seems 'discussions' is more appropriate than 'issues' to place
comments.

[Utterances]: https://utteranc.es/
[Giscus]: https://giscus.vercel.app/

[Utterances]: https://utteranc.es/
[Giscus]: https://giscus.vercel.app/

<!--more-->

It's not hard to set up [Utterances] or [Giscus].<br>
First of all, you should install [Utterances app]/[Giscus app] to the blog repository. After that, since we are gonna
migrate from Disqus, proper changes must be made to `my-comments.html` & `links-static.html`.<br>

[Utterances app]: https://github.com/apps/utterances
[Giscus app]: https://github.com/apps/giscus

3 files to be modified. (check [Utterance commit] or [Giscus commit])

[Utterance commit]: https://github.com/LazyRen/LazyRen.github.io/commit/8dcf03700c7f3d0f581b27a6fcf2e8a4d8396340
[Giscus commit]: https://github.com/LazyRen/LazyRen.github.io/commit/053deedc4a5a3f49cf04cb8e8b496120aeab24a1

```default
/_config.yml
/_includes/my-comments.html
/_includes/head/links-static.html
/_sass/my-style.scss
```

* this unordered seed list will be replaced by the toc
{:toc}

## _config.yml

If you followed instructions for [Utterances]/[Giscus], you will end up with simple javascript code like the below.

* Utterances

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

  My recommendation for the Utterances theme is, `github-light` for the light mode, `photon-dark` for the dark mode.
  {:.note}

* Giscus

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

There are two choices,

1. Hard coding: you can simply copy this code to the `my-comments.html`.
2. You can use `_config.yml` so it can be more configurable.

I'll go with the second choice. Either way, you have to put `comments: provider:` to the `_config.yml`.

```yaml
# file: "/_config.yml"
# Set which comment system to use
comments:
  # 'disqus' / 'giscus' / 'utterances' are available
  provider:            giscus

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

Choose the right comment provider's code to insert based on the `site.comments.provider`.
(that we've mentioned in `_config.yml`).

Disqus's code will remain as-is, we only need to add Utterances/Giscus's code so it can parse values from `_config.yml`.
If you don't want to use `_config.yml`, you may just copy & hard-code script from the [Utterances]/[Giscus].

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

You don't want to link Disqus if you are not using it. Wrap linking line with proper if statement.

```html
<!-- file: "/_includes/head/links-static.html" -->
{%- raw -%}
{% if site.comments.provider == "disqus" and site.disqus %}
  <link rel="dns-prefetch" href="https://{{ disqus }}.disqus.com" id="_hrefDisqus">
{% endif %}
{% endraw %}
```

## my-style.scss

To [adjust size of Utterances]/[or of Giscus] to fit into the blog content-width, insert below code into
`_sass/my-style.scss`.

[adjust size of Utterances]: https://github.com/utterance/utterances/issues/160
[or of Giscus]: https://github.com/laymonage/giscus/issues/90

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

Back to [How I customized Hydejack Theme](how-i-customized-hydejack-theme){:.heading.flip-title}
{:.read-more}
