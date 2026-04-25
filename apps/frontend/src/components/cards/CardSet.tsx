import { Card, type CardSize } from './Card'
import styles from './CardSet.module.css'
import { useI18n } from "../../i18n/I18nProvider"

type CardItem = {
    nombre: string
    imagen: string
    rareza: string
    awakeningCount: number
    awakeningTotal: number
}

type CardSetProps = {
    cards: CardItem[]
    size?: CardSize
}

export function CardSet({ cards, size = 'lg' }: CardSetProps) {
    const { t } = useI18n()
    return (
        <section className="panel">
            <h2 className="text-title">{t('cards.title')}</h2>
            <div className={styles.cardset}>
                {cards.map((card, index) => (
                    <Card key={index} {...card} size={size} />
                ))}
            </div>
        </section>
    )
}
