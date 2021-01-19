---
layout: post
title: "How I customized Hydejack Theme"
subtitle: "How I customized Hydejack Theme"
category: devlog
tags: blog github-pages jekyll
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

## Before we begin

Hydejack theme provides `_sass/my-*.scss` files for a customization.<br>
It's very helpful if you wish to change css of your homepage.<br>
It overrides any default css provided by other files.<br>
[Jekyll docs](https://jekyllrb.com/docs/), [Jekyll Liquid](https://jekyllrb.com/docs/liquid/), [Liquid docs](https://shopify.github.io/liquid/) are also a good start place for the beginner (such as myself).

## Adding Submenu to the Sidebar

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

Check [this post](/devlog/adding-foldable-submenu-to-the-sidebar) for more info.

## Creating Tag Cloud/List Page

![tag list](/assets/img/2020-12-21/tag_list.png)

Since many tags are not listed on the sidebar, I've always wanted to have a page where I can see all categories & tags I've used for the posts. And visitor may click on it to navigate related posts. To implement tag list, you only need to create two files to have a such page.

```default
/tags.md
/_layouts/tags.html
```

Check [this post](/devlog/creating-tag-list-page) for more info.

## Use [Utterances](https://utteranc.es/) as a comment plugin

![Utterances](/assets/img/2020-12-21/utterances.png)

It's not hard to setup [utterances](https://github.com/utterance/utterances).<br>
First of all, you should install [utterances app](https://github.com/apps/utterances) to the blog repository.
Since we are gonna migrate from disqus, proper changes must be made to `my-comments.html` & `links-static.html`.<br>

3 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/8dcf03700c7f3d0f581b27a6fcf2e8a4d8396340))

```default
/_config.yml
/_includes/my-comments.html
/_includes/head/links-static.html
```

Check [this post](/devlog/use-utterances-for-jekyll-comments) for more info.

## Add applause button for Jekyll post

When I revisted the [hydejack's offical site](https://hydejack.com/showcase/lazyren/), I noticed little [clapping button](https://help.medium.com/hc/en-us/articles/115011350967-Claps) that set at the end of the post. It seems good idea to have light-cost (compare to commenting) way to communicate with visitors. So I gave some research on it and finally made it as below.

![applause button](/assets/img/2020-12-21/post_end.png)

Basically, I will add applause button for each-and-every post. Unless author specifically set it otherwise.<br>

4 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/346f496d80243fcfbd0f24b47daa10078efe954f))

```default
/_config.yml
/_includes/head/links-static.html
/_layouts/post.html
_sass/my-style.scss
```

Check [this post](/devlog/add-applause-button-for-jekyll-post) for more info.

## Conclusion

This post orignally started with sidebar modification only. But now it has become a huge post. I might divide this post into smaller ones.
I'm not an expert in web development. Adding simple submenu was pretty challenging & time consuming job for me. But taking some time to dig around, I've learned one or two things about how jekyll is working, and web programming.<br>
it's pretty fun!<br>
You may find some odd parts, need help implementing features, or you have any suggestions for the improvment please don't hesitate to contact me.<br>
I'd be very delightful to have any comments.<br>
