import React, { useEffect, useState } from 'react'
import CardShelf from '../components/CardShelf'
import DeckImport from '../components/DeckImport'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { cardSearch } from '../service'
import { CardDTO } from '../types'
import { calculateProbability, parseBy } from '../utils'


const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<CardDTO[]>([])
  const [myDeck, setMyDeck] = useState<CardDTO[]>([])
  const [notFound, setNotFound] = useState<string[]>([])

  useEffect(() => {
    const savedCards = localStorage.getItem("my-deck")
    savedCards && setMyDeck(JSON.parse(savedCards))
  }, [])

  const searchCards = async (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === "enter") {
      const response = await cardSearch(searchText)
      setSearchResults(response)
    }
  }

  const saveCards = () => {
    myDeck.forEach(card => card.isSaved = true)
    localStorage.setItem("my-deck", JSON.stringify(myDeck))
  }

  const drawCard = (card: CardDTO) => {
    card.quantity = card?.quantity && card?.quantity - 1
    const tempDeck = [...myDeck]
    const index = tempDeck.findIndex(deckCard => deckCard.name === card.name)
    tempDeck.splice(index, 1, card)
    setMyDeck(tempDeck)
  }

  useEffect(() => {
    calculateProbability(myDeck)
  }, [myDeck])

  return (
    <div>
      <h1>
        Magic Stats Gathering  
      </h1>

      <NavBar/>

      <DeckImport
        setDeck={setMyDeck}
        setNotFound={(cardNames: string[]) => {
          const temp = cardNames.map(c => {
            return {
              quantity: parseBy("quantity", c)
            }
          })
          setNotFound([...notFound, ...cardNames])
        }}
      />

      <Input
        placeholder="search" 
        type="text"
        classOverrides="absolute left-1 w-1/4 border rounded-md my-2 pl-1" 
        onChange={(text) => {setSearchText(text.target.value)}}
        onKeyPress={async (e) => {await searchCards(e)}}
      />

      {searchText && (
      <CardShelf
        id="search-results"
        title="Search Results"
        cards={searchResults}
        onCardClick={(card) => setMyDeck([...myDeck, card])}
      />)}

      {notFound.length > 0 && 
        (<div>
          <h1>Not Found</h1>
          {notFound.map(c =>
            <div key={`notfound-${c}`}>
              {c}
            </div>
          )}
        </div>)
      }

      <CardShelf
        id="my-deck"
        title="My Deck"
        cards={myDeck}
        button={{text: "Save", onClick: saveCards}}
        onCardClick={drawCard}
      />

    </div>
  )
}

export default Home