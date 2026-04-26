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
    cardEffects: { Name: string; Description: string }[]
    size?: CardSize
}

export function CardSet({ cards, cardEffects, size = 'lg' }: CardSetProps) {
    const { t } = useI18n()
    return (
        <section className="panel">
            <div className="panel-header">
                <h2>{t('cards.title')}</h2>
                <div className={`${styles.effectTooltip} effect-tooltip`}>
                    <span className={styles.effectTrigger}>{t('cards.effect')}</span>
                    <div className={styles.effectContent} role="tooltip">
                        {cardEffects.map((effect) => (
                            <div key={effect.Name} className={styles.effectItem}>
                                <strong>{effect.Name}</strong>
                                <span>{effect.Description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.cardset}>
                {cards.map((card, index) => (
                    <Card key={index} {...card} size={size} />
                ))}
            </div>
        </section>
    )
}
