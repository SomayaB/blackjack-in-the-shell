const Deck = require('./deck')


class Player {

  constructor() {
    this.hand = []
    this.bank = 100
    this.bet = null
    this.handTotal = null
    this.hasWon = false
  }
  aceCase(hand) {
    if (this.handTotal > 21) {
      for (let i = 0; i < hand.length; i++) {
        if (this.hand[i].rank == 'Ace') {
            this.handTotal -= 10
        }
      }
    }
  }

  trackHandValue(hand) {
    let total = 0
    for (let i = 0; i < hand.length; i++) {
      total += parseInt(this.hand[i].point)
    }
    this.handTotal = total
  }

  hit(deck) {
    this.hand.push(deck.deckStack.shift())
  }
}


module.exports = Player
