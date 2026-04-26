import { CardSet } from '../components/cards/CardSet'
import { useI18n } from '../i18n/I18nProvider'

export default function CharacterPage() {
    const { t } = useI18n();
    const cards = [
        { nombre: "샨디", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_4.png", rareza: "4", awakeningCount: 2, awakeningTotal: 5 },
        { nombre: "아제나&이난나", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_0.png", rareza: "4", awakeningCount: 3, awakeningTotal: 5 },
        { nombre: "니나브", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_6.png", rareza: "4", awakeningCount: 0, awakeningTotal: 5 },
        { nombre: "카단", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_7.png", rareza: "4", awakeningCount: 4, awakeningTotal: 5 },
        { nombre: "바훈투르", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_1.png", rareza: "4", awakeningCount: 1, awakeningTotal: 5 },
        { nombre: "실리안", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_1.png", rareza: "4", awakeningCount: 5, awakeningTotal: 5 },
    ]
    const cardEffects = [
        { "Name": "세상을 구하는 빛 2세트", "Description": "암속성 피해 감소 +10.00%" },
        { "Name": "세상을 구하는 빛 4세트", "Description": "암속성 피해 감소 +10.00%" },
        { "Name": "세상을 구하는 빛 6세트", "Description": "암속성 피해 감소 +10.00%" },
        { "Name": "세상을 구하는 빛 6세트 (12각성합계)", "Description": "공격 속성을 성속성으로 변환" },
        { "Name": "세상을 구하는 빛 6세트 (18각성합계)", "Description": "성속성 피해 +7.00%" },
        { "Name": "세상을 구하는 빛 6세트 (24각성합계)", "Description": "성속성 피해 +4.00%" },
        { "Name": "세상을 구하는 빛 6세트 (30각성합계)", "Description": "성속성 피해 +4.00%" }
    ]

    return (
        <>
            <div>
                <h1>{t('character.title')}</h1>                
            </div>
            <CardSet cards={cards} cardEffects={cardEffects} size='lg' />
            <CardSet cards={cards} cardEffects={cardEffects} size='md' />
            <CardSet cards={cards} cardEffects={cardEffects} size='sm' />
            <CardSet cards={cards} cardEffects={cardEffects} size='xs' />

        </>
    )
}
