---
layout:   post
title:    "Rustlings Topic: Modules"
subtitle: "Rustlings Topic: Modules"
category: studylog
tags:     rust rustlings
---

> Rust has a number of features that allow you to manage your code’s organization, including which details are exposed,
> which details are private, and what names are in each scope in your programs. These features, sometimes collectively
> referred to as the [module system], include:
>
> * Packages: A Cargo feature that lets you build, test, and share crates
> * Crates: A tree of modules that produces a library or executable
> * Modules and use: Let you control the organization, scope, and privacy of paths
> * Paths: A way of naming an item, such as a struct, function, or module

You may find [solution code for the topic from my repo].

[module system]: https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/modules

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## modules1.rs

Everything is private in Rust by default. If you are willing to use `fn make_sausage()` outside of the module
`sausage_factory`, we need to declare a function as a public function with the keyword `pub`.

```rust
/* file: "exercises/modules/modules1.rs" */
mod sausage_factory {
    // Don't let anybody outside of this module see this!
    fn get_secret_recipe() -> String {
        String::from("Ginger")
    }

    pub fn make_sausage() {
        get_secret_recipe();
        println!("sausage!");
    }
}

fn main() {
    sausage_factory::make_sausage();
}
```

## modules2.rs

> You can bring module paths into scopes and provide new names for them with the 'use' and 'as' keywords.
> Fix these 'use' statements to make the code compile.

```rust
/* file: "exercises/modules/modules2.rs" */
mod delicious_snacks {
    pub use self::fruits::PEAR as fruit;
    pub use self::veggies::CUCUMBER as veggie;

    mod fruits {
        pub const PEAR: &'static str = "Pear";
        pub const APPLE: &'static str = "Apple";
    }

    mod veggies {
        pub const CUCUMBER: &'static str = "Cucumber";
        pub const CARROT: &'static str = "Carrot";
    }
}

fn main() {
    println!(
        "favorite snacks: {} and {}",
        delicious_snacks::fruit,
        delicious_snacks::veggie
    );
}

```

## modules3.rs

> You can use the 'use' keyword to bring module paths from modules from anywhere and especially from the Rust standard
> library into your scope. Bring SystemTime and UNIX_EPOCH

UNIX_EPOCH and SystemTime are declared in the std::time module. Add a use statement for these two to bring them into
scope. We can use nested paths or the glob operator to bring these two in using only one line.

This is similar to C++ `#include` or Python `import` / `from * import *`.

```rust
/* file: "exercises/modules/modules3.rs" */
use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(n) => println!("1970-01-01 00:00:00 UTC was {} seconds ago!", n.as_secs()),
        Err(_) => panic!("SystemTime before UNIX EPOCH!"),
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
