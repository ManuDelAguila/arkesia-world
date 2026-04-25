export const supportedLocales = ['es', 'en'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'es'

export function isLocale(value: string | undefined): value is Locale {
    return Boolean(value && supportedLocales.includes(value as Locale))
}
