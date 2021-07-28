import React, { useEffect, useState } from 'react'
import Input from './Input'
import TextareaAutosize from 'react-textarea-autosize';
import { CardDTO, CardRequestParam } from '../types';
import { fetchCard, CardFetchError } from '../service';

interface Props {
  setDeck: (d: CardDTO[]) => void
  setNotFound: (v: string[]) => void
}

const DeckImport = ({setDeck, setNotFound}: Props) => {
  const [isHidden, setIsHidden] = useState(true)
  const [text, setText] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [cardsNotFound, setCardsNotFound] = useState<string[]>([])

  useEffect(() => {
    setNotFound(cardsNotFound)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsNotFound])

  const handleButtonClick = async () => {
    if (isHidden) {
      setIsHidden(!isHidden)
    } else {
      setButtonDisabled(true)
      setIsHidden(!isHidden)
      setDeck(await importDeck())
      setButtonDisabled(false)
    }
  }

  const empty = {} as CardDTO
  const importDeck = async () => {
    const textLines = text.split("\n")
    const promises = textLines.map(line => {
        const cardRequest: CardRequestParam = {
          name: parseName(line),
          set: line.match(/\([A-Za-z]+[0-9]*\)/g)?.join("").trim().match(/[A-Za-z0-9]+/g)?.join("").trim(),
          quantity: line.match(/[0-9]+ /g)?.join("").trim(),
        }
        if (!cardRequest.name  && !cardRequest.quantity ) {
          return empty
        } 

        return fetchCard(cardRequest)
          .then(cards => {
            return cards?.find(card => card.imageUrl !== undefined) ?? (
              cards.length > 0 
                ? cards[cards.findIndex(card => card.name)] 
                : empty
              )
          })
          .catch((error: CardFetchError) => {
            error.statusCode === 404 && setCardsNotFound([...cardsNotFound, `${error.cardProps?.quantity} ${error.cardProps?.name} (${error.cardProps?.set})` ?? "unknown card import error"])
            const imagelessCard = {name: error.cardProps?.name, quantity: error.cardProps?.quantity, type: "imageless"} as CardDTO
            return new Promise<CardDTO>((resolve, reject) => resolve(imagelessCard)) 
          })
    })
    const cards = (await Promise.all(promises)).filter(card => card !== empty)
    await replaceImagelessCards(cards)
    return cards
  }

  const parseName = (text: string) => text.match(/ [A-Za-z-,' ]+ /g)?.join("").trim()

  const replaceImagelessCards = async (imagelessCards: CardDTO[]) => {
    const cardsWithoutImages = imagelessCards.filter(card => !card.imageUrl)
    const newReq = cardsWithoutImages.map(card => {
      return (card.type !== "imageless" 
        ? fetchCard({name: card.name, contains: "imageUrl"}) 
        : new Promise<CardDTO[]>((resolve, reject) => resolve([card]))
      )
      .then(res => res.find(findCard => findCard.imageUrl !== "") ?? card)})
    const cardsMostLikelyWithImages = await Promise.all(newReq)
    // eslint-disable-next-line array-callback-return
    cardsMostLikelyWithImages.map((card) => {
      const index = imagelessCards.findIndex(imagelessCard => imagelessCard.name === card.name)
      index >= 0 && index < imagelessCards.length && imagelessCards.splice(index, 1, card)
    })
  }

  return (
    <div className="relative m-1">
      <div className={`w-32 left-0 ${isHidden && "hidden"}`}>
        <Input
          type="text"
          placeholder="Deck Name"
          classOverrides="border rounded-lg px-1 w-32 left-0"
        />
        <TextareaAutosize 
          className="border rounded-lg px-1 left-0 w-80"
          minRows={6}
          onChange={(e) => {setText(e.target.value)}}
        />
        <br />
      </div>
      <div className="border rounded-lg px-4 w-32">
        <button
          className={`${buttonDisabled && "text-gray-400"}`}
          onClick={handleButtonClick} 
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Loading..." : "Import Deck"}
        </button>
      </div>
    </div>
  )
}

export default DeckImport