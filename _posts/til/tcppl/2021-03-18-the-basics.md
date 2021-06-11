---
layout: post
title: "The Basics"
subtitle: "The Basics"
category: til
tags: cpp tcpppl
image:
  path: /assets/img/2021-03-18/tcpppl.jpg
---

퇴근후 조금씩이라도 셀프 스터디를 진행하고 기록을 남기고자 합니다.<br>
시작은 C++의 바이블 The C++ Programming Language Language by Bjarne Stroustrup으로 하고 최대한 빠르게 Modern C++로 넘어갈 계획입니다.

공부한 내용을 기록하기 위한 시리즈이다보니 내용이 부실하거나 생략된 파트가 존재할 수 있습니다.

* this unordered seed list will be replaced by the toc
{:toc}

<!--more-->

## Types, Variables, and Arithmetic

A *declaration* specifies a type for the named entity:

* *type*: set of possible values and a set of operations (for an object)
* *object*: some memory that holds a value of some type
* *value*: set of bits interpreted according to a type
* *variable*: named object

### Initialization

You can use **{}-list form** other than traditional C-style **= form** to narrow conversions.

```c++
int var = 7.2;    // var becomes 7
int var2 {7.2};   // error: floating-point to integer conversion
int var3 = {7.2}; // same as above(the = is redundant)
```

Use `auto` with `= syntax` to make type be deduced from the initializer.<br>
Use `auto` when...

* The definition is in a large scope where we want to make the type clearly visible to readers of our code
* We want to be explicit about a variable's range or precision
* Avoid redundancy and writing long type names (especially for generic programming)

### Constants

* `const`: "I promise not to change this value"
* `constexpr`: "to be evaluated at **compile time**"

## User-Defined Types

### Structures

C++ structure is basically class with their members are public by default.

### Classes

Will be discussed later for detail (hopefully).

### Enumerations

C++ provides strongly typed `enum class` witch enforces to use `ENUMNAME::ENUMVAR` semantic. So they can be used repeatedly without confusion.<br>

If you want old school C way (which is quite handy sometimes especially with implicit conversion to `int`), remove the `class` from `enum class` to get a "plain `enum`".

By default, an `enum class` has only assignment, initialization, and comparisons defined. However, we can define other operators for it.

## Modularity

At the language level, C++ represents interfaces by *declarations*. A *declaration* specifies all that's needed to use a function or a type.

The key point is that the function bodies(function *definitions*) are "elsewhere".

### Separate Compilation

C++ supports a notion of separate compilation where user code sees only *declarations* of types and functions used. The *definitions* of those types and functions are in separate source files and compiled separately.

![Compile Dependency](/assets/img/2021-03-18/separate_compilation.png)

The code in `user.cpp` & `vector.cpp` shares the Vector interface information presented in `Vector.h`, but the two files are otherwise independent and can be separately compiled.
{.figcaption}

### Namespaces

Offers a mechanism for expressing that some declarations belong together and that their names shouldn't clash with other names.<br>
[Unnamed namespaces can be also used to make an identifier translation unit local](https://stackoverflow.com/questions/357404/why-are-unnamed-namespaces-used-and-what-are-their-benefits).
