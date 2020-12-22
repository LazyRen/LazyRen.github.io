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
`type` property is also used in here, so make sure you've added property to the `*.md` files.
