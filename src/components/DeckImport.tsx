import React, { useEffect, useState } from 'react'
import Input from './Input'
import TextareaAutosize from 'react-textarea-autosize';
import { CardDTO, CardRequestParam } from '../types';
import { fetchCard, CardFetchError, cardSearch } from '../service';

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

  const importDeck = async () => {
    const textLines = text.split("\n")
    const promises = textLines.map(line => {
        const cardRequest: CardRequestParam = {
          name: line.match(/ [A-Za-z-,' ]+ /g)?.join("").trim(),
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
            return new Promise<CardDTO>((resolve, reject) => resolve(empty)) 
          })
    })

    const responses = (await Promise.all(promises))
    .map((arr: CardDTO[]) => {
      return arr?.find(card => card.imageUrl) ?? (arr.length > 0 ? arr[arr.findIndex(card => card.name)] : undefined)
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