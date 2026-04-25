import { CardAwakening } from './CardAwakening';
import styles from './Card.module.css';

export type CardSize = 'sm' | 'md' | 'lg';

const sizeClassNames: Record<CardSize, string> = {
    sm: styles.cardSm,
    md: styles.cardMd,
    lg: styles.cardLg,
};

type CardProps = {
    nombre: string;
    imagen: string;
    rareza: string;
    awakeningCount: number;
    awakeningTotal: number;
    size?: CardSize;
};

export function Card({
    nombre,
    imagen,
    rareza,
    awakeningCount,
    awakeningTotal,
    size = 'lg',
}: CardProps) {
    return (
        <div className={`${styles.card} ${sizeClassNames[size]}`} aria-label={nombre}>
            <div className={styles.cardInner}>
                <img className={styles.cardImage} src={imagen} alt={nombre} />
                <img className={styles.overlayImage} src={`/cartas/marco_carta_${rareza}.png`} alt={rareza} />
                <CardAwakening current={awakeningCount} max={awakeningTotal} />
            </div>
        </div>
    );
}
