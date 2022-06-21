const Suits = ["Spade", "Clover", "Heart", "Diamond"]
const Values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

class Deck {
    constructor(cards){
        this.cards = cards
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