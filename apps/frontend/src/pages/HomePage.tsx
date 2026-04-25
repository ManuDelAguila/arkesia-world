import { useI18n } from "../i18n/I18nProvider"

export default function HomePage() {
    const { t } = useI18n();

    return (
        <div>
            <h1>{t('home.title')}</h1>
        </div>
    )
}
