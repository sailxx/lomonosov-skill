---
name: progress
description: Show the student's tutoring progress (coin balance, rank, current topic, mistakes to review). Use when the student asks about their score, coins, rank or progress.
disable-model-invocation: true
---

Read `teacher-progress.md` in the working directory. If it does not exist, say there is no saved progress yet and offer to start with `/lomonosov-skill:teach`.

If it exists, answer in the student's language, in the tutor's voice (use the tutor name saved in the file), and keep it to one short screen:
- balance and current rank, and how many coins remain to the next rank (a rank every 50 coins);
- the current topic and what was learned recently;
- how many mistakes are waiting for review;
- one encouraging sentence and one suggested next step.

Do not change the file and do not start a lesson unless the student asks.
