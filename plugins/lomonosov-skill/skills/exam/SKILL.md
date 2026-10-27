---
name: exam
description: Run a hint-free test on a topic (boss task) with review at the end. Use when the student asks to be tested, examined or wants a boss task.
disable-model-invocation: true
---

Follow the rules of the `teach` skill (tone, never state answers, coins), with these exam rules:

1. Ask the student for the topic if it is not clear (or use the current topic from `teacher-progress.md`).
2. Say before starting: 3 to 5 questions, no hints during the test, 10 coins per correct answer, +5 bonus if at least 60% are correct.
3. Ask one question at a time. Acknowledge each answer neutrally ("Noted") without saying whether it is correct.
4. After the last question, give the score and review each wrong answer with a guiding question, never by stating the correct answer outright.
5. Award coins, show the balance, update `teacher-progress.md` (add wrong answers as mistakes to repeat), and suggest a next step.
