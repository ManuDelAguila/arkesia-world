import styles from './CardAwakening.module.css'

type CardAwakeningProps = {
    current: number
    max: number
}

const ACTIVE_GEM_SRC = '/cartas/gem-on.webp'
const INACTIVE_GEM_SRC = '/cartas/gem-off.webp'

export function CardAwakening({ current, max }: CardAwakeningProps) {
    const safeMax = Math.max(0, max)
    const safeCurrent = Math.min(Math.max(0, current), safeMax)

    if (safeMax === 0) {
        return null
    }

    return (
        <div className={styles.awakening} aria-label={`Despertada ${safeCurrent} de ${safeMax}`}>
            {Array.from({ length: safeMax }, (_, index) => {
                const isActive = index < safeCurrent

                return (
                    <img
                        key={index}
                        className={styles.gem}
                        src={isActive ? ACTIVE_GEM_SRC : INACTIVE_GEM_SRC}
                        alt=""
                        aria-hidden="true"
                    />
                )
            })}
        </div>
    )
}
