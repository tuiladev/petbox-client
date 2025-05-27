import { useMatches } from 'react-router-dom'

export default function useBreadcrumbs() {
  // Returns the active route matches
  // Use to load all route for breadcrumbs
  const matches = useMatches()

  const crumbs = matches.flatMap((match) => {
    // Filter only route has breadcrumb properties
    const bc = match.handle?.breadcrumb
    if (!bc) return []

    /**
     * Destructure reposnse from useMatches
     * data - from loader
     * params - from url dynamic part
     * pathname - resolve url
     */
    const { data, params, pathname } = match
    const label = typeof bc === 'function' ? bc({ data, params }) : bc
    return [{ label, href: pathname }]
  })

  return crumbs
}
