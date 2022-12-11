---
layout:   post
title:    "Rustlings Topic: Traits"
subtitle: "Rustlings Topic: Traits"
category: studylog
tags:     rust rustlings
---

> A [trait] tells the Rust compiler about functionality a particular type has and can share with other types.
> We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic type
> can be any type that has certain behavior.

Traits are similar to a feature often called interfaces in other languages, although with some differences.
{:.note}

`trait` is one of the most important Rust features that you must be familiar with. There is so many `trait` that Rust
provides. Such as [`Clone`], [`Copy`], [`Debug`], [`Default`], [`Deref`], [`From`], [`Ord`] etc.

Sometimes you can use [Derive macros] macro, or sometimes you have to implement the trait by yourself.
Unfortunately, rustling only focuses on the basic usage of the trait rather than introducing Rust providing traits.
So if you want to know more about common traits, I suggest you read [blog article].

You may find [solution code for the topic from my repo].

[trait]: https://doc.rust-lang.org/book/ch10-02-traits.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/traits

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## traits1.rs

`trait` is similar to the `struct` in grammar. It has two parts:

```rust
trait MyTrait {
    // Definition of the trait
    // Required method definition goes here.
    fn trait_func(self) -> Self;
}

impl MyTrait for MyStruct {
    // Implementation
}
```

In this example, we have to implement the `impl` block for the `trait AppendBar`.

```rust
/* file: "exercises/traits/traits1.rs" */
trait AppendBar {
    fn append_bar(self) -> Self;
}

impl AppendBar for String {
    fn append_bar(self) -> Self {
        self + "Bar"
    }
}

fn main() {
    let s = String::from("Foo");
    let s = s.append_bar();
    println!("s: {}", s);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_foo_bar() {
        assert_eq!(String::from("Foo").append_bar(), String::from("FooBar"));
    }

    #[test]
    fn is_bar_bar() {
        assert_eq!(
            String::from("").append_bar().append_bar(),
            String::from("BarBar")
        );
    }
}
```

[`Clone`]: https://doc.rust-lang.org/std/clone/trait.Clone.html
[`Copy`]: https://doc.rust-lang.org/std/marker/trait.Copy.html
[`Debug`]: https://doc.rust-lang.org/std/fmt/trait.Debug.html
[`Default`]: https://doc.rust-lang.org/std/default/trait.Default.html
[`Deref`]: https://doc.rust-lang.org/std/ops/trait.Deref.html
[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html
[`Ord`]: https://doc.rust-lang.org/std/cmp/trait.Ord.html
[Derive macros]: https://doc.rust-lang.org/reference/procedural-macros.html#derive-macros
[blog article]: https://stevedonovan.github.io/rustifications/2018/09/08/common-rust-traits.html

## traits2.rs

`traits2.rs` is almost identical to the previous problem. The only difference is that now we have to implement
`trait AppendBar` for the `Vec<String>` instead of `String`.

The problems are very easy to solve. But `trait` has so much potential and so many common `trait` that Rust provides.
So please take a look at [blog article] when you have time to find out common traits that you should know.

```rust
/* file: "exercises/traits/traits2.rs" */
trait AppendBar {
    fn append_bar(self) -> Self;
}

impl AppendBar for Vec<String> {
    fn append_bar(self) -> Self {
        let mut cloned_self = self.clone();
        cloned_self.push("Bar".to_string());
        cloned_self
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_vec_pop_eq_bar() {
        let mut foo = vec![String::from("Foo")].append_bar();
        assert_eq!(foo.pop().unwrap(), String::from("Bar"));
        assert_eq!(foo.pop().unwrap(), String::from("Foo"));
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
