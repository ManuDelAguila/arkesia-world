import { Card, type CardSize } from './Card'
import styles from './CardSet.module.css';

type CardItem = {
    nombre: string;
    imagen: string;
    rareza: string;
    awakeningCount: number;
    awakeningTotal: number;
};

type CardSetProps = {
    cards: CardItem[];
    size?: CardSize;
};

export function CardSet({ cards, size = 'lg' }: CardSetProps) {
    return (
        <section className="panel">
            <h2 className="text-title">Cartas</h2>
            <div className={styles.cardset}>
                {cards.map((card, index) => (
                    <Card key={index} {...card} size={size} />
                ))}
            </div>
        </section>
    );
}
