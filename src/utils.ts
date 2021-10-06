import { CardDTO } from "./types"

export const parseBy = (key: string, text: string) => {
  let regEx = RegExp("")
  switch (key) {
    case "name":
      regEx = / [A-Za-z-,' ]+ /g
      break;
    case "quantity":
      regEx = /[0-9]+ /g
      break;
    default:
      break;
  }
  return text.match(regEx)?.join("").trim()
}

export const calculateProbability = (deck: CardDTO[]) => {
  const deckTotal = deck.map(card => card.quantity).reduce((prev, curr) => {
    return (prev ?? 0) + (curr ?? 0)
  }, 0)

  return deck.map(card => {
    card.drawProbability = card?.quantity && (card?.quantity / (deckTotal ?? deck.length) * 100)
    return card
  })
}