'use strict'

// Imports
import { Card } from './card'

/**
 * Class for a deck of cards
 */
export class Deck {
  /**
   * Sets the number of cards in the deck, and initializes an empty array as the deck.
   *
   * @param {number} numberOfCards The number of cards in the deck
   */
  constructor (numberOfCards) {
    this.numberOfCards = numberOfCards
    this.deckOfCards = []
  }

  /**
   * Creates all Cards and pushes them to an array.
   *
   * @param {Array} filenames Filenames of the images to put onto the Cards
   * @param {string} backsideOfCard The image to be on the backside of the card
   */
  makeTheDeck (filenames, backsideOfCard) {
    for (let i = 0; i < this.numberOfCards; i++) {
      this.deckOfCards.push(new Card(filenames[i], backsideOfCard))
    }
  }

  /**
   * Shuffles the deck of cards.
   *
   * @returns {Array} Shuffled deck
   */
  shuffle () {
    return [...this.deckOfCards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)]
  }

  /**
   * Initialize the deck and shuffles it.
   *
   * @param {Array} filenames Filenames of images for the cards
   * @param {string} backside The image to be on the backside of the card
   */
  initDeck (filenames, backside) {
    this.makeTheDeck(filenames, backside)
    this.deckOfCards = this.shuffle()
  }

  /**
   * Returns the deck of cards.
   *
   * @returns {Array} Deck of cards
   */
  getDeck () {
    return this.deckOfCards
  }
}
