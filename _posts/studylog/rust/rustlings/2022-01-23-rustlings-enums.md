---
layout:   post
title:    "Rustlings Topic: Enums"
subtitle: "Rustlings Topic: Enums"
category: studylog
tags:     rust rustlings
---

> Rust allows you to define types called [enums] which enumerate possible values.
> Useful in combination with enums is Rust's [pattern matching] facility, which makes it easy to run different code for different values of an enumeration.

You may find [solution code for the topic from my repo].

[enums]: https://doc.rust-lang.org/book/ch06-00-enums.html
[pattern matching]: https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/enums

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## enums1.rs

The declaration of the enumeration type has not been defined yet.<br>

`main()` shows that we have to declare `Message` enum with 4 types.<br>
`Quit` / `Echo` / `Move` / `ChangeColor`

```rust
/* file: "exercises/enums/enums1.rs" */
#[derive(Debug)]
enum Message {
    Quit,
    Echo,
    Move,
    ChangeColor,
}

fn main() {
    println!("{:?}", Message::Quit);
    println!("{:?}", Message::Echo);
    println!("{:?}", Message::Move);
    println!("{:?}", Message::ChangeColor);
}
```

## enums2.rs

Rust can create enumerations that have different variants with different types
such as no data, anonymous structs, a single string, tuples, ... etc.

This is a very useful feature. In fact, one of the core features of Rust, [`Result<T, E>`] & [`Option<T>`] are
a special type of `enum` that returns different types depending on the situation.

Declare `enum Message` based on the usage from the `main()`.

[`Result<T, E>`]: https://doc.rust-lang.org/std/result/enum.Result.html
[`Option<T>`]: https://doc.rust-lang.org/std/option/enum.Option.html

```rust
/* file: "exercises/enums/enums2.rs" */
#[derive(Debug)]
enum Message {
    Move { x: i32, y: i32 },
    Echo(String),
    ChangeColor(i32, i32, i32),
    Quit,
}

impl Message {
    fn call(&self) {
        println!("{:?}", &self);
    }
}

fn main() {
    let messages = [
        Message::Move { x: 10, y: 30 },
        Message::Echo(String::from("hello world")),
        Message::ChangeColor(200, 255, 255),
        Message::Quit,
    ];

    for message in &messages {
        message.call();
    }
}
```

## enums3.rs

We are already done declaring `enum Message` twice.
Filling `fn process(&mut self, message: Message)` is the real problem.

It is time to use [`match` expressions]. You can think of `match` as an advanced version
of *switch-case*.

Implement `fn process(&mut self, message: Message)` so that it changes the member variable
of `State` based on the input parameter `message` type.

[`match` expressions]: https://doc.rust-lang.org/reference/expressions/match-expr.html

```rust
/* file: "exercises/enums/enums3.rs" */
enum Message {
    ChangeColor((u8, u8, u8)),
    Echo(String),
    Move(Point),
    Quit,
}

struct Point {
    x: u8,
    y: u8,
}

struct State {
    color: (u8, u8, u8),
    position: Point,
    quit: bool,
}

impl State {
    fn change_color(&mut self, color: (u8, u8, u8)) {
        self.color = color;
    }

    fn quit(&mut self) {
        self.quit = true;
    }

    fn echo(&self, s: String) {
        println!("{}", s);
    }

    fn move_position(&mut self, p: Point) {
        self.position = p;
    }

    fn process(&mut self, message: Message) {
        match message {
            Message::ChangeColor(col) => self.change_color(col),
            Message::Echo(str) => self.echo(str),
            Message::Move(ptr) => self.move_position(ptr),
            Message::Quit => self.quit(),
        }
    }
}
```

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
