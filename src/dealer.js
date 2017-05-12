const Player = require('./player')
const Deck = require('./deck')

class Dealer extends Player {
  constructor() {
    super()
      this.deck = new Deck().createDeck()
    // set dealers bank to infinity
  }
}

module.exports = Dealer
