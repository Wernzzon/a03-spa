'use strict'

// Imports
import { Card } from './card'

/**
 * Deck of cards
 */
export class Deck {
  /**
   * Initializes an empty array as the deck.
   */
  constructor () {
    this.deckOfCards = []
  }

  /**
   * Creates all Cards and pushes them to an array.
   *
   * @param {number} numOfCards The number of cards in the deck
   * @param {string[]} filenames Filenames of the images to put onto the Cards
   * @param {string} backsideOfCard The image to be on the backside of the card
   */
  makeTheDeck (numOfCards, filenames, backsideOfCard) {
    for (let i = 0; i < numOfCards; i++) {
      this.deckOfCards.push(new Card(filenames[i], backsideOfCard))
    }
    this.shuffle()
  }

  /**
   * Shuffles the deck of cards using Fisher-Yates algorithm.
   * Impl. at https://bost.ocks.org/mike/shuffle/.
   */
  shuffle () {
    let m = this.deckOfCards.length
    let t
    let i

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = this.deckOfCards[m]
      this.deckOfCards[m] = this.deckOfCards[i]
      this.deckOfCards[i] = t
    }
  }

  /**
   * Returns the deck of cards.
   *
   * @returns {Card[]} Deck of cards
   */
  getDeck () {
    return this.deckOfCards
  }

  /**
   * Finds the index of a given card in the deck array.
   *
   * @param {Card} card Card to get index of
   * @returns {number} Index of card
   */
  getIndexOfCard (card) {
    return this.deckOfCards.indexOf(card)
  }

  /**
   * Returns a card at given index in the deck array.
   *
   * @param {number} index Index in array
   * @returns {Card} Card at index
   */
  getCardAt (index) {
    return this.deckOfCards[index]
  }

  /**
   * Returns card from array by giving a card to serch for.
   *
   * @param {Card} card Card to search for in array
   * @returns {Card} Card from array
   */
  getCard (card) {
    return this.getCardAt(this.getIndexOfCard(card))
  }
}
