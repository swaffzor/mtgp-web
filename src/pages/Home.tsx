import React, { useEffect, useState } from 'react'
import CardShelf from '../components/CardShelf'
import Deck from '../components/Deck'
import DeckImport from '../components/DeckImport'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { cardSearch } from '../service'
import { CardDTO, DeckDTO } from '../types'
import { calculateProbability } from '../utils'

const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<CardDTO[]>([])
  const [myDeck, setMyDeck] = useState<DeckDTO>({name: "", cards: []})
  const [savedDecks, setSavedDecks] = useState<DeckDTO[]>([])
  const [myHand, setMyHand] = useState<CardDTO[]>([])
  const [notFound, setNotFound] = useState<string[]>([])
  const [displayHand, setDisplayHand] = useState(false)

  useEffect(() => {
    const savedCards = localStorage.getItem("my-decks")
    savedCards && setSavedDecks(JSON.parse(savedCards))
  }, [])

  const searchCards = async (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === "enter") {
      const response = await cardSearch(searchText)
      setSearchResults(response)
    }
  }

  const saveCards = () => {
    myDeck.cards.forEach(card => card.isSaved = true)
    localStorage.setItem("my-decks", JSON.stringify([...savedDecks, myDeck]))
  }

  const drawCard = (card: CardDTO) => {
    card.quantity = card?.quantity && card?.quantity - 1
    calculateProbability(myDeck.cards);
    if ((card.quantity??0) > 0) {
      setMyDeck({...myDeck})
    } else {
      setMyDeck({name: myDeck.name, cards:[...myDeck.cards].filter(deckCard => deckCard.name !== card.name)})
    }
    setMyHand([...myHand, card])
  }

  const removeCardFromDeck = (card: CardDTO, deck: CardDTO[], setDeckFn: (deck: CardDTO[])=>void) => {
    const tempDeck = [...deck]
    const index = tempDeck.findIndex(deckCard => deckCard.name === card.name)
    tempDeck.splice(index, 1)
    setDeckFn(tempDeck)
  }

  return (
    <div className="mx-1 ">
      <h1>
        Magic Stats Gathering  
      </h1>

      <NavBar setShowHand={() => setDisplayHand(!displayHand)}/>

      {savedDecks && 
        <div className="flex justify-center gap-4">
          {(savedDecks.map(deck => <Deck
            title={deck.name}
            cards={deck.cards}
            key={deck.name}
            onClick={() => setMyDeck(deck)}
          />))}
        </div>
      }
      

      <DeckImport
        setDeck={setMyDeck}
        setNotFound={(cardNames: string[]) => setNotFound([...notFound, ...cardNames])}
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
          shelfType="image"
          onCardClick={(card) => {
            const temp = myDeck.cards || []
            temp.push(card)
            setMyDeck({name: myDeck.name, cards: temp})
          }}
      />)}

      {notFound.length > 0 && 
        (<div>
          <h1>Not Found</h1>
          {notFound.map(card =>
            <div key={`notfound-${card}`}>
              {card}
            </div>
          )}
        </div>)
      }

      {displayHand && (<CardShelf
        id="hand"
        title="In Hand"
        cards={myHand}
        shelfType="image"
        onCardClick={(card) => removeCardFromDeck(card, myHand, setMyHand)}
      />)}

      <CardShelf
        id="my-deck"
        title="My Deck"
        cards={myDeck.cards}
        shelfType="image"
        button={{text: "Save", onClick: saveCards}}
        onCardClick={drawCard}
      />

    </div>
  )
}

export default Home