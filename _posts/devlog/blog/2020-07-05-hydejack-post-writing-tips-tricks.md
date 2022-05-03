---
layout: post
title: "Hydejack Post Writing Tips & Tricks"
subtitle: "Hydejack Post Writing Tips & Tricks"
category: devlog
tags: blog
---

List of useful syntaxes you may find interesting when you write your own Jekyll posts.

If you are interested in more syntax guides, please visit [Kramdown Syntax] & [Hydejack Writing] documentations.

[Kramdown Syntax]: https://kramdown.gettalong.org/syntax.html
[Hydejack Writing]: https://hydejack.com/docs/writing/

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Build

```shell
bundle update

# livereload option enables auto-reload of the browser when a file has been modified.
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

### Footnotes

Example:

This is a text with a footnote[^1].

[^1]: Your footnote text.
    Can have multiple lines...

    ...and multiple paragraphs.
    Can contain *Markdown*.

Markdown:

```default
This is a text with a footnote[^1].

[^1]: Your footnote text.
    Can have multiple lines...

    ...and multiple paragraphs.
    Can contain *Markdown*.
```

### Links

Example:

A [link](http://kramdown.gettalong.org) to the kramdown homepage.<br>
[Another link] to the kramdown homepage.<br>
[Third link][kramdown] to the homepage.

[Another link]: http://kramdown.gettalong.org
[Third Link]: http://kramdown.gettalong.org "Another link with title modified"

Markdown:

```default
A [link](http://kramdown.gettalong.org) to the kramdown homepage.<br>
[Another link] to the kramdown homepage.<br>
[Third link][kramdown] to the homepage.

[Another link]: http://kramdown.gettalong.org
[Third Link]: http://kramdown.gettalong.org "Another link with title modified"
```

### Abbreviation

Example:

OMG is an abbreviated word.

*[OMG]: Oh My God

Markdown:

```default
OMG is an abbreviated word.

*[OMG]: Oh My God
```

### Expand/Collapse

You can add expand/collapse contents with [simple HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).<br>
`<div markdown="1">` allows to use markdown features within.

Example:

<details>
<summary>Expand/Collapse Button</summary>
<div markdown="1">
**Hello World!**<br>
emphasized by *markdown*.
</div>
</details>
<br>

Markdown:

```markdown
<details>
<summary>Expand/Collapse Button</summary>
<div markdown="1">
**Hello World!**<br>
emphasized by *markdown*.
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

### Center image

This requires extra modification to the Hydejack Theme.<br>
Check the below post for more information.
{:.note title="Warning"}

Continue with [How to Center an Image in Markdown](how-to-center-an-image-in-markdown){:.heading.flip-title}
{:.read-more}

Example:

![placeholder](https://via.placeholder.com/100x150){:.centered}

Markdown:

```markdown
* With CSS class installed
  ![placeholder](https://via.placeholder.com/100x150){:.centered}

* Pure inline attribute used
  ![placeholder](https://via.placeholder.com/100x150){:style="display:block; margin-left:auto; margin-right:auto"}
```

#### Centering Multiple Image

Example:

{:.text-align-center}
![placeholder](https://via.placeholder.com/100x150)
![placeholder](https://via.placeholder.com/100x150)

Markdown:

```markdown
* With CSS class installed
  {:.text-align-center}
  ![placeholder](https://via.placeholder.com/100x150)
  ![placeholder](https://via.placeholder.com/100x150)

* Pure inline attribute used
  {:style="text-align:center;"}
  ![placeholder](https://via.placeholder.com/100x150)
  ![placeholder](https://via.placeholder.com/100x150)
```

#### Changing image size

You can change the image size by adding CSS style to the paragraph after the image:

Example:

![Half-width image](https://via.placeholder.com/800x100){: width="400" height="50"}

Markdown:

```markdown
![Half-width image](https://via.placeholder.com/800x100){: width="400" height="50"}
```

### Adding image captions

You can add captions to large images/tables/code block by adding the `figcaption` class to the paragraph after the image:

Example:

![Full-width image](https://via.placeholder.com/800x100){:.lead width="800" height="100" loading="lazy"}

An optional caption for an image.
{:.figcaption}

Markdown:

```markdown
![Full-width image](https://via.placeholder.com/800x100){:.lead width="800" height="100" loading="lazy"}

A caption for an image.
{:.figcaption}
```

### Adding large quotes

You can make a quote "pop-out" by adding the `lead` class.

Example:

> You can make a quote "pop-out".
{:.lead}

Markdown:

```markdown
> You can make a quote "pop-out".
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

### Small tables

If a table is small enough to fit the screen even on small screens, you can add the `stretch-table` class
to force a table to use the entire available content width. Note that stretched tables can no longer be scrolled.

| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
{:.stretch-table}

An optional caption for a table
{:.figcaption}

You can add the `stretch-table` class to a markdown table by putting `{:.stretch-table}` inline directly below the table.

Markdown:

```markdown
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
{:.stretch-table}
```
