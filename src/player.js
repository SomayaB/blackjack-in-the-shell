const Deck = require('./deck')
const Game = require('./game')

class Player {
  // how to make hand = Array of two cards
  constructor() {
    this.hand = []
    this.bank = 100
    this.bet = null
    this.handTotal = null
    this.hasWon = false
  }
  aceCase(hand) {
    if (this.handTotal > 21){
      for (let i = 0; i < hand.length; i++) {
        if (this.hand[i].rank = 'ace') {
            this.hand[i].point = 1
        }
      }
    }
  }

  trackHandValue(hand) {
    let total = 0
    for (let i = 0; i < hand.length; i++) {
      // console.log('our hand', this.hand)
      total += this.hand[i].point

    }
    this.handTotal = total
  }

  hit(deck) {
    this.hand.push(deck.deckStack.shift())
    console.log(this.hand)
  }
}

module.exports = Player
