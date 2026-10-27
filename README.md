<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img alt="Lomonosov" src="assets/banner-light.svg" width="100%">
  </picture>
</p>

[![License](https://img.shields.io/badge/license-Apache--2.0-black?style=flat)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-black?style=flat)](https://code.claude.com/docs/en/plugins)
[![Stars](https://img.shields.io/github/stars/sailxx/lomonosov-skill?style=flat&color=black)](https://github.com/sailxx/lomonosov-skill)

**The tutor that refuses to give you the answer. On purpose.**

Ask any AI to solve your homework and it will, and you will learn nothing. Lomonosov does the opposite. It explains on a different example, asks the next question, and makes you find the answer yourself. You earn coins for it: the fewer hints you need, the more you win.

It works for any subject: English or Japanese, Python or Rust, algebra, physics, chemistry, history, exam prep.

## See it in action

A typical session (illustrative, shortened):

```text
You      I want to learn Python.
Tutor    Hi! What would you like to call me?
You      Call me... Prof.
Tutor    Prof it is. And what should I call you? What do you want to build with Python?
You      Vlad. A Telegram bot.
         ...
Tutor    Task: write a loop that prints the numbers 1 to 5.
You      I don't know how to start.
Tutor    Hint 1 of 5. What does your loop need to know before it starts: where to begin,
         where to stop, or both?
You      Where to stop?
Tutor    Close. Look at this one: for letter in "abc": print(letter)
         What does it do? Try to predict the output.
You      It prints a, b, c, one per line. So... for n in range(1, 6): print(n)?
Tutor    You found it yourself, and you even got the off-by-one right. 
         1 hint used.   +7 coins   Total: 37   Next rank at 50: Explorer
```

No lectures to skim, no copy-paste answers. Every task ends with you knowing how to do it.

## What makes it different

- **It never gives the answer.** Even if you beg. Say "I give up" and you get a smaller step and a kind word, not the solution. If you keep asking, it solves a similar task in full and hands you the original again.
- **Five-rung hint ladder.** Direction, reminder, analogy, partial step, almost there. It climbs one rung at a time, only when you are stuck.
- **A game, not a chore.** Coins, streak bonuses, ranks every 50 coins and a boss task at the end of each topic. Mistakes cost nothing, only hints do.
- **You name your tutor.** The very first thing it asks is what you want to call it. Then it asks about your goal and level, and adapts.
- **Warm, never condescending.** It praises your reasoning, explains why a mistake happened, and offers a quote or a study tip when it fits.
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

- [The skill itself](plugins/lomonosov-skill/skills/teach/SKILL.md): every rule of the tutor in one file
- [Contributing](CONTRIBUTING.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
