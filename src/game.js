const Player = require('./player')
const Dealer = require('./dealer')
const Deck = require('./deck')
const diag = require('readline-sync')


class Game {
  constructor() {
    this.player = new Player()
    this.dealer = new Dealer()
    this.deck = new Deck()
  }

  startGame( bankAmount ) {
    if(bankAmount) {
      this.player.bank = bankAmount
    }
    console.log('\n', 'Welcome to BlackJack, fool!', '\n')
    console.log(' You have ' + '$' + this.player.bank + ' to blow!')

    if(this.player.bank === 0){
      console.log('You\'re out of money, you fool!')
    }
    this.player.bet = diag.question(' Place your bet if you dare: $')

    while(isNaN(this.player.bet)) {
      this.player.bet = diag.question('Invalid, please enter a number: $' )
    }
    while (this.player.bet > this.player.bank) {
      this.player.bet = diag.question('You don\'t have enough money to make that bet, you fool! Try again: $')
    }
    while (this.player.bet == 0) {
      this.player.bet = diag.question('You can\'t bet $0, you fool! Try again: $')
    }
    console.log('\n','Here we go(mario voice)!')
    console.log('\n')
    this.deck.createDeck()
    this.initialDeal()
  }

  initialDeal() {
    this.dealer.hand.push(this.deck.deckStack.shift())
    this.dealer.hand.push(this.deck.deckStack.shift())
    this.dealer.trackHandValue(this.dealer.hand)
    console.log('Dealer\'s hand: ')
    console.log('Hidden card','\n', this.dealer.hand[0].rank, this.dealer.hand[0].suit)
    console.log('\n')
    this.player.hand.push(this.deck.deckStack.shift())
    this.player.hand.push(this.deck.deckStack.shift())
    this.player.trackHandValue(this.player.hand)
    console.log('Player\'s hand: ')
    for (let i = 0; i < this.player.hand.length; i++) {
      console.log(this.player.hand[i].rank, this.player.hand[i].suit )
    }
    console.log('\n')
    this.playerTurn()
  }

  playerTurn() {
    this.checkBust()
    let hitOrStand = diag.question('Hit or Stand? (h/s): ')
    console.log('\n')

    while (hitOrStand !== 'h' && hitOrStand !== 's') {
      hitOrStand = diag.question('Invalid, please input h or s: ')
    }
    if (hitOrStand == 'h') {
       this.player.hit(this.deck)
       this.player.trackHandValue(this.player.hand)

       console.log('Player\'s hand: ')
       for (let i = 0; i < this.player.hand.length; i++) {
         console.log(this.player.hand[i].rank, this.player.hand[i].suit)
       }
       console.log('\n')
       this.playerTurn()
    } else if (hitOrStand == 's') {
        this.dealerTurn()
      }
  }

  dealerTurn() {
    this.checkBust()
    console.log('Dealer\'s Turn ')
    console.log('\n')
    console.log('Dealer\'s hand: ')

    while ( this.dealer.handTotal < this.player.handTotal ) {
      this.dealer.hit(this.deck)
      this.dealer.trackHandValue(this.dealer.hand)
      this.checkBust()
      this.checkBlackJack()
    }
    if (this.dealer.handTotal == this.player.handTotal) {
      for (let i = 0; i < this.dealer.hand.length; i++) {
        console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
    }
      console.log('\n')
      console.log('It\'s a tie!')
      this.endGame()
    } else {
       for (let i = 0; i < this.dealer.hand.length; i++) {
         console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
       }
       console.log('\n')
       console.log('You lost, you fool! Dealer wins!')
       this.dealer.hasWon = true
       this.endGame()
     }
   }

  checkBust() {
    this.dealer.aceCase(this.dealer.hand)
    this.player.aceCase(this.player.hand)

    if (this.dealer.handTotal > 21) {
      this.player.hasWon = true
      for (let i = 0; i < this.dealer.hand.length; i++) {
        console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
      }
      console.log('\n')
      console.log('Dealer busted, you win! Who knew you could do it?')
      this.endGame()
    } else if (this.player.handTotal > 21) {
        this.dealer.hasWon = true
        console.log('Dealer\'s Turn ')
        console.log('\n')
        console.log('Dealer\'s hand: ')
        for (let i = 0; i < this.dealer.hand.length; i++) {
          console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
        }
        console.log('\n')
        console.log('You busted, you fool! Dealer wins!')
        this.endGame()
      }
  }

  checkBlackJack() {
    if (this.dealer.handTotal === 21 && this.player.handTotal === 21) {
      console.log('\n')
      console.log('Its a BlackJack tie!')
      this.endGame()
    } else if (this.dealer.handTotal === 21) {
        console.log('\n')
        console.log('Dealer\'s Turn ')
        console.log('\n')
        console.log('Dealer\'s hand: ')
        for (let i = 0; i < this.dealer.hand.length; i++) {
          console.log(this.dealer.hand[i].rank, this.dealer.hand[i].suit )
        }
          console.log('Dealer has blackjack, you lose!')
          this.dealer.hasWon = true
          this.endGame()
    } else if (this.player.handTotal === 21) {
        this.player.hasWon = true
        this.endGame()
      }
  }



  endGame() {
    if (this.player.hasWon) {
      let moneyWon = this.player.bet * 2
      this.player.bank += moneyWon
      console.log('\n')
      console.log('Woohoo, you won $' + moneyWon + '! You now have $' + this.player.bank + ' in your bank!')

      console.log('\n')
      let keepPlaying = diag.question('Do you dare to keep playing, you fool? (y/n): ')

      if (keepPlaying == 'y') {
        const nextGame = new Game()
        console.log('\n')
        nextGame.startGame( this.player.bank )
      } else if (keepPlaying == 'n') {
        console.log('\n')
        console.log('I understand, this game is not for the weak of hearts!')
        process.exit()
      }

    } else if (this.dealer.hasWon) {
        this.player.bank -= this.player.bet
        console.log('\n')
        console.log('Womp Womp you lost $' + this.player.bet + ', you now have $' + this.player.bank + ' in your bank!')
        console.log('\n')

        if (this.player.bank > 0) {
        let keepPlaying = diag.question('Do you dare to keep playing, you fool? (y/n): ')

          if (keepPlaying == 'y') {
          const nextGame = new Game()
            console.log('\n')
            nextGame.startGame( this.player.bank )
          } else if (keepPlaying == 'n') {
            console.log('\n')
            console.log('I understand, this game is not for the faint of heart!')
            console.log('\n');
            process.exit()
          }
        } else {
            console.log('You\'re out of money, you fool! Better luck next time!')
            console.log('\n');
            process.exit()
          }
      }
  }
}


const myGame = new Game()
myGame.startGame()
