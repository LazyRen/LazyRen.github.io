---
layout: post
title: "Exclude Folder or File from the Sitemap for Jekyll(Hydejack) Blog"
subtitle: "Controlling jekyll-sitemap Plugin to Exclude Page"
category: devlog
tags: blog github-pages jekyll
---

Webmaster tools (such as [Google Search Console]) use `sitemap.xml` file to get help crawling. The file work as content
for the blog. Jekyll (and Hydejack) use `jekyll-sitemap` plugin to automatically generate `sitemap.xml` file. You can
check mine from [here].

However, one may want to exclude a specific file or folder from the sitemap to prevent being crawled by search engines.
For example, [Hydejack excludes the assets & licenses folder from the sitemap].<br>
~~At least it tries. It fails to do so because of the invalid value.~~

In my case, I wanted to remove the google-search-verification file & Naver search verification file from the sitemap.

So today, I'll show you how to do so.

[Google Search Console]: https://search.google.com/search-console/about
[here]: /sitemap.xml
[Hydejack excludes the assets & licenses folder from the sitemap]: https://github.com/hydecorp/hydejack-starter-kit/blob/e71915cd2187904ceee1372f8805a2dd635f01d3/_config.yml#L126

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## TL;DR

If you are using the Hydejack theme for the Jekyll blog, simply add the below setting to your `_config.yml` file.

```yml
# file: "_config.yml"
# Don't include all the files from `folder_to_exclude` in the sitemap
- scope:
    path:            folder_to_exclude/**
  values:
    sitemap:         false

# Don't include `file_name_to_exclude.file_extension` in the sitemap
- scope:
    path:            file_name_to_exclude.file_extension
  values:
    sitemap:         false
```

## Long Story

Luckily for us, Hydejack already comes with [proper setup]. So all we need to do is add a valid setting to disable
sitemap from `_config.yml` file.

[proper setup]: https://github.com/LazyRen/LazyRen.github.io/blob/8b27d8a10bebab026d9b768b87de4f2138d4ba65/_includes/head/meta.html#L1

### Exclude All contents of the Folder

If you wish to exclude all the contents of a folder from the sitemap (Such as `assets` or `licenses`). You need to add
below to `_config.yml`. Notice `**` suffixed to the folder name.<br>
Default [Hydejack starter-kit] lacks this suffix, thus [fails to exclude the folder].[^1]<br>
(See [related issue] I created for detail)

```yml
# file: "_config.yml"
# Don't include documents in assets in the sitemap
- scope:
    path:            assets/**
  values:
    sitemap:         false

# Don't include licenses in sitemap (feel free to delete)
- scope:
    path:            licenses/**
  values:
    layout:          plain
    sitemap:         false

# Don't include all the files from `folder_to_exclude` in the sitemap
- scope:
    path:            folder_to_exclude/**
  values:
    sitemap:         false
```

[Hydejack starter-kit]: https://github.com/hydecorp/hydejack-starter-kit
[fails to exclude the folder]: https://hydecorp.github.io/hydejack-starter-kit/sitemap.xml
[related issue]: https://github.com/hydecorp/hydejack/issues/278

[^1]: Notice licenses still exist in the sitemap

### Exclude Specific File

I wanted to remove verification file for Google Search Console & Naver. This is how you do it.

```yml
# file: "_config.yml"
# Don't include site verification file(for google) in the sitemap
- scope:
    path:            google93abcae935f31b7d.html
  values:
    sitemap:         false

# Don't include site verification file(for Naver) in the sitemap
- scope:
    path:            navera03014a241218f942080c56d67e79469.html
  values:
    sitemap:         false

# Don't include `file_name_to_exclude.file_extension` in the sitemap
- scope:
    path:            file_name_to_exclude.file_extension
  values:
    sitemap:         false
```
