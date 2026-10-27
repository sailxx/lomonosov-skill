// README banner: black card, gold coins, Golos Text + JetBrains Mono (subset per language).
// Run: cd tools/readme && npm install && node build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit } from './kit.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(DIR, '../../assets');

const K = createKit({
  golos: path.join(DIR, '.font/golos.ttf'),
  mono: path.join(DIR, '.font/jbmono.ttf'),
  accent: { hi: '#E8B64A', grad: ['#F3CD73', '#D9962B'], on: '#1A1203', glow: '#E8B64A', glowOpacity: 0.12, glow2: '#FFFFFF', btn: ['#F3CD73', '#D9962B'] },
});
const { A, P, T, lines, wrap, fitText, delay, svg } = K;

const STR = {
  en: { alt: 'lomonosov-skill: a tutor that never gives the answer', title: 'Lomonosov', tag: 'A tutor that guides you\nto the answer *yourself*', steps: ['Direction', 'Reminder', 'Analogy', 'Partial step', 'Almost there'], coins: 'COINS FOR A SOLVED TASK' },
};
const VALUES = [10, 7, 5, 3, 1];

const banner = (s) => svg(1000, 300, s.alt, (() => {
  let b = `<g class="r">${fitText(48, 128, s.title, 400, { size: 64, weight: 800, spacing: -1.5 })}</g>`;
  b += `<g class="r" ${delay(1)}>${lines(48, 178, wrap(s.tag, 400, 22, 500), { size: 22, weight: 500, lh: 32, fill: P.muted })}</g>`;
  b += `<text class="m" x="48" y="252" font-size="12" font-weight="600" letter-spacing="1.2" fill="${P.dim}">${T('lomonosov-skill')}</text>`;
  // hint ladder: five steps rising to the left, coin value on each
  const x0 = 490, step = 94, base = 238;
  s.steps.forEach((name, i) => {
    const h = 170 - i * 20;
    const x = x0 + i * step;
    b += `<g class="r" ${delay(i + 2)}><rect x="${x}" y="${base - h}" width="${step - 10}" height="${h}" rx="6" fill="#141414" stroke="#2E2E2E"/>`;
    b += `<circle cx="${x + (step - 10) / 2}" cy="${base - h + 26}" r="15" fill="${A.hi}"/>`;
    b += `<text class="m" x="${x + (step - 10) / 2}" y="${base - h + 31}" text-anchor="middle" font-size="14" font-weight="700" fill="${A.on}">${T(String(VALUES[i]))}</text>`;
    b += fitText(x + (step - 10) / 2, base - 12, name, step - 22, { size: 10.5, weight: 500, fill: P.muted, anchor: 'middle' }) + '</g>';
  });
  b += `<text class="m" x="${x0}" y="270" font-size="11" font-weight="600" letter-spacing="1.2" fill="${P.dim}">${T(s.coins)}</text>`;
  return b;
})());

await K.build(OUT, {
  en: () => ({ 'banner.svg': banner(STR.en) }),
});
