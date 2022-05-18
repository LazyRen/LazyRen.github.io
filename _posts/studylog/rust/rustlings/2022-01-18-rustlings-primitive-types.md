---
layout:   post
title:    "Rustlings Topic: Primitive Types"
subtitle: "Rustlings Topic: Primitive Types"
category: studylog
tags:     rust rustlings
---

Have a look at [Data Types] & [The Slice Type] to learn about primitive types.

You may find [solution code for the topic from my repo].

[Data Types]: https://doc.rust-lang.org/stable/book/ch03-02-data-types.html
[The Slice Type]: https://doc.rust-lang.org/stable/book/ch04-03-slices.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/primitive_types

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## primitive_types1.rs

No comments are necessary this time.

```rust
/* file: "exercises/primitive_types/primitive_types1.rs" */
fn main() {
    // Booleans (`bool`)

    let is_morning = true;
    if is_morning {
        println!("Good morning!");
    }

    let is_evening = !is_morning;
    if is_evening {
        println!("Good evening!");
    }
}
```

## primitive_types2.rs

No comments are necessary this time. * 2

```rust
/* file: "exercises/primitive_types/primitive_types2.rs" */
fn main() {
    // Characters (`char`)

    let my_first_initial = 'C';
    if my_first_initial.is_alphabetic() {
        println!("Alphabetical!");
    } else if my_first_initial.is_numeric() {
        println!("Numerical!");
    } else {
        println!("Neither alphabetic nor numeric!");
    }

    let your_character = '🍻';
    if your_character.is_alphabetic() {
        println!("Alphabetical!");
    } else if your_character.is_numeric() {
        println!("Numerical!");
    } else {
        println!("Neither alphabetic nor numeric!");
    }
}
```

## primitive_types3.rs

[Array] is one of the common and useful data structures in the programming world.

> A fixed-size array, denoted `[T; N]`, for the element type, `T`,
> and the **non-negative compile-time** constant size, `N`.

Unfortunately, Rust doesn't allow runtime deterministic array size. If you want one, the easiest
solution would be using [Vec]. But keep in mind that the vector is allocated at the heap.

```rust
/* file: "exercises/primitive_types/primitive_types3.rs" */
fn main() {
    let a = [0; 100];

    if a.len() >= 100 {
        println!("Wow, that's a big array!");
    } else {
        println!("Meh, I eat arrays like that for breakfast.");
    }
}
```

[Array]: https://doc.rust-lang.org/std/primitive.array.html
[Vec]: https://doc.rust-lang.org/std/vec/struct.Vec.html

## primitive_types4.rs

Slice is also very handy and quite often used. Especially for the function parameter type.
So you better get used to it.
Take a look at [The Slice Type] chapter and [Primitive Type slice] API document.

```rust
/* file: "exercises/primitive_types/primitive_types4.rs" */
#[test]
fn slice_out_of_array() {
    let a = [1, 2, 3, 4, 5];

    let nice_slice = &a[1..4];

    assert_eq!([2, 3, 4], nice_slice)
}
```

[Primitive Type slice]: https://doc.rust-lang.org/std/primitive.slice.html

## primitive_types5.rs

A tuple is also widely used (except for the C/C++ I guess...?) primitive type in the programming world.
Take a look at [The Tuple Type] chapter & [Primitive Type tuple] API document.

```rust
/* file: "exercises/primitive_types/primitive_types5.rs" */
fn main() {
    let cat = ("Furry McFurson", 3.5);
    let (name, age) = cat;

    println!("{} is {} years old.", name, age);
}
```

[The Tuple Type]: https://doc.rust-lang.org/book/ch03-02-data-types.html#the-tuple-type
[Primitive Type tuple]: https://doc.rust-lang.org/std/primitive.tuple.html

## primitive_types6.rs

No comments are necessary this time. * 3

```rust
/* file: "exercises/primitive_types/primitive_types6.rs" */
#[test]
fn indexing_tuple() {
    let numbers = (1, 2, 3);
    // Replace below ??? with the tuple indexing syntax.
    let second = numbers.1;

    assert_eq!(2, second, "This is not the 2nd number in the tuple!")
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
