const Card = require('./card')
const _ = require('lodash')
// const col = require('colors')

class Deck {

  constructor() {
    this.deckStack = []
  }

  createDeck() {
    const heart = col.bgWhite(‘❤️ ‘)
    const spade = col.bgWhite('♠️')
    const diamond = col.bgWhite(‘♦️‘)
    const club = col.bgWhite(‘♣️‘)
    const suits = [heart,spade,diamond,club]
    const ranks = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king']
    suits.forEach( (suit) => {
      ranks.forEach( (rank) => {
        this.deckStack.push(new Card(suit, rank))
      })
    })
  }

  shuffleDeck() {
    this.deckStack = _.shuffle(deckStack)
  }
}
