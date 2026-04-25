import { Link, NavLink } from "react-router"
import { useI18n } from "../i18n/I18nProvider"

export function Header() {
    const { locale, t, getPath, switchLocalePath } = useI18n()

    return (
        <header>
            <Link to={getPath('home')}>
                <h1>{t('header.siteTitle')}</h1>
            </Link>

            <nav>
                <NavLink to={getPath('home')} end
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}>{t('header.home')}</NavLink>
                <NavLink to={getPath('character', { characterName: 'DraGooner' })}
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}>{t('header.character')}</NavLink>
            </nav>

            <div className="language-switcher" aria-label={t('header.languageLabel')}>
                <NavLink
                    to={switchLocalePath('es')}
                    className={locale === 'es' ? 'nav-link-active' : ''}
                >
                    {t('header.spanish')}
                </NavLink>
                <NavLink
                    to={switchLocalePath('en')}
                    className={locale === 'en' ? 'nav-link-active' : ''}
                >
                    {t('header.english')}
                </NavLink>
            </div>
        </header>

    )
}
