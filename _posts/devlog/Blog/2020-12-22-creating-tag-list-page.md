---
layout: post
title: "Creating Tag List Page"
subtitle: "Creating Tag List Page"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-12-21/tag_list.png
---

Since many tags are not listed on the sidebar, I've always wanted to have a page where I can see all categories & tags I've used for the posts. And visitor may click on it to navigate related posts. To implement tag list, you only need to create two files to have a such page.

<!--more-->

```default
/tags.md
/_layouts/tags.html
```

* this unordered seed list will be replaced by the toc
{:toc}

## tags.md

```markdown
---
layout: tags
title: Tags
permalink: /tags/
sidebar: true
order: 4
description: >
  List of all categories & tags of blog.
---
```

Create [tags.md](https://github.com/LazyRen/LazyRen.github.io/blob/master/tags.md) file in the root folder.<br>
It will be displayed in sidebar, so set `sidebar` accordingly, and we must create new layout [tags](#tagshtml).

### tags.html

[tags.html](https://github.com/LazyRen/LazyRen.github.io/blob/master/_layouts/tags.html) should be located in `_layouts` folder.<br>
It finds all categories & tags from the site & list them like `list` or `tag-list` style (they are layout that you will see when you click category or tag).<br>
`type` property is also used in here, so **make sure you've added property** to the `*.md` files in `/featured_categories` & `/featured_tags`. (They are **NOT** there by default! I've created new property for this.)

```liquid
---
layout: page
---
{% raw %}
{{ content }}

{% assign documents = site.documents %}
{% assign featured_categories = documents | where: "type", "category" | sort %}
{% assign featured_tags = documents | where: "type", "tag" | sort %}

{% assign categories = site.categories | sort %}
{% assign tags = site.tags | sort %}

{% for category in featured_categories %}
  <h2 id="{{ category.slug }}" class="hr">
    <a href="{{ category.url | relative_url }}">{{ category.title }}</a>
    {% for site_category in categories %}
      {% if site_category[0] == category.slug %}
        <span class="faded fine">{{ site_category | last | size }}</span>
      {% endif %}
    {% endfor %}
  </h2>
  <ul class="related-posts">
    {% for tag in featured_tags %}
      {% if tag.category == category.slug %}
        <li class="h6">
          <a href="{{ tag.url | relative_url }}">{{ tag.title }}</a>
          {% for site_tag in tags %}
            {% if site_tag[0] == tag.slug %}
              <span class="faded fine">{{ site_tag | last | size }}</span>
              {% break %}
            {% endif %}
          {% endfor %}
        </li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
{% endraw %}
```

It is very short code, but I invested some times to figure out how `liquid` is working.<br>
So... If you find this post useful, please click applause button for me :)
