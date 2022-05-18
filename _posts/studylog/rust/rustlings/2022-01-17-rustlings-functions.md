---
layout:   post
title:    "Rustlings Topic: Functions"
subtitle: "Rustlings Topic: Functions"
category: studylog
tags:     rust rustlings
---

Have a look at [how functions work] to check further information about Rust functions.

You may find [solution code for the topic from my repo].

[how functions work]: https://doc.rust-lang.org/book/ch03-03-how-functions-work.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/functions

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## functions1.rs

We can't use a function without declaring it. Declare an empty function with matching function
signature.<br>
That is, function with name `call_me` & takes no argument and returns nothing.

```rust
/* file: "exercises/functions/functions1.rs" */
fn call_me() {

}

fn main() {
    call_me();
}
```

## functions2.rs

Rust requires that all parts of a function's signature have type annotations.
Any [integer type] will do. `i32`, `u32`, `usize` ... Choose the one you like.

[integer type]: https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-types

```rust
/* file: "exercises/functions/functions2.rs" */
fn main() {
    call_me(3);
}

fn call_me(num: u32) {
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}
```

## functions3.rs

If we look at the function signature of the `call_me(num: u32)`, the function expects to have one
argument. Provide one argument when you call the function from the main function.

```rust
/* file: "exercises/functions/functions3.rs" */
fn main() {
    call_me(10);
}

fn call_me(num: u32) {
    for i in 0..num {
        println!("Ring! Call number {}", i + 1);
    }
}
```

## functions4.rs

Rust's syntax for the return type is `fn function_name() -> RET_TYPE`. We have to provide type
annotation after `->`.

```rust
/* file: "exercises/functions/functions4.rs" */
fn main() {
    let original_price = 51;
    println!("Your sale price is {}", sale_price(original_price));
}

fn sale_price(price: i32) -> i32 {
    if is_even(price) {
        price - 10
    } else {
        price - 3
    }
}

fn is_even(num: i32) -> bool {
    num % 2 == 0
}

```

## functions5.rs

When we want to return something, we can use good-old-fashioned `return this;` **OR** to provide a statement without a
semicolon(`;`). Rust will interpret the statement as a return statement if you don't provide `;`.

At the moment, `fn square(num: i32) -> i32` does not have return statement. Remove `;` from
`num * num;` to make it as a return statement.

```rust
/* file: "exercises/functions/functions5.rs" */
fn main() {
    let answer = square(3);
    println!("The answer is {}", answer);
}

fn square(num: i32) -> i32 {
    num * num
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
