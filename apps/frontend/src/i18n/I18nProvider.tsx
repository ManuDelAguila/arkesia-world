import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router'
import { defaultLocale, isLocale, type Locale } from './config'
import { messages, type MessageKey } from './messages'
import {
    getLocalizedPath,
    getRouteParamNames,
    type RouteParams,
    resolveRouteKeyFromSegment,
    type RouteKey,
} from './routes'

type I18nContextValue = {
    locale: Locale
    t: (key: MessageKey) => string
    getPath: <K extends RouteKey>(route: K, params?: RouteParams<K>) => string
    switchLocalePath: (nextLocale: Locale) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function resolveMessage(locale: Locale, key: MessageKey) {
    const parts = key.split('.')
    let current: unknown = messages[locale]

    for (const part of parts) {
        if (!current || typeof current !== 'object' || !(part in current)) {
            return key
        }

        current = (current as Record<string, unknown>)[part]
    }

    return typeof current === 'string' ? current : key
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const params = useParams()
    const location = useLocation()
    const locale = isLocale(params.locale) ? params.locale : defaultLocale

    useEffect(() => {
        document.documentElement.lang = locale
    }, [locale])

    const value = useMemo<I18nContextValue>(() => {
        return {
            locale,
            t: (key) => resolveMessage(locale, key),
            getPath: (route, routeParams) => getLocalizedPath(locale, route, routeParams),
            switchLocalePath: (nextLocale) => {
                const pathSegments = location.pathname.split('/').filter(Boolean)
                const currentSegment = pathSegments[1]
                const route = resolveRouteKeyFromSegment(currentSegment)

                if (!route) {
                    return getLocalizedPath(nextLocale, 'home')
                }

                if (route === 'home') {
                    return getLocalizedPath(nextLocale, 'home')
                }

                const routeParams = Object.fromEntries(
                    getRouteParamNames(route).map((paramName, index) => [
                        paramName,
                        pathSegments[index + 2] ?? '',
                    ]),
                )

                return getLocalizedPath(nextLocale, route, routeParams as RouteParams<typeof route>)
            },
        }
    }, [locale, location.pathname])

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
    const context = useContext(I18nContext)

    if (!context) {
        throw new Error('useI18n must be used within I18nProvider')
    }

    return context
}
