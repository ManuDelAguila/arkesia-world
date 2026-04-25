import { Card } from './Card'
import styles from './CardSet.module.css';

export function CardSet({cards}: {cards: any[]}) {
    return (
        <div className={styles.cardset}>
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    )
}
