'use strict'

export class Card {
  constructor (image) {
    this.img = image
    this.matched = false
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
