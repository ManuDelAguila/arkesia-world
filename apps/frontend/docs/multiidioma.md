# Multiidioma

## Objetivo

El frontend usa multiidioma con el idioma en la URL para que cada idioma tenga su propia ruta indexable.

Ejemplos:

- `/es`
- `/en`
- `/es/personaje/DraGooner`
- `/en/character/DraGooner`

Esto permite:

- URLs diferenciadas por idioma
- enlaces internos coherentes
- posibilidad de SEO por idioma
- canonización automática cuando una URL mezcla idioma y slug

## Archivos implicados

La base del sistema está en estos archivos:

- [App.tsx](/d:/Proyectos/arkesia-world/apps/frontend/src/App.tsx:1)
- [config.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/config.ts:1)
- [messages.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/messages.ts:1)
- [routes.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/routes.ts:1)
- [I18nProvider.tsx](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/I18nProvider.tsx:1)

## Cómo funciona

### 1. Idiomas soportados

Se definen en [config.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/config.ts:1):

```ts
export const supportedLocales = ['es', 'en'] as const;
export const defaultLocale: Locale = 'es';
```

`defaultLocale` es el idioma al que redirige `/`.

### 2. Textos traducidos

Se definen en [messages.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/messages.ts:1).

Ejemplo:

```ts
export const messages = {
    es: {
        header: {
            home: 'Inicio',
        },
    },
    en: {
        header: {
            home: 'Home',
        },
    },
} as const;
```

Los componentes acceden a esos textos usando `useI18n()`:

```tsx
const { t } = useI18n();

<h1>{t('home.title')}</h1>
```

### 3. Slugs localizados de las rutas

Se definen en [routes.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/routes.ts:1).

Ejemplo actual:

```ts
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
} as const;
```

Esto significa:

- la home no tiene slug después del idioma
- `character` usa `personaje` en español
- `character` usa `character` en inglés

### 4. Router

El router está en [App.tsx](/d:/Proyectos/arkesia-world/apps/frontend/src/App.tsx:1).

Hace estas tareas:

- redirige `/` a `/${defaultLocale}`
- valida que `:locale` sea un idioma soportado
- genera rutas localizadas a partir de la configuración
- corrige URLs no canónicas

Ejemplo de URL no canónica:

- `/es/character/DraGooner`

Se redirige automáticamente a:

- `/es/personaje/DraGooner`

### 5. Contexto i18n

[I18nProvider.tsx](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/I18nProvider.tsx:1) expone:

- `locale`
- `t(key)`
- `getPath(route, params)`
- `switchLocalePath(nextLocale)`

Ejemplo:

```tsx
const { getPath } = useI18n();

<Link to={getPath('character', { characterName: 'DraGooner' })}>
```

## Uso diario

### Mostrar un texto localizado

1. Añade el texto en `messages.ts` para todos los idiomas.
2. Añade la key al tipo `MessageKey`.
3. Usa `useI18n()` en el componente.

Ejemplo:

```ts
es: {
    profile: {
        title: 'Perfil',
    },
},
en: {
    profile: {
        title: 'Profile',
    },
},
```

Y en `MessageKey`:

```ts
| 'profile.title'
```

Y en el componente:

```tsx
const { t } = useI18n();

<h2>{t('profile.title')}</h2>
```

### Generar enlaces localizados

No hardcodees rutas como `"/en/character/..."` o `"/es/personaje/..."`.

Usa siempre `getPath()`:

```tsx
const { getPath } = useI18n();

getPath('home')
getPath('character', { characterName: 'DraGooner' })
```

Esto evita errores cuando cambie un slug o se añada otro idioma.

## Cómo añadir una nueva página localizada

La idea es que una nueva página se añada con el mínimo trabajo posible.

### Paso 1. Crear la página

Crea el componente, por ejemplo:

- `apps/frontend/src/pages/GuildPage.tsx`

### Paso 2. Registrar los textos

En [messages.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/messages.ts:1), añade los textos necesarios.

Ejemplo:

```ts
es: {
    guild: {
        title: 'Hermandad',
    },
},
en: {
    guild: {
        title: 'Guild',
    },
},
```

Y añade la key:

```ts
| 'guild.title'
```

### Paso 3. Añadir el nuevo `RouteKey`

En [routes.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/routes.ts:1):

1. Añade la key al tipo `RouteKey`
2. Añade los params si la ruta los necesita
3. Añade la definición localizada

#### Ejemplo sin parámetros

```ts
export type RouteKey = 'home' | 'character' | 'guild';

type RouteParamsMap = {
    home: Record<string, never>;
    character: {
        characterName: string;
    };
    guild: Record<string, never>;
};
```

Y en `localizedRouteDefinitions`:

```ts
guild: {
    key: 'guild',
    segments: {
        es: 'hermandad',
        en: 'guild',
    },
    paramNames: [],
},
```

#### Ejemplo con parámetros

Si la página es `/es/gremio/:guildId` y `/en/guild/:guildId`:

```ts
export type RouteKey = 'home' | 'character' | 'guild';

type RouteParamsMap = {
    home: Record<string, never>;
    character: {
        characterName: string;
    };
    guild: {
        guildId: string;
    };
};
```

Y:

```ts
guild: {
    key: 'guild',
    segments: {
        es: 'gremio',
        en: 'guild',
    },
    paramNames: ['guildId'],
},
```

### Paso 4. Registrar la página en `App.tsx`

Importa la página y añade una línea en `localizedPageRoutes`.

Ejemplo:

```tsx
const Guild = lazy(() => import('./pages/GuildPage.tsx'))

const localizedPageRoutes = [
  { route: 'character', element: <Character /> },
  { route: 'guild', element: <Guild /> },
] as const
```

Con eso:

- se generan automáticamente sus aliases por idioma
- se valida la URL
- se redirige a la versión canónica si el slug no coincide con el idioma

### Paso 5. Usar la página

Para enlazar:

```tsx
const { getPath } = useI18n();

getPath('guild')
```

o con params:

```tsx
getPath('guild', { guildId: '42' })
```

## Cómo añadir un nuevo texto localizado

### Caso típico

Quieres mostrar un subtítulo nuevo.

1. Añádelo en `messages.es`
2. Añádelo en `messages.en`
3. Añade la key a `MessageKey`
4. Usa `t('...')`

Ejemplo:

```ts
es: {
    character: {
        subtitle: 'Progreso del personaje',
    },
},
en: {
    character: {
        subtitle: 'Character progression',
    },
},
```

Y en `MessageKey`:

```ts
| 'character.subtitle'
```

Y en la página:

```tsx
const { t } = useI18n();

<p>{t('character.subtitle')}</p>
```

### Recomendaciones

- usa keys semánticas: `character.subtitle`
- evita usar el texto literal como key
- mantén la misma estructura en todos los idiomas
- no dejes una key en un idioma y faltante en otro

## Cómo añadir un nuevo idioma

Ejemplo: añadir francés (`fr`).

### Paso 1. Añadir el locale soportado

En [config.ts](/d:/Proyectos/arkesia-world/apps/frontend/src/i18n/config.ts:1):

```ts
export const supportedLocales = ['es', 'en', 'fr'] as const;
```

### Paso 2. Añadir los textos en `messages.ts`

Añade el bloque `fr`:

```ts
fr: {
    header: {
        siteTitle: 'Arkesia World',
        home: 'Accueil',
        character: 'Personnage',
        languageLabel: 'Langue',
        spanish: 'ES',
        english: 'EN',
    },
    common: {
        loading: 'Chargement...',
    },
    home: {
        title: 'Page d’accueil',
    },
    character: {
        title: 'Page du personnage',
    },
},
```

### Paso 3. Añadir los slugs del idioma en `routes.ts`

Para cada ruta localizada, añade el slug francés.

Ejemplo:

```ts
character: {
    key: 'character',
    segments: {
        es: 'personaje',
        en: 'character',
        fr: 'personnage',
    },
    paramNames: ['characterName'],
},
```

### Paso 4. Añadir el selector visual

Si quieres mostrar el idioma en el header:

1. añade los textos en `messages.ts`
2. añade el link en [Header.tsx](/d:/Proyectos/arkesia-world/apps/frontend/src/components/Header.tsx:1)

Ejemplo:

```tsx
<NavLink
    to={switchLocalePath('fr')}
    className={locale === 'fr' ? 'nav-link-active' : ''}
>
    FR
</NavLink>
```

### Paso 5. Validar enlaces

Prueba:

- `/fr`
- `/fr/personnage/DraGooner`
- cambio de idioma desde el selector
- enlaces generados con `getPath()`

## Qué hace el sistema automáticamente

Si la configuración está bien definida, el sistema ya se encarga de:

- detectar el idioma actual
- cambiar `document.documentElement.lang`
- construir URLs localizadas
- cambiar de idioma manteniendo la página actual
- redirigir URLs mezcladas a la versión correcta

Ejemplo:

- `/en/personaje/DraGooner` redirige a `/en/character/DraGooner`
- `/es/character/DraGooner` redirige a `/es/personaje/DraGooner`

## Buenas prácticas

- usa siempre `getPath()` para enlazar
- no hardcodees slugs localizados en componentes
- registra todos los textos en `messages.ts`
- mantén una key por texto y la misma estructura entre idiomas
- añade primero la definición de la ruta en `routes.ts` y después la página en `App.tsx`
- si una página lleva params, define esos params en `RouteParamsMap`

## Errores comunes

### Hardcodear rutas

Evita:

```tsx
<Link to="/en/character/DraGooner" />
```

Mejor:

```tsx
<Link to={getPath('character', { characterName: 'DraGooner' })} />
```

### Añadir textos sin actualizar `MessageKey`

Si añades un texto nuevo en `messages.ts`, añade también su key en `MessageKey`.

### Añadir una ruta nueva sin registrar sus params

Si una página tiene params y no los añades a `RouteParamsMap`, `getPath()` no quedará bien tipado.

## Checklist rápido

### Nueva página localizada

1. Crear la página
2. Añadir textos en `messages.ts`
3. Añadir `RouteKey`
4. Añadir `RouteParamsMap`
5. Añadir la definición en `localizedRouteDefinitions`
6. Añadir una línea en `localizedPageRoutes`
7. Enlazar usando `getPath()`

### Nuevo texto

1. Añadirlo en todos los idiomas
2. Añadir la key en `MessageKey`
3. Usar `t('...')`

### Nuevo idioma

1. Añadirlo en `supportedLocales`
2. Añadir sus mensajes
3. Añadir sus slugs en cada ruta
4. Añadirlo al selector si aplica
5. Probar rutas y cambio de idioma
