---
layout: post
title: "Adding Foldable Submenu to the Sidebar"
subtitle: "Adding Foldable Submenu to the Sidebar"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-08-02/sidebar.png
---

* **2020/12/15** : Sidebar & category/tag has been modified.<br>
  I'm updating this post to reflect those changes I've made.
* **2022/01/07** : Update to print animated arrow for the foldable menu.
{:.note title="Changelog"}

In this post, I'll guide you to add a foldable submenu to the sidebar navigation.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Files to modify

There are a few files you need to edit/add for this.<br>

```default
/assets/js/sidebar-folder.js
/_sass/my-inline.scss
/_includes/head/links-static.html
/_includes/body/nav.html
/_layouts/tag-list.html
/_featured_categories/*.md
/_featured_tags/*.md
```

## sidebar-folder.js

You need to create a new `js` file to properly create animated arrows for the foldable submenu.
The script itself is pretty short and simple. So I won't go into detail about it. ~~I pretty much know nothing about JS.~~

```js
// file: "/assets/js/sidebar-folder.js"
function spread(count){
    document.getElementById('folder-checkbox-' + count).checked =
    !document.getElementById('folder-checkbox-' + count).checked
    document.getElementById('spread-icon-' + count).innerHTML =
    document.getElementById('spread-icon-' + count).innerHTML == 'arrow_right' ?
    'arrow_drop_down' : 'arrow_right'
}
```

## my-inline.scss

Add below code to the [_sass/my-inline.scss file], so it can display submenu properly.

Used `scss` file has been changed to `my-inline.scss` from `my-style.scss` to prevent FOUC as much as possible.
`sidebar-sticky` still moves up and down the first time tho...
{:.note}

[_sass/my-inline.scss file]: https://github.com/LazyRen/LazyRen.github.io/blob/master/_sass/my-inline.scss
*[FOUC]: Flash of Unstyled Content

```css
/* file: "/_sass/my-inline.scss" */
// Sidebar Modification

.sidebar {
  text-align: center;
}

.sidebar-sticky {
  height: 100%;
  padding-top: 5%;
  position: absolute;
}

.sidebar-nav-item {
  padding: .25rem 0;
  width:100%;
}

.sidebar-nav-subitem {
  @extend .f4;
  width:100%;
  padding: .25rem 0;
  display: inline-block;
}

.sidebar-nav-subitem:last-child {
  margin: 0 0 4px 0;
}

.list-wrapper {
  text-align: left;
  width: 18rem;
  display: flex;
}

.list-body {
  margin: 0;
  text-align: left;
}

.sidebar-about {
  > a.sidebar-title {
    &::after {
      width: 9rem;
    }
  }
}

// Submenu Insertion

.spread-btn{
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: right;
  width: 100%;
}

.spread-btn:hover{
  color: #4FB1BA;
}

input[type=checkbox]{
  display: none;
}

input[type=checkbox] ~ ul{
  height: 0;
  transform: scaleY(0);
  transition: transform .2s ease-out;
}

input[type=checkbox]:checked ~ ul{
  height: 100%;
  list-style: none;
  transform-origin: top;
  transform: scaleY(1);
  transition: transform .2s ease-out;
}
```

## links-static.html

You need to link the proper icon & js you just created to the page. Append the below code to the end of the
`links-static.html` file.

```html
<!-- file: "/_includes/head/links-static.html" -->
<!-- ... -->

<!-- For sidebar folder -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="/assets/js/sidebar-folder.js"></script>
```

## nav.html

![git diff](/assets/img/2020-08-02/nav_html.png)

Change made in `my-inline.scss` was to properly show submenu.<br>
Changes in [nav.html] is to actually print submenu(tags) to the sidebar.

[nav.html]: https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/body/nav.html

### Code explanation

```html
<!-- file: "/_includes/body/nav.html" -->
{%- raw -%}
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<ul>
  {% assign nodes = site.html_pages | concat: site.documents | where: "sidebar", true | sort: "order" %}
  {% assign tag_nodes = nodes | where: "type", "tag" %}
  {% for node in nodes %}
    {% unless node.redirect_to %}
      {% if node.type != "tag" %}
        {% assign subnodes = tag_nodes | where_exp: "item", "item.category == node.slug" %}
        {% assign count = count | plus: 1 %}
        <li>
          {% if subnodes != empty %}
            <input type="checkbox" id="folder-checkbox-{{ count }}" />
          {% endif %}
          <div class="list-wrapper">
            <a {% if forloop.first %}id="_navigation"{% endif %} href="{{ node.url | relative_url }}" class="sidebar-nav-item" {% if node.rel %}rel="{{ node.rel }}"{% endif %} >{{ node.title }}</a>
            {% if subnodes != empty %}
              <button class="spread-btn" onclick="javascript:spread({{ count }})">
                <label id="spread-icon-{{ count }}" class="material-icons">arrow_right</label>
              </button>
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
</ul>
{% endraw %}
```

Above is the actual code that I've added. I'll try my best to explain in detail for each code segment.

```liquid
{%- raw -%}
{% assign nodes = site.html_pages | concat: site.documents | where: "sidebar", true | sort: "order" %}
{% assign tag_nodes = nodes | where: "type", "tag" %}
{% endraw %}
```

`nodes`: From all the site pages & documents, take pages that has been marked as `sidebar: true`. For me, In addition to the categories & tags, I've also added such property to [about.md] & [tags.md].<br>
`tag_nodes`: From what we've collected, filter tags only.(We've set the sidebar & tag property in `*.md` file)

[about.md]: https://github.com/LazyRen/LazyRen.github.io/blob/master/about.md
[tags.md]: https://github.com/LazyRen/LazyRen.github.io/blob/master/tags.md

```liquid
{%- raw -%}
{% for node in nodes %}
  {% unless node.redirect_to %}
    {% if node.type != "tag" %}
      {% assign subnodes = tag_nodes | where_exp: "item", "item.category == node.slug" %}
      {% assign count = count | plus: 1 %}
      <li>
        {% if subnodes != empty %}
          <input type="checkbox" id="folder-checkbox-{{ count }}" />
        {% endif %}
        <div class="list-wrapper">
          <a {% if forloop.first %}id="_navigation"{% endif %} href="{{ node.url | relative_url }}" class="sidebar-nav-item" {% if node.rel %}rel="{{ node.rel }}"{% endif %} >{{ node.title }}</a>
          {% if subnodes != empty %}
            <button class="spread-btn" onclick="javascript:spread({{ count }})">
              <label id="spread-icon-{{ count }}" class="material-icons">arrow_right</label>
            </button>
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

While iterating nodes, create a menu for those that aren't `tag` type. (Because the `tag` type will be shown only as a
submenu.)

`subnodes`: list of pages that have the same `category` as a current `node.slug`. the property of `sidebar` is already
filtered previously. We create checkbox & label *iff* `subnodes` list is not empty. And create a list of subnodes below.

## tag-list.html

Adding [tag-list.html](https://github.com/LazyRen/LazyRen.github.io/blob/master/_layouts/tag-list.html) to `_layouts` folder will enable using `layout: tag-list` for the featured_tags.<br>

```html
<!-- file: "/_layouts/tag-list.html" -->
---
layout: page
---
{%- raw -%}

{{ content }}

{% assign posts = site.tags[page.slug] %}

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
{% endraw %}
```

## _featured_categories/*.md

A category is used as the main menu for the sidebar.<br>
Note that the `type` property has been added to indicate it is `category`.<br>
`sidebar` property is also added, set it to `true` if you wish to see a category from the sidebar.

```markdown
<!-- file: "_featured_categories/*.md" -->
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
If you wish to see a tag from the sidebar, set the `sidebar` property to `true`.<br>

```markdown
<!-- file: "_featured_tags/*.md" -->
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

## Reference

* [1n9yun's blog](https://1n9yun.github.io/posts/how-i-customized-hydejack-2-spread/)

Back to [How I customized Hydejack Theme](how-i-customized-hydejack-theme){:.heading.flip-title}
{:.read-more}
