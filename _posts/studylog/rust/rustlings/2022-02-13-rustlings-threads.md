---
layout:   post
title:    "Rustlings Topic: Threads"
subtitle: "Rustlings Topic: Threads"
category: studylog
tags:     rust rustlings
---

> In most current operating systems, an executed program’s code is run in a process, and the operating system manages
> multiple processes at once. Within your program, you can also have independent parts that run simultaneously.
> The features that run these independent parts are called [threads].

You may find [solution code for the topic from my repo].

[threads]: https://doc.rust-lang.org/book/ch16-01-threads.html
[solution code for the topic from my repo]: https://github.com/LazyRen/rustlings-solution/tree/main/exercises/threads

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## threads1.rs

What seems to be the problem with the original code?<br>
Code spawns a new thread. That new thread & main thread will try to update/look at the same variable `JobStatus`.

What should we first do?

To eliminate the chance of data racing; We first introduce [`Mutex`] around `JobStatus`.

```rust
let status = Arc::new(Mutex::new(JobStatus { jobs_completed: 0 }));
```

With `Mutex` inserted, we need to hold the lock before we access the variable. Like below:

```rust
let mut job_status = status_shared.lock().unwrap();
```

Mutex lock in Rust is an RAII-style lock. When the variable goes out of the scope, it will automatically be unlocked.

The change of the main thread's loop is to make sure the thread goes to sleep **without** lock acquired.

```rust
/* file: "exercises/threads/threads1.rs" */
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

struct JobStatus {
    jobs_completed: u32,
}

fn main() {
    let status = Arc::new(Mutex::new(JobStatus { jobs_completed: 0 }));
    let status_shared = status.clone();
    thread::spawn(move || {
        for _ in 0..10 {
            thread::sleep(Duration::from_millis(250));
            let mut job_status = status_shared.lock().unwrap();
            job_status.jobs_completed += 1;
        }
    });
    loop {
        {
            if status.lock().unwrap().jobs_completed < 10 {
                println!("waiting...");
            } else {
                break;
            }
        }
        thread::sleep(Duration::from_millis(500));
    }
}
```

[`Mutex`]: https://doc.rust-lang.org/std/sync/struct.Mutex.html#method.lock

Continue with [Rustlings Solution](rustlings){:.heading.flip-title}
{:.read-more}
