const Deck = require('./deck')

class Player {
  // how to make hand = Array of two cards
  constructor() {
    this.hand = []
    this.bank = 100
    this.handTotal = 0
    this.hasWon = false 
  }
  trackHandValue(hand) {
    let total = 0
    for (let i = 0; i < hand.length; i++) {
      total += hand[i].point
    }
    this.handTotal += total
  }
  hit() {
    this.hand.push(deckStack(shift()))
    console.log(this.hand)

  }
}

module.exports = Player
