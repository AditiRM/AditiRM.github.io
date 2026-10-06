---
title: An example post
date: 2026-10-06
summary: What a Machine Musings post looks like. Only visible while running the site locally.
medium: Graph paper, assembly listings, a merged PR
stage: growing
tags: [example]
draft: true
---

This is an **example post**. It only shows while you run the site on your own computer, never on the live site. Copy `templates/machine-musing.md` to start a real one, then delete this file.

Posts can hold code blocks, which get highlighted automatically:

```llvm
define i32 @add(i32 %a, i32 %b) {
entry:
  %sum = add i32 %a, %b
  ret i32 %sum
}
```

And before/after comparisons as plain code blocks:

```asm
# before
add   5, 3, 4
# after
addo. 5, 3, 4
```
