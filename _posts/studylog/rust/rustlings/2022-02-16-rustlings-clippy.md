---
layout:   post
title:    "Rustlings Topic: Clippy"
subtitle: "Rustlings Topic: Clippy"
category: studylog
tags:     rust rustlings
---

> The [Clippy] tool is a collection of lints to analyze your code so you can catch common mistakes
> and improve your Rust code.<br>
> If you used the installation script for Rustlings, Clippy should be already installed.
> If not you can install it manually via `rustup component add clippy`.

You may find [solution code for the topic from my repo].

[clippy]: https://github.com/rust-lang/rust-clippy
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/clippy

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## clippy1.rs

```rust
/* file: "Original Code" */
use std::f32;

fn main() {
    let pi = 3.14f32;
    let radius = 5.00f32;

    let area = pi * f32::powi(radius, 2);

    println!(
        "The area of a circle with radius {:.2} is {:.5}!",
        radius, area
    )
}
```

When we run the original code(above) without modification, we can see Clippy error as below:

```shell
❯ rustlings run clippy1
⚠️  Compilation of exercises/clippy/clippy1.rs failed!, Compiler error message:

    Checking clippy1 v0.0.1 (/Users/i542880/Documents/rustlings/exercises/clippy)
error: approximate value of `f32::consts::PI` found
  --> clippy1.rs:12:14
   |
12 |     let pi = 3.14f32;
   |              ^^^^^^^
   |
   = note: `#[deny(clippy::approx_constant)]` on by default
   = help: consider using the constant directly
   = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#approx_constant

error: could not compile `clippy1` due to a previous error
```

Indeed Rust provides many precision mathematical [constants] in the standard library.

[Clippy] is a convenient Rust tool that helps Rustacean to write clean-better code. With a little
[setup], VS Code can directly output Clippy warnings/errors.

```rust
/* file: "exercises/clippy/clippy1.rs" */
use std::f32;

fn main() {
    let pi = f32::consts::PI;
    let radius = 5.00f32;

    let area = pi * f32::powi(radius, 2);

    println!(
        "The area of a circle with radius {:.2} is {:.5}!",
        radius, area
    )
}
```

[constants]: https://doc.rust-lang.org/stable/std/f32/consts/index.html
[setup]: https://users.rust-lang.org/t/how-to-use-clippy-in-vs-code-with-rust-analyzer/41881

## clippy2.rs

```rust
/* file: "Original Code" */
fn main() {
    let mut res = 42;
    let option = Some(12);
    for x in option {
        res += x;
    }
    println!("{}", res);
}
```

One of the cool features of the [Clippy] is that it also detects *anti-patterns* and suggest
a better way to write clean-readable code.

```shell
❯ rustlings run clippy2
⚠️  Compilation of exercises/clippy/clippy2.rs failed!, Compiler error message:

    Checking clippy2 v0.0.1 (/Users/i542880/Documents/rustlings/exercises/clippy)
error: for loop over `option`, which is an `Option`. This is more readably written as an `if let` statement
 --> clippy2.rs:7:14
  |
7 |     for x in option {
  |              ^^^^^^
  |
  = note: `-D clippy::for-loops-over-fallibles` implied by `-D warnings`
  = help: consider replacing `for x in option` with `if let Some(x) = option`
  = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#for_loops_over_fallibles
```

I only have to change as Clippy suggests.

```rust
/* file: "exercises/clippy/clippy2.rs" */
fn main() {
    let mut res = 42;
    let option = Some(12);
    if let Some(x) = option {
        res += x;
    }
    println!("{}", res);
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
