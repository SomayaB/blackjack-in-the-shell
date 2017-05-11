const Player = require('./player')
const Dealer = require('./dealer')
const Deck = require('./deck')
const diag = require('readline-sync')


class Game {
  constructor() {
    this.player = new Player()
    this.dealer = new Dealer()
    this.deck = new Deck()
    this.MAX_SCORE = 21
  }

  initialDeal() {
    this.dealer.hand.push(this.deck.deckStack.shift())
    this.dealer.hand.push(this.deck.deckStack.shift())
    this.dealer.trackHandValue(this.dealer.hand)
    this.player.hand.push(this.deck.deckStack.shift())
    this.player.hand.push(this.deck.deckStack.shift())
    this.player.trackHandValue(this.player.hand)
    console.log('dealers hand: ');
    for (let i = 0; i < this.dealer.hand.length; i++) {
      console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
    }
    // console.log('player hand: ', this.player.hand)
    this.playerTurn()
  }

  playerTurn() {
    let hitStand = diag.question('Hit or Stand? (h/s): ')
    if (hitStand !== 'h' && hitStand !== 's') {
      console.log('Invalid, please input h or s')
    } else if (hitStand == 'h') {
      console.log('before: ', this.deck.deckStack.length)
       this.player.hit(this.deck)
       console.log('after: ', this.deck.deckStack.length)
    } else if (hitStand == 's') {
        console.log('Dealers turn')
        console.log(dealer.hand)
        dealerTurn()
    }
  }

  dealerTurn() {
   while ( this.dealer.handTotal > this.player.handTotal ) {
     if (this.dealer.handTotal === 21) {
       console.log('Dealer wins :(')
     } else if (this.dealer.handTotal < 21 && dealer.handTotal > 16) {
        this.dealer.hit()
        checkBust()
     }
   }
  }

  checkBust() {
    aceCase(this.dealer.hand)
    aceCase(this.player.hand)
    if (this.dealer.handTotal > 21) {
      this.player.hasWon = true
      console.log('Dealer busted, you win!!')
      endGame()
    } else if (this.player.handTotal > 21) {
      this.dealer.hasWon = true
      console.log('You busted, you fool! Dealer wins!')
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

  startGame() {
    console.log('Welcome to BlackJack, fool!')
    console.log('You have ' + '$' + this.player.bank + ' to blow!')
    this.player.bet = diag.question('Place your bet if you dare: $')
    // display do you want to play (y/n) and wait for input
    console.log('Here we go(mario voice)!')
    this.deck.createDeck()
    // console.log('our deck!',this.deck.deckStack)
    this.initialDeal()

    // display and wait for player (h/s) input
    // if hit run game.playerHit() and run checkBusT()
    // if stays run game.dealerTurn()
    //
  }

  endGame() {
    if (this.player.hasWon) {
      moneyWon = this.player.bet * 2
      this.player.bank += moneyWon
      console.log('Woohoo, you won ' + moneyWon + ' you now have $' + this.player.bank + ' in your bank!')
    } else if (this.dealer.hasWon) {
        this.player.bank -= this.player.bet
        console.log('Womp Womp, you lost $' + this.player.bet + ' you now have $' + this.player.bank + ' in your bank!')
    }
  }

}


const myGame = new Game()
myGame.startGame()

module.exports = myGame
