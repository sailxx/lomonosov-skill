// Animated README banner: the coin logo pops in, then "Lomonosov" appears letter by letter.
// Text is converted to paths, so the SVG needs no fonts. Dark and light variants for <picture>.
// Run: cd tools/readme && npm install && node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(DIR, '../../assets');
const NAME = 'Lomonosov';
const W = 1000, H = 260, SIZE = 104, LOGO = 112, GAP = 28, CYCLE = 8;
const GOLD = '#E8B64A', COIN_INK = '#1A1203';

const font = fontkit.openSync(path.join(DIR, '.font/golos.ttf')).getVariation({ wght: 800 });
const scale = SIZE / font.unitsPerEm;
const run = font.layout(NAME);
const track = -0.02 * SIZE;

let pen = 0;
const glyphs = run.glyphs.map((g, i) => {
  const x = pen;
  pen += run.positions[i].xAdvance * scale + track;
  return { x, d: g.path.toSVG() };
});
const textW = pen - track;
const startX = (W - (LOGO + GAP + textW)) / 2;
const textX = startX + LOGO + GAP;
const baseline = H / 2 + (font.capHeight * scale) / 2;

// coin with a three-step staircase (the hint ladder)
const coin = (cx, cy, r) => {
  const s = r * 0.27, x0 = cx - 1.5 * s, yb = cy + 1.75 * s;
  const step = (i) => `<rect x="${(x0 + i * s).toFixed(1)}" y="${(yb - (i + 1) * s * 1.1).toFixed(1)}" width="${s.toFixed(1)}" height="${((i + 1) * s * 1.1).toFixed(1)}" rx="${(s * 0.12).toFixed(1)}"/>`;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GOLD}"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.84).toFixed(1)}" fill="none" stroke="${COIN_INK}" stroke-opacity=".28" stroke-width="2"/><g fill="${COIN_INK}">${step(0)}${step(1)}${step(2)}</g>`;
};

const make = (ink) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Lomonosov">
<style>
.logo{transform-box:fill-box;transform-origin:center;animation:pop ${CYCLE}s linear infinite}
.l{animation:rise ${CYCLE}s linear infinite;opacity:0}
@keyframes pop{0%{transform:scale(0) rotate(-40deg);opacity:0;animation-timing-function:cubic-bezier(.3,1.5,.5,1)}9%{transform:none;opacity:1}90%{transform:none;opacity:1}96%,100%{transform:scale(.6);opacity:0}}
@keyframes rise{0%{transform:translateY(34px);opacity:0;animation-timing-function:cubic-bezier(.2,.9,.3,1)}8%{transform:none;opacity:1}90%{transform:none;opacity:1}96%,100%{transform:translateY(-14px);opacity:0}}
@media (prefers-reduced-motion:reduce){.logo,.l{animation:none;opacity:1}}
</style>
<g class="logo">${coin(startX + LOGO / 2, H / 2, LOGO / 2)}</g>
<g fill="${ink}">
${glyphs.map((g, i) => `<g transform="translate(${(textX + g.x).toFixed(1)} ${baseline.toFixed(1)})"><g class="l" style="animation-delay:${(0.35 + i * 0.06).toFixed(2)}s"><path transform="scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})" d="${g.d}"/></g></g>`).join('')}
</g>
</svg>
`;

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));
fs.writeFileSync(path.join(OUT, 'banner-dark.svg'), make('#FFFFFF'));
fs.writeFileSync(path.join(OUT, 'banner-light.svg'), make('#111111'));
console.log('ok', (textW | 0) + 'px text');
