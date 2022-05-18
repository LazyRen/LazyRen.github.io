---
layout:   post
title:    "Rustlings Topic: Variables"
subtitle: "Rustlings Topic: Variables"
category: studylog
tags:     rust rustlings
---

> In Rust, variables are immutable by default.
> When a variable is immutable, once a value is bound to a name, you can’t change that value.
> You can make them mutable by adding mut in front of the variable name.

This is the first topic of the [rustlings]. And there is nothing really special about it.<br>
Exercises are just checking whether you are familiar with the basic syntaxes of the Rust.<br>
If you find any of the exercises a bit confusing, please re-read [The Book] and/or [Rust By Example].

You may find [solution code for the topic from my repo].

[rustlings]: https://github.com/rust-lang/rustlings
[The Book]: https://doc.rust-lang.org/book/index.html
[Rust By Example]: https://doc.rust-lang.org/rust-by-example/index.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/variables

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## variables1.rs

Rust uses `let` keyword to create a new variable binding.

```rust
/* file: "exercises/variables/variables1.rs" */
fn main() {
    let x = 5;
    println!("x has the value {}", x);
}
```

## variables2.rs

If we only declared variables without type annotation or initialize value, the compiler has no idea what that variable
type will be.

So, it will return error like below:

```shell
error[E0282]: type annotations needed
 --> exercises/variables/variables2.rs:5:9
  |
5 |     let x;
  |         ^ consider giving `x` a type

error: aborting due to previous error
```

What if we give a type annotation like `let x: u32;`?<br>
That should surely fix above error right?<br>
Tne answer is 'yes it does'...<br>
**But** we will encounter another error:

```shell
error[E0381]: use of possibly-uninitialized variable: `x`
 --> exercises/variables/variables2.rs:6:8
  |
6 |     if x == 10 {
  |        ^ use of possibly-uninitialized `x`

error: aborting due to previous error
```

The error says we are trying to use the declared variable without initializing it.

So the proper answer would be either

1. Give `x` initialize value (type will be deduced by the compiler)
2. Give `x` initialize value **AND** type annotation.

```rust
/* file: "exercises/variables/variables2.rs" */
fn main() {
    let x: u32 = 10;
    if x == 10 {
        println!("Ten!");
    } else {
        println!("Not ten!");
    }
}
```

## variables3.rs

In Rust, variable bindings are immutable by default.<br>
But here we're trying to reassign a different value to x!

We can add `mut` to the variable binding to inform the compiler that we want to modify the variable in later use.

```rust
/* file: "exercises/variables/variables3.rs" */
fn main() {
    let mut x = 3;
    println!("Number {}", x);
    x = 5; // don't change this line
    println!("Number {}", x);
}
```

## variables4.rs

I have already explained that we must initialize a variable before use in [variables2].<br>
If not, we will encounter an error like the below:

[variables2]: #variables2rs

```shell
error[E0381]: borrow of possibly-uninitialized variable: `x`
 --> exercises/variables/variables4.rs:6:27
  |
6 |     println!("Number {}", x);
  |                           ^ use of possibly-uninitialized `x`

error: aborting due to previous error
```

Initialize the variable `x`.

```rust
/* file: "exercises/variables/variables4.rs" */
fn main() {
    let x: i32 = 1;
    println!("Number {}", x);
}
```

## variables5.rs

Sometimes we may also like to reuse existing variable names because we are just converting values to different types
like in this exercise.<br>
Fortunately, Rust has a powerful solution to this problem: 'Shadowing'!<br>
you can read more about 'Shadowing' in the book's section [Variables and Mutability].

[Variables and Mutability]: https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#shadowing

```rust
/* file: "exercises/variables/variables5.rs" */
fn main() {
    let number = "T-H-R-E-E"; // don't change this line
    println!("Spell a Number : {}", number);
    let number = 3;
    println!("Number plus two is : {}", number + 2);
}
```

## variables6.rs

Constants are always immutable and they are declared with the keyword `const` rather than the keyword `let`.
Constants types **must** also always be annotated.

```rust
/* file: "exercises/variables/variables6.rs" */
const NUMBER:i32 = 3;
fn main() {
    println!("Number {}", NUMBER);
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
