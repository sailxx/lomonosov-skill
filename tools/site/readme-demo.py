"""Replaces the example session in README.md with the real recording from evals/session-en.json."""
import json, re, pathlib, textwrap

root = pathlib.Path(__file__).resolve().parents[2]
session = json.loads((root / "evals/session-en.json").read_text(encoding="utf8"))
emoji = re.compile("[\U0001F300-\U0001FAFF☀-➿]")


def tidy(text):
    text = text.replace("\U0001FA99 Total", "Total").replace("\U0001FA99", "coins")
    text = re.sub(r"I couldn't save a progress file here[^\n]*\n?", "", text)
    text = emoji.sub("", text).replace("**", "")
    text = re.sub(r"```(?:python)?\n", "", text).replace("```", "")
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return re.sub(r"[ \t]+\n", "\n", text)


def block(who, text):
    lines = []
    for para in text.split("\n"):
        lines.extend(textwrap.wrap(para, 84) or [""])
    first, *rest = lines
    pad = " " * 9
    return f"{who:<9}{first}\n" + "".join(f"{pad}{l}\n" if l else "\n" for l in rest)


out = ""
for t in session[2:5]:
    out += block("You", t["student"]) + "\n" + block("Prof", tidy(t["tutor"])) + "\n"

readme = root / "README.md"
s = readme.read_text(encoding="utf8")
a = s.index("## See it in action")
b = s.index("No lectures to skim")
new = (
    "## See it in action\n\nA real session recorded with the plugin (shortened, emoji removed):\n\n"
    "```text\n" + out.rstrip() + "\n```\n\n"
)
readme.write_text(s[:a] + new + s[b:], encoding="utf8")
print("readme ok")
