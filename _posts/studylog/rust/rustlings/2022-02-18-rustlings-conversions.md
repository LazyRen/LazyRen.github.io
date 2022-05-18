---
layout:   post
title:    "Rustlings Topic: Conversions"
subtitle: "Rustlings Topic: Conversions"
category: studylog
tags:     rust rustlings
---

> Rust offers a multitude of ways to [`convert`] a value of a given type into another type.<br>
> The simplest form of type conversion is a type cast expression. It is denoted with the binary operator `as`.<br>
> For instance, `println!("{}", 1 + 1.0);` would not compile, since `1` is an integer while `1.0` is a float.
> However, `println!("{}", 1 as f32 + 1.0)` should compile. The exercise [`using_as`](using_as.rs) tries to cover this.
>
>Rust also offers traits that facilitate type conversions upon implementation. These traits can be found under the
> [`convert`] module. The traits are the following:
>
> * `From` and `Into` covered in [`from_into`](#from_intors)
> * `TryFrom` and `TryInto` covered in [`try_from_into`](#try_from_intors)
> * `AsRef` and `AsMut` covered in [`as_ref_mut`](#as_ref_mutrs)ld both compile and run without panicking.
> These should be the main ways ***within the standard library*** to convert data into your desired types.

You may find [solution code for the topic from my repo].

[`convert`]: https://doc.rust-lang.org/std/convert/index.html
[`FromStr`]: https://doc.rust-lang.org/std/str/trait.FromStr.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/conversions

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## using_as.rs

Let's first run the code to see what's the problem.

```rust
fn average(values: &[f64]) -> f64 {
    let total = values.iter().fold(0.0, |a, b| a + b);
    total / values.len()
}

fn main() {
    let values = [3.5, 0.3, 13.0, 11.7];
    println!("{}", average(&values));
}
```

```shell
❯ rustlings run using_as
⚠️  Compiling of exercises/conversions/using_as.rs failed! Please try again. Here's the output:
error[E0277]: cannot divide `f64` by `usize`
  --> exercises/conversions/using_as.rs:10:11
   |
10 |     total / values.len()
   |           ^ no implementation for `f64 / usize`
   |
   = help: the trait `Div<usize>` is not implemented for `f64`

error: aborting due to previous error
```

`total` variable in `average()` is `usize` type. And we are dividing it as a return value.
The problem is, function signature(`fn average(values: &[f64]) -> f64`) suggests that it will return
`f64`. But as error points out, `Div<usize>` (I guess division for `usize`) cannot be implicitly
converted into `f64`.

In a situation like this, we can use the [`as`] keyword.<br>
[`as`] is a useful tool that can convert *primitive type* into *another primitive type*. Similar to
*casting* in C++. But beware, it is not a magic keyword that can convert one thing into anything.

It doesn't (AFAIK) work for `String`/`Vector` or any *user-defined structure*.

Solution is simple: Just add `as f64` at the end of `total / values.len()`.

```rust
/* file: "exercises/conversions/using_as.rs" */
fn average(values: &[f64]) -> f64 {
    let total = values.iter().fold(0.0, |a, b| a + b);
    total / values.len() as f64
}

fn main() {
    let values = [3.5, 0.3, 13.0, 11.7];
    println!("{}", average(&values));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_proper_type_and_value() {
        assert_eq!(average(&[3.5, 0.3, 13.0, 11.7]), 7.125);
    }
}
```

[`as`]: https://doc.rust-lang.org/std/keyword.as.html

## from_into.rs

[`From`] and [`Into`] are very useful *Trait* that can convert the value of *A type* into *B type*.

You only have to implement [`From`]. [`Into`] will be automatically implemented for you.

There is also a [`TryFrom`] *Trait* which can be implemented for conversion that may fail.<br>
Which we will cover shortly after.
{:.note title="Tip"}

Implement the trait as instructed.

> Steps:
>
> 1. If the length of the provided string is 0, then return the default of the Person
> 2. Split the given string on the commas present in it
> 3. Extract the first element from the split operation and use it as the name
> 4. If the name is empty, then return the default of `Person`
> 5. Extract the other element from the split operation and parse it into a `usize` as the age
> If while parsing the age, something goes wrong, then return the default of `Person`.<br>
> Otherwise, then return an instantiated Person object with the results

```rust
/* file: "exercises/conversions/from_into.rs" */
#[derive(Debug)]
struct Person {
    name: String,
    age: usize,
}

// We implement the Default trait to use it as a fallback
// when the provided string is not convertible into a Person object
impl Default for Person {
    fn default() -> Person {
        Person {
            name: String::from("John"),
            age: 30,
        }
    }
}

impl From<&str> for Person {
    fn from(s: &str) -> Person {
        let (name, age) = match s.split_once(',') {
            Some((name, age)) => (name.trim(), age.trim()),
            _ => return Person::default(),
        };

        if let Ok(age) = age.parse::<usize>() {
            if name.len() > 0 {
                return Person {
                    name: String::from(name),
                    age,
                };
            }
        }

        Person::default()
    }
}

fn main() {
    // Use the `from` function
    let p1 = Person::from("Mark,20");
    // Since From is implemented for Person, we should be able to use Into
    let p2: Person = "Gerald,70".into();
    println!("{:?}", p1);
    println!("{:?}", p2);
}
```

[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html
[`Into`]: https://doc.rust-lang.org/std/convert/trait.Into.html
[`TryFrom`]: https://doc.rust-lang.org/std/convert/trait.TryFrom.html

## from_str.rs

*Trait* [`FromStr`] exists to convert [`str`] into another.

Similar to the [`From`], but this may fail and return `Err`.

> Steps:
>
> 1. If the length of the provided string is 0, an error should be returned
> 2. Split the given string on the commas present in it
> 3. Only 2 elements should be returned from the split, otherwise, return an error
> 4. Extract the first element from the split operation and use it as the name
> 5. Extract the other element from the split operation and parse it into a `usize` as the age
>    with something like `"4".parse::<usize>()`
> 6. If while extracting the name and the age something goes wrong, an error should be returned
> If everything goes well, then return a Result of a Person object

```rust
/* file: "exercises/conversions/from_str.rs" */
use std::num::ParseIntError;
use std::str::FromStr;

#[derive(Debug, PartialEq)]
struct Person {
    name: String,
    age: usize,
}

// We will use this error type for the `FromStr` implementation.
#[derive(Debug, PartialEq)]
enum ParsePersonError {
    // Empty input string
    Empty,
    // Incorrect number of fields
    BadLen,
    // Empty name field
    NoName,
    // Wrapped error from parse::<usize>()
    ParseInt(ParseIntError),
}

impl FromStr for Person {
    type Err = ParsePersonError;
    fn from_str(s: &str) -> Result<Person, Self::Err> {
        if s.is_empty() {
            return Err(ParsePersonError::Empty);
        }

        let splitted_item = s.split(',').collect::<Vec<&str>>();
        let (name, age) = match &splitted_item[..] {
            [name, age] => (
                name.to_string(),
                age.parse().map_err(ParsePersonError::ParseInt)?,
            ),
            _ => return Err(ParsePersonError::BadLen),
        };

        if name.is_empty() {
            return Err(ParsePersonError::NoName);
        }

        Ok(Person {
            name: name.into(),
            age,
        })
    }
}

fn main() {
    let p = "Mark,20".parse::<Person>().unwrap();
    println!("{:?}", p);
}
```

[`FromStr`]: https://doc.rust-lang.org/std/str/trait.FromStr.html
[`str`]: https://doc.rust-lang.org/std/primitive.str.html

## try_from_into.rs

Here is the [`TryFrom`] that I briefly introduced before!

The difference with [`From`] is that this May return `Err` if conversion fails.

```rust
/* file: "exercises/conversions/try_from_into.rs" */
use std::convert::{TryFrom, TryInto};

#[derive(Debug, PartialEq)]
struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

// We will use this error type for these `TryFrom` conversions.
#[derive(Debug, PartialEq)]
enum IntoColorError {
    // Incorrect length of slice
    BadLen,
    // Integer conversion error
    IntConversion,
}

// Tuple implementation
impl TryFrom<(i16, i16, i16)> for Color {
    type Error = IntoColorError;
    fn try_from(tuple: (i16, i16, i16)) -> Result<Self, Self::Error> {
        let (red, green, blue) = tuple;

        for color in [red, green, blue] {
            if !(0..=255).contains(&color) {
                return Err(IntoColorError::IntConversion);
            }
        }
        Ok(Self {
            red: tuple.0 as u8,
            green: tuple.1 as u8,
            blue: tuple.2 as u8,
        })
    }
}

// Array implementation
impl TryFrom<[i16; 3]> for Color {
    type Error = IntoColorError;
    fn try_from(arr: [i16; 3]) -> Result<Self, Self::Error> {
        for color in arr {
            if !(0..=255).contains(&color) {
                return Err(IntoColorError::IntConversion);
            }
        }
        Ok(Self {
            red: arr[0] as u8,
            green: arr[1] as u8,
            blue: arr[2] as u8,
        })
    }
}

// Slice implementation
impl TryFrom<&[i16]> for Color {
    type Error = IntoColorError;
    fn try_from(slice: &[i16]) -> Result<Self, Self::Error> {
        if slice.len() != 3 {
            return Err(IntoColorError::BadLen);
        }
        for color in slice {
            if !(0..=255).contains(color) {
                return Err(IntoColorError::IntConversion);
            }
        }
        Ok(Self {
            red: slice[0] as u8,
            green: slice[1] as u8,
            blue: slice[2] as u8,
        })
    }
}

fn main() {
    // Use the `from` function
    let c1 = Color::try_from((183, 65, 14));
    println!("{:?}", c1);

    // Since TryFrom is implemented for Color, we should be able to use TryInto
    let c2: Result<Color, _> = [183, 65, 14].try_into();
    println!("{:?}", c2);

    let v = vec![183, 65, 14];
    // With slice we should use `try_from` function
    let c3 = Color::try_from(&v[..]);
    println!("{:?}", c3);
    // or take slice within round brackets and use TryInto
    let c4: Result<Color, _> = (&v[..]).try_into();
    println!("{:?}", c4);
}
```

## as_ref_mut.rs

For today's last exercise, it's time to use [`AsRef`] & [`AsMut`].

They are used to convert (*mutable*) *reference-to-reference*.

Nothing much to say about the exercise itself...<br>
You just put `<T: AsRef<str>>` into function signature.

```rust
/* file: "exercises/conversions/as_ref_mut.rs" */
fn byte_counter<T: AsRef<str>>(arg: T) -> usize {
    arg.as_ref().as_bytes().len()
}

// Obtain the number of characters (not bytes) in the given argument
// Add the AsRef trait appropriately as a trait bound
fn char_counter<T: AsRef<str>>(arg: T) -> usize {
    arg.as_ref().chars().count()
}

fn main() {
    let s = "Café au lait";
    println!("{}", char_counter(s));
    println!("{}", byte_counter(s));
}
```

[`AsRef`]: https://doc.rust-lang.org/std/convert/trait.AsRef.html
[`AsMut`]: https://doc.rust-lang.org/std/convert/trait.AsMut.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
