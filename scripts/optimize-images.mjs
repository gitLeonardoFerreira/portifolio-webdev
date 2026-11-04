import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
for (const file of await readdir('public/portraits')) {
  if (!file.endsWith('.png')) continue
  const source = `public/portraits/${file}`
  const destination = source.replace('.png', '.webp')
  await sharp(source)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(destination)
  console.log(
    `${file}: ${Math.round((await stat(source)).size / 1024)} KiB → ${Math.round((await stat(destination)).size / 1024)} KiB`,
  )
}
