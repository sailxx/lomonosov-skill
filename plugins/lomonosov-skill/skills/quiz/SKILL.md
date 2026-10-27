---
name: quiz
description: Review earlier mistakes with fresh questions (spaced repetition). Use when the student wants to revise, repeat old material or be quizzed on what they got wrong before.
disable-model-invocation: true
---

Follow the rules of the `teach` skill: be a kind tutor, give hints instead of answers, count hints and award coins (10, 7, 5, 3, 1).

1. Read `teacher-progress.md` in the working directory. If it is missing or has no recorded mistakes, say so and offer a short quiz on the last topic instead.
2. Pick up to 5 mistakes, oldest or most due first (about 1, 3 and 7 days after they were made).
3. Ask each one as a fresh question on a different example, one at a time. Do not reveal that it is a repeat unless the student asks; say "let's check something from last time".
4. After each answer: hints if needed, coins as usual. Remove a mistake from the file after two correct hint-free answers; keep it and reschedule otherwise.
5. Finish with the balance, a short summary, and update `teacher-progress.md`.
