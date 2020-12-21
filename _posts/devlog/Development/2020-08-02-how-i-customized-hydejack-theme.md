---
layout: post
title: "How I customized Hydejack Theme"
subtitle: "How I customized Hydejack Theme"
category: devlog
tags: development blog
image:
  path: /assets/img/2020-08-02/showcase.png
---

Thanks to [@qwtel](https://qwtel.com/), I'm on the [showcase](https://hydejack.com/showcase/) of Hydejack's official blog!<br>

I had a plan to write a post about how I customized my blog, but thanks to his kind email, and posting on to the showcase, I've decided to write a post in English. So many others can check & apply to their github pages.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Documentations

First, you should check [Hydejack's documentations](https://hydejack.com/docs/) to install & proceed.<br>
If you wants to use free version, use [Hydejack-starter-kit](https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages).<br>
Clone or download it. Note that linked branch is gh-pages. Not the master branch in order to use it as github pages.

## Customization

Hydejack theme provides `_sass/my-*.scss` files for a customization.<br>
It's very helpful if you wish to change css of your homepage.<br>
It overrides any default css provided by other files.<br>
[Jekyll Liquid](https://jekyllrb.com/docs/liquid/) doc is also a good start place for the beginner.

### Adding Submenu to the Sidebar

Sidebar & category/tag has been modified as of 2020/12/15.<br>
I'm updating this post to reflect those changes I've made.
{:.note}

![Sidebar](/assets/img/2020-08-02/sidebar.png)

In this section, I'll guide you how to add a submenu to the sidebar navigation.<br>
There is few files you need to edit/add for this.<br>
You may wish to check [commit history](https://github.com/LazyRen/LazyRen.github.io/commit/89aa07da3b9e9081b933f61c24a42b765b6d30cd), [and](https://github.com/LazyRen/LazyRen.github.io/commit/6d54aa8507b7595169214d61639ccb2fb5c2a4f6) [these](https://github.com/LazyRen/LazyRen.github.io/commit/69871512f1407d1b2892f621b69059b3b4c2bab2) for the updated method. (as of 2020/12/15)

```default
/_sass/my-style.scss
/_includes/body/nav.html
/_includes/body/sidebar-sticky.html
/_layouts/tag-list.html
/_featured_categories/*.md
/_featured_tags/*.md
```

#### my-style.scss

Add below code to the [_sass/my-style.scss file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_sass/my-style.scss), so it can display submenu properly.<br>

```css
// Sidebar Modification

.sidebar {
  text-align: center;
}

.sidebar-sticky {
  position: absolute;
  height: 95%;
  padding-top: 5%;
  opacity: 1 !important; // to prevent ugly FOUC
}

a.sidebar-nav-item {
  width:100%;
  padding: .25rem 0;
}

a.sidebar-nav-subitem {
  @extend .f4;
  width:100%;
  display: inline-block;
  padding: .25rem 0;
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

#### nav.html

![git diff](/assets/img/2020-08-02/nav_html.png)

Change made in `my-style.scss` was to properly show submenu.<br>
Changes in [this file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/body/nav.html) is to actually print submenu(tags) to the sidebar.

##### Line by line explanation

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

#### sidebar-sticky.html

To prevent FOUC(flash of unstyled content), addition to the modification of [scss file](#my-stylescss) add `style="opacity:0"` to the sidebar-sticky class [like this](https://github.com/LazyRen/LazyRen.github.io/blob/master/_includes/body/sidebar-sticky.html) (line 1).<br>
This does not prevent FOUC totally, but at least it prevents user from seeing ugly checkbox at the first visit.<br>
If anyone have better solution, **please** inform me. I'd be very happy to hear it.

#### tag-list.html

Adding [this file](https://github.com/LazyRen/LazyRen.github.io/blob/master/_layouts/tag-list.html) to `_layouts` folder will enable using `layout: tag-list` for the featured_tags.<br>

#### _featured_categories/*.md

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

#### _featured_tags/*.md

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

### Creating Tag Cloud/List Page

Since many tags are not listed on the sidebar, I've always wanted to have a page where I can see all categories & tags I've used for the posts.<br>
You only need to create two files to have a such page.

```default
/tags.md
/_layouts/tags.html
```

#### tags.md

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

#### tags.html

[tags.html](https://github.com/LazyRen/LazyRen.github.io/blob/master/_layouts/tags.html) should be located in `_layouts` folder.<br>
It finds all categories & tags from the site & list them like `list` or `tag-list` style (they are layout that you will see when you click category or tag).<br>
`type` property is also used in here, so make sure you've added property to the `*.md` files.

### Use [Utterances](https://utteranc.es/) as a comment plugin

It's not hard to setup [utterances](https://github.com/utterance/utterances).<br>
First of all, you should install [utterances app](https://github.com/apps/utterances) to the blog repository.
Since we are gonna migrate from disqus, proper changes must be made to `my-comments.html` & `links-static.html`.<br>

```default
/_config.yml
/_includes/my-comments.html
/_includes/head/links-static.html
```

#### _config.yml

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

#### my-comments.html

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

#### links-static.html

You don't want to link disqus if you are not using it. Wrap linking line with proper if statement.

```html
{% raw %}
{% if site.comments.provider == "disqus" and site.disqus %}
  <link rel="dns-prefetch" href="https://{{ disqus }}.disqus.com" id="_hrefDisqus">
{% endif %}
{% endraw %}
```

## Conclusion

I'm not an expert in web development. Adding simple submenu was pretty challenging & time consuming job for me.<br>
You may find some odd parts, if you have any suggestions for the improvment please don't hesitate to contact me.<br>
I'd be very delightful to have any comments.<br>
