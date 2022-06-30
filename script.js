
let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;
let deck;

let canHit = true; //player can draw while sum < 21

window.onload = newDeck();
window.onload = shuffleDeck();
window.onload = startGame();

function newDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let suits = ["C", "D", "H", "S"]
    deck = [];

    for (let i=0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + suits[i]);
        }
    }
    // console.log(deck)
    }

function shuffleDeck(){
    // deck.sort((a,b) => Math.random() - 0.5)

    for (let i=0; i<deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];  //**Need to understand how this line works** Swapping the i index for randomized j index is occuring, but how specifically does it work?
        deck[j] = temp;
    }
    console.log('shuffled deck:', deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden)
    // console.log(hidden)
    // console.log(dealerSum)
    while (dealerSum < 16) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }
    console.log('dealer sum:', dealerSum)
}

function getValue(card){
    let cardData = card.split("-"); //Provides array with values left & right of the dash
    let cardValue = cardData[0] // selects the value left of the dash, array position [0]

    if (isNaN(cardValue)){
        if (cardValue === "A"){
            return 11;
        }else{
            return 10;
        }
    }else{ 
        return parseInt(cardValue)
    }
}

function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }else {
        return 0;
    }
}