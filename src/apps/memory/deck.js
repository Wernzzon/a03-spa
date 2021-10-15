'use strict'

// Imports
import Card from './card'

export class Deck {
  constructor (numberOfCards) {
    this.numberOfCards = numberOfCards
    this.deckOfCards = []
  }

  makeTheDeck (filenames) {
    for (let i = 0; i < this.numberOfCards; i++) {
      this.deckOfCards.push(new Card(filenames[i]))
    }
  }

  shuffle () {
    return [...this.numberOfCards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)]
  }
}
