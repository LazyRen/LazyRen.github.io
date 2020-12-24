---
layout: post
title: "Adding Foldable Submenu to the Sidebar"
subtitle: "Adding Foldable Submenu to the Sidebar"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-08-02/sidebar.png
---

Sidebar & category/tag has been modified as of 2020/12/15.<br>
I'm updating this post to reflect those changes I've made.
{:.note}

In this post, I'll guide you how to add a submenu to the sidebar navigation.

<!--more-->

There is few files you need to edit/add for this.<br>

```default
/_sass/my-inline.scss
/_includes/body/nav.html
/_layouts/tag-list.html
/_featured_categories/*.md
/_featured_tags/*.md
```

* this unordered seed list will be replaced by the toc
{:toc}

## my-inline.scss

Add below code to the [_sass/my-inline.scss file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_sass/my-inline.scss), so it can display submenu properly.<br>

used `scss` file has been changed to `my-inline.scss` from `my-style.scss` to prevent FOUC as much as possible. `Sidebar-sticky` still moves up and down at the first time tho...
{.note}

```css
// Sidebar Modification

.sidebar {
  text-align: center;
}

.sidebar-sticky {
  position: absolute;
  height: 100%;
  padding-top: 5%;
}

.sidebar-nav-item {
  width:100%;
  padding: .25rem 0;
}

.sidebar-nav-subitem {
  @extend .f4;
  width:100%;
  display: inline-block;
  padding: .25rem 0;
}

.sidebar-nav-subitem:last-child {
  margin: 0 0 4px 0;
}

.list-wrapper {
  text-align: left;
  display: flex;
}

.list-body {
  text-align: left;
  margin: 0;
}

.sidebar-about {
  > a.sidebar-title {
    &::after {
      width: 9rem;
    }
  }
}

// Submenu Insertion

.folder {
  color: #fff;
  font-size: large;
  position: absolute;
  cursor: pointer;
  right: 30px;
}

.folder:hover {
  color: #4FB1BA;
}

input[type="checkbox"]{
  display: none;
}

input[type="checkbox"] ~ ul{
  height: 0;
  transition: transform .2s ease-out;
  transform: scaleY(0);
}

input[type="checkbox"]:checked ~ ul{
  list-style: none;
  height: 100%;
  transform-origin: top;
  transition: transform .2s ease-out;
  transform: scaleY(1);
}

```

## nav.html

![git diff](/assets/img/2020-08-02/nav_html.png)

Change made in `my-inline.scss` was to properly show submenu.<br>
Changes in [this file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/body/nav.html) is to actually print submenu(tags) to the sidebar.

### Code explanation

```html
{% raw %}
{% assign nodes = site.pages | concat: site.documents | where: "sidebar", true | sort: "order" %}
{% assign tag_nodes = nodes | where: "type", "tag" %}
{% for node in nodes %}
  {% unless node.redirect_to %}
    {% if node.type != "tag" %}
      {% assign subnodes = tag_nodes | where_exp: "item", "item.category == node.slug" %}
      {% assign count = count | plus: 1 %}
      <li>
        {% if subnodes != empty %}
          <input type="checkbox" id="list-item-{{ count }}" />
        {% endif %}
        <div class="list-wrapper">
          <a {% if forloop.first %}id="_navigation"{% endif %} href="{{ node.url | relative_url }}" class="sidebar-nav-item" {% if node.rel %}rel="{{ node.rel }}"{% endif %} >{{ node.title }}</a>
          {% if subnodes != empty %}
            <label class="folder" for="list-item-{{ count }}">▾</label>
          {% endif %}
        </div>
        {% for subnode in subnodes %}
          {% if forloop.first %}<ul class="list-body">{% endif %}
              <li>
                <a class="sidebar-nav-subitem" href="{{ subnode.url | relative_url }}">{{ subnode.title }}</a>
              </li>
          {% if forloop.last %}</ul>{% endif %}
        {% endfor %}
      </li>
    {% endif %}
  {% else %}
    <li>
      <a href="{{ node.redirect_to }}" class="sidebar-nav-item external">{{ node.title }}</a>
    </li>
  {% endunless %}
{% endfor %}
{% endraw %}
```

Above is the actual code that I've added. I'll try my best to explain in detail for each code segment.

```html
{% raw %}
{% assign nodes = site.pages | concat: site.documents | where: "sidebar", true | sort: "order" %}
{% assign tag_nodes = nodes | where: "type", "tag" %}
{% endraw %}
```

`nodes`: From all the site pages & documents, take pages that has been mareked as `sidebar: true`. For me, In addition to the categories & tags, I've also added such property to [about.md](https://github.com/LazyRen/LazyRen.github.io/blob/master/about.md) & [tags.md](https://github.com/LazyRen/LazyRen.github.io/blob/master/tags.md).<br>
`tag_nodes`: From what we've collected, filter tags only.(We've set the sidebar & tag property in `*.md` file)

```html
{% raw %}
{% for node in nodes %}
  {% unless node.redirect_to %}
    {% if node.type != "tag" %}
      {% assign subnodes = tag_nodes | where_exp: "item", "item.category == node.slug" %}
      {% assign count = count | plus: 1 %}
      <li>
        {% if subnodes != empty %}
          <input type="checkbox" id="list-item-{{ count }}" />
        {% endif %}
        <div class="list-wrapper">
          <a {% if forloop.first %}id="_navigation"{% endif %} href="{{ node.url | relative_url }}" class="sidebar-nav-item" {% if node.rel %}rel="{{ node.rel }}"{% endif %} >{{ node.title }}</a>
          {% if subnodes != empty %}
            <label class="folder" for="list-item-{{ count }}">▾</label>
          {% endif %}
        </div>
        {% for subnode in subnodes %}
          {% if forloop.first %}<ul class="list-body">{% endif %}
              <li>
                <a class="sidebar-nav-subitem" href="{{ subnode.url | relative_url }}">{{ subnode.title }}</a>
              </li>
          {% if forloop.last %}</ul>{% endif %}
        {% endfor %}
      </li>
    {% endif %}
  {% else %}
    <li>
      <a href="{{ node.redirect_to }}" class="sidebar-nav-item external">{{ node.title }}</a>
    </li>
  {% endunless %}
{% endfor %}
{% endraw %}
```

While iterating nodes, create menu for those that aren't `tag` type.(Because `tag` type will be shown only as a submenu.)<br>
`subnodes`: list of pages that have same `category` as a current `node.slug`. the property of `sidebar` is already filtered previously.<br>
We create checkbox & label *iff* `subnodes` list is not empty. And create list of subnodes below.

## tag-list.html

Adding [this file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_layouts/tag-list.html) to `_layouts` folder will enable using `layout: tag-list` for the featured_tags.<br>

## _featured_categories/*.md

Category is used as a main menu for the sidebar.<br>
Note that `type` property has been added to indicate it is `category`.<br>
`sidebar` property is also added, set it to `true` if you wish to see category from the sidebar.

```markdown
---
layout: list
type: category
title: Devlog
slug: devlog
sidebar: true
order: 2
description: >
  Anything about Development
---
```

## _featured_tags/*.md

add *.md file into the `_featured_tags` folder.<br>
Set `type` property as a `tag`.
If you wish to see tag from the sidebar, set `sidebar` property to `true`.<br>

```markdown
---
layout: tag-list
type: tag
title: Algorithm
slug: algorithm
category: devlog
sidebar: true
order: 1
description: >
   Algorithm study / Problem solutions
---
```
