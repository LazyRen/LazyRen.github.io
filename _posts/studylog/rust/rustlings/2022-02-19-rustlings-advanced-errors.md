---
layout:   post
title:    "Rustlings Topic: Advanced Errors"
subtitle: "Rustlings Topic: Advanced Errors"
category: studylog
tags:     rust rustlings
---

If you are having difficulties with the exercise, please check the below references:

* [Defining an error type]
* [Boxing errors]
* [Wrapping errors]

You may find [solution code for the topic from my repo].

[Defining an error type]: https://doc.rust-lang.org/stable/rust-by-example/error/multiple_error_types/define_error_type.html
[Boxing errors]: https://doc.rust-lang.org/stable/rust-by-example/error/multiple_error_types/boxing_errors.html
[Wrapping errors]: https://doc.rust-lang.org/stable/rust-by-example/error/multiple_error_types/wrap_error.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/advanced_errors

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## advanced_errs1.rs

This exercise is extended from the [errors6.rs].<br>
We used `map_err()` to translate lower-level errors into our custom error type.

In this exercise, we will remove `map_err()` and instead use operator `?` directly.<br>
To achieve this, we have to implement [`From`] trait for our custom error type that converts `CreationError` or
`ParseIntError` into our custom error type(`ParseNonzeroError`).

```rust
impl From<CreationError> for ParsePosNonzeroError {
    fn from(e: CreationError) -> Self {
        Self::Creation(e)
    }
}

impl From<ParseIntError> for ParsePosNonzeroError {
    fn from(e: ParseIntError) -> Self {
        Self::ParseInt(e)
    }
}
```

With above implementation, notice the difference between parsing code:

```rust
// errors6.rs
fn parse_pos_nonzero(s: &str) -> Result<PositiveNonzeroInteger, ParsePosNonzeroError> {
    let x: i64 = s.parse().map_err(ParsePosNonzeroError::from_parse_int)?;
    PositiveNonzeroInteger::new(x).map_err(ParsePosNonzeroError::from_creation)
}

//advanced_errs1.rs
impl FromStr for PositiveNonzeroInteger {
    type Err = ParsePosNonzeroError;
    fn from_str(s: &str) -> Result<PositiveNonzeroInteger, Self::Err> {
        let x: i64 = s.parse()?;
        Ok(PositiveNonzeroInteger::new(x)?)
    }
}
```

As you can see, *advanced_errs1.rs* uses the `FromStr` trait, and `?` operator instead of using `map_err()`.

```rust
/* file: "exercises/advanced_errors/advanced_errs1.rs" */
use std::num::ParseIntError;
use std::str::FromStr;

// This is a custom error type that we will be using in the `FromStr`
// implementation.
#[derive(PartialEq, Debug)]
enum ParsePosNonzeroError {
    Creation(CreationError),
    ParseInt(ParseIntError),
}

impl From<CreationError> for ParsePosNonzeroError {
    fn from(e: CreationError) -> Self {
        Self::Creation(e)
    }
}

impl From<ParseIntError> for ParsePosNonzeroError {
    fn from(e: ParseIntError) -> Self {
        Self::ParseInt(e)
    }
}

// Don't change anything below this line.

impl FromStr for PositiveNonzeroInteger {
    type Err = ParsePosNonzeroError;
    fn from_str(s: &str) -> Result<PositiveNonzeroInteger, Self::Err> {
        let x: i64 = s.parse()?;
        Ok(PositiveNonzeroInteger::new(x)?)
    }
}

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

[errors6.rs]: rustlings-error-handling#errors6rs

## advanced_errs2.rs

Steps:

1. Implement a missing trait so that `main()` will compile.<br>
   If you are not sure about the instruction, run the code first!

   ```shell
   ❯ rustlings run advanced_errs2
   ! Compiling of exercises/advanced_errors/advanced_errs2.rs failed! Please try again. Here's the output:
   ...
   error[E0277]: the trait bound `ParseClimateError: std::error::Error` is not satisfied
      --> exercises/advanced_errors/advanced_errs2.rs:106:62
       |
   106 |     println!("{:?}", "Hong Kong,1999,25.7".parse::<Climate>()?);
       |                                                              ^ the trait `std::error::Error` is not implemented for `ParseClimateError`
       |
       = note: required because of the requirements on the impl of `From<ParseClimateError>` for `Box<dyn std::error::Error>`
       = note: required because of the requirements on the impl of `FromResidual<Result<Infallible, ParseClimateError>>` for `Result<(), Box<dyn std::error::Error>>`
   ...
   ```

   Trait [`Error`] is missing for `ParseClimateError`.<br>
   Let's simply add `impl Error for ParseClimateError {}` for now. No need to implement any method.

2. Complete the partial implementation of `From` for `ParseClimateError`.

   ```rust
   impl From<ParseFloatError> for ParseClimateError {
       fn from(e: ParseFloatError) -> Self {
           Self::ParseFloat(e)
       }
   }
   ```

   The above will do.

3. Handle the missing error cases in the `FromStr` implementation for `Climate`.

   > Parser for `Climate`.
   >
   > 1. Split the input string into 3 fields: city, year, and temp.
   > 2. Return an error if the string is empty or has the wrong number of
   >    fields.
   > 3. Return an error if the city name is empty.
   > 4. Parse the year as a `u32` and return an error if that fails.
   > 5. Parse the temp as an `f32` and return an error if that fails.
   > 6. Return an `Ok` value containing the completed `Climate` value.

   ```rust
   impl FromStr for Climate {
       type Err = ParseClimateError;
       fn from_str(s: &str) -> Result<Self, Self::Err> {
           if s.is_empty() {
               return Err(ParseClimateError::Empty);
           }
           let splitted_item: Vec<_> = s.split(',').collect();
           let (city, year, temp) = match &splitted_item[..] {
               [city, year, temp] => (city.to_string(), year, temp),
               _ => return Err(ParseClimateError::BadLen),
           };
           if city == "" {
               return Err(ParseClimateError::NoCity);
           }
           let year: u32 = year.parse()?;
           let temp: f32 = temp.parse()?;
           Ok(Climate { city, year, temp })
       }
   }
   ```

4. Complete the partial implementation of `Display` for `ParseClimateError`.<br>
   The actual string to print can be found in the test section.

   ```rust
   impl Display for ParseClimateError {
       fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
           // Imports the variants to make the following code more compact.
           use ParseClimateError::*;
           match self {
               Empty => write!(f, "empty input"),
               BadLen => write!(f, "incorrect number of fields"),
               NoCity => write!(f, "no city name"),
               ParseInt(_e) => write!(f, "error parsing year: invalid digit found in string"),
               ParseFloat(e) => write!(f, "error parsing temperature: {}", e),
               _ => write!(f, "unhandled error!"),
           }
       }
   }
   ```

Full code is as below:

```rust
/* file: "exercises/advanced_errors/advanced_errs2.rs" */
use std::error::Error;
use std::fmt::{self, Display, Formatter};
use std::num::{ParseFloatError, ParseIntError};
use std::str::FromStr;

// This is the custom error type that we will be using for the parser for
// `Climate`.
#[derive(Debug, PartialEq)]
enum ParseClimateError {
    Empty,
    BadLen,
    NoCity,
    ParseInt(ParseIntError),
    ParseFloat(ParseFloatError),
}

// This `From` implementation allows the `?` operator to work on
// `ParseIntError` values.
impl From<ParseIntError> for ParseClimateError {
    fn from(e: ParseIntError) -> Self {
        Self::ParseInt(e)
    }
}

// This `From` implementation allows the `?` operator to work on
// `ParseFloatError` values.
impl From<ParseFloatError> for ParseClimateError {
    fn from(e: ParseFloatError) -> Self {
        Self::ParseFloat(e)
    }
}

// impl Error for ParseClimateError {}

// The `Display` trait allows for other code to obtain the error formatted
// as a user-visible string.
impl Display for ParseClimateError {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        // Imports the variants to make the following code more compact.
        use ParseClimateError::*;
        match self {
            Empty => write!(f, "empty input"),
            BadLen => write!(f, "incorrect number of fields"),
            NoCity => write!(f, "no city name"),
            ParseInt(_e) => write!(f, "error parsing year: invalid digit found in string"),
            ParseFloat(e) => write!(f, "error parsing temperature: {}", e),
            _ => write!(f, "unhandled error!"),
        }
    }
}

#[derive(Debug, PartialEq)]
struct Climate {
    city: String,
    year: u32,
    temp: f32,
}

// Parser for `Climate`.
// 1. Split the input string into 3 fields: city, year, temp.
// 2. Return an error if the string is empty or has the wrong number of
//    fields.
// 3. Return an error if the city name is empty.
// 4. Parse the year as a `u32` and return an error if that fails.
// 5. Parse the temp as a `f32` and return an error if that fails.
// 6. Return an `Ok` value containing the completed `Climate` value.
impl FromStr for Climate {
    type Err = ParseClimateError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s.is_empty() {
            return Err(ParseClimateError::Empty);
        }
        let splitted_item: Vec<_> = s.split(',').collect();
        let (city, year, temp) = match &splitted_item[..] {
            [city, year, temp] => (city.to_string(), year, temp),
            _ => return Err(ParseClimateError::BadLen),
        };
        if city == "" {
            return Err(ParseClimateError::NoCity);
        }
        let year: u32 = year.parse()?;
        let temp: f32 = temp.parse()?;
        Ok(Climate { city, year, temp })
    }
}

// Don't change anything below this line (other than to enable ignored
// tests).

fn main() -> Result<(), Box<dyn Error>> {
    println!("{:?}", "Hong Kong,1999,25.7".parse::<Climate>()?);
    println!("{:?}", "".parse::<Climate>()?);
    Ok(())
}
```

[`Error`]: https://doc.rust-lang.org/std/error/trait.Error.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
