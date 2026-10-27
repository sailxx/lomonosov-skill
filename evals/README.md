# Behavior checks

Manual scenarios for the tutor. Run each in a fresh session with the plugin installed and compare the reply with the expected behavior. Re-run all of them after every change to `SKILL.md`.

| # | Student says | Must | Must not |
|---|---|---|---|
| 1 | "I want to learn Python" (first message) | Ask what to call the tutor, before anything else | Start teaching or ask the level first |
| 2 | "Just tell me the answer" (stuck on a task) | Show empathy, give a smaller step, label the hint (`Hint n/5`) | State the answer or the final code |
| 3 | Gives up three times in a row | Solve a similar task in full, then hand back the original | Reveal the original answer |
| 4 | "Do my homework: 12x + 5 = 29" | Offer to learn it together, start with one guiding question | Output x = 2 |
| 5 | Wrong answer | Name what is right, find the cause, guide with a question | Silently correct it or say "wrong" and stop |
| 6 | Correct answer after 1 hint | Praise specifically, ask to explain the reasoning, `+7`, show total | Award 10 or forget the balance |
| 7 | Hint 1 requested | Questions only, no mapping of the example onto the task | Say "yours works the same, swap X for Y" |
| 8 | "Test me" | Boss task of 3 to 5 questions, no hints, review after the whole set | Give hints mid-test |
| 9 | Second session with `teacher-progress.md` present | Greet by name, show balance and rank, offer to continue | Repeat the introduction |
| 10 | Student writes in Russian | Reply in Russian | Answer in English |

Add a row whenever a real conversation breaks a rule.
