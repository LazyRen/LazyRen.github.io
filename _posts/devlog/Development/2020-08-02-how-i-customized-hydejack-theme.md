---
layout: post
title: "How I customized Hydejack Theme"
subtitle: "How I customized Hydejack Theme"
category: devlog
tags: development blog
image:
  path: /assets/img/2020-08-02/showcase.png
---

Thanks to [@qwtel](https://qwtel.com/), I'm on the [showcase](https://hydejack.com/showcase/) of Hydejack's official site!<br>

I had a plan to write a post about what I customized, but thanks to his kind email, and posting on to the showcase, I've decided to write a post in English.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Documentations

First, you should check [Hydejack's documentations](https://hydejack.com/docs/) to install & proceed.<br>
If you wants to use free version, use [Hydejack-starter-kit](https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages).<br>
Clone or download it. Note that it's branch is gh-pages. Not the master branch.

## Customization

Hydejack theme provides `_sass/my-*.scss` files for a customization.<br>
It's very helpful if you wish to change css of your homepage.<br>
It overrides any default css provided by other files.

### Adding Submenu to the Sidebar

![Sidebar](/assets/img/2020-08-02/sidebar.png)

In this post, I'll post how to add submenu to the sidebar.<br>
There is few files you need to edit/add for this.<br>
You may wish to check [commit history](https://github.com/LazyRen/LazyRen.github.io/commit/89aa07da3b9e9081b933f61c24a42b765b6d30cd)

```default
_sass/my-style.scss
_includes/body/nav.html
_layouts/tag-list.html
_featured_categories/*.md
_featured_tags/*.md
```

#### my-style.scss

Add below code to the _sass/my-style.scss file, so it can display submenu properly.<br>

```css
// Sidebar Modification

.sidebar {
  text-align: center;
}

.sidebar-sticky {
  position: absolute;
  height: 95%;
  padding-top: 5%;
}

a.sidebar-nav-item {
  width:100%;
  font-weight: normal;
  display: block;
  padding: .25rem 0;
}

a.sidebar-nav-subitem {
  font-weight: normal;
  display: block;
  line-height: 1.75;
  padding: .25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.list-wrapper {
  text-align: left;
  display: flex;
}

.list-body {
  text-align: left;
  margin: 4px;
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
  font-size: x-large;
  position: absolute;
  cursor: pointer;
  right: 30px;
}

.folder:hover {
  color: #4FB1BA;
}

input[type="checkbox"]{
  position: absolute;
  left: -9999px;
}

input[type="checkbox"] ~ ul{
  height: 0;
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

#### nav.html

![git diff](/assets/img/2020-08-02/nav_html.png)

my-style.scss was to properly show submenu.<br>
Changes in this file is to actually print submenu(tags) in sidebar.

```html
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<ul>
  {% if site.menu %}
    {% for node in site.menu %}
      {% assign url = node.url | default: node.href %}
      <li>
        <a
          {% if forloop.first %}id="_navigation"{% endif %}
          href="{% include smart-url.txt url=url %}"
          class="sidebar-nav-item{% if page.url contains url %} active{% endif %}"
          {% if node.rel %}rel="{{ node.rel }}"{% endif %}
        >
          {{ node.name | default:node.title }}
        </a>
      </li>
    {% endfor %}
  {% else %}
    {% assign pages = site.pages %}
    {% assign documents = site.documents %}
    {% assign subpages = pages | concat: documents | where: "menu", false | where: "submenu", true | sort: "order" %}
    {% assign nodes = pages | concat: documents | where: "menu", true | sort: "order" %}

    {% for node in nodes %}
      {% assign count = count | plus: 1 %}
      {% unless node.redirect_to %}
        <li>
          <input type="checkbox" id="list-item-{{ count }}" />
          <div class="list-wrapper">
          <a
            {% if forloop.first %}id="_navigation"{% endif %}
            href="{{ node.url | relative_url }}"
            class="sidebar-nav-item{% if page.url contains node.url %} active{% endif %}"
            {% if node.rel %}rel="{{ node.rel }}"{% endif %}
            >
            {{ node.title }}
          </a>
          {% if node.submenu %}<label class="folder" for="list-item-{{ count }}">▾</label>{% endif %}
          </div>
          <ul class="list-body">
            {% for subnode in subpages %}
            {% if subnode.category == node.slug %}
            <li>
              <a class="sidebar-nav-subitem{% if page.url == subnode.url %} active{% endif %}" href="{{ subnode.url | relative_url }}">{{ subnode.title }}</a>
            </li>
            {% endif %}
            {% endfor %}
          </ul>
        </li>
      {% else %}
        <li>
          <a href="{{ node.redirect_to }}" class="sidebar-nav-item external" >{{ node.title }}</a>
        </li>
      {% endunless %}
    {% endfor %}
  {% endif %}
</ul>
```

#### tag-list.html

Adding this file to_layouts folder will enable using `layout: tag-list` for the featured_tags.<br>

```html
---
# Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

layout: base
---

{% assign posts = site.tags[page.slug] %}

{% if page.title.size > 0 %}
  <header>
    <h1 class="page-title">{{ page.title }}</h1>
    {% include components/message.html text=page.description hide=page.hide_description %}
  </header>
  <hr class="sr-only"/>
{% endif %}

{{ content }}

{% assign date_formats  = site.data.strings.date_formats               %}
{% assign list_group_by = date_formats.list_group_by | default:"%Y"    %}
{% assign list_entry    = date_formats.list_entry    | default:"%d %b" %}

{% for post in posts %}
  {% assign currentdate = post.date | date:list_group_by %}
  {% if currentdate != date %}
    {% unless forloop.first %}</ul>{% endunless %}
    <h2 id="{{ list_group_by | slugify }}-{{ currentdate | slugify }}" class="hr">{{ currentdate }}</h2>
    <ul class="related-posts">
    {% assign date = currentdate %}
  {% endif %}
  {% include components/post-list-item.html post=post format=list_entry %}
  {% if forloop.last %}</ul>{% endif %}
{% endfor %}
```

#### _featured_categories/*.md

Category is used as a main menu for the sidebar.<br>
Nothing specially added from the default one.<br>

```markdown
---
layout: list
title: Devlog
slug: devlog
menu: true
submenu: true
order: 2
description: >
  Anything about Development
---
```

#### _featured_tags/*.md

add *.md file into the `_featured_tags` folder.<br>
If you wish to print inthe sidebar as a submenu, set `category` to the desired one.<br>
`menu: false`, `submenu: true`. If you don't want it to be seen, just change option to `submenu: false`.<br>
If you don't like how menu & submenu option works. Set as you desire from `nav.html`.

```html
// nav.html
{% assign subpages = pages | concat: documents | where: "menu", false | where: "submenu", true | sort: "order" %}
```

```markdown
---
layout: tag-list
title: Blog
slug: blog
category: devlog
menu: false
submenu: false
order: 9
description: >
   Posts about blogging / jekyll theme.
---
```

## Conclusion

I'm not an expert in web development. Adding simple submenu was pretty challenging & time consuming job for me.<br>
You may find some odd parts, if you have any suggestions for the improvment please don't hesitate to contact me.<br>
I'd be very delightful to have any comments.<br>
