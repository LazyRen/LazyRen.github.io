---
layout:   post
title:    "Rustlings Topic: Standard Library Types"
subtitle: "Rustlings Topic: Standard Library Types"
category: studylog
tags:     rust rustlings
---

> This section will teach you about [Box], [Shared-State Concurrency] and [Iterators].

You may find [solution code for the topic from my repo].

[Box]: https://doc.rust-lang.org/book/ch15-01-box.html
[Shared-State Concurrency]: https://doc.rust-lang.org/book/ch16-03-shared-state.html
[Iterators]: https://doc.rust-lang.org/book/ch13-02-iterators.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/standard_library_types

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## box1.rs

> At compile time, Rust needs to know how much space a type takes up. This becomes problematic for recursive types,
> where a value can have as part of itself another value of the same type. To get around the issue,
> we can use a [`Box`] - a smart pointer used to store data on the heap, which also allows us to wrap a recursive type.

*Rust needs to know how much space a type takes up.* Also makes it *almost* impossible to have a `variable-length array`.
(Just like good old `C++`) But that's another issue.
{:.note}

`Box<T>` is what Rust uses to do *heap allocation*. You can think of [`Box`] as a smart pointer that points to the `T`.

You'll use them most often in these situations:

* When you have a type whose size can’t be known at compile-time and you want to use a value of that type in a context
  that requires an exact size.
* When you have a large amount of data and you want to transfer ownership but ensure the data won’t be copied when you
  do so.
* When you want to own a value and you care only that it’s a type that implements a particular trait rather than being
  of a specific type.

Getting back to the problem. When you try to run a test code, the compiler will print a warning & help as below:

```shell
error[E0072]: recursive type `List` has infinite size
  --> exercises/standard_library_types/box1.rs:20:1
   |
20 | pub enum List {
   | ^^^^^^^^^^^^^ recursive type has infinite size
21 |     Cons(i32, List),
   |               ---- recursive without indirection
   |
help: insert some indirection (e.g., a `Box`, `Rc`, or `&`) to make `List` representable
   |
21 |     Cons(i32, Box<List>),
```

Basically, we are declaring `List` enum. But the `List` enum contains `List` within itself(`Cons(i32, List)`).<br>
If so, how can the compiler calculate the size of the `List`?<br>
When the compiler tries to calculate the size of the `List`, it needs to know the size of the `List`.
So when the compiler ...

Do you see the point?<br>
This is what *recursive type has infinite size* means.

But when we change `Cons(i32, List)` to the `Cons(i32, Box<List>)`; the compiler doesn't need to know the size of `List` to
calculate the size of `Cons`. Because no matter the size, `List` will be stored in the *heap*, and `Cons` will only have
the address of the `List`!

```rust
/* file: "exercises/standard_library_types/box1.rs" */
#[derive(PartialEq, Debug)]
pub enum List {
    Cons(i32, Box<List>),
    Nil,
}

fn main() {
    println!("This is an empty cons list: {:?}", create_empty_list());
    println!(
        "This is a non-empty cons list: {:?}",
        create_non_empty_list()
    );
}

pub fn create_empty_list() -> List {
    List::Nil
}

pub fn create_non_empty_list() -> List {
    List::Cons(0, Box::new(List::Nil))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_empty_list() {
        assert_eq!(List::Nil, create_empty_list())
    }

    #[test]
    fn test_create_non_empty_list() {
        assert_ne!(create_empty_list(), create_non_empty_list())
    }
}
```

[`Box`]: https://doc.rust-lang.org/stable/std/boxed/struct.Box.html

## arc1.rs

[`Arc`] is a thread-safe reference-counting pointer, which stands for *Atomically Reference Counted*. Take a look at
[this section] of the book for more information.

> The type Arc<T> provides shared ownership of a value of type T, allocated in the heap. Invoking clone on Arc produces
> a new Arc instance, which points to the same allocation on the heap as the source Arc, while increasing a reference
> count. When the last Arc pointer to a given allocation is destroyed, the value stored in that allocation (often
> referred to as “inner value”) is also dropped.

When we need to run our code concurrently with shared data; `Arc` is our friend. We first create `Arc<T>`, and `clone()`
it whenever the data access is required. Calling `clone()` won't `clone` the content(`T`). Instead, it *clones* the
pointer to the content.

```rust
/* file: "exercises/standard_library_types/arc1.rs" */
#![forbid(unused_imports)] // Do not change this, (or the next) line.
use std::sync::Arc;
use std::thread;

fn main() {
    let numbers: Vec<_> = (0..100u32).collect();
    let shared_numbers = Arc::new(numbers);
    let mut joinhandles = Vec::new();

    for offset in 0..8 {
        let child_numbers = shared_numbers.clone();
        joinhandles.push(thread::spawn(move || {
            let mut i = offset;
            let mut sum = 0;
            while i < child_numbers.len() {
                sum += child_numbers[i];
                i += 8;
            }
            println!("Sum of offset {} is {}", offset, sum);
        }));
    }
    for handle in joinhandles.into_iter() {
        handle.join().unwrap();
    }
}
```

[`Arc`]: https://doc.rust-lang.org/stable/std/sync/struct.Arc.html
[this section]: https://doc.rust-lang.org/book/ch16-03-shared-state.html#atomic-reference-counting-with-arct

## iterators1.rs

[Iterator] is an essential tool to iterate over *collections*. We can even implement `trait Iterator` to our custom struct
to make it iterable.

```rust
/* file: "exercises/standard_library_types/iterators1.rs" */
fn main() {
    let my_fav_fruits = vec!["banana", "custard apple", "avocado", "peach", "raspberry"];

    let mut my_iterable_fav_fruits = my_fav_fruits.iter();

    assert_eq!(my_iterable_fav_fruits.next(), Some(&"banana"));
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"custard apple"));
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"avocado"));
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"peach"));
    assert_eq!(my_iterable_fav_fruits.next(), Some(&"raspberry"));
    assert_eq!(my_iterable_fav_fruits.next(), None);
}
```

[Iterator]: https://doc.rust-lang.org/std/iter/trait.Iterator.html

## iterators2.rs

1. > Complete the `capitalize_first` function.<br>
   > "hello" -> "Hello"

   To solve this, you first must find what [`std::str::Chars`] does.
   According to the API doc, it gives an iterator over the chars of a string slice. So the first `next()` from the `match`
   the expression will give you the first character from the string slice.

2. > Apply the `capitalize_first` function to a slice of string slices.<br>
   > Return a vector of strings.<br>
   > ["hello", "world"] -> ["Hello", "World"]

   [`std::iter::iterator::map`] takes a closure and creates an iterator that calls that closure on each element.
   Consider using `map` instead of `for` loop depending on the situation. Combining it with
   [`std::iter::iterator::collect`], you get a nice sweet collection(such as `Vec`) of converted value.

   ```rust
   words.iter().map(|x| capitalize_first(x)).collect();
   ```

3. > Apply the `capitalize_first` function again to a slice of string slices.<br>
   > Return a single string.<br>
   > ["hello", " ", "world"] -> "Hello World"

   You only need to know about [`slice::join`].

   ```rust
   capitalize_words_vector(words).join("")
   ```

```rust
/* file: "exercises/standard_library_types/iterators2.rs" */
// Step 1.
// Complete the `capitalize_first` function.
// "hello" -> "Hello"
pub fn capitalize_first(input: &str) -> String {
    let mut c = input.chars();
    match c.next() {
        None => String::new(),
        Some(first) => first.to_uppercase().to_string() + c.as_str(),
    }
}

// Step 2.
// Apply the `capitalize_first` function to a slice of string slices.
// Return a vector of strings.
// ["hello", "world"] -> ["Hello", "World"]
pub fn capitalize_words_vector(words: &[&str]) -> Vec<String> {
    words.iter().map(|x| capitalize_first(x)).collect()
}

// Step 3.
// Apply the `capitalize_first` function again to a slice of string slices.
// Return a single string.
// ["hello", " ", "world"] -> "Hello World"
pub fn capitalize_words_string(words: &[&str]) -> String {
    capitalize_words_vector(words).join("")
}
```

[`std::str::Chars`]: https://doc.rust-lang.org/stable/std/str/struct.Chars.html
[`std::iter::iterator::map`]: https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.map
[`std::iter::iterator::collect`]: https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.collect
[`slice::join`]: https://doc.rust-lang.org/stable/std/primitive.slice.html#method.join

## iterators3.rs

1. > Complete the divide function to get the first four tests to pass.

   ```rust
   #[test]
   fn test_success() {
       assert_eq!(divide(81, 9), Ok(9));
   }
   #[test]
   fn test_not_divisible() {
       assert_eq!(
           divide(81, 6),
           Err(DivisionError::NotDivisible(NotDivisibleError {
               dividend: 81,
               divisor: 6
           }))
       );
   }
   #[test]
   fn test_divide_by_0() {
       assert_eq!(divide(81, 0), Err(DivisionError::DivideByZero));
   }
   #[test]
   fn test_divide_0_by_something() {
       assert_eq!(divide(0, 81), Ok(0));
   }
   ```

   When we take a look at those tests, it is clear that `divide` should return
   `Err(DivisionError::NotDivisible(NotDivisibleError))` if there is a remainder and return
   `Err(DivisionError::DivideByZero)` when divisor is 0.

2. > Get the remaining tests to pass by completing the result_with_list and list_of_results functions.

   In case you haven't noticed; `fn result_with_list() -> Result<Vec<i32>, DivisionError>` and
   `fn list_of_results() -> Vec<Result<i32, DivisionError>>` has exact same function body.

   ```rust
   let numbers = vec![27, 297, 38502, 81];
   numbers.into_iter().map(|n| divide(n, 27)).collect()
   ```

   This is thanks to the [`std::iter::iterator::collect`] can determine what collection it needs to create. and an
   iterator of `Result<T, E>` items can be collected into `Result<Collection<T>, E>`.

```rust
/* file: "exercises/standard_library_types/iterators3.rs" */
// Calculate `a` divided by `b` if `a` is evenly divisible by `b`.
// Otherwise, return a suitable error.
pub fn divide(a: i32, b: i32) -> Result<i32, DivisionError> {
    if b == 0 {
        Err(DivisionError::DivideByZero)
    } else if a % b != 0 {
        Err(DivisionError::NotDivisible(NotDivisibleError {
            dividend: a,
            divisor: b,
        }))
    } else {
        Ok(a / b)
    }
}

// Complete the function and return a value of the correct type so the test passes.
// Desired output: Ok([1, 11, 1426, 3])
fn result_with_list() -> Result<Vec<i32>, DivisionError> {
    let numbers = vec![27, 297, 38502, 81];
    numbers.into_iter().map(|n| divide(n, 27)).collect()
}

// Complete the function and return a value of the correct type so the test passes.
// Desired output: [Ok(1), Ok(11), Ok(1426), Ok(3)]
fn list_of_results() -> Vec<Result<i32, DivisionError>> {
    let numbers = vec![27, 297, 38502, 81];
    numbers.into_iter().map(|n| divide(n, 27)).collect()
}
```

## iterators4.rs

This problem can be solved easily with [`std::iter::Iterator::fold`].

`fold()` takes two arguments:<br>
an initial value, and a closure with two arguments: an ‘accumulator’, and an element. The closure returns the value that
the accumulator should have for the next iteration.

As commented out, you may also use [`std::iter::Iterator::reduce`]. Which is essentially the same as `fold()` but takes first
element as an initial value.

```rust
/* file: "exercises/standard_library_types/iterators4.rs" */
pub fn factorial(num: u64) -> u64 {
    (1..=num).fold(1, |sum, v| sum * v)
    // (1..=num).reduce(|sum, v| sum * v).unwrap()
}
```

[`std::iter::Iterator::fold`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.fold
[`std::iter::Iterator::reduce`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.reduce

## iterators5.rs

Now is the time to learn [`std::iter::Iterator::filter`]. It does what its name implies. It *filters out* elements that
you don't need it while iterating.

```rust
fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "from_str": None, ... }
    map.values().into_iter().filter(|&v| v == &value).count()
}
```

Function chaining in Rust is amazing yet sometimes hard to understand if you are not familiar with it.
Let's try to understand what that one-line function body does.

1. So we have [`HashMap`] named `map`. First, we get an iterator over hashmap's values with [`values()`].
2. With the given iterator, we now use [`std::iter::Iterator::filter`] to only collect elements that match`value`. As you
   have guessed, the returned iterator from `filter()` will yield only the elements for which the closure returns true.
3. Now we use [`std::iter::Iterator::count`] to count the number of iterations.

As you can see, trait [`std::iter::Iterator`] supports so many methods, that it is worth checking the API document.

We have finished the hard part. `count_collection_iterator()` is easier to implement.

```rust
fn count_collection_iterator(collection: &[HashMap<String, Progress>], value: Progress) -> usize {
    // collection is a slice of hashmaps.
    // collection = [{ "variables1": Complete, "from_str": None, ... },
    //     { "variables2": Complete, ... }, ... ]
    collection.iter().map(|m| count_iterator(&m, value)).sum()
}
```

`collection` is a slice of hashmaps. With `collection.iter()`, we can iterate over each and every hashmaps. `map()` will
help us to change that hashmap into the desired count. [`std::iter::Iterator::sum`] will do what you have imagined :)

Full code looks like this:

```rust
/* file: "exercises/standard_library_types/iterators5.rs" */
use std::collections::HashMap;

#[derive(Clone, Copy, PartialEq, Eq)]
enum Progress {
    None,
    Some,
    Complete,
}

fn count_for(map: &HashMap<String, Progress>, value: Progress) -> usize {
    let mut count = 0;
    for val in map.values() {
        if val == &value {
            count += 1;
        }
    }
    count
}

fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "from_str": None, ... }
    map.values().filter(|&v| v == &value).count()
}

fn count_collection_for(collection: &[HashMap<String, Progress>], value: Progress) -> usize {
    let mut count = 0;
    for map in collection {
        for val in map.values() {
            if val == &value {
                count += 1;
            }
        }
    }
    count
}

fn count_collection_iterator(collection: &[HashMap<String, Progress>], value: Progress) -> usize {
    // collection is a slice of hashmaps.
    // collection = [{ "variables1": Complete, "from_str": None, ... },
    //     { "variables2": Complete, ... }, ... ]
    collection.iter().map(|m| count_iterator(&m, value)).sum()
}
```

[`std::iter::Iterator::filter`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter
[`HashMap`]: https://doc.rust-lang.org/std/collections/hash_map/struct.HashMap.html#
[`values()`]: https://doc.rust-lang.org/std/collections/hash_map/struct.HashMap.html#method.values
[`std::iter::Iterator::count`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.count
[`std::iter::Iterator`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html
[`std::iter::Iterator::sum`]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.sum

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
