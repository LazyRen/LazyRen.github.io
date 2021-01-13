---
layout: post
title: "Hydejack Post Writing Tips & Tricks"
subtitle: "Hydejack Post Writing Tips & Tricks"
category: devlog
tags: blog
---

Hydejack 테마를 이용하여 포스트를 작성할때 참고할 syntax 입니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Build

```shell
bundle update

# livereload option enables auto reload of browser when file has been modified.
bundle exec jekyll serve --livereload

# if 'bundle exec' fails with ruby >= 3.0.0;
# https://github.com/jekyll/jekyll/issues/8523#issuecomment-751409319
bundle add webrick
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

### Expand/Collapse

You can add expand/collapse contents with [simple HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).<br>
`<div markdown="1">` allows to use markdown features within.

Example:

<details>
<summary>Expand/Collapse Button</summary>
<div markdown="1">
**Hello World!**<br>
emphasised by *markdown*.
</div>
</details>
<br>
Markdown:

```markdown
<details>
<summary>Expand/Collapse Button</summary>
<div markdown="1">
**Hello World!**<br>
emphasised by *markdown*.
</div>
</details>
```

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

### Changing image size

You can change image size by adding css style to the paragraph after the image:

Example:

![Half-width image](https://placehold.it/800x100){: width="400" height="50"}

Markdown:

```markdown
![Half-width image](https://placehold.it/800x100){: width="400" height="50"}
```

### Adding image captions

You can add captions to large images by adding the `figcaption` class to the paragraph after the image:

Example:

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
