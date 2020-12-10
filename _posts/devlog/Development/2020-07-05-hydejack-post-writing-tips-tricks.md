---
layout: post
title: "Hydejack Post Writing Tips & Tricks"
subtitle: "Hydejack Post Writing Tips & Tricks"
category: devlog
tags: development blog
---

Hydejack 테마를 이용하여 포스트를 작성할때 참고할 syntax 입니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Build

### update

```shell
bundle update

bundle exec jekyll serve
```

## Writing

### Adding a table of contents

```markdown
* this unordered seed list will be replaced by the toc
{:toc}

1. this ordered seed list will be replaced by the toc
{:toc}
```

### Adding notes

You can add a note by adding the `note` class to a paragraph.

Example:

You can add a note.
{:.note}

Markdown:

```markdown
You can add a note.
{:.note}
```

Edit the `note` key in `_data/strings.yml` to change the wording of the default label.
To add a note with a specific label, add a `title` attribute:

```markdown
A custom label.
{:.note title="Attention"}
```

A custom label.
{:.note title="Attention"}

### Adding large text

You can add large text by adding the `lead` class to the paragraph.

Example:

You can add large text.
{:.lead}

Markdown:

```markdown
You can add large text.
{:.lead}
```

### Adding image captions

You can add captions to large images by adding the `figcaption` class to the paragraph after the image:

![Full-width image](https://placehold.it/800x100){:.lead width="800" height="100" loading="lazy"}

An optional caption for an image.
{:.figcaption}

Markdown:

```markdown
![Full-width image](https://placehold.it/800x100){:.lead width="800" height="100" loading="lazy"}

A caption for an image.
{:.figcaption}
```

### Adding large quotes

You can make a quote "pop out" by adding the `lead` class.

Example:

> You can make a quote "pop out".
{:.lead}

Markdown:

```markdown
> You can make a quote "pop out".
{:.lead}
```

### Adding faded text

You can gray out text by adding the `faded` class. Use this sparingly and for information that is not essential, as it is more difficult to read.

Example:

I'm faded, faded, faded.
{:.faded}

Markdown:

```markdown
I'm faded, faded, faded.
{:.faded}
```

### Adding captions

Just like images, you can add captions to tables by adding the `figcaption` class to the paragraph after the table.

```markdown
An optional caption for a table/image/code block
{:.figcaption}
```

### Small tables

If a table is small enough to fit the screen even on small screens, you can add the `stretch-table` class
to force a table to use the entire available content width. Note that stretched tables can no longer be scrolled.

| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
{:.stretch-table}

An optional caption for a table
{:.figcaption}

You can add the `stretch-table` class to a markdown table by putting `{:.stretch-table}` in line directly below the table.

Markdown:

```markdown
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
{:.stretch-table}
```
