
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
    
    // Dealer Gameplay
    while (dealerSum < 16) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }
    console.log('dealer sum:', dealerSum)
    console.log('dealer ace count:', dealerAceCount)

    // Player Gameplay
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        playerSum += getValue(card)
        playerAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
    }
    console.log('player sum:', playerSum)
    console.log('player ace count:', playerAceCount)

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
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
    if (card[0] == "A"){  // == looks at the first character of card, probably === wouldnt work?
        return 1;
    }else {
        return 0;
    }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0){
        playerSum -=10
        playerAceCount -=1;
        console.log("Ace Value Reduced to '1', Current Value is:", playerSum)
    }
    return playerSum;
}

function hit(){
    if (!canHit){
        return;
    }else{
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"
        playerSum += getValue(card)
        playerAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);

        console.log('hit me! - new value:', playerSum)

        if (reduceAce(playerSum, playerAceCount) > 21 ){
            canHit = false
        }
    }
   
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "You Lose! YOU'RE A LOSER!!! YOUR MOTHER NEVER LOVED YOU!"
    }else if (dealerSum > 21){
        message = "You Win!!!"
    }else if (playerSum == dealerSum ){
        message = "You Tie..."
    }else if (playerSum > dealerSum) {
        message = "You Win!!!"
    }else if (playerSum < dealerSum){
        message = "You Lose! YOU'RE A LOSER!!! YOUR MOTHER NEVER LOVED YOU!"
    }else if (playerSum && dealerSum > 21){
        message = "You Lose! YOU'RE A LOSER!!! YOUR MOTHER NEVER LOVED YOU!"
    }
    document.getElementById("results").innerText = message;
}