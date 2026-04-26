import type { Locale } from './config'

export const messages = {
    es: {
        header: {
            siteTitle: 'Arkesia World',
            home: 'Inicio',
            character: 'Personaje',
            languageLabel: 'Idioma',
            spanish: 'ES',
            english: 'EN',
        },
        common: {
            loading: 'Cargando...',
        },
        home: {
            title: 'Página de inicio',
        },
        character: {
            title: 'Página de personaje',
        },
        cards: {
            title: 'Cartas',
            effect: 'Efectos',
        },
    },
    en: {
        header: {
            siteTitle: 'Arkesia World',
            home: 'Home',
            character: 'Character',
            languageLabel: 'Language',
            spanish: 'ES',
            english: 'EN',
        },
        common: {
            loading: 'Loading...',
        },
        home: {
            title: 'Home page',
        },
        character: {
            title: 'Character page',
        },
        cards: {
            title: 'Cards',
            effect: 'Effects',
        },
    },
} as const satisfies Record<Locale, Record<string, unknown>>

export type MessageKey =
    | 'header.siteTitle'
    | 'header.home'
    | 'header.character'
    | 'header.languageLabel'
    | 'header.spanish'
    | 'header.english'
    | 'common.loading'
    | 'home.title'
    | 'character.title'
    | 'cards.title'
    | 'cards.effect'
