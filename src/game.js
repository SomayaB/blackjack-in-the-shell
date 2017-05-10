const Player = require('./player')
const Dealer = require('./dealer')
const Deck = require('./deck')
const diag = require('readline-sync')


class Game {
  constructor() {
    this.player = new Player()
    this.dealer = new Dealer()
  }

  newGame() {
    console.log('Are you ready to play?')
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
    } else if (hitStay == 's') {
        console.log('Dealers turn')
        console.log(dealer.hand)
        dealerTurn()
    }
  }

  dealerTurn() {
   while ( dealer.handTotal > player.handTotal ) {
     if (dealer.handTotal === 21) {
       console.log('Dealer wins :(')
     } else if (dealer.handTotal < 21 && dealer.handTotal > 16) {
        this.dealer.hit()
        checkBust()
     }
   }
  }

  checkBust() {
    if (dealer.handTotal > 21) {
      console.log('Dealer busted, you win!!')
      this.player.hasWon = true
      endGame()
    } else if (player.handTotal > 21) {
      console.log('You busted, you fool! Dealer wins!')
      this.dealer.hasWon = true
      endGame()
    }
  }

  checkBlackJack() {
    if (dealer.handTotal === 21 && player.handTotal === 21) {
      console.log('Its a tie!')
      endGame()
    } else if (dealer.handTotal === 21) {
        console.log('Dealer has blackjack, you lose!')
        this.dealer.hasWon = true
        endGame()
    } else if (player.handTotal === 21) {
      console.log('Blackjack! You win!')
      this.player.hasWon = true
      endGame()
    }
  }

  endGame() {
    if (this.player.hasWon) {
      moneyWon = bet * 2
      this.player.bank += moneyWon
      console.log('Woohoo, you won ' + moneyWon + ' you now have $' + this.player.bank + ' in your bank!')
    } else if (this.dealer.hasWon) {
        this.player.bank -= bet
        console.log('Womp Womp, you lost $' + bet + ' you now have $' + this.player.bank + ' in your bank!')
    }
  }

}

const myGame = new Game()
myGame.newGame()
