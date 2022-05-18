---
layout:   post
title:    "Rustlings Topic: Option"
subtitle: "Rustlings Topic: Option"
category: studylog
tags:     rust rustlings
---

> Type Option represents an optional value: every Option is either Some and contains a value,
> or None, and does not. Option types are very common in Rust code, as they have a number of uses:
>
> * Initial values
> * Return values for functions that are not defined over their entire input range (partial functions)
> * Return value for otherwise reporting simple errors, where None is returned on error
> * Optional struct fields
> * Struct fields that can be loaned or "taken"
> * Optional function arguments
> * Nullable pointers
> * Swapping things out of difficult situations

You may find [solution code for the topic from my repo].

* [Option Enum Format](https://doc.rust-lang.org/stable/book/ch10-01-syntax.html#in-enum-definitions)
* [Option Module Documentation](https://doc.rust-lang.org/std/option/)
* [Option Enum Documentation](https://doc.rust-lang.org/std/option/enum.Option.html)

[Generics]: https://doc.rust-lang.org/stable/book/ch10-01-syntax.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/option

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## option1.rs

`Option` & `Result` is very decent `enum` feature that Rust provides. Most of the time you will find
it is useful to return *optional* value for any function.

With `Option<T>`, it may have either `Some(T)` or `None`. In this case, function `print_number`
declaration looks like this:

```rust
fn print_number(maybe_number: Option<u16>)
```

It takes `maybe_number` which is `Option<u16>`. So we know that we can pass either `Some(u16)` or
`None`. Let's fix the code to pass `Some(u16)` instead of pure `u16`. (which is unacceptable)

Note that original code uses `unwrap()` to extract `u16` from `Option`. This is not recommended way
to do so as the program will panic if it encounters `None` from the `Option`. You have to either
use *pattern matching* or `is_some()` / `is_none()` method. I deliberately used them all just to show
you the basic usage of them.

```rust
/* file: "exercises/option/option1.rs" */
// you can modify anything EXCEPT for this function's sig
fn print_number(maybe_number: Option<u16>) {
    match maybe_number {
        Some(num) => println!("printing: {}", num),
        None => println!("printing: None"),
    }
    if maybe_number.is_some() {
        println!("`maybe_number` is a number!")
    }
    if maybe_number.is_none() {
        println!("`maybe_number` is NOT a number")
    }
}

fn main() {
    print_number(Some(13));
    print_number(Some(99));
    print_number(None);

    let mut numbers: [Option<u16>; 5] = [None; 5];
    for iter in 0..5 {
        let number_to_add: u16 = { ((iter * 1235) + 2) / (4 * 16) };

        numbers[iter as usize] = Some(number_to_add);
    }
}
```

## option2.rs

[`if let`] & [`while let`] is also a useful Rust feature that is - at least for me - new to me.

```rust
/* file: "exercises/option/option2.rs" */
fn main() {
    let optional_word = Some(String::from("rustlings"));
    if let Some(word) = optional_word {
        println!("The word is: {}", word);
    } else {
        println!("The optional word doesn't contain anything");
    }

    let mut optional_integers_vec: Vec<Option<i8>> = Vec::new();
    for x in 1..10 {
        optional_integers_vec.push(Some(x));
    }

    while let Some(Some(integer)) = optional_integers_vec.pop() {
        println!("current value: {}", integer);
    }
}

```

[`if let`]: https://doc.rust-lang.org/rust-by-example/flow_control/if_let.html
[`while let`]: https://doc.rust-lang.org/rust-by-example/flow_control/while_let.html

## option3.rs

Please do read [`ref`]. By default, match statements consume all they can, which can sometimes be a
problem, when you don’t need the value to be moved and owned. Which is the exact case here.

By using the `ref` keyword, we inform the compiler that we don't want `move` to happen. We rather
*borrow* the value(`y`) for a moment.

```rust
/* file: "exercises/option/option3.rs" */
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let y: Option<Point> = Some(Point { x: 100, y: 200 });

    match y {
        // https://doc.rust-lang.org/std/keyword.ref.html
        Some(ref p) => println!("Co-ordinates are {},{} ", p.x, p.y),
        _ => println!("no match"),
    }
    y; // Fix without deleting this line.
}
```

[`ref`]: https://doc.rust-lang.org/std/keyword.ref.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
