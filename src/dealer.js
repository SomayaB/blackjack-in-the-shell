const Player = require('./player')

class Dealer extends Player {
  constructor() {
    this.deck = new Deck().createDeck()
    // set dealers bank to infinity
  }
}

module.exports = Dealer 
