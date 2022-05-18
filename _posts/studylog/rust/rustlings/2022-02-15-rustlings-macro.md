---
layout:   post
title:    "Rustlings Topic: Macro"
subtitle: "Rustlings Topic: Macro"
category: studylog
tags:     rust rustlings
---

> Rust's [macro system] is very powerful, but also kind of difficult to wrap your head around. We're not going to teach
> you how to write your own fully-featured macros. Instead, we'll show you how to use and create them.

You may find [solution code for the topic from my repo].

[macro system]: https://doc.rust-lang.org/book/ch19-06-macros.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/macros

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## macros1.rs

Writing macro for Rust is another level of difficulty. But many libraries provide very useful macros. So it is important
to know (at least) how to use them.

To define a macro, we use the `macro_rules!` construct. To *invoke* the macro, we append `!` after the macro name.

```rust
/* file: "exercises/macros/macros1.rs" */
macro_rules! my_macro {
    () => {
        println!("Check out my macro!");
    };
}

fn main() {
    my_macro!();
}
```

## macros2.rs

> Macros don't quite play by the same rules as the rest of Rust, in terms of what's available where.
> Unlike other things in Rust, the order of "where you define a macro" versus "where you use it" actually matters.

```shell
error: cannot find macro `my_macro` in this scope
 --> exercises/macros/macros2.rs:4:5
  |
4 |     my_macro!();
  |     ^^^^^^^^
  |
  = help: have you added the `#[macro_use]` on the module/import?

warning: unused macro definition: `my_macro`
 --> exercises/macros/macros2.rs:7:14
  |
7 | macro_rules! my_macro {
  |              ^^^^^^^^
  |
  = note: `#[warn(unused_macros)]` on by default

error: aborting due to previous error; 1 warning emitted
```

If we run the code without any modification, we see one error and one warning. First, we get the error for can't find macro
`my_macro`, and yet we get another warning for *unused* macro definition: `my_macro`!

It turns out the order of macro definition and usage is important. We have to place definitions *before* we use them.

```rust
/* file: "exercises/macros/macros2.rs" */
macro_rules! my_macro {
    () => {
        println!("Check out my macro!");
    };
}

fn main() {
    my_macro!();
}
```

## macros3.rs

We have the `my_macro` definition within mod `macros`. Thus when we use `my_macro` outside of the mod(`main`), the Rust compiler
cannot find it.

```shell
error: cannot find macro `my_macro` in this scope
  --> exercises/macros/macros3.rs:22:5
   |
22 |     my_macro!();
   |     ^^^^^^^^
   |
   = help: have you added the `#[macro_use]` on the module/import?
```

Rust compiler gives you a hint to use `#[macro_use]` on the module/import. Take a look at the documentation about
[`macro_use`]. We can also append `#[macro_export]` to the macro definition to use it outside of the module.

```rust
/* file: "exercises/macros/macros3.rs" */
// https://doc.rust-lang.org/reference/macros-by-example.html#the-macro_use-attribute
// #[macro_use] attribute can be used to make a module's macro
// scope not end when the module is closed.
#[macro_use]
mod macros {
    // Macros labeled with #[macro_export] are always pub and
    // can be referred to by other crates, either by path or
    // by #[macro_use] as described above.
    // #[macro_export]
    macro_rules! my_macro {
        () => {
            println!("Check out my macro!");
        };
    }
}

fn main() {
    my_macro!();
}
```

[`macro_use`]: https://doc.rust-lang.org/reference/macros-by-example.html#the-macro_use-attribute

## macros4.rs

Append `;` between macro arms. I'm not sure why this exercise exists...

```rust
/* file: "exercises/macros/macros4.rs" */
macro_rules! my_macro {
    () => {
        println!("Check out my macro!");
    };
    ($val:expr) => {
        println!("Look at this other macro: {}", $val);
    };
}

fn main() {
    my_macro!();
    my_macro!(7777);
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
