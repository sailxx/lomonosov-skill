# Contributing

Thanks for helping. The whole product is one file: [`SKILL.md`](plugins/lomonosov-skill/skills/teach/SKILL.md).

## Ideas that help most

- Real conversations where the tutor gave away the answer or lost its tone (open an issue with the transcript).
- Better hints for a specific subject.
- Translations of the tutor's fixed phrases.

## Pull requests

1. Fork, branch, change `SKILL.md` or docs.
2. Check the plugin: `claude plugin validate .`
3. Try it in a live session and run the scenarios in [evals](evals/README.md). Describe what you tested.
4. README banners are generated, do not edit the SVG by hand: `cd tools/readme && npm install && node build.mjs`

By contributing you agree your work is licensed under Apache 2.0.
