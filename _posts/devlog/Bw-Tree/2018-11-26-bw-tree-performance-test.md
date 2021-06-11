---
layout: post
title: "Open Bw-Tree Performance Test"
subtitle: "Open Bw-Tree Performance Test"
category: devlog
tags: bwtree
---

Test Case 생성기

instruction, thread 갯수와 insert ratio를 받아서 테스트 케이스가 적혀있는 tmp[num].txt 생성 (tmp1.txt, tmp2.txt ...)

각 텍스트 파일에는  매 행마다 i num 혹은 d num 으로 입력, 삭제 할 키 값이 들어있음.

키 값은 랜덤으로 생성.

<!--more-->

문제: delete key 값을 항상 insert 후에 생성되도록 만들기는 했는데, 각 thread 별로 실행 명령 파일을 나누다 보니 insert 이전에 delete가 실행 될 수가 있음.

e.x) tmp0.txt 24999번째 줄에 "i 500" 존재, tmp1.txt 4번째 줄에 "d 500" 존재.
생성시에는 24999번째로 "i 500" 생성이후 24503번째로 "d 500"을 생성했으나, 스레드 별로 파일을 나누다 보니 문제 발생.

e.x.2) 직접 실행 결과 천만 단위의 operation에서 최대 6000, 그것도 첫 스레드에서만 failed delete 발생.
대부분의 경우 failed delete가 발생하지 않음.

* this unordered seed list will be replaced by the toc
{:toc}

## Test Script.cpp

```c++
#include "test_suite.h"

/*
 * Run Benchmark with given insert/delete ratio.
 * operations will be mixed up to simulate random.
 * Assume that insert_ratio + delete_ration == 10
*/
void BenchmarkRandOperation(int total_operation, int thread_num) {
  // Get an empty tree; do not print its construction message
  TreeType *t = GetEmptyTree(true);

  // This is used to record time taken for each individual thread
  double thread_time[thread_num];
  for(int i = 0;i < thread_num;i++) {
    thread_time[i] = 0.0;
  }

  auto func = [&thread_time,
               thread_num](uint64_t thread_id, TreeType *t) {
    std::string fName = "tmp" + std::to_string(thread_id) + ".txt";
    std::ifstream fin(fName);
    std::string operation;
    long int key;
    long int ins_cnt = 0, del_cnt = 0, failed_del_cnt = 0;
    std::vector<long int> tmpVec;
    // Declare timer and start it immediately
    Timer timer{true};

    CacheMeter cache{true};

    while(fin >> operation >> key) {
      if (operation == "i") {
        ins_cnt++;
        t->Insert(key, key);
      } else if (operation == "d") {
        del_cnt++;
        bool result = t->Delete(key, key);
        if (!result)
          failed_del_cnt++;
      }
    }

    cache.Stop();
    double duration = timer.Stop();

    thread_time[thread_id] = duration;

    std::cout << "[Thread " << thread_id << " Done] @ " \
              << (ins_cnt + del_cnt) / duration \
              << " million random operation/sec" << "\n" << failed_del_cnt << " failed delete" << "\n" \
              << ins_cnt << " insertion & " << del_cnt << " deletion in " << duration << " seconds\n";

    // Print L3 total accesses and cache misses
    cache.PrintL3CacheUtilization();
    cache.PrintL1CacheUtilization();

    return;
  };

  ParallelTest(t, thread_num, func, t);

  double elapsed_seconds = 0.0;
  for(int i = 0;i < thread_num;i++) {
    elapsed_seconds += thread_time[i];
  }

  std::cout << thread_num << " Threads BwTree: overall "
            << total_operation / elapsed_seconds
            << " million random insert & delete / sec" << "\n";

  // Remove the tree instance
  delete t;

  return;
}

```

## create_input_file.cpp

```c++
#include <cstring>
#include <string>
#include <random>
#include <fstream>
#include <iostream>
#include <algorithm>
#include <cstdio>
#include <chrono>
using namespace std;

int tmp_ins, tmp_del;

void CreateRandOperation(int total_operation, int thread_num, int insert_ratio, int delete_ratio) {
 if (insert_ratio < delete_ratio) {
  printf("ratio must be insert >= delete\n");
 }
 if (insert_ratio + delete_ratio != 10) {
  printf("insert_ratio + delete_ratio must be 10\n");
 }
 unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
 std::default_random_engine generator(seed);
 std::uniform_int_distribution<int> distribution(0,9);
 int cut = 100000, cut_count = 0;
 int remain_operation = std::min(total_operation, cut);
 int cur_thread = 0, key_per_thread = total_operation / thread_num, cur_written = 0;

 total_operation -= remain_operation;
 string fname = "tmp" + to_string(cur_thread) + ".txt";
 std::ofstream fout(fname, ios::trunc);
 std::vector<int> copy_keys;
 copy_keys.reserve(cut);
 for (int i = 1; i <= cut; i++)
  copy_keys.push_back(i);

 while (remain_operation != 0) {
  int insert_operation = (remain_operation/10) * insert_ratio;
  int delete_operation = remain_operation - insert_operation;
  int ins = 0;
  std::vector<int> keys(copy_keys);
  std::vector<int> pos_del;
  pos_del.reserve(delete_operation);
  shuffle(keys.begin(), keys.end(), std::default_random_engine(seed));
  printf("shuffle done\n");
  while (insert_operation != 0 && delete_operation != 0) {
   int flip_coin = distribution(generator);
   if (flip_coin < insert_ratio) {//insert
    insert_operation--; tmp_ins++; cur_written++;
    pos_del.push_back(keys[ins] + cut*cut_count);
    fout << "i " << keys[ins++] + cut*cut_count << endl;
   }
   else {//delete
    if (pos_del.size() == 0)
     continue;
    std::uniform_int_distribution<int> tmp_distribution(0,pos_del.size()-1);
    delete_operation--; tmp_del++; cur_written++;
    // shuffle(pos_del.begin(), pos_del.end(), std::default_random_engine(seed));
    int idx = tmp_distribution(generator);
    fout << "d " << pos_del[idx] << endl;
    pos_del.erase(pos_del.begin()+idx);
   }
   if (cur_written == key_per_thread) {
    cur_written = 0;
    fout.close();
    fname = "tmp" + to_string(++cur_thread) + ".txt";
    if (cur_thread < thread_num)
     fout.open(fname, ios::trunc);
   }
  }
  for (int i = insert_operation; i > 0; i--) {
   pos_del.push_back(keys[ins] + cut*cut_count); tmp_ins++; cur_written++;
   fout << "i " << keys[ins++] + cut*cut_count << endl;
   if (cur_written == key_per_thread) {
    cur_written = 0;
    fout.close();
    fname = "tmp" + to_string(++cur_thread) + ".txt";
    if (cur_thread < thread_num)
     fout.open(fname, ios::trunc);
   }
  }
  shuffle(pos_del.begin(), pos_del.end(), std::default_random_engine(seed));
  for (int i = delete_operation; i > 0; i--) {
   fout << "d " << pos_del.back() << endl; tmp_del++; cur_written++;
   pos_del.pop_back();
   if (cur_written == key_per_thread) {
    cur_written = 0;
    fout.close();
    fname = "tmp" + to_string(++cur_thread) + ".txt";
    if (cur_thread < thread_num)
     fout.open(fname, ios::trunc);
   }
  }

  if (total_operation > cut) {
   remain_operation = cut;
   total_operation -= cut;
   cut_count++;
  } else if (total_operation == 0){
   remain_operation = 0;
  } else {
   remain_operation = total_operation;
   total_operation = 0;
   cut_count++;
  }
 }
}

int main()
{
 int inst, ins_rat, thread;
 printf("inst: ");
 scanf("%d", &inst);
 printf("thread_num: \n");
 scanf("%d", &thread);
 printf("insert ratio: ");
 scanf("%d", &ins_rat);
 CreateRandOperation(inst, thread, ins_rat, 10 - ins_rat);
 printf("%d : %d = %d\n", tmp_ins, tmp_del, tmp_ins+tmp_del);
}

```

## How to Run

on the root of the project, make tmp*.txt files for the input

![create_input](/assets/img/2019-01-03/create_input.png)

After creating input files, run main exe file with arguments<br>
(./\[fileName] \[number of instructions] \[number of threads])

![main](/assets/img/2019-01-03/main.png)

# Results

Tested with 10000000 Operations on

(Insert) : (Delete) ratio = 10:0, 8:2, 5:5

\# of threads = 1, 4, 8

![Table](/assets/img/2019-01-03/table.png)

![graph](/assets/img/2019-01-03/graph.png)

Delete에 비해 Insert의 오버헤드가 크다.<br>

perf 조사결과 ins:del 비율에 상관없이<br>BwTree<>::Traverse(Context *context_p, const ValueType*value_p, std::pair<int, bool> *index_pair_p)의 오버헤드가 가장 크다 (30% 이상).<br>

그 다음은 10%가 조금 안되는 비율을 차지하는 <br>std::istreambuf_iterator<char, std::char_traits<char> > std::num_get<char, std::istreambuf_iterator<char, std::char_traits<char> > >::_M_extract_int<long>(std::istreambuf_iterator<char, std::char_traits<char> >, std::istreambuf_iterator<char, std::char_traits<char> >, std::ios_base&, std::_Ios_Iostate&, long&) const

가 있는데 이는 테스트를 위해 이용한 파일 입출력으로 인한 것으로 보인다.

결론: Insert/Delete외의 GetValue를 이용한 item search를 진행하지 않은 상태에서도 Tree Traverse의 오버헤드가 가장 크다. 만약 Tree Traverse에서의 오버헤드를 줄일 방법을 찾아낸다면 가장 큰 성능향상을 보일 것으로 예상된다.

이외의 눈에 띄는 함수들 (10000000 Ops / 5:5 / 8 threads)

![perf_result](/assets/img/2019-01-03/perf.png)

4.49% wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::EpochManager::FreeEpochDeltaChain(wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::BaseNode const*)<br>

1.85% wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::FinishPartialSMO(wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::Context*)<br>

1.67% wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::AddGarbageNode(wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::BaseNode const*)<br>

1.29% wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::NavigateSiblingChain(wangziqi2013::bwtree::BwTree<long, long, KeyComparator, KeyEqualityChecker, std::hash<long>, std::equal_to<long>, std::hash<long> >::Context*)

## 10:0

### 1 Thread

![10insert/1thread](/assets/img/2019-01-03/10insert1thread.png)

### 4 Threads

![10insert4thread](/assets/img/2019-01-03/10insert4thread.png)

### 8 Threads

![10insert8thread](/assets/img/2019-01-03/10insert8thread.png)

## 8:2

### 1 Thread

![8insert1thread](/assets/img/2019-01-03/8insert1thread.png)

### 4 Threads

![8insert4thread](/assets/img/2019-01-03/8insert4thread.png)

### 8 Threads

![8insert8thread](/assets/img/2019-01-03/8insert8thread.png)

## 5:5

### 1 Thread

![5insert1thread](/assets/img/2019-01-03/5insert1thread.png)

### 4 Threads

![5insert4thread](/assets/img/2019-01-03/5insert4thread.png)

### 8 Threads

![5insert8thread](/assets/img/2019-01-03/5insert8thread.png)
