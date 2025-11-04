import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const src = path.join(root, 'public', 'icons', 'logoblack.png');
const outDir = path.join(root, 'public', 'icons');

const targets = [
  { out: 'favicon-16.png', size: 16 },
  { out: 'favicon-32.png', size: 32 },
  { out: 'apple-touch-icon.png', size: 180 },
];

async function ensure(file) {
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });
}

async function makeSquareContain(input, outPath, size) {
  const img = sharp(input).resize({
    width: size,
    height: size,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  await img.png({ compressionLevel: 9 }).toFile(outPath);
}

(async () => {
  try {
    await Promise.all(
      targets.map(async ({ out, size }) => {
        const outPath = path.join(outDir, out);
        await ensure(outPath);
        await makeSquareContain(src, outPath, size);
        console.log('Wrote', path.relative(root, outPath));
      })
    );
    console.log('Done generating square favicons');
  } catch (e) {
    console.error('Failed to generate favicons:', e);
    process.exit(1);
  }
})();
