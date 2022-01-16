---
layout: post
title: "gitlab에서 github로 저장소(repository) commit log를 유지하며 클론하기"
subtitle: "gitlab to github repo clone with commit logs"
category: devlog
tags: development translation git
---

대학교에서 진행하는 모든 과제는 학교와 연동된 gitlab의 private repo 이다 보니 학기가 끝나고 github로 정리할 방법이 없을까 하다가 좋은 방법을 발견하여 번역해 봅니다.<br>
이 방법을 통해서 미러링을 진행하게 될 경우 단순히 파일만 복사되는 것이 아닌 gitlab에서 작업하였던 commit log가 그대로 github로 이동되기 때문에 큰 도움이 됩니다.

<!--more-->

1. this ordered seed list will be replaced by the toc
{:toc}

## 저장소 미러링하기

1. 터미널을 엽니다.

2. 복사하고자 하는 저장소(gitlab)의 bare clone을 생성합니다.

    ```shell
    git clone --bare https://gitlab.com/exampleuser/old-repository.git
    ```

3. 새로운 저장소(github)로 mirror-push를 진행합니다.

    ```shell
    cd old-repository.git
    git push --mirror https://github.com/exampleuser/new-repository.git
    ```

4. 1번과정에서 클론된 저장소를 지웁니다.(선택)

대부분의 경우 위의 방법으로 mirror-clone이 가능하지만, 깃헙의 정책상 크기가 100MB를 넘어가는 파일이 커밋된 적이 단 한번이라도 있을경우 오류가 발생하여 push가 불가능하게 됩니다.

## 100MB를 넘어가는 크기의 파일을 지닌 저장소 미러링하기

1. [git lfs](https://git-lfs.github.com/)와 [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)를 설치합니다.

2. 복사하고자 하는 저장소(gitlab)의 clone을 생성합니다.

    ```shell
    git clone --mirror <https://gitlab.com/exampleuser/old-repository.git>
    ```

3. 커밋 히스토리 내에서 large file을 찾아 트랙킹 합니다.

    ```shell
    git filter-branch --tree-filter 'git lfs track "*.{zip,jar}"' -- --all
    ```

4. BFG를 이용하여 해당 파일들을 git lfs로 변경합니다.

    ```shell
    java -jar ~/usr/bfg-repo-cleaner/bfg-1.13.0.jar --convert-to-git-lfs '*.zip'
    java -jar ~/usr/bfg-repo-cleaner/bfg-1.13.0.jar --convert-to-git-lfs '*.jar'
    ```

5. 새로운 저장소(github)로 mirror-push를 진행합니다.

    ```shell
    cd old-repository.git
    git push --mirror <https://github.com/exampleuser/new-repository.git>
    ```

6. 1번과정에서 클론된 저장소를 지웁니다.(선택)

* [GitHub Help](https://help.github.com/articles/duplicating-a-repository/)
* [stack overflow](https://stackoverflow.com/questions/37986291/how-to-import-git-repositories-with-large-files)
{:.note title="출처"}
