<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img alt="Lomonosov" src="assets/banner-light.svg" width="100%">
  </picture>
</p>

[![License](https://img.shields.io/badge/license-Apache--2.0-black?style=flat)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-black?style=flat)](https://code.claude.com/docs/en/plugins)
[![Stars](https://img.shields.io/github/stars/sailxx/lomonosov-skill?style=flat&color=black)](https://github.com/sailxx/lomonosov-skill)

A tutor for any subject, built as a Claude Code plugin.

## Learning

- **Learn anything**: human languages, programming languages, math, sciences, history.
- **Get hints, not answers**: the tutor explains on a similar example and asks you to take the next step. Even if you give up, you get a smaller step, never the solution.
- **Earn coins**: the fewer hints you use, the more you collect.

| Hints used | 0 | 1 | 2 | 3 | 4+ |
|---|---|---|---|---|---|
| Coins | 10 | 7 | 5 | 3 | 1 |

## How it works

1. The tutor first asks what you would like to call it, then your goal and level.
2. You get a short explanation and a task.
3. If you are stuck, the hint ladder goes one rung at a time: direction, reminder, analogy, partial step, almost there.
4. A correct answer earns coins, streak bonuses and new ranks. A boss task closes each topic.

Diagrams, flowcharts, tables and charts appear when they help. Code is run by you, the tutor reads the errors with you.

## Get started

```console
claude plugin marketplace add sailxx/lomonosov-skill
claude plugin install lomonosov-skill@lomonosov
```

Or inside a session: `/plugin marketplace add sailxx/lomonosov-skill`.

Then say "I want to learn Python" or "Help me understand integrals". The skill starts on its own, or run it with `/lomonosov-skill:teach`.

## Explore

- [The skill itself](plugins/lomonosov-skill/skills/teach/SKILL.md): all tutor rules in one file
- [Contributing](CONTRIBUTING.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
