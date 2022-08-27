---
layout: post
title: "How I customized Hydejack Theme"
subtitle: "How I customized Hydejack Theme"
category: devlog
tags: blog github-pages jekyll
image:
  path: /assets/img/2020-08-02/showcase.png
---

Thanks to [@qwtel], I'm on the [showcase] of Hydejack's official blog!

I had a plan to write a post about how I customized my blog, but thanks to his kind email, and posting on to the
showcase, I've decided to write a post in English. So many others can check & apply to their GitHub pages.

[@qwtel]: https://qwtel.com/
[showcase]: https://hydejack.com/showcase/

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Documentations

First, you should check [Hydejack's documentation] to install & proceed.<br>
If you want to use a free version, use [Hydejack-starter-kit].<br>
Clone or download it. Note that the linked branch is gh-pages. Not the master branch in order to use it as GitHub pages.

[Hydejack's documentations]: https://hydejack.com/docs/
[Hydejack-starter-kit]: https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages

## Before We Begin

Hydejack theme provides `_sass/my-*.scss` files for a customization.<br>
It's very helpful if you wish to change the CSS of your homepage.<br>
It overrides any default CSS provided by other files.<br>
[Jekyll docs], [Jekyll Liquid], [Liquid docs] are also good starting places for the beginner (such as myself).

I'm planning to manage customization items with :octocat:[Github Issue]. If you are interested; Please take a moment to
visit. And please feel free to toss a new idea!

[Jekyll docs]: https://jekyllrb.com/docs/
[Jekyll Liquid]: https://jekyllrb.com/docs/liquid/
[Liquid docs]: https://shopify.github.io/liquid/
[Github Issue]: https://github.com/LazyRen/LazyRen.github.io/issues/34

## Adding Submenu to the Sidebar

![Sidebar](/assets/img/2020-08-02/sidebar.png){:.centered width="33%"}

In this section, I'll guide you on how to add a submenu to the sidebar navigation.<br>
There are a few files you need to edit/add for this.<br>
You may wish to check [commit history], [and] also [these] for the updated method. (as of 2020/12/15)

[commit history]: https://github.com/LazyRen/LazyRen.github.io/commit/89aa07da3b9e9081b933f61c24a42b765b6d30cd
[and]: https://github.com/LazyRen/LazyRen.github.io/commit/6d54aa8507b7595169214d61639ccb2fb5c2a4f6
[these]: https://github.com/LazyRen/LazyRen.github.io/commit/69871512f1407d1b2892f621b69059b3b4c2bab2

```default
/_sass/my-style.scss
/_includes/body/nav.html
/_includes/body/sidebar-sticky.html
/_layouts/tag-list.html
/_featured_categories/*.md
/_featured_tags/*.md
```

Continue with [Adding Foldable Submenu to the Sidebar](adding-foldable-submenu-to-the-sidebar){:.heading.flip-title}
{:.read-more}

## Append Clap Count to the Post List

![List](/assets/img/2022-02-06/list.png){:.centered}

4 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/4a45a5d0555e475dc1a10db919472442782d7d33))
I wanted to check how many claps I got for each post without entering the post.

```default
_includes/components/post-list-item.html
_includes/components/post.html
_includes/my-scripts.html
_sass/my-style.scss
```

Continue with [Append Clap Count to the Post List](append-clap-count-to-the-post-list){:.heading.flip-title}
{:.read-more}

## Creating Tag Cloud/List Page

![Tag List](/assets/img/2020-12-21/tag_list.png){:.centered width="33%"}

Since many tags are not listed on the sidebar, I've always wanted to have a page where I can see all categories & tags
I've used it for the posts. And visitors may click on it to navigate related posts. To implement a tag list, you only
need to create two files to have a such page.

```default
/tags.md
/_layouts/tags.html
```

Continue with [Creating Tag List Page](creating-tag-list-page){:.heading.flip-title}
{:.read-more}

## Use [Utterances]/[Giscus] as a Comment Plugin

![Utterances](/assets/img/2020-12-21/utterances.png)

Disqus is used as the default comments plugin for the Hydejack and most of the static sites.
But I had some issues with Disqus, so I looked elsewhere to find new comments plugin.

1. Disqus loads slowly.<br>
2. link within the comment is **broken**.<br>
   The most important reason I chose to move on. Disqus automatically adds prefix starting with `disq.us/url?`,
   the problem is.... `disq.us` is not responding so the link gets lost.

[Utterances] uses GitHub issues to save & display comments. So you have to give proper permission to the GitHub bot.
But once you set things up correctly, it works very smoothly and fast. The only downside I've encountered so far is that
it requires a user to log in to the github in order to write comments, and there is no default `reply` function.
(All though you can mimic reply using `>` & `@`...)

[Giscus] is almost identical to the `Utterances` except that it uses `GitHub discussion` instead of `issues`.<br>
I have once again migrated to Giscus from utterances. It seems 'discussions' is more appropriate than 'issues' to place
comments.

[Utterances]: https://utteranc.es/
[Giscus]: https://giscus.vercel.app/

Continue with [Use Utterances/Giscus for Jekyll Comments System](use-utterances-for-jekyll-comments){:.heading.flip-title}
{:.read-more}

## Add Applause Button for Jekyll Post

When I revisited the [Hydejack official site], I noticed a little [clapping button] that was set at the end of the post.
It seems a good idea to have light-cost (compare to commenting) way to communicate with visitors. So I gave some
research on it and finally made it as below.

[Hydejack official site]: https://hydejack.com/showcase/lazyren/
[clapping button]: https://help.medium.com/hc/en-us/articles/115011350967-Claps

![Applause Button](/assets/img/2020-12-21/post_end.png)

Basically, I will add an applause button for the each-and-every post. Unless the author specifically set it otherwise.

4 files to be modified. (check [related commit](https://github.com/LazyRen/LazyRen.github.io/commit/346f496d80243fcfbd0f24b47daa10078efe954f))

```default
/_config.yml
/_includes/head/links-static.html
/_layouts/post.html
_sass/my-style.scss
```

Continue with [Add Applause Button for Jekyll Post](add-applause-button-for-jekyll-post){:.heading.flip-title}
{:.read-more}

## Preventing FOUC of the Sidebar

![FOUC Comparison](/assets/img/2022-01-07/comparison.gif){:.centered width="33%"}

I always hated the sudden glitch of the sidebar at the very beginning of the web page loading.
Yes, it only happens on the very first page of my blog, yet it really bugs me. They even have a name for it. **FOUC**.
Stands for *flash of unstyled content*. Let's ease the symptom for the sidebar at least a little.

Continue with [Preventing FOUC of the Sidebar](preventing-fouc-of-the-sidebar){:.heading.flip-title}
{:.read-more}

## How to Center an Image in Markdown

From time to time, we want to align the image center within the Jekyll post. But applying the `CSS` style directly into
the markdown file with the `HTML` tag is cumbersome and not pretty. And I'm [not the only one searching for the way]!
In this article, I'll guide you through a easy solution to center an image within the Jekyll blog post.

[not the only one searching for the way]: https://stackoverflow.com/questions/23819197/jekyll-blog-post-centering-images

Continue with [How to Center an Image in Markdown](how-to-center-an-image-in-markdown){:.heading.flip-title}
{:.read-more}

## Decorate Codeblock Scrollbar

![Decorated Codeblock Scrollbar](/assets/img/2022-01-09/scrollbar.gif)

The default scrollbar shown for code block in the Hydejack theme is clunky.<br>
Let's change it to a fancier version like above. It's plain simple.

Continue with [Decorate Codeblock Scrollbar](decorate-codeblock-scrollbar){:.heading.flip-title}
{:.read-more}

## Apply Image Gallery for each `img` in Posts

![Image Gallery](/assets/img/2022-08-28/gify_neo.gif)

Sometimes, you wish image in your blog to be clickable and people can see the image in better view.<br>
Here is the solution to it.

Continue with [Add Image Gallery for the All Images in Markdown Post](add-image-gallery){:.heading.flip-title}
{:.read-more}

## Conclusion

This post originally started with sidebar modification only. But now it has become a huge post. I might divide this post
into smaller ones. I'm not an expert in web development. Adding a simple submenu was a pretty challenging &
time-consuming job for me. But taking some time to dig around, I've learned one or two things about how jekyll is
working, and web programming.<br>
it's pretty fun!<br>
You may find some odd parts, need help to implement features, or you have any suggestions for the improvement please
don't hesitate to contact me.<br>
I'd be very delighted to have any comments or react with the `applause button`.<br>
