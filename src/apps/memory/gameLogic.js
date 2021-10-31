/* eslint-disable no-unused-vars */
'use strict'

// Imports
import { Card } from './card'
import { Deck } from './deck'
import { getLayoutOption, bindCardsToCardHolder } from '../../views/gameView'

const filenames = [
  '1', '1', '2', '2',
  '3', '3', '4', '4',
  '5', '5', '6', '6',
  '7', '7', '8', '8'
]

let deck
// const facedown = '0'
// let matchedCards = []
// let firstCard, secondCard

/**
 * Starts the game.
 *
 * @returns {HTMLDivElement} Returns full app
 */
export function startGame () {
  deck = new Deck(getLayoutOption())
  deck.initDeck(filenames)
  return bindCardsToCardHolder(deck)
}

/**
 * G.
 *
 * @returns {undefined} Nothing
 */
function flipCard () {

}

/**
 * Checks for match.
 *
 * @param {Card} firstCard First card to be flipped
 * @param {Card} secondCard Second card to be flipped
 */
function checkMatch (firstCard, secondCard) {
  if (firstCard.src === secondCard.src) {
    firstCard.matched()
    secondCard.matched()
  }
}
