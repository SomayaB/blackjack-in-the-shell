class Card {
  constructor(rank, suit){
    this.rank = rank
    this.suit = suit
    this.point = null
  }

  assignPoint( rank ) {
    if (this.rank === 'ace') {
          this.point === 11
    } else if (isNaN(this.rank)) {
       this.point = 10
    } else
        this.rank === this.point
  }
}

module.exports = Card
