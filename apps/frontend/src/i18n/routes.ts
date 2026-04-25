import type { Locale } from './config'

export type RouteKey = 'home' | 'character'

type RouteParamsMap = {
    home: Record<string, never>
    character: {
        characterName: string
    }
}

type LocalizedRouteDefinition<K extends RouteKey = RouteKey> = {
    key: K
    segments: Record<Locale, string>
    paramNames: Array<keyof RouteParamsMap[K]>
}

const localizedRouteDefinitions = {
    home: {
        key: 'home',
        segments: {
            es: '',
            en: '',
        },
        paramNames: [],
    },
    character: {
        key: 'character',
        segments: {
            es: 'personaje',
            en: 'character',
        },
        paramNames: ['characterName'],
    },
} as const satisfies { [K in RouteKey]: LocalizedRouteDefinition<K> }

export type RouteParams<K extends RouteKey> = RouteParamsMap[K]

export function getLocalizedSegment(locale: Locale, route: RouteKey) {
    return localizedRouteDefinitions[route].segments[locale]
}

export function resolveRouteKeyFromSegment(segment: string | undefined): RouteKey | null {
    if (!segment) {
        return 'home'
    }

    const routeEntries = Object.entries(localizedRouteDefinitions) as Array<
        [RouteKey, LocalizedRouteDefinition]
    >

    for (const [routeKey, routeDefinition] of routeEntries) {
        if (Object.values(routeDefinition.segments).includes(segment)) {
            return routeKey
        }
    }

    return null
}

export function getLocalizedPath<K extends RouteKey>(
    locale: Locale,
    route: K,
    params?: RouteParams<K>,
) {
    if (route === 'home') {
        return `/${locale}`
    }

    const routeDefinition = localizedRouteDefinitions[route]
    const localizedSegment = routeDefinition.segments[locale]
    const pathSegments: string[] = [locale, localizedSegment]

    for (const paramName of routeDefinition.paramNames) {
        const paramValue = params?.[paramName]
        pathSegments.push(paramValue ?? '')
    }

    return `/${pathSegments.join('/')}`
}

export function getRouteAliases(route: RouteKey) {
    const routeDefinition = localizedRouteDefinitions[route]
    const localizedSegments = Object.values(routeDefinition.segments).filter(Boolean)

    return localizedSegments.map((segment) => {
        const paramSuffix = routeDefinition.paramNames
            .map((paramName) => `/:${String(paramName)}`)
            .join('')

        return `${segment}${paramSuffix}`
    })
}

export function getRouteParamNames<K extends RouteKey>(route: K) {
    return localizedRouteDefinitions[route].paramNames
}
