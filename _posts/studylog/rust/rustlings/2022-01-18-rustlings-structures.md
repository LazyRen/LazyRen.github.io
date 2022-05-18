---
layout:   post
title:    "Rustlings Topic: Structures"
subtitle: "Rustlings Topic: Structures"
category: studylog
tags:     rust rustlings
---

> Rust has three struct types: a classic C struct, a tuple struct, and a unit struct.

Have a look at the [Structures] & [Method Syntax] chapter and [keyword struct] API document to
understand Rust's structure.

You may find [solution code for the topic from my repo].

[Structures]: https://doc.rust-lang.org/book/ch05-01-defining-structs.html
[Method Syntax]: https://doc.rust-lang.org/book/ch05-03-method-syntax.html
[keyword struct]: https://doc.rust-lang.org/std/keyword.struct.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/structs

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## structs1.rs

In this first exercise, we are going to implement [classic struct] & [tuple struct].

```rust
/* file: "exercises/structs/structs1.rs" */
struct ColorClassicStruct {
    name: String,
    hex: String,
}

struct ColorTupleStruct<'a>(&'a str, &'a str);

#[derive(Debug)]
struct UnitStruct;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classic_c_structs() {
        let green = ColorClassicStruct {
            name: "green".to_string(),
            hex: String::from("#00FF00"),
        };

        assert_eq!(green.name, "green");
        assert_eq!(green.hex, "#00FF00");
    }

    #[test]
    fn tuple_structs() {
        let green = ColorTupleStruct("green", "#00FF00");

        assert_eq!(green.0, "green");
        assert_eq!(green.1, "#00FF00");
    }

    #[test]
    fn unit_structs() {
        let unit_struct = UnitStruct;
        let message = format!("{:?}s are fun!", unit_struct);

        assert_eq!(message, "UnitStructs are fun!");
    }
}
```

[classic struct]: https://doc.rust-lang.org/book/ch05-01-defining-structs.html
[tuple struct]: https://doc.rust-lang.org/book/ch05-01-defining-structs.html#using-tuple-structs-without-named-fields-to-create-different-types

## structs2.rs

Rust provides [update syntax] to create instances of the struct from the existing object.

```rust
/* file: "exercises/structs/structs2.rs" */
#[derive(Debug)]
struct Order {
    name: String,
    year: u32,
    made_by_phone: bool,
    made_by_mobile: bool,
    made_by_email: bool,
    item_number: u32,
    count: u32,
}

fn create_order_template() -> Order {
    Order {
        name: String::from("Bob"),
        year: 2019,
        made_by_phone: false,
        made_by_mobile: false,
        made_by_email: true,
        item_number: 123,
        count: 0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn your_order() {
        let order_template = create_order_template();
        // Update syntax used.
        let your_order = Order {
            name: "Hacker in Rust".to_string(),
            count: 1,
            ..order_template
        };
        assert_eq!(your_order.name, "Hacker in Rust");
        assert_eq!(your_order.year, order_template.year);
        assert_eq!(your_order.made_by_phone, order_template.made_by_phone);
        assert_eq!(your_order.made_by_mobile, order_template.made_by_mobile);
        assert_eq!(your_order.made_by_email, order_template.made_by_email);
        assert_eq!(your_order.item_number, order_template.item_number);
        assert_eq!(your_order.count, 1);
    }
}
```

In case you missed it, take a closer look at

```rust
#[test]
fn your_order() {
    let order_template = create_order_template();
    // Update syntax used.
    let your_order = Order {
        name: "Hacker in Rust".to_string(),
        count: 1,
        ..order_template
    };
    // ...
}
```

where `..order_template` is used. Any other fields that are not mentioned will be copied from the
`order_template` automatically.

[update syntax]: https://doc.rust-lang.org/stable/book/ch05-01-defining-structs.html#creating-instances-from-other-instances-with-struct-update-syntax

## structs3.rs

In Rust, structure definition & implementation are separated. We need an `impl` block to implement
the `method` for the structure. Check the [Method Syntax] chapter for further information.

```rust
/* file: "exercises/structs/structs3.rs" */
#[derive(Debug)]
struct Package {
    sender_country: String,
    recipient_country: String,
    weight_in_grams: i32,
}

impl Package {
    fn new(sender_country: String, recipient_country: String, weight_in_grams: i32) -> Package {
        if weight_in_grams <= 0 {
            panic!("Negative weight is passed");
        } else {
            Package {
                sender_country,
                recipient_country,
                weight_in_grams,
            }
        }
    }

    fn is_international(&self) -> bool {
        if self.sender_country != self.recipient_country {
            true
        } else {
            false
        }
    }

    fn get_fees(&self, cents_per_gram: i32) -> i32 {
        self.weight_in_grams * cents_per_gram
    }
}
```

You might notice new macro `panic!` is used. When [panic!] is executed, it will terminate the program
immediately. It is useful to assert conditions.

Rust provides a lot of macros for the assertion. To list some (but not limited to) common macros...

* [assert!]
  * [debug_assert!]
* [assert_eq!]
  * [debug_assert_eq!]
* [assert_ne!]
  * [debug_assert_ne!]
* [panic!]
* [todo!]
* [unimplemented!]
* [unreachable!]

[assert_eq!]: https://doc.rust-lang.org/std/macro.assert_eq.html
[assert_ne!]: https://doc.rust-lang.org/std/macro.assert_ne.html
[assert!]: https://doc.rust-lang.org/std/macro.assert.html
[debug_assert_eq!]: https://doc.rust-lang.org/std/macro.debug_assert_eq.html
[debug_assert_ne!]: https://doc.rust-lang.org/std/macro.debug_assert_ne.html
[debug_assert!]: https://doc.rust-lang.org/std/macro.debug_assert.html
[panic!]: https://doc.rust-lang.org/std/macro.panic.html
[todo!]: https://doc.rust-lang.org/std/macro.todo.html
[unimplemented!]: https://doc.rust-lang.org/std/macro.unimplemented.html
[unreachable!]: https://doc.rust-lang.org/std/macro.unreachable.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
