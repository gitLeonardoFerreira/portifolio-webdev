import { spawn } from 'node:child_process'
import { mkdir, readFile } from 'node:fs/promises'
const url = process.argv[2] || 'http://127.0.0.1:4174/'
const label = process.argv[3] || 'mobile-local'
if (!/^[a-z0-9-]+$/.test(label)) throw new Error('Use um nome de relatório simples.')
let server
if (!process.argv[2]) {
  server = spawn(
    process.execPath,
    ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4174'],
    { stdio: 'ignore' },
  )
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      if ((await fetch(url)).ok) break
    } catch {
      /* wait for local preview */
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}
try {
  await mkdir('docs/evidence', { recursive: true })
  const report = `docs/evidence/lighthouse-${label}`
  const code = await new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [
        'node_modules/lighthouse/cli/index.js',
        url,
        '--chrome-flags=--headless --no-sandbox',
        '--output=json',
        '--output=html',
        `--output-path=${report}`,
        '--quiet',
      ],
      { stdio: 'inherit' },
    )
    child.on('exit', resolve)
  })
  if (code !== 0) throw new Error('Lighthouse não concluiu.')
  const data = JSON.parse(await readFile(`${report}.report.json`, 'utf8'))
  const performance = Math.round(data.categories.performance.score * 100)
  console.log(
    JSON.stringify(
      {
        url: data.finalDisplayedUrl,
        performance,
        accessibility: Math.round(data.categories.accessibility.score * 100),
        bestPractices: Math.round(data.categories['best-practices'].score * 100),
        seo: Math.round(data.categories.seo.score * 100),
        cls: data.audits['cumulative-layout-shift'].numericValue,
        lcp: data.audits['largest-contentful-paint'].numericValue,
      },
      null,
      2,
    ),
  )
  if (performance < 80) process.exitCode = 1
} finally {
  server?.kill()
}
