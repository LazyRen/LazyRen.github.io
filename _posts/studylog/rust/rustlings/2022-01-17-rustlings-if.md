---
layout:   post
title:    "Rustlings Topic: If"
subtitle: "Rustlings Topic: If"
category: studylog
tags:     rust rustlings
---

Have a look at [Control Flow - if expressions] to check further information about Rust functions.

You may find [solution code for the topic from my repo].

[Control Flow - if expressions]: https://doc.rust-lang.org/book/ch03-05-control-flow.html#if-expressions
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/if

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## if1.rs

> Remember in Rust that:
>
> * the `if` condition does not need to be surrounded by parentheses
> * `if`/`else` conditionals are expressions
> * Each condition is followed by a `{}` block.

Notice that there is no `;` after `a` or `b`. Since both will be *returned* from the function.

```rust
/* file: "exercises/if/if1.rs" */
pub fn bigger(a: i32, b: i32) -> i32 {
    if a > b {
        a
    } else {
        b
    }
}
```

## if2.rs

First, Rust requires each conditional block to return the same value. So `1` is not acceptable and
won't compile.<br>

In order to change it to the proper value, we have to check how the test is configured.

And if you have not noticed the basic testing format rust provides yet.<br>
The structure looks like this:

```rust
// #[cfg(test)] macro indicates that below tests module is indeed the `test`.
#[cfg(test)]
mod tests {
    use super::*; // To use all variables & functions from the parent module.

    // Any test function must be decorated with `#[test]`.
    #[test]
    fn test_name() {

    }
}
```

Back to the problem, we have to return `bar` if the input value is `fuzz` and `baz` for anything else.

```rust
/* file: "exercises/if/if1.rs" */
pub fn fizz_if_foo(fizzish: &str) -> &str {
    if fizzish == "fizz" {
        "foo"
    } else if fizzish == "fuzz" {
        "bar"
    } else {
        "baz"
    }
}
```

You can also use [match control flow operation] to do the same.

[match control flow operation]: https://doc.rust-lang.org/book/ch06-02-match.html

```rust
/* file: "exercises/if/if1.rs" */
pub fn fizz_if_foo(fizzish: &str) -> &str {
    match fizzish {
        "fizz" => "foo",
        "fuzz" => "bar",
        _ => "baz",
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
