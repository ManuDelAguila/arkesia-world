import { CardAwakening } from './CardAwakening';
import styles from './Card.module.css';

type CardProps = {
    nombre: string;
    imagen: string;
    rareza: string;
    awakeningCount: number;
    awakeningTotal: number;
};

export function Card({
    nombre,
    imagen,
    rareza,
    awakeningCount,
    awakeningTotal,
}: CardProps) {
    return (
        <div className={styles.card} aria-label={nombre}>
            <img className={styles.cardImage} src={imagen} alt={nombre} />
            <img className={styles.overlayImage} src={`/cartas/marco_carta_${rareza}.png`} alt={rareza} />
            <CardAwakening current={awakeningCount} max={awakeningTotal} />
        </div>
    );
}
