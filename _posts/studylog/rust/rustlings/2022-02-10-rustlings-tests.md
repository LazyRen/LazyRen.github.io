---
layout:   post
title:    "Rustlings Topic: Tests"
subtitle: "Rustlings Topic: Tests"
category: studylog
tags:     rust rustlings
---

> [Tests] are Rust functions that verify that the non-test code is functioning in the expected manner.
> The bodies of test functions typically perform these three actions:
>
> 1. Set up any needed data or state.
> 2. Run the code you want to test.
> 3. Assert the results are what you expect.
>
> Let’s look at the features Rust provides specifically for writing tests that take these actions,
> which include the test attribute, a few macros, and the should_panic attribute.

You may find [solution code for the topic from my repo].

[Tests]: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/tests

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## tests1.rs

```rust
/* file: "exercises/tests/tests1.rs" */
#[cfg(test)]
mod tests {
    #[test]
    fn you_can_assert() {
        assert!(true);
    }
}
```

## tests2.rs

```rust
/* file: "exercises/tests/tests2.rs" */
#[cfg(test)]
mod tests {
    #[test]
    fn you_can_assert_eq() {
        assert_eq!(String::from("Hi"), "Hi".to_string());
        let two = 2;
        assert_eq!(two, 2);
    }
}
```

## tests3.rs

```rust
/* file: "exercises/tests/tests3.rs" */
pub fn is_even(num: i32) -> bool {
    num % 2 == 0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_true_when_even() {
        assert!(is_even(10));
    }

    #[test]
    fn is_false_when_odd() {
        assert!(!is_even(5));
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
