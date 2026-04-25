import { CardSet } from '../components/cards/CardSet'

export default function CharacterPage() {
    const cards = [
        {nombre: "샨디", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_4.png", rareza: "4"},
        {nombre: "아제나&이난나", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_0.png", rareza: "4"},
        {nombre: "니나브", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_6.png", rareza: "4"},
        {nombre: "카단", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_7.png", rareza: "4"},
        {nombre: "바훈투르", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_1.png", rareza: "4"},
        {nombre: "실리안", imagen: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_1.png", rareza: "4"},
    ]

    return (
        <>
            <div>
                <h1>Character Page</h1>
            </div>
            <CardSet cards={cards} />
            
        </>
    )
}
