import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchRepositories } from '../services/github.js'
import { fetchFeatured } from '../services/settings.js'
export const repositoriesKey = ['github', 'repositories']
export function useProjects() {
  const repositories = useQuery({
    queryKey: repositoriesKey,
    queryFn: fetchRepositories,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  })
  const settings = useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeatured,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  })
  const featured = useMemo(() => {
    if (!repositories.data) return []
    if (Array.isArray(settings.data))
      return settings.data
        .map((slug) => repositories.data.find((item) => item.slug === slug))
        .filter(Boolean)
        .slice(0, 3)
    return [...repositories.data]
      .sort((a, b) => Number(Boolean(b.decisions)) - Number(Boolean(a.decisions)))
      .slice(0, 3)
  }, [repositories.data, settings.data])
  return { ...repositories, featured, settingsError: settings.error }
}
