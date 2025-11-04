import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const srcDir = path.join(root, 'public', 'photos', 'evolvingscript');
const outDir = path.join(srcDir, 'tiny');

const targets = [
  'es1.jpg',
  'es2-a.png',
  'es2-b.jpg',
  'es3.jpg',
  'es4.jpg',
  'es5.jpg',
  'es7.jpg',
  'es9.jpg'
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function makeTiny(inputFile) {
  const inPath = path.join(srcDir, inputFile);
  const ext = path.extname(inputFile).toLowerCase();
  const base = path.basename(inputFile, ext);
  const outName = `${base}-tiny.jpg`;
  const outPath = path.join(outDir, outName);

  const buf = await fs.readFile(inPath);
  // Create very small JPEG with gentle blur to reduce blocking artifacts
  const tiny = await sharp(buf)
    .resize({ width: 32, withoutEnlargement: true })
    .jpeg({ quality: 35, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(outPath, tiny);
  return { inputFile, outName };
}

(async () => {
  await ensureDir(outDir);
  const results = [];
  for (const f of targets) {
    try {
      const r = await makeTiny(f);
      results.push(r);
      console.log('tiny ->', r.outName);
    } catch (e) {
      console.error('skip', f, e.message);
    }
  }
  console.log('Done. Generated', results.length, 'placeholders in', path.relative(root, outDir));
})();
