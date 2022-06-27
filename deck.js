const Suits = ["Spade", "Clover", "Heart", "Diamond"]
const Values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
    constructor(cards = newDeck()){
        this.cards = cards
    }

    get numberOfCards(){
        this.cards.length
    }

    shuffle(){
      for (let i = this.numberOfCards - 1; i > 0; i--){
        const newPosition = Math.floor(Math.random() * (i + 1))
        const oldPosition = this.cards[newPosition]
        this.cards[newPosition] = this.card[i]
        this.card[i] = oldPosition
      }  
    }
}

class Card {
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }
}

function newDeck() {
    return Suits.flatMap(suit => {
        return Values.map(value => {
            return new Card(suit, value)
        })
    })
}