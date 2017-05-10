const Player = require('./player')
const Dealer = require('./dealer')
const Deck = require('./deck')


class Game {
  constructor() {
    this.player = new Player()
    this.dealer = new Dealer()
  }
  initialDeal() {
    this.dealer.hand.push(deckStack(shift()))
    this.dealer.hand.push(deckStack(shift()))
    this.dealer.trackHandValue(dealer.hand)
    this.player.hand.push(deckStack(shift()))
    this.player.hand.push(deckStack(shift()))
    this.player.trackHandValue(player.hand)

    console.log(this.dealer.hand)
    console.log(this.player.hand)
  }
  playerHit() {
    hitStay = diag.question('Hit or Stand? (h/s): ')
    if (hitStay !== 'h' && hitStay !== 's') {
      console.log('Invalid, please input h or s')
    } else if (hitStay == 'h') {
       this.player.hit()
    } else(hitStay == 's') {
        console.log('Dealers turn')
        //dealerTurn()
    }
  dealerTurn() {
   (while player.handTotal < dealer.handTotal) {
     this.dealer.hit()
   }
  }
  // check if anyone has twenty 21 console>log woho you won
  // check current player has busted
  // stop the game & update bank status results
}
