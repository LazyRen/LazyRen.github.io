---
layout: post
title: "Possible Infinite Loop in Wait-free Bounded Queue"
subtitle: "Possible Infinite Loop in Wait-free Bounded Queue"
category: devlog
tags: algorithm concurrent-programming
---

Wait-free Bounded Queue는 atomic fetch_add() 함수를 사용하여 bounded된(사이즈가 정해진) 배열 내에서 값을 enqueue, dequeue 함으로서 작동하는 자료 구조입니다.<br>여러 enqueue/dequeue 요청이 병렬적으로 들어왔을 때에도 순차적인 처리를 위하여 배열 내부의 원소는 flag를 두고 있으며 해당 flag를 사용하여 enqueue/dequeue 요청을 순차적으로 처리할 수 있기 때문에 wait-free의 성질을 가지고 있습니다.

<!--more-->

코드가 길지 않은 만큼 `enqueue()` / `dequeue()` 함수를 보시면 금방 이해하실 수 있을 것 입니다.

다만, 해당 코드를 작성하면서 `dequeue()` 함수 내부의 if문을 주석처리 처럼 작성하였을 때 프로그램이 무한루프가 돌게 됨을 확인할 수 있었습니다.<br>단순히 변수값 하나를 if문 이전에 저장하느냐, 하지 않느냐의 차이로 무한루프가 생길 수 있음을 이해하지 못했었으나, 함께 수업을 듣던 채홍이와 조교님의 설명 덕분에 해당 문제가 발생할 수 있는 상황에 대해 이해할 수 있었습니다.<br>

변수값 하나의 저장유무와 같이 코드의 작은 부분의 차이가 병렬 프로그래밍에서 얼마나 중요한 차이를 불러일으킬 수 있는지 새삼 체감할 수 있었기에 이 문제를 완벽하게 이해해보고자 ppt를 작성해 보았습니다.

* this unordered seed list will be replaced by the toc
{:toc}

## Wait-free Bounded Queue Source Code

```c++
#include <atomic>
#include <chrono>
#include <cinttypes>
#include <cstdio>
#include <thread>
using namespace std;

#define NUM_PRODUCER                4
#define NUM_CONSUMER                NUM_PRODUCER
#define NUM_THREADS                 (NUM_PRODUCER + NUM_CONSUMER)
#define NUM_ENQUEUE_PER_PRODUCER    10000000
#define NUM_DEQUEUE_PER_CONSUMER    NUM_ENQUEUE_PER_PRODUCER

#define QUEUE_SIZE      1024

typedef struct QueueNode {
    int key;
    uint64_t flag;
} QueueNode;

class Queue {
private:
  struct QueueNode *slot;
  uint64_t size;
  atomic<uint64_t> front;
  atomic<uint64_t> rear;

public:
  Queue(uint64_t _size) : slot(new QueueNode[_size]), size(_size), front(0), rear(0) {}

  void enqueue(int key) {
    uint64_t cur_slot = rear++;
    int order = cur_slot / size;
    cur_slot = cur_slot % size;

    while (true) {
      uint64_t flag = slot[cur_slot].flag;
      if (flag % 2 == 1 || flag / 2 != order) {
        this_thread::yield();
      } else {
        slot[cur_slot].key = key;
        slot[cur_slot].flag++;
        break;
      }
    }
  }

  int dequeue() {
    uint64_t cur_slot = front++;
    int order = cur_slot / size;
    cur_slot = cur_slot % size;

    while (true) {
      uint64_t flag = slot[cur_slot].flag;
      if (flag % 2 == 0 || flag / 2 != order) {
    //if (slot[cur_slot].flag % 2 == 0 || slot[cur_slot].flag / 2 != order) {
        this_thread::yield();
      } else {
        int ret = slot[cur_slot].key;
        slot[cur_slot].flag++;
        return ret;
      }
    }
  }

  ~Queue() {
    delete[] slot;
  }
};

bool flag_verification[NUM_PRODUCER * NUM_ENQUEUE_PER_PRODUCER];
Queue queue(QUEUE_SIZE);

void ProducerFunc(int tid) {
    int key_enqueue = NUM_ENQUEUE_PER_PRODUCER * tid;
    for (int i = 0; i < NUM_ENQUEUE_PER_PRODUCER; i++) {
        queue.enqueue(key_enqueue);
        key_enqueue++;
    }

    return;
}

void ConsumerFunc() {
    for (int i = 0; i < NUM_DEQUEUE_PER_CONSUMER; i++) {
        int key_dequeue = queue.dequeue();
        flag_verification[key_dequeue] = true;
    }

    return;
}

int main(void) {
    std::thread threads[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        if (i < NUM_PRODUCER) {
            threads[i] = std::thread(ProducerFunc, i);
        } else {
            threads[i] = std::thread(ConsumerFunc);
        }
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        threads[i].join();
    }

    // verify
    for (int i = 0; i < NUM_PRODUCER * NUM_ENQUEUE_PER_PRODUCER; i++) {
        if (flag_verification[i] == false) {
            printf("INCORRECT!\n");
            return 0;
        }
    }
    printf("CORRECT!\n");

    return 0;
}

```

## Possible Infinite Loop Situation

작성한 키노트가 있기에 키노트 이미지들로 설명을 대체 합니다.

<script async class="speakerdeck-embed" data-id="7166cbf528644bdc8fb3e52ee9b81ef6" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<details>
<summary>jpeg 파일 보기</summary>
<div markdown="1">

![note-1](/assets/img/wait-free-queue/001.jpeg)

![note-2](/assets/img/wait-free-queue/002.jpeg)

![note-3](/assets/img/wait-free-queue/003.jpeg)

![note-4](/assets/img/wait-free-queue/004.jpeg)

![note-5](/assets/img/wait-free-queue/005.jpeg)

![note-6](/assets/img/wait-free-queue/006.jpeg)

![note-7](/assets/img/wait-free-queue/007.jpeg)

![note-8](/assets/img/wait-free-queue/008.jpeg)

</div>
</details>

p.s. 블로그 내의 모든 keynote들은 [Github Page]에서 확인할 수 있습니다.(*keynote* 주의!)

[Github Page]: https://github.com/LazyRen/LazyRen.github.io/tree/master/assets/presentation
