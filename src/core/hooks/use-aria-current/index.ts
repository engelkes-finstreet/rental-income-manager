import { useRouter } from "next/router"
import { RouteUrlObject } from "blitz"

export function useAriaCurrentPage(route: RouteUrlObject) {
  const router = useRouter()
  const { pathname } = router

  const isCurrentPage = pathname.indexOf(route.pathname) !== -1
  console.log({ currentPath: route.pathname, pathname, isCurrentPage })

  return isCurrentPage ? "page" : undefined
}
