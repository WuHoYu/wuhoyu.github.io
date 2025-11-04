import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const groups = [
  {
    srcDir: path.join(root, 'public', 'photos', 'evolvingscript'),
    outDir: path.join(root, 'public', 'photos', 'evolvingscript', 'tiny'),
    targets: ['es1.jpg','es2-a.png','es2-b.jpg','es3.jpg','es4.jpg','es5.jpg','es7.jpg','es9.jpg']
  },
  {
    srcDir: path.join(root, 'public', 'photos', 'typemethod'),
    outDir: path.join(root, 'public', 'photos', 'typemethod', 'tiny'),
    targets: ['ht1.jpg']
  },
  {
    srcDir: path.join(root, 'public', 'photos', 'lantern'),
    outDir: path.join(root, 'public', 'photos', 'lantern', 'tiny'),
    targets: ['l1.jpg']
  },
  {
    srcDir: path.join(root, 'public', 'photos', 'laihua'),
    outDir: path.join(root, 'public', 'photos', 'laihua', 'tiny'),
    targets: ['laihua.jpeg']
  }
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function makeTiny(baseDir, inputFile, outDir) {
  const inPath = path.join(baseDir, inputFile);
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
  let total = 0;
  for (const g of groups) {
    await ensureDir(g.outDir);
    for (const f of g.targets) {
      try {
        const r = await makeTiny(g.srcDir, f, g.outDir);
        total++;
        console.log(path.relative(root, g.outDir) + ' <-', r.outName);
      } catch (e) {
        console.error('skip', f, 'in', g.srcDir, e.message);
      }
    }
  }
  console.log('Done. Generated', total, 'placeholders across groups');
})();
