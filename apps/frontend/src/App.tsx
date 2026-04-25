import { lazy, Suspense } from "react"
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router"
import type { ReactNode } from "react"
import { Header } from './components/Header'
import { I18nProvider } from './i18n/I18nProvider'
import { defaultLocale, isLocale } from './i18n/config'
import {
  getLocalizedPath,
  getLocalizedSegment,
  getRouteAliases,
  getRouteParamNames,
  type RouteKey,
  type RouteParams,
} from "./i18n/routes"

const Home = lazy(() => import('./pages/HomePage.tsx'))
const Character = lazy(() => import('./pages/CharacterPage.tsx'))

const localizedPageRoutes = [
  { route: 'character', element: <Character /> },
] as const satisfies ReadonlyArray<{ route: Exclude<RouteKey, 'home'>; element: ReactNode }>

function LocaleGate() {
  const { locale } = useParams()

  if (!isLocale(locale)) {
    return <Navigate to={`/${defaultLocale}`} replace />
  }

  return (
    <I18nProvider>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Outlet />
      </Suspense>
    </I18nProvider>
  )
}

function LocalizedPageRoute({
  route,
  children,
}: {
  route: Exclude<RouteKey, 'home'>
  children: ReactNode
}) {
  const params = useParams()
  const locale = params.locale
  const location = useLocation()

  if (!isLocale(locale)) {
    return <Navigate to={`/${defaultLocale}`} replace />
  }

  const currentSegment = location.pathname.split('/').filter(Boolean)[1]
  const expectedSegment = getLocalizedSegment(locale, route)

  if (currentSegment !== expectedSegment) {
    const routeParams = Object.fromEntries(
      getRouteParamNames(route).map((paramName) => [paramName, params[paramName]]),
    )

    return (
      <Navigate
        to={getLocalizedPath(locale, route, routeParams as RouteParams<Exclude<RouteKey, 'home'>>)}
        replace
      />
    )
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />
      <Route path="/:locale" element={<LocaleGate />}>
        <Route index element={<Home />} />
        {localizedPageRoutes.map(({ route, element }) =>
          getRouteAliases(route).map((path) => (
            <Route
              key={`${route}-${path}`}
              path={path}
              element={
                <LocalizedPageRoute route={route}>
                  {element}
                </LocalizedPageRoute>
              }
            />
          ))
        )}
      </Route>
      <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
    </Routes>
  )
}

export default App
