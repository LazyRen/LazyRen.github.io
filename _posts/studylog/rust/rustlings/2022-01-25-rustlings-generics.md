---
layout:   post
title:    "Rustlings Topic: Generics"
subtitle: "Rustlings Topic: Generics"
category: studylog
tags:     rust rustlings
---

> [Generics] is the topic of generalizing types and functionalities to broader cases. This is
> extremely useful for reducing code duplication in many ways, but can call for rather involving
> syntax. Namely, being generic requires taking great care to specify over which types a generic
> type is actually considered valid. The simplest and most common use of generics is for type
> parameters.

You may find [solution code for the topic from my repo].

[Generics]: https://doc.rust-lang.org/stable/book/ch10-01-syntax.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/generics

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## generics1.rs

> Vectors in rust make use of generics to create dynamically sized arrays of any type.
> You need to tell the compiler what type we are pushing onto this vector.

We need to use `&str` to accept items like `"milk"`.

```rust
/* file: "exercises/generics/generics1.rs" */
fn main() {
    let mut shopping_list: Vec<&str> = Vec::new();
    shopping_list.push("milk");
}
```

## generics2.rs

Using generic types [in method definition] is not that complicated. We usually use one letter (most
preferably `T`) for a generic type.

> Note that we have to declare `T` just after `impl` so we can use it to specify that we’re
> implementing methods on the type `Point<T>`. By declaring `T` as a generic type after `impl`, Rust
> can identify that the type in the angle brackets in Point is a generic type rather than a concrete
> type.

```rust
/* file: "exercises/generics/generics2.rs" */
struct Wrapper<T> {
    value: T,
}

impl<T> Wrapper<T> {
    pub fn new(value: T) -> Self {
        Wrapper { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn store_u32_in_wrapper() {
        assert_eq!(Wrapper::new(42).value, 42);
    }

    #[test]
    fn store_str_in_wrapper() {
        assert_eq!(Wrapper::new("Foo").value, "Foo");
    }
}
```

[in method definition]: https://doc.rust-lang.org/stable/book/ch10-01-syntax.html#in-method-definitions

## generics3.rs

> When working with generics, the type parameters often must use traits as [bounds] to stipulate
> what functionality a type implements. For example, the following example uses the trait Display to
> print and so it requires T to be bound by Display; that is, T must implement Display.

To me, Rust's [bounds] felt like a new concept, yet a very powerful tool. Bounding restricts the generic to
types that conform to the bounds. So we can assume the generic type can perform based on the bounding
traits. And we have to implement a trait for the types that we want to be used as a generic type.

The one thing you have to keep in mind is that you have to know common `Traits` that Rust provides.
This [blog post] gives you a tour of the most common `Traits` that you will see.

let's get back to the exercise, we want to *print* the `ReportCard`. This can be done by trait
[`Display`]. `String` & `u8` already implements `Display`. But `grade`, is generic type variable.
So we want to *enforce* that generic type to implement the trait `Display`.

```rust
pub struct ReportCard<T: std::fmt::Display> {
    pub grade: T,
    pub student_name: String,
    pub student_age: u8,
}
```

By using `<T: std::fmt::Display>`, we are telling the compiler that I will accept any kind of type as
`T` as long as it implements trait `Display`. Sounds good!

Now `grade` can be *displayed* as we want. We can use [`format!`] macro to print `ReportCard`.

```rust
impl<T: std::fmt::Display> ReportCard<T> {
    pub fn print(&self) -> String {
        format!(
            "{} ({}) - achieved a grade of {}",
            &self.student_name, &self.student_age, &self.grade
        )
    }
}
```

After all modification, the whole code looks like follow:

```rust
/* file: "exercises/generics/generics3.rs" */
pub struct ReportCard<T: std::fmt::Display> {
    pub grade: T,
    pub student_name: String,
    pub student_age: u8,
}

impl<T: std::fmt::Display> ReportCard<T> {
    pub fn print(&self) -> String {
        format!(
            "{} ({}) - achieved a grade of {}",
            &self.student_name, &self.student_age, &self.grade
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generate_numeric_report_card() {
        let report_card = ReportCard {
            grade: 2.1,
            student_name: "Tom Wriggle".to_string(),
            student_age: 12,
        };
        assert_eq!(
            report_card.print(),
            "Tom Wriggle (12) - achieved a grade of 2.1"
        );
    }

    #[test]
    fn generate_alphabetic_report_card() {
        let report_card = ReportCard {
            grade: "A+",
            student_name: "Gary Plotter".to_string(),
            student_age: 11,
        };
        assert_eq!(
            report_card.print(),
            "Gary Plotter (11) - achieved a grade of A+"
        );
    }
}
```

[bounds]: https://doc.rust-lang.org/rust-by-example/generics/bounds.html
[blog post]: https://stevedonovan.github.io/rustifications/2018/09/08/common-rust-traits.html
[`Display`]: https://doc.rust-lang.org/std/fmt/trait.Display.html
[`format!`]: https://doc.rust-lang.org/std/macro.format.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
