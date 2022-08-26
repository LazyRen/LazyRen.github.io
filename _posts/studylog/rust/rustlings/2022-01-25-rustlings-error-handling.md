---
layout:   post
title:    "Rustlings Topic: Error Handling"
subtitle: "Rustlings Topic: Error Handling"
category: studylog
tags:     rust rustlings
---

> Most errors aren’t serious enough to require the program to stop entirely.<br>
> Sometimes, when a function fails, it’s for a reason that you can easily interpret and respond to.<br>

Please take a look at [Error Handling] / [Generics] / [Result] / [Boxing Errors]

You may find [solution code for the topic from my repo].

[Error Handling]: https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html
[Generics]: https://doc.rust-lang.org/book/ch10-01-syntax.html
[Result]: https://doc.rust-lang.org/rust-by-example/error/result.html
[Boxing Errors]: https://doc.rust-lang.org/rust-by-example/error/multiple_error_types/boxing_errors.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/error_handling

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## errors1.rs

> This function refuses to generate text to be printed on a nametag if you pass it an empty string. It'd be nicer if it
> explained what the problem was, instead of just sometimes returning `None`. The 2nd test currently does not compile
> or pass, but it illustrates the behavior we would like this function to have.

As I have briefly mentioned in [Enums] chapter, [`Result<T, E>`] is `enum` that has 2 types.<br>
`Ok(T)` & `Err(E)`.

In this example, return type of the `generate_nametag_text()` is `Result<String, String>`. So the function returns
either `Ok(String)` or `Err(String)`. Change `Some` to `Ok` for a valid argument.
After that, we only have to implement it when the argument is *not* valid.

The string we have to return can be found in test `explains_why_generating_nametag_test_fails()`. Implement missing
`else` block to return `Err(String)`.

```rust
/* file: "exercises/error_handling/errors1.rs" */
pub fn generate_nametag_text(name: String) -> Result<String, String> {
    if name.len() > 0 {
        Ok(format!("Hi! My name is {}", name))
    } else {
        // Empty names aren't allowed.
        Err("`name` was empty; it must be nonempty.".to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // This test passes initially if you comment out the 2nd test.
    // You'll need to update what this test expects when you change
    // the function under test!
    #[test]
    fn generates_nametag_text_for_a_nonempty_name() {
        assert_eq!(
            generate_nametag_text("Beyoncé".into()),
            Ok("Hi! My name is Beyoncé".into())
        );
    }

    #[test]
    fn explains_why_generating_nametag_text_fails() {
        assert_eq!(
            generate_nametag_text("".into()),
            Err("`name` was empty; it must be nonempty.".into())
        );
    }
}
```

[Enums]: rustlings-enums
[`Result<T, E>`]: https://doc.rust-lang.org/beta/std/result/enum.Result.html

## errors2.rs

> Right now, this function isn't handling the error case at all (and isn't handling the success case properly either).
> What we want to do is:<br>
> If we call the `parse` function on a string that is not a number, that function will return a `ParseIntError`, and in
> that case, we want to immediately return that error from our function and not try to multiply and add.

[`parse()`] function returns `Result<F, <F as FromStr>::Err>`. We have to propagate *Error* if `parse()` goes wrong.
One way to achieve this is to use the `match` statement like below.

```rust
let qty = match item_quantity.parse::<i32>() {
    Ok(val) => val,
    Err(e) => return Err(e),
};
```

But this is too long and cumbersome. Luckily for us, Rust provides [`?` operator] that immediately returns given `Err()`
if function goes wrong.

So above 3 lines can be shortened into one-line code.

```rust
let qty = item_quantity.parse::<i32>()?;
```

I recommend you to read about [`?` operator] since it is not always
applicable. The current function must return the `Result<T, E>` type, and there must be a way to convert the given `ERR(E2)` to
`Err(E)`.

Anyway, the full code for the exercise is as below.

```rust
/* file: "exercises/error_handling/errors2.rs" */
use std::num::ParseIntError;

pub fn total_cost(item_quantity: &str) -> Result<i32, ParseIntError> {
    let processing_fee = 1;
    let cost_per_item = 5;
    let qty = item_quantity.parse::<i32>()?;

    Ok(qty * cost_per_item + processing_fee)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn item_quantity_is_a_valid_number() {
        assert_eq!(total_cost("34"), Ok(171));
    }

    #[test]
    fn item_quantity_is_an_invalid_number() {
        assert_eq!(
            total_cost("beep boop").unwrap_err().to_string(),
            "invalid digit found in string"
        );
    }
}
```

[`parse()`]: https://doc.rust-lang.org/beta/std/primitive.str.html#method.parse
[`?` operator]: https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator

## errors3.rs

> This is a program that is trying to use a completed version of the `total_cost` function from the previous exercise.
> It's not working though! Why not? What should we do to fix it?

As I've said. Using [`?` operator] comes with limitations. Currently, `main()` doesn't return anything. It must return
`Result<T, E>` to have code line like `let cost = total_cost(pretend_user_input)?;`.

Change main function signature to `fn main() -> Result<(), ParseIntError>`. And return `Ok(())` at the end of the
`main()`. Note that `()` is used as a placeholder.

```rust
/* file: "exercises/error_handling/errors3.rs" */
use std::num::ParseIntError;

fn main() -> Result<(), ParseIntError> {
    let mut tokens = 100;
    let pretend_user_input = "8";

    let cost = total_cost(pretend_user_input)?;

    if cost > tokens {
        println!("You can't afford that many!");
    } else {
        tokens -= cost;
        println!("You now have {} tokens.", tokens);
    }
    Ok(())
}

pub fn total_cost(item_quantity: &str) -> Result<i32, ParseIntError> {
    let processing_fee = 1;
    let cost_per_item = 5;
    let qty = item_quantity.parse::<i32>()?;

    Ok(qty * cost_per_item + processing_fee)
}
```

## errors4.rs

> `PositiveNonzeroInteger::new` is always creating a new instance and returning an `Ok` result. It should be doing some
> checking, returning an `Err` result if those checks fail, and only returning an `Ok` result if those checks determine
> that everything is... okay :)

It is clear that `new()` must return `CreationError` for a invalid argument.

```rust
impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            1.. => Ok(PositiveNonzeroInteger(value as u64)),
            0 => Err(CreationError::Zero),
            _ => Err(CreationError::Negative),
        }
    }
}
```

`match` statement combined with [`Range`] `1..` will help us clean up the code.

```rust
/* file: "exercises/error_handling/errors4.rs" */
#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            1.. => Ok(PositiveNonzeroInteger(value as u64)),
            0 => Err(CreationError::Zero),
            _ => Err(CreationError::Negative),
        }
    }
}

#[test]
fn test_creation() {
    assert!(PositiveNonzeroInteger::new(10).is_ok());
    assert_eq!(
        Err(CreationError::Negative),
        PositiveNonzeroInteger::new(-10)
    );
    assert_eq!(Err(CreationError::Zero), PositiveNonzeroInteger::new(0));
}
```

[`Range`]: https://doc.rust-lang.org/beta/std/ops/struct.Range.html

## errors5.rs

Looking at the `main()`, we can notice that `?` operator is used twice.
`let x: i64 = pretend_user_input.parse()?;` This is *Okay*. We already know that it *may* return `ParseIntError`.
`main()` can handle such Error type. But what about `println!("output={:?}", PositiveNonzeroInteger::new(x)?);`

```default
error[E0277]: `?` couldn't convert the error to `ParseIntError`
  --> exercises/error_handling/errors5.rs:17:59
   |
14 | fn main() -> Result<(), ParseIntError> {
   |              ------------------------- expected `ParseIntError` because of this
...
17 |     println!("output={:?}", PositiveNonzeroInteger::new(x)?);
   |                                                           ^ the trait `From<CreationError>` is not implemented for `ParseIntError`
   |
   = note: the question mark operation (`?`) implicitly performs a conversion on the error value using the `From` trait
   = note: required because of the requirements on the impl of `FromResidual<Result<Infallible, CreationError>>` for `Result<(), ParseIntError>`
```

As error message is saying, `PositiveNonzeroInteger::new()` returns `Result<PositiveNonzeroInteger, CreationError>`.
So, `?` *may* return `Err(CreationError)`. But Rust compiler has no idea about how to convert `Err(CreationError)`
**into** `ParseIntError`!

There are two ways to solve this problem.

1. [Boxing errors]<br>
   Change the return type of the `main()` to `Box<dyn error::Error>` which can hold any kind of `Error` type.

   ```rust
   fn main() -> Result<(), Box<dyn error::Error>> {
       let pretend_user_input = "42";
       let x: i64 = pretend_user_input.parse()?;
       println!("output={:?}", PositiveNonzeroInteger::new(x)?);
       Ok(())
   }
   ```

2. Implement Trait [`std::convert::From`]<br>
   So that compiler knows how to convert the given `CreationError` type to the `ParseIntError` type.<br>
   This is my personal preference. Because with `Box<dyn error::Error>`, we cannot know what type of `Error` it returns.
   It is determined at the *runtime*.<br>
   But it is more complicated, and it's not the intention of the current exercise. So let's go with the first option.

```rust
/* file: "exercises/error_handling/errors5.rs" */
fn main() -> Result<(), Box<dyn error::Error>> {
    let pretend_user_input = "42";
    let x: i64 = pretend_user_input.parse()?;
    println!("output={:?}", PositiveNonzeroInteger::new(x)?);
    Ok(())
}

// Don't change anything below this line.

#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            x if x < 0 => Err(CreationError::Negative),
            x if x == 0 => Err(CreationError::Zero),
            x => Ok(PositiveNonzeroInteger(x as u64)),
        }
    }
}

// This is required so that `CreationError` can implement `error::Error`.
impl fmt::Display for CreationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let description = match *self {
            CreationError::Negative => "number is negative",
            CreationError::Zero => "number is zero",
        };
        f.write_str(description)
    }
}

impl error::Error for CreationError {}
```

[Boxing errors]: https://doc.rust-lang.org/stable/rust-by-example/error/multiple_error_types/boxing_errors.html
[`std::convert::From`]: https://doc.rust-lang.org/beta/std/convert/trait.From.html

## errors6.rs

> Using catch-all error types like `Box<dyn error::Error>` isn't recommended for library code, where callers might want
> to make decisions based on the error content, instead of printing it out or propagating it further. Here, we define a
> custom error type to make it possible for callers to decide what to do next when our function returns an error.

Look at the `enum ParsePosNonzeroError`. It can have both `CreationError` & `ParseIntError` type. So this *enum* can be
used to express both errors. Implement `parse_pos_nonzero()` & `from_parse_int()`.

```rust
/* file: "exercises/error_handling/errors6.rs" */
use std::num::ParseIntError;

// This is a custom error type that we will be using in `parse_pos_nonzero()`.
#[derive(PartialEq, Debug)]
enum ParsePosNonzeroError {
    Creation(CreationError),
    ParseInt(ParseIntError),
}

impl ParsePosNonzeroError {
    fn from_creation(err: CreationError) -> ParsePosNonzeroError {
        ParsePosNonzeroError::Creation(err)
    }

    fn from_parse_int(err: ParseIntError) -> ParsePosNonzeroError {
        ParsePosNonzeroError::ParseInt(err)
    }
}

fn parse_pos_nonzero(s: &str) -> Result<PositiveNonzeroInteger, ParsePosNonzeroError> {
    let x: i64 = s.parse().map_err(ParsePosNonzeroError::from_parse_int)?;
    PositiveNonzeroInteger::new(x).map_err(ParsePosNonzeroError::from_creation)
}

// Don't change anything below this line.

#[derive(PartialEq, Debug)]
struct PositiveNonzeroInteger(u64);

#[derive(PartialEq, Debug)]
enum CreationError {
    Negative,
    Zero,
}

impl PositiveNonzeroInteger {
    fn new(value: i64) -> Result<PositiveNonzeroInteger, CreationError> {
        match value {
            x if x < 0 => Err(CreationError::Negative),
            x if x == 0 => Err(CreationError::Zero),
            x => Ok(PositiveNonzeroInteger(x as u64)),
        }
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
