---
layout:   post
title:    "Rustlings Topic: Move Semantics"
subtitle: "Rustlings Topic: Move Semantics"
category: studylog
tags:     rust rustlings
---

Have a look at [Ownership] & [Reference and Borrowing] to have an understanding of one of the most
an important part of the Rust language.

You may find [solution code for the topic from my repo].

[Ownership]: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
[Reference and Borrowing]: https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/move_semantics

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## move_semantics1.rs

If you are planning to continue to learn Rust, you have to be familiar with compile errors. Because
you **will** see them quite often. Trust me.

So what does the compiler says?

```shell
error[E0596]: cannot borrow `vec1` as mutable, as it is not declared as mutable
  --> exercises/move_semantics/move_semantics1.rs:11:5
   |
7  |     let vec1 = fill_vec(vec0);
   |         ---- help: consider changing this to be mutable: `mut vec1`
...
11 |     vec1.push(88);
   |     ^^^^^^^^^^^^^ cannot borrow as mutable
```

On `line 11`, we use the call `push` method for the `vec1` variable.<br>
Which is *mutating* the `vec1`. Hence requiring the `mut` keyword at declaration.

Change declaration at `line 7` by appending the `mut` keyword next to `let`.

You may wondering why we don't need the `mut` keyword with `vec0`. It will be covered in the next problem.
{:.note}

```rust
/* file: "exercises/move_semantics/move_semantics1.rs" */
fn main() {
    let vec0 = Vec::new();

    let mut vec1 = fill_vec(vec0);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;

    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics2.rs

The original code seems quite the same as [move_semantics1]. Except for the first `println` is now
printing the length of `vec0`.

Let's run the code first and see the compiler error.

If you haven't read "[The Book]" yet, at least try to read the [Ownership and Functions] chapter
before jumping into the solution.
{:.note title="Before We Begin"}

```shell
error[E0382]: borrow of moved value: `vec0`
  --> exercises/move_semantics/move_semantics2.rs:13:57
   |
8  |     let vec0 = Vec::new();
   |         ---- move occurs because `vec0` has type `Vec<i32>`, which does not implement the `Copy` trait
9  |
10 |     let mut vec1 = fill_vec(vec0);
   |                             ---- value moved here
...
13 |     println!("{} has length {} content `{:?}`", "vec0", vec0.len(), vec0);
   |                                                         ^^^^^^^^^^ value borrowed here after move
```

```rust
fn fill_vec(vec: Vec<i32>) -> Vec<i32>
```

When we look at the function signature of the `fill_vec`, it takes one parameter(`vec`) as a
`Vec<i32>`. Notice there is no borrowing(`&`) happening here.

When you pass an argument to a function like this, an argument will be `copy` or `move` from the
original value. If it is *moved*, the ownership goes to the **function**. So original variable
cannot be used after the invocation.

It's a bit confusing matter and I won't go further about this.<br>
So please check [Ways Variables and Data Interact: Clone] if you feel lost.

So how are we suppose to handle this issue?<br>
When you run `rustlings hint move_semantics2`, you will get 3 different ways to fix this.

1. Make another, separate version of the data that's in `vec0` and pass that
   to `fill_vec` instead.

   ```rust
   /* file: "exercises/move_semantics/move_semantics2.rs" */
   fn main() {
       let vec0 = Vec::<i32>::new();
       let mut vec1 = fill_vec(vec0.clone());

       // Do not change the following line!
       println!("{} has length {} content `{:?}`", "vec0", vec0.len(), vec0);

       vec1.push(88);

       println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
   }

   fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
       let mut vec = vec;

       vec.push(22);
       vec.push(44);
       vec.push(66);

       vec
   }
   ```

   Notice that above code is passing `vec0.clone()` to the function instead of `vec0`.<br>
   We are making a *clone* of the original vector and giving ownership of the *cloned one*. Therefore,
   we still can use original variable!

2. Make `fill_vec` borrow its argument instead of taking ownership of it,
   and then copy the data within the function in order to return an owned
   `Vec<i32>`

    ```rust
   /* file: "exercises/move_semantics/move_semantics2.rs" */
   fn main() {
       let vec0 = Vec::<i32>::new();
       let mut vec1 = fill_vec_with_reference(&vec0);

       // Do not change the following line!
       println!("{} has length {} content `{:?}`", "vec0", vec0.len(), vec0);

       vec1.push(88);

       println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
   }

   fn fill_vec_with_reference(vec: &Vec<i32>) -> Vec<i32> {
       let mut vec = vec.clone();

       vec.push(22);
       vec.push(44);
       vec.push(66);

       vec
   }
   ```

   In this solution, the function signature (not only the name!) is changed to take `vec: &Vec<i32>`
   instead of `vec: Vec<i32>`. Now the function doesn't take ownership of the given argument.
   Instead, function *borrows* variable and makes clone of it within the function.

3. Make `fill_vec` *mutably* borrow its argument (which will need to be
   mutable), modify it directly, then not return anything. Then you can get rid
   of `vec1` entirely -- note that this will change what gets printed by the
   first `println!`

   Instead of removing `vec1` entirely, I just made a clone of the `vec` at the end of the function.
   {:.note}

   ```rust
   /* file: "exercises/move_semantics/move_semantics2.rs" */
   fn main() {
       let mut vec0: Vec<i32> = Vec::new();
       let mut vec1 = fill_vec_with_mutable_reference(&mut vec0);

       // Do not change the following line!
       println!("{} has length {} content `{:?}`", "vec0", vec0.len(), vec0);

       vec1.push(88);

       println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
   }

   fn fill_vec_with_mutable_reference(vec: &mut Vec<i32>) -> Vec<i32> {
       vec.push(22);
       vec.push(44);
       vec.push(66);

       vec.clone()
   }
   ```

   Now  the function is *mutably borrows* the argument. Any modification done within the function
   body applies to the `vec0` as well. So the outcome of the `println` will be differ from the
   others.

[move_semantics1]: #move_semantics1rs
[The Book]: https://doc.rust-lang.org/book/index.html
[Ownership and Functions]: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-and-functions
[Ways Variables and Data Interact: Clone]: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ways-variables-and-data-interact-clone

## move_semantics3.rs

This problem is very similar to the previous one.<br>
The only difference is that `fill_vec` no longer has `let mut vec = vec;` line.

What we need to do is clear once you look at the compile error.

```shell
error[E0596]: cannot borrow `vec` as mutable, as it is not declared as mutable
  --> exercises/move_semantics/move_semantics3.rs:19:5
   |
18 | fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
   |             --- help: consider changing this to be mutable: `mut vec`
19 |     vec.push(22);
   |     ^^^^^^^^^^^^ cannot borrow as mutable
...
```

Since we need a *mutable* vector to `push` into the vector, we need to provide the `mut` keyword.
A compiler is being nice to hint where it is required.

```rust
/* file: "exercises/move_semantics/move_semantics3.rs" */
fn main() {
    let vec0 = Vec::new();

    let mut vec1 = fill_vec(vec0);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

fn fill_vec(mut vec: Vec<i32>) -> Vec<i32> {
    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics4.rs

Comment says all we have to do.

> Refactor this code so that instead of having `vec0` and creating the vector in `fn main`, we
> create it within `fn fill_vec` and transfer the freshly created vector from fill_vec to its caller.

```rust
/* file: "exercises/move_semantics/move_semantics4.rs" */
fn main() {
    let mut vec1 = fill_vec();

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

// `fill_vec()` no longer takes `vec: Vec<i32>` as argument
fn fill_vec() -> Vec<i32> {
    let mut vec = vec![];

    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

If `vec![]` feels new to you, please visit [vec! macro] Rust API documentation.
{:.note}

[vec! macro]: https://doc.rust-lang.org/std/macro.vec.html

## move_semantics5.rs

> Make me compile only by reordering the lines in `main()`, but without adding, changing, or removing
> any of them.

This problem is about a lifetime of references. [Validating References with Lifetimes] chapter will
help your understanding.

Long story short; You can have *Only one* mutable reference at the given time. Compiler error tells
you the same thing.

```shell
error[E0499]: cannot borrow `x` as mutable more than once at a time
  --> exercises/move_semantics/move_semantics5.rs:11:13
   |
10 |     let y = &mut x;
   |             ------ first mutable borrow occurs here
11 |     let z = &mut x;
   |             ^^^^^^ second mutable borrow occurs here
12 |     *y += 100; // end of y's scope
   |     --------- first borrow later used here
```

Reference's scope starts from where it is introduced and continues through the last time that
reference is used. So in here, I'm moving `*y += 100;` forward before declaring `z`. So the lifetime
of `y` and `z` (which holds a mutable reference to `x`) don't overlap.

```rust
/* file: "exercises/move_semantics/move_semantics5.rs" */
fn main() {
    let mut x = 100;
    let y = &mut x;
    *y += 100; // end of y's scope
    let z = &mut x;
    *z += 1000;
    assert_eq!(x, 1200);
}
```

[Validating References with Lifetimes]: https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
