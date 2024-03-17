---
layout:   post
title:    "Typical C++, But Why?"
subtitle: "Typical C++, But Why?"
category: studylog
tags:     cpp
---

<div class="iframe-container">
    <iframe src="https://www.youtube.com/embed/ZJKWNBcPHaQ?si=Qye8SNNbXD7ohPDy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

As much as I like new cool C++ features, I'm a big fan of small habits like this video provides that can easily be applied to a codebase that I everyday sees. And with no surprise, I've seen all of those problems in our codebase :P

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Wrong Argument

```c++
std::string readUserInput();
std::string sanitizeInput(const std::string&);
std::string queryUserData(const std::string&);
void processResult(const std::string&);

void reactToUserInput() {
    auto input { readUserInput() };
    auto sanitizedInput { sanitizeInput(input) };
    log("input user data=", sanitizedInput);
    auto result { queryUserData(input) };
    processResult(result);
}
```

Can you spot the problem from the above code snippet?
`input` is used for a `queryUserData()` function call instead of `sanitizedInput`.

To prevent such developer mistakes...

### Solution

```c++
class SanitizedString
{
public:
    explicit SanitizedString(std::string&);

    // explicit requires `static_cast` to get `std::string&`
    explicit operator const std::string& const(); // conversion operator
private:
    std::string value;
}

std::string readUserInput();
SanitizedString sanitizeInput(const std::string&);
std::string queryUserData(const SanitizedString&);
void processResult(const std::string&);

void reactToUserInput()
{
    auto input { readUserInput() };
    auto sanitizedInput { sanitizeInput(input) };
    log("input user data=", sanitizedInput);
    auto result { queryUserData(sanitizedInput) };
    processResult(result);
}
```

Use the *user-defined* type so compiler throws on a simple mistakes like above.

* Even a very simple struct eliminates a whole class of runtime errors
* Private data and throwing constructor makes the *right thing easy and the wrong thing hard*
* Almost always use `explicit` for constructors and conversion operators

## A load of bool

```c++
void print(std::string_view, bool truncate, bool pad, bool lineFeed);

int main()
{
    print("foo", false, false, true);
}
```

Very typical function definition I very often see. And also do not like it. Although clang's inline parameter hint helps a lot in modern days, developers still can easily make mistakes on a parameter order (and very hard to spot it during the code review `:(`).

### Solution

Use `enum class`.

```c++
enum class Truncate : bool { OFF=false, ON=true};
enum class Pad : bool { OFF=false, ON=true};
enum class LineFeed : bool { OFF=false, ON=true};
void print(std::string_view, Truncate truncate, Pad pad, LineFeed lineFeed);

int main()
{
    print("foo", Truncate::OFF, Pad::OFF, LineFeed::ON);
}
```

* You almost never want `bool` parameters, and especially not several
* `enum class` adds good kind of verbosity that enhances readability

Another solution I prefer to use when we have multiple parameters is to create a config struct that holds all necessary parameters.<br>
For example:

```c++
struct Config
{
    bool truncate;
    bool pad;
    bool lineFeed;
}

void print(std::string_view, Config conf);
```

## Dangerous Defaults

```c++
void print(std::string_view, bool truc, bool pad, bool lineFeed=true);

int main()
{
    print("foo", false, false, true);
}
```

This works fine, but what happen when we add one more parameter?

```c++
void print(std::string_view, size_t field, bool truc, bool pad, bool lineFeed=true);

int main()
{
    print("foo", false, false, true);
}
```

I've added `size_t field` to the function, but it still compiles and work. *But not the way developer intended*.<br>
This is most scariest scenario. It's okay to fail during the compile. It's okay to crash or throw during the execution. We can easily check what went wrong. But when code runs in the way that they are not meant to be... Things get ugly and takes ages to catch the problem.

Since `print` has 5 parameters with 1 default parameter, `print("foo", false, false, true);` is a legit call in compiler's PoV.
Even worse, `false` is *implicitly* converted to `size_t 0` and passed to the `field`.

### Solution

`enum class` still works for this case too. As implicit conversion won't be possible.

* Default parameters are extremely dangerous over time if the parameter types are interchangeable
* Unique and non-convertible types cath this problem

## Coupled parameters

```c++
size_t parseHeader(const uint8_t* buffer, size_t bufferLength);
void copyPayload(const uint8_t* begin, size_t payloadLength)

void receivedPacket(const uint8_t* buffer, size_t bufferLength)
{
    auto headerLen { parseHeader(buffer, bufferLength) };
    copyPayload(buffer + headerLen, bufferLength); // buffer overflow!
}
```

Second argument for `copyPayload` should be `bufferLength - headerLen`. So easy to make mistakes like this.
And yet we have so many APIs that takes pointer and length separately...

### Solution

Create a struct to hold coupled parameters.
Use STL such as `std::span<>`(since `C++20`).

```c++
class BufferView {
public:
    BufferView(const uint8_t* buffer, size_t length);
    const uint8_t* begin() const { return buffer }
    const uint8_t* end() const { return buffer + length }
    BufferView prefix(size_t len) const {
        return { buffer, std::min(len, length) }
    }

    BufferView suffixAfter(size_t pos) const {
        auto adjustedPos { std::min(pos, length) };
        return { buffer + adjustedPos, length - adjustedPos };
    }

private:
    const uint8_t* buffer;
    size_t length;
}

BufferView parseHeader(BufferView packet);
void copyPayload(BufferView payload)

void receivedPacket(BufferView packet)
{
    auto header { parseHeader(buffer, bufferLength) };
    copyPayload(packet.suffixAfter(header.length));
}
```

* When several parameters together describe one thing, model that one thing as a type.

## Too Many Defaults

```c++
class ServerSocket
{
public:
    ServerSocket(uint16_t port,
                 bool tcp = true,
                 std::string_view address="0.0.0.0",
                 std::optional<std::string_view> multicast = std::nullopt,
                 bool nonblocking = true);
}
```

There are so many defaults, what if I want to set just *one* parameter to non-default value?

### Solution

```c++
class ServerSocket
{
public:
    struct Config
    {
        uint16_t port,
        bool tcp = true,
        std::string_view address="0.0.0.0",
        std::optional<std::string_view> multicast = std::nullopt,
        bool nonblocking = true
    }
    ServerSocket(Config);
}

int main()
{
    ServerSocket({.port = 1666,
                  .address = "127.0.0.1",
                  .nonblocking = false}); // C++20: initializer list for explicit named values
}
```

One problem with above solution is that developer *may* forget to initialize `port`. (It will be initialized to `0`)

```c++
template <typename T>
class MustInit
{
public:
    MustInit() = delete; // No default initialize
    MustInit(T& t): value{ t } {}
    MustInit(T&& t): value{ std::move(t) } {}
    operator T&() { return value; }
    operator const T&() const { return value; }
private:
    T value;
}

class ServerSocket
{
public:
    struct Config
    {
        MustInit<uint16_t> port,
        bool tcp = true,
        std::string_view address="0.0.0.0",
        std::optional<std::string_view> multicast = std::nullopt,
        bool nonblocking = true
    }
    ServerSocket(Config);
}
```

`MustInit` helps to make parameter like `port` to be impossible to ignore.

## Wrong Key

```c++
using serverId = int;
using clientId = int;

class control
{
public:
    void closeServer(serverId id) {
        m_clientSession.erase(id); // Wrong member variable used!
        // Possible since both serverId & clientId are type alias of `int`
    }
private:
    std::map<serverId, session> m_serverSession;
    std::map<clientId, session> m_clientSession;
}
```

### Solution

```c++
enum class serverId : int {};
enum class clientId : int {};

class control
{
public:
    void closeSession(serverId id) {
        m_serverSession.erase(id);
    }
    void closeSession(clientId id) {
        m_clientSession.erase(id);
    }
private:
    std::map<serverId, session> m_serverSession;
    std::map<clientId, session> m_clientSession;
}
```

Unlike type alias, `enum class` is a different type, so we can do a overloading. And cannot be implicitly converted.

* `enum class` is great for creating new integer types
* C++20 `operator<=>()` saves a lot of work (Can skip declaring `operator==`, `operator<` ...)
* Avoid the use of type aliases in function signature.

## Types

* Reduce the risk of calling functions with the wrong values
* Reduce the risk that dependent values diverge
* Makes it easier to manager defaults
* Can help prevent uninitialized data
* Are more convenient to write and use since C++20
* Make your APIs more expressive
* Are typically discovered as the code evolves
  * Just don't forget to incorporate the improvements

## Furthermore

* [Strongly Typed Containers - Sandor Dargo - C++ on Sea 2022](https://www.youtube.com/watch?v=0cTOqwrvq94)
* [What Classes We Design and How - Peter Sommerlad - CppCon 2021](https://www.youtube.com/watch?v=iLpt23V2vQE)
