/* eslint-disable no-unused-vars */
'use strict'

// Imports
import { Deck } from './deck'
import { Card } from './card'
import { getLayoutOption, bindCardsToCardHolder } from '../../views/gameView'

const filenames = [
  '1', '1', '2', '2',
  '3', '3', '4', '4',
  '5', '5', '6', '6',
  '7', '7', '8', '8'
]

const facedown = '0'
const matchedCards = []
let deck
let firstCard
let secondCard
let hasFlippedCard = false

/**
 * Starts the game.
 *
 * @returns {HTMLDivElement} Returns full app
 */
function startGame () {
  deck = new Deck(getLayoutOption())
  deck.initDeck(filenames, facedown)
  return bindCardsToCardHolder(deck)
}

/**
 * Sets class 'flip' on card if flipped cards are less than 2,
 * then checks if they match.
 *
 * @returns {undefined} Nothing
 */
function flipCard () {
  if (this === firstCard) return

  this.classList.add('flip')

  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }

  secondCard = this
  hasFlippedCard = false
  checkMatch()
}

/**
 * Checks for match.
 */
function checkMatch () {
  if (firstCard.getImg() === secondCard.getImg()) {
    console.log(firstCard, secondCard)
    matchedCards.push([deck.getDeck().indexOf(firstCard), deck.getDeck().indexOf(secondCard)])
    setCardsToMatched()
  } else {
    unFlipCards()
    firstCard = null
    secondCard = null
  }
}

/**
 * Disables cards because they are matched.
 */
function setCardsToMatched () {
  deck.getDeck()[deck.getDeck().indexOf(firstCard)].getCard().removeEventListener('click', flipCard)
  deck.getDeck()[deck.getDeck().indexOf(firstCard)].getCard().classList.add('match')
  deck.getDeck()[deck.getDeck().indexOf(secondCard)].getCard().removeEventListener('click', flipCard)
  deck.getDeck()[deck.getDeck().indexOf(secondCard)].getCard().classList.add('match')
}

/**
 * Removes class 'flip' on cards.
 */
function unFlipCards () {
  setTimeout(() => {
    deck.getDeck()[deck.getDeck().indexOf(firstCard)].getCard().classList.remove('flip')
    deck.getDeck()[deck.getDeck().indexOf(secondCard)].getCard().classList.remove('flip')
  }, 1000)
}

/**
 * Sets event listeners for all cards.
 */
function setFlipEvents () {
  deck.getDeck().forEach(card => {
    card.getCard().addEventListener('click', flipCard)
  })
}

export {
  startGame,
  setFlipEvents
}
