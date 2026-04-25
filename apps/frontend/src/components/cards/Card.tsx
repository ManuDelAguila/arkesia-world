import styles from './Card.module.css';

export function Card({ nombre, imagen, rareza }: { nombre: string, imagen: string, rareza: string }) {
    //, awakeningCount: number, awakeningTotal: number, rarety: string
    return (
        <div className={styles.card} aria-label={nombre}>
            <img src={imagen} alt={nombre} />
            <img className={styles.overlayImage} src={`/cartas/marco_carta_${rareza}.png`} alt={rareza} />
        </div>
    )
}
