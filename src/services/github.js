import { projects as editorial } from '../data/projects.js'
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'gitLeonardoFerreira'
export async function fetchRepositories({ signal } = {}) {
  const repositories = []
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?per_page=100&sort=updated&page=${page}`,
      { signal, headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        const reset = response.headers.get('x-ratelimit-reset')
        const time = reset ? new Date(Number(reset) * 1000).toLocaleTimeString('pt-BR') : null
        throw new Error(
          `O limite de consultas do GitHub foi atingido.${time ? ` Tente novamente após ${time}.` : ' Aguarde alguns minutos e tente novamente.'}`,
        )
      }
      throw new Error(
        response.status === 404
          ? 'O perfil do GitHub não foi encontrado.'
          : 'Não foi possível consultar o GitHub. Verifique sua conexão e tente novamente.',
      )
    }
    const data = await response.json()
    if (!Array.isArray(data)) throw new Error('O GitHub retornou uma resposta inesperada.')
    repositories.push(...data.filter((repo) => !repo.fork && !repo.archived))
    if (data.length < 100) break
  }
  return repositories.map((repo, index) => {
    const story = editorial.find(
      (project) => project.slug.toLowerCase() === repo.name.toLowerCase(),
    )
    return {
      ...story,
      id: repo.id,
      slug: repo.name,
      title: story?.title || repo.name.replaceAll('-', ' '),
      description:
        repo.description ||
        story?.description ||
        'Repositório público. Explore o código e a documentação no GitHub.',
      summary:
        repo.description ||
        story?.summary ||
        'Uma ideia em desenvolvimento. Conheça o código no repositório.',
      number: String(index + 1).padStart(2, '0'),
      eyebrow: story?.eyebrow || 'REPOSITÓRIO PÚBLICO',
      color: story?.color || 'blue',
      tags: story?.tags || (repo.language ? [repo.language] : ['Código']),
      language: repo.language,
      updatedAt: repo.updated_at,
      repository: repo.html_url,
      status: story?.status || 'Código público',
      problem:
        story?.problem ||
        'Os objetivos e o contexto deste projeto estão documentados no repositório.',
      solution:
        story?.solution ||
        'Consulte o README e os arquivos de código para acompanhar a implementação.',
      learning:
        story?.learning ||
        'Este repositório faz parte da minha trajetória de aprendizado. O histórico de commits registra sua evolução.',
      note:
        story?.note ||
        'Informações de linguagem e atualização consultadas pela API pública do GitHub.',
    }
  })
}
