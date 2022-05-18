---
layout:   post
title:    "Rustlings Topic: Quiz"
subtitle: "Rustlings Topic: Quiz"
category: studylog
tags:     rust rustlings
---

Finally the last topic of the [Rustlings]!<br>
I honestly didn't think writing solutions would take this long. But finally, I've made it!

Kudos to me!

You may find [solution code for the topic from my repo].

[Rustlings]: https://github.com/rust-lang/rustlings
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## quiz1.rs

```rust
/* file: "exercises/quiz1.rs" */
fn calculate_apple_price(total_apple: i32) -> i32 {
    if total_apple > 40 {
        total_apple
    } else {
        total_apple * 2
    }
}

// Don't modify this function!
#[test]
fn verify_test() {
    let price1 = calculate_apple_price(35);
    let price2 = calculate_apple_price(40);
    let price3 = calculate_apple_price(65);

    assert_eq!(70, price1);
    assert_eq!(80, price2);
    assert_eq!(65, price3);
}
```

## quiz2.rs

```rust
/* file: "exercises/quiz2.rs" */
fn string_slice(arg: &str) {
    println!("{}", arg);
}
fn string(arg: String) {
    println!("{}", arg);
}

fn main() {
    string_slice("blue");
    string("red".to_string());
    string(String::from("hi"));
    string("rust is fun!".to_owned());
    string("nice weather".into());
    string(format!("Interpolation {}", "Station"));
    string_slice(&String::from("abc")[0..1]);
    string_slice("  hello there ".trim());
    string("Happy Monday!".to_string().replace("Mon", "Tues"));
    string("mY sHiFt KeY iS sTiCkY".to_lowercase());
}
```

## quiz3.rs

```rust
/* file: "exercises/quiz3.rs" */
pub fn times_two(num: i32) -> i32 {
    num * 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_twice_of_positive_numbers() {
        assert_eq!(times_two(4), 8);
    }

    #[test]
    fn returns_twice_of_negative_numbers() {
        assert_eq!(times_two(-4), -8)
    }
}
```

## quiz4.rs

```rust
/* file: "exercises/quiz4.rs" */
macro_rules! my_macro {
    ($val:expr) => {
        format!("Hello {}", $val);
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_my_macro_world() {
        assert_eq!(my_macro!("world!"), "Hello world!");
    }

    #[test]
    fn test_my_macro_goodbye() {
        assert_eq!(my_macro!("goodbye!"), "Hello goodbye!");
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
