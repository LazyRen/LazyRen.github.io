---
layout:   post
title:    "Rustlings Topic: Collections"
subtitle: "Rustlings Topic: Collections"
category: studylog
tags:     rust rustlings
---

> Rust’s standard library includes a number of very useful data structures called collections. Most other data types
> represent one specific value, but collections can contain multiple values. Unlike the built-in array and tuple types,
> the data these collections point to is stored on the heap, which means the amount of data does not need to be known at
> compile-time and can grow or shrink as the program runs.
>
> This exercise will get you familiar with two fundamental data structures that are used very often in Rust programs:
>
> A [vector] allows you to store a variable number of values next to each other.
> A [hash map] allows you to associate a value with a particular key. You may also know this by the names unordered map
> in C++, dictionary in Python, or an associative array in other languages.

You may find [solution code for the topic from my repo].

[vector]: https://doc.rust-lang.org/stable/book/ch08-01-vectors.html
[hash map]: https://doc.rust-lang.org/book/ch08-03-hash-maps.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/collections

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## vec1.rs

We can declare vector in many ways. The basic way is, of course, using [`Vec::new()`].
Or we can use [`vec!`] macro. Helper methods such as [`to_vec()`] or [`into_vec()`] also helps.
Rust supports various methods/functions for std structs. So it is better to visit the rust API document.

In this exercise, I've used `slice::to_vec()` to copy contents of the `a` to `v`.

```rust
/* file: "exercises/collections/vec1.rs" */
fn array_and_vec() -> ([i32; 4], Vec<i32>) {
    let a = [10, 20, 30, 40]; // a plain array
    let v = a.to_vec();
    // let v = vec![10, 20, 30, 40];

    (a, v)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_array_and_vec_similarity() {
        let (a, v) = array_and_vec();
        assert_eq!(a, v[..]);
    }
}

```

[`Vec::new()`]: https://doc.rust-lang.org/std/vec/struct.Vec.html#method.new
[`vec!`]: https://doc.rust-lang.org/std/macro.vec.html
[`to_vec()`]: https://doc.rust-lang.org/std/primitive.slice.html#method.to_vec
[`into_vec()`]: https://doc.rust-lang.org/std/primitive.slice.html#method.into_vec

## vec2.rs

This exercise gives us the taste of [`iterator()`].<br>
[`fn iter_mut(&mut self)-> IterMut<'_, T>`] returns an iterator that **allows** modifying each value.
Combining it with the `for` loop, we can modify all values in the *vector*.

```rust
/* file: "exercises/collections/vec2.rs" */
fn vec_loop(mut v: Vec<i32>) -> Vec<i32> {
    for i in v.iter_mut() {
        *i *= 2;
    }

    // At this point, `v` should be equal to [4, 8, 12, 16, 20].
    v
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_vec_loop() {
        let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
        let ans = vec_loop(v.clone());

        assert_eq!(ans, v.iter().map(|x| x * 2).collect::<Vec<i32>>());
    }
}
```

[`iterator()`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html
[`fn iter_mut(&mut self)-> IterMut<'_, T>`]: https://doc.rust-lang.org/std/primitive.slice.html#method.iter_mut

## hashmap1.rs

This exercise gives an example usage of [`HashMap`].<br>
Take a look at the rust API document if you are not familiar with it.

```rust
/* file: "exercises/collections/hashmap1.rs" */
use std::collections::HashMap;

fn fruit_basket() -> HashMap<String, u32> {
    let mut basket = HashMap::<String, u32>::new();

    // Two bananas are already given for you :)
    basket.insert(String::from("banana"), 2);

    basket.insert("apple".to_string(), 1);
    basket.insert("mango".to_string(), 3);

    basket
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn at_least_three_types_of_fruits() {
        let basket = fruit_basket();
        assert!(basket.len() >= 3);
    }

    #[test]
    fn at_least_five_fruits() {
        let basket = fruit_basket();
        assert!(basket.values().sum::<u32>() >= 5);
    }
}
```

[`HashMap`]: https://doc.rust-lang.org/std/collections/struct.HashMap.html

## hashmap2.rs

Take a look at **TODO** from the `fruit_basket()`.

> TODO: Put new fruits if not already present. Note that you are not allowed to put any type of fruit
> that's already present!

So, we have to do 2 things here.

1. Search `HashMap` to find out what `Fruit` is missing.
2. Insert one quantity if the fruit doesn't exist.

We may use `get()` & `insert()`, but Rust also supports [`entry()`] & [`or_insert()`] methods which suits
better in such situation.

```rust
/* file: "exercises/collections/hashmap2.rs" */
use std::collections::HashMap;

#[derive(Hash, PartialEq, Eq)]
enum Fruit {
    Apple,
    Banana,
    Mango,
    Lychee,
    Pineapple,
}

fn fruit_basket(basket: &mut HashMap<Fruit, u32>) {
    let fruit_kinds = vec![
        Fruit::Apple,
        Fruit::Banana,
        Fruit::Mango,
        Fruit::Lychee,
        Fruit::Pineapple,
    ];

    for fruit in fruit_kinds {
        hashmap.entry(fruit).or_insert(1);
        // if let None = basket.get(&fruit) {
        //     basket.insert(fruit, 1);
        // }
    }
}
```

[`entry()`]: https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry
[`or_insert()`]: https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html#method.or_insert

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
