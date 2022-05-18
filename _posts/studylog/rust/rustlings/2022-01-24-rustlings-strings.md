---
layout:   post
title:    "Rustlings Topic: Strings"
subtitle: "Rustlings Topic: Strings"
category: studylog
tags:     rust rustlings
---

> [Rust has two string types], a string slice ([`&str`]) and an owned string ([`String`]). We're not going to
> dictate when you should use which one, but we'll show you how to identify and create them, as well as use them.

You may find [solution code for the topic from my repo].

[Rust has two string types]: https://doc.rust-lang.org/book/ch08-02-strings.html
[`&str`]: https://doc.rust-lang.org/std/primitive.str.html
[`String`]: https://doc.rust-lang.org/std/string/struct.String.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/strings

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## strings1.rs

The `current_favorite_color()` function is currently returning a string slice with the `'static`
lifetime. But *function signature* suggests that it should return the `String` type instead.

Any structure that implements Trait [`ToString`] may be converted to the `String` type by calling the `to_string()` method.
Or with the `from()` method implemented by Trait [`From`]. We haven't covered the topic of **trait** in rustlings yet,
but this is one of the core features of Rust. So it is worth reading the [Traits chapter] from *the Book*.

```rust
/* file: "exercises/strings/strings1.rs" */
fn main() {
    let answer = current_favorite_color();
    println!("My current favorite color is {}", answer);
}

fn current_favorite_color() -> String {
    // "blue".to_string()
    String::from("blue")
}
```

[`ToString`]: https://doc.rust-lang.org/std/string/trait.ToString.html#tymethod.to_string
[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html#tymethod.from
[Traits chapter]: https://doc.rust-lang.org/book/ch10-02-traits.html

## strings2.rs

What is the problem with the code? Let's check what compiler says about it.

```shell
error[E0308]: mismatched types
 --> exercises/strings/strings2.rs:7:24
  |
7 |     if is_a_color_word(word) {
  |                        ^^^^
  |                        |
  |                        expected `&str`, found struct `String`
  |                        help: consider borrowing here: `&word`
```

Why does the compiler expect string slice(`&str`)? Because function signature says so.

```rust
fn is_a_color_word(attempt: &str) -> bool
```

Rustlings comment says we shouldn't modify the function signature. So we have to modify the argument to pass `&str` instead of
`String` as the compiler suggests.

Rust compiler knows a lot, and its suggestion is worth reading. So anytime the compiler refuses to compile your code,
it is wise to check the error message.

```rust
/* file: "exercises/strings/strings2.rs" */
fn main() {
    let word = String::from("green"); // Try not changing this line :)
    if is_a_color_word(&word) {
        println!("That is a color word I know!");
    } else {
        println!("That is not a color word I know.");
    }
}

fn is_a_color_word(attempt: &str) -> bool {
    attempt == "green" || attempt == "blue" || attempt == "red"
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
