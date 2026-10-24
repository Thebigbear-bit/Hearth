// Tests for moving the stacked Glass cards clear of the app row (liftToClear in src/lib/clock.ts).   Run: npm test
import {build} from 'esbuild';
const out = new URL('../node_modules/.cache-clocklift-test.mjs', import.meta.url).pathname;
await build({entryPoints: [new URL('../src/lib/clock.ts', import.meta.url).pathname], bundle: true, format: 'esm', outfile: out, platform: 'node', logLevel: 'error'});
const c = await import(out);
let fail = 0;
const eq = (a, b, m) => { const ok = JSON.stringify(a) === JSON.stringify(b); if (!ok) { fail++; console.log('FAIL', m, JSON.stringify(a), '!=', JSON.stringify(b)); } else console.log('ok  ', m); };
eq(c.liftToClear(300, 800, 840, 28, 36), 0, 'fits above the app row: not moved');
eq(c.liftToClear(300, 812, 840, 28, 36), 0, 'exactly the gap above: not moved');
eq(c.liftToClear(300, 1070, 840, 28, 36), 258, 'overlapping: moved up just enough to leave the gap');
eq(c.liftToClear(100, 1070, 840, 28, 36), 64, 'never moved above the top margin, even if it still overlaps');
eq(c.liftToClear(30, 1070, 840, 28, 36), 0, 'already above the top margin: not moved at all');
process.exit(fail ? 1 : 0);
