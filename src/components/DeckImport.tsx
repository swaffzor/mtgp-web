import React, { useState } from 'react'
import Input from './Input'
import TextareaAutosize from 'react-textarea-autosize';
import { CardDTO, CardRequestParam } from '../types';
import { fetchCards } from '../service';

interface Props {
  setDeck: (d: CardDTO[]) => void
  setQuantity: (c: CardQuantity[]) => void
}

export interface CardQuantity extends CardRequestParam {
  quantity: number
  guid: string
}

const DeckImport = ({setDeck, setQuantity}: Props) => {
  const [isHidden, setIsHidden] = useState(true)
  const [text, setText] = useState("")

  const handleButtonClick = () => {
    if (isHidden) {
      setIsHidden(!isHidden)
    } else {
      importDeck()
    }
  }

  const importDeck = async () => {
    const deckCardCounts: CardQuantity[] = []
    const textLines = text.split("\n")
    const promises = textLines.map(line => {
      if (!line.includes("Deck")) {
        const amount = line.match(/[0-9]+ /g)?.join("").trim()
        const cardName = line.match(/ [A-Za-z-,' ]+ /g)?.join("").trim()
        const cardSet = line.match(/\([A-Za-z]+[0-9]*\)/g)?.join("").trim().match(/[A-Za-z0-9]+/g)?.join("").trim()
        const cardBits = line.match(/ [0-9]+/g)?.join("").trim()
        const cardRequest: CardRequestParam = {
          name: cardName,
          set: cardSet,
        }
        deckCardCounts.push({...cardRequest, quantity: Number(amount), guid: new Date().toString()})
        return fetchCards(cardRequest)
      }
    }).filter(p => p)

    const responses = await Promise.all(promises)
    const sanitized = responses.map((arr: CardDTO[]) => {
      return arr.length > 0 ? arr[0] : undefined
    }).filter(c => c) as CardDTO[]
    
    setDeck(sanitized)
    setQuantity(deckCardCounts)
  }

  return (
    <div className="relative m-1">
      <div className={`absolute left-0 ${isHidden && "hidden"}`}>
        <Input
          type="text"
          placeholder="Deck Name"
          classOverrides="border rounded-lg px-1 absolute left-0"
        />
        <TextareaAutosize 
          className="border rounded-lg px-1 absolute left-0 w-80"
          minRows={6}
          onChange={(e) => {setText(e.target.value)}}
        />
        <br />
      </div>
      <button className=" left-0 border rounded-lg mt-24 px-4" onClick={handleButtonClick}>
        Import Deck
      </button>
    </div>
  )
}

export default DeckImport