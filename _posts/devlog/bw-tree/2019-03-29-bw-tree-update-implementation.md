---
layout: post
title: "Open Bw-Tree New Update Implementation"
subtitle: "Open Bw-Tree New Update Implementation"
category: devlog
tags: bwtree
---

<iframe src="//www.slideshare.net/slideshow/embed_code/key/DAHZqeKXu3rwvZ" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/ssuser42682f/bwtree-update-implementation-138582836" title="Bw-Tree Update Implementation" target="_blank">Bw-Tree Update Implementation</a> </strong> from <strong><a href="https://www.slideshare.net/ssuser42682f" target="_blank">DaeIn Lee</a></strong> </div>

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## Update()

```c++
/*
 * Update() - Update a key-value pair
 * This function returns false if
 * 1. Traverse is aborted
 * 2. oldValue does not exist
 * 3. newValue already exist
 */
bool Update(const KeyType &key, const ValueType &oldValue, const ValueType &newValue) {
  bwt_printf("Update called\n");

  #ifdef BWTREE_DEBUG
  update_op_count.fetch_add(1);
  #endif

  EpochNode *epoch_node_p = epoch_manager.JoinEpoch();

  /* update will be performed iff old value is exist and new value is not.
   * YOU MUST use previous one to be precise, but in order to make test case easier
   * we DO NOT check for the newValue's existence
   */
  while(1) {
    Context context{key};
    std::pair<int, bool> index_pair;

    // Navigate leaf nodes to check whether the key-oldValue & key-newValue
    // pair exists
    const std::pair<const KeyValuePair*,const KeyValuePair*> item_p = \
                          Traverse(&context, &oldValue, &newValue, &index_pair);

    /* There is 3 reason for update() to fail
     * 1. Traverse() aborted, returning <nullptr, nullptr>
     * 2. <key,oldValue> does not exist
     * 3. <key,newValue> already exist
     */
    // if(item_p.first == nullptr || item_p.second != nullptr) {
    if(item_p.first == nullptr) {
      #ifdef BWTREE_DEBUG
      update_abort_count.fetch_add(1);
      #endif
      epoch_manager.LeaveEpoch(epoch_node_p);

      return false;
    }

    NodeSnapshot *snapshot_p = GetLatestNodeSnapshot(&context);

    // We will CAS on top of this
    const BaseNode *node_p = snapshot_p->node_p;
    NodeID node_id = snapshot_p->node_id;

    const LeafDeleteNode *delete_node_p = \
      LeafInlineAllocateOfType(LeafDeleteNode,
                               node_p,
                               key,
                               oldValue,
                               node_p,
                               index_pair);

    const LeafInsertNode *insert_node_p = \
      LeafInlineAllocateOfType(LeafInsertNode,
                               node_p,
                               key,
                               newValue,
                               delete_node_p,
                               index_pair);// delete_node_p on 5th argv.

    bool ret = InstallNodeToReplace(node_id,
                                    insert_node_p,
                                    node_p);// install insert_node_p
    if(ret == true) {
      break;
    } else {
      delete_node_p->~LeafDeleteNode();
      insert_node_p->~LeafInsertNode();
    }
  }// delete & insert key-oldValue pair done
  epoch_manager.LeaveEpoch(epoch_node_p);

  return true;
}
```

## Traverse()

```c++
const std::pair<const KeyValuePair*, const KeyValuePair*> Traverse(Context *context_p,
                                                            const ValueType *value_p1,
                                                            const ValueType *value_p2,
                                                            std::pair<int, bool> *index_pair_p) {

  // For value collection it always returns nullptr
  const KeyValuePair *found_pair_p1 = nullptr;
  const KeyValuePair *found_pair_p2 = nullptr;

retry_traverse:
  assert(context_p->abort_flag == false);
  #ifdef BWTREE_DEBUG
  assert(context_p->current_level == -1);
  #endif
  // This is the serialization point for reading/writing root node
  NodeID start_node_id = root_id.load();

  // This is used to identify root nodes
  // NOTE: We set current snapshot since in LoadNodeID() or read opt.
  // version the parent node snapshot will be overwritten with this child
  // node snapshot
  //
  // NOTE 2: We could not use GetLatestNodeSnapshot() here since it checks
  // current_level, which is -1 at this point
  context_p->current_snapshot.node_id = INVALID_NODE_ID;

  // We need to call this even for root node since there could
  // be split delta posted on to root node
  LoadNodeID(start_node_id, context_p);

  // There could be an abort here, and we could not directly jump
  // to Init state since we would like to do some clean up or
  // statistics after aborting
  if(context_p->abort_flag == true) {
    goto abort_traverse;
  }

  bwt_printf("Successfully loading root node ID\n");

  while(1) {
    NodeID child_node_id = NavigateInnerNode(context_p);

    // Navigate could abort since it might go to another NodeID
    // if there is a split delta and the key is >= split key
    if(context_p->abort_flag == true) {
      bwt_printf("Navigate Inner Node abort. ABORT\n");

      // If NavigateInnerNode() aborts then it returns INVALID_NODE_ID
      // as a double check
      // This is the only situation that this function returns
      // INVALID_NODE_ID
      assert(child_node_id == INVALID_NODE_ID);

      goto abort_traverse;
    }

    // This might load a leaf child
    // Also LoadNodeID() does not guarantee the node bound matches
    // search key. Since we could readjust using the split side link
    // during Navigate...Node()
    LoadNodeID(child_node_id, context_p);

    if(context_p->abort_flag == true) {
      bwt_printf("LoadNodeID aborted. ABORT\n");

      goto abort_traverse;
    }

    // This is the node we have just loaded
    NodeSnapshot *snapshot_p = GetLatestNodeSnapshot(context_p);

    if(snapshot_p->IsLeaf() == true) {
      bwt_printf("The next node is a leaf\n");

      break;
    }
  } //while(1)

  if(value_p1 == nullptr && value_p2 == nullptr) {
    // We are using an iterator just to get a leaf page
    assert(index_pair_p == nullptr);

    // If both are nullptr then we just navigate the sibling chain
    // to find the correct node with the correct range
    // And then the iterator will consolidate the node without actually
    // going down with a specific key
    NavigateSiblingChain(context_p);
  } else {
    // If a value is given then use this value to Traverse down leaf
    // page to find whether the value exists or not
    if (value_p1 != nullptr)
      found_pair_p1 = NavigateLeafNode(context_p, *value_p1, index_pair_p);
    if (value_p2 != nullptr)
      found_pair_p2 = NavigateLeafNode(context_p, *value_p2, index_pair_p);
  }

  if(context_p->abort_flag == true) {
    bwt_printf("NavigateLeafNode() or NavigateSiblingChain()"
                " aborts. ABORT\n");

    goto abort_traverse;
  }

  #ifdef BWTREE_DEBUG

  bwt_printf("Found leaf node. Abort count = %d, level = %d\n",
              context_p->abort_counter,
              context_p->current_level);

  #endif

  // If there is no abort then we could safely return
  return std::make_pair(found_pair_p1, found_pair_p2);

abort_traverse:
  #ifdef BWTREE_DEBUG

  assert(context_p->current_level >= 0);

  context_p->current_level = -1;

  context_p->abort_counter++;

  #endif

  // This is used to identify root node
  context_p->current_snapshot.node_id = INVALID_NODE_ID;

  context_p->abort_flag = false;

  goto retry_traverse;

  assert(false);
  return std::make_pair(nullptr, nullptr);
}
```
