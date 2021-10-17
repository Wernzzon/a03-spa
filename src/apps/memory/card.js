'use strict'

export class Card {
  constructor (image) {
    this.img = image
    this.matched = false
    this.flipped = false
  }

  flip () {
    this.flipped = true
  }

  isMatched () {
    return this.matched
  }

  matched () {
    this.matched = true
  }

  getImg () {
    return this.img
  }
}
