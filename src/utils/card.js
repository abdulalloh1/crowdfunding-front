import {HUMOCARD, UZCARD} from "../constants/cards";

export function identifyCardIcon(cardNumber) {
    if (!cardNumber) return
    let cardType = cardNumber.substring(4, 0)
    if (cardType === UZCARD) {
        return '/img/icons/debit-cards/uzcard.svg'
    } else if (cardType === HUMOCARD) {
        return '/img/icons/debit-cards/humo.png'
    }
}