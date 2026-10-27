<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img alt="Lomonosov" src="assets/banner-light.svg" width="100%">
  </picture>
</p>

[![Site](https://img.shields.io/badge/site-sailxx.github.io%2Flomonosov--skill-black?style=flat)](https://sailxx.github.io/lomonosov-skill/)
[![License](https://img.shields.io/badge/license-Apache--2.0-black?style=flat)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-black?style=flat)](https://code.claude.com/docs/en/plugins)
[![Stars](https://img.shields.io/github/stars/sailxx/lomonosov-skill?style=flat&color=black)](https://github.com/sailxx/lomonosov-skill)

**The tutor that refuses to give you the answer. On purpose.**

Ask any AI to solve your homework and it will, and you will learn nothing. Lomonosov does the opposite. It explains on a different example, asks the next question, and makes you find the answer yourself. You earn coins for it: the fewer hints you need, the more you win.

It works for any subject: English or Japanese, Python or Rust, algebra, physics, chemistry, history, exam prep.

## See it in action

A real session recorded with the plugin (shortened, emoji removed):

```text
You      I'm Vlad. I want to build a Telegram bot. Complete beginner, short tasks please.

Prof     Great, Vlad! A Telegram bot is a perfect first goal. Bots are mostly small Python
         pieces that read a message and send a reply.

         Mini goal for today: make Python say something.

         Example:
         print("Good morning")
         Python shows `Good morning`. `print` is a command, the parentheses hold what to
         show, and the quotes mark it as text.

         Task 1: Write one line of code that makes Python show the text `Hi, Vlad!`

         Type your line, and don't worry if you're unsure. A wrong try costs nothing. Total:
         0

You      I have no idea how to start

Prof     No problem, that's what hints are for.

         Hint 1/5: Look at the example again and answer these two questions:
         - Which word in the example tells Python to show something?
         - Which part of the example is the text that gets shown?

         Your task has its own text to show. What do you think changes between the example
         and your line?

         You can still earn 7 coins for solving it now.

You      Is it the one with quotes? name = Vlad

Prof     Half of that is right. Yes, the part in quotes is the text Python shows.

         `name = Vlad` is a real Python idea (storing a value), and we'll get to it soon. But
         it doesn't show anything on screen yet, so it's a different tool from the one this
         task needs.

         Two small questions:
         - In the example, which word comes before the parentheses and tells Python to *show*
         something?
         - Your text is `Hi, Vlad!`. Where does it go relative to that word and the
         parentheses?

         Try writing a line from those pieces. I'm not counting this as a hint, so you can
         still earn 7 coins.
```

No lectures to skim, no copy-paste answers. Every task ends with you knowing how to do it.

## What makes it different

- **It never gives the answer.** Even if you beg. Say "I give up" and you get a smaller step and a kind word, not the solution. If you keep asking, it solves a similar task in full and hands you the original again.
- **Five-rung hint ladder.** Direction, reminder, analogy, partial step, almost there. It climbs one rung at a time, only when you are stuck.
- **A game, not a chore.** Coins, streak bonuses, ranks every 50 coins and a boss task at the end of each topic. Mistakes cost nothing, only hints do.
- **You name your tutor.** The very first thing it asks is what you want to call it. Then it asks about your goal and level, and adapts.
- **Warm, never condescending.** It praises your reasoning, explains why a mistake happened, and offers a quote or a study tip when it fits.
- **Remembers you.** With file access it keeps `teacher-progress.md`: your balance, rank and topic survive between sessions.
- **Spaced repetition.** Old mistakes come back as fresh questions after 1, 3 and 7 days.
- **Commands.** `/lomonosov-skill:progress` shows your balance and rank, `/lomonosov-skill:quiz` revises mistakes, `/lomonosov-skill:exam` runs a hint-free test.
- **Boss tasks.** End a topic with a hint-free test, or say "test me" any time.
- **Shows, not only tells.** Diagrams, flowcharts, tables and charts when a picture explains faster than words.
- **Replies in your language.** The instructions are in English, the lessons are in whatever you write.

## Coins

| Hints used | 0 | 1 | 2 | 3 | 4+ |
|---|---|---|---|---|---|
| Coins | 10 | 7 | 5 | 3 | 1 |

Plus +3 for three clean answers in a row, +5 for explaining a topic in your own words, +5 for finishing a topic.

## Get started

You need [Claude Code](https://code.claude.com). Then:

```console
claude plugin marketplace add sailxx/lomonosov-skill
claude plugin install lomonosov-skill@lomonosov
```

Or inside a session: `/plugin marketplace add sailxx/lomonosov-skill`.

Start learning by just saying what you want: "I want to learn Python", "help me with integrals", "quiz me on the French Revolution". The skill starts on its own. To call it manually: `/lomonosov-skill:teach`.

## Why Lomonosov

Mikhail Lomonosov (1711-1765) walked to Moscow at 19 to study, became a chemist, physicist, poet and founder of Moscow University. The tutor is named after someone who learned the hard way, and wants you to learn it properly too.

## Explore

- [Website](https://sailxx.github.io/lomonosov-skill/)
- [The skill itself](plugins/lomonosov-skill/skills/teach/SKILL.md): every rule of the tutor in one file
- [Contributing](CONTRIBUTING.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
