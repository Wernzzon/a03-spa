'use strict'

// Imports
import { Deck } from './deck'
import { switchView } from '../../views/windowView'
import { getLayoutOption, giveOptions, combineCounterAndLayout, congrats } from '../../views/gameView'
import { Card } from './card'

const filenames = [
  '1', '1', '2', '2',
  '3', '3', '4', '4',
  '5', '5', '6', '6',
  '7', '7', '8', '8'
]

const facedown = '0'
const matchedCards = []
const flippedCards = {
  first: Card,
  second: Card
}
let hasFlippedCard = false
let lockboard = false
let thisWindowId
let attempts = 0

/**
 * Gives first view of game.
 *
 * @returns {HTMLDivElement} First view of game
 */
function showMemory () {
  return giveOptions()
}

/**
 * Starts the game.
 *
 * @param {Deck} deck An empty deck
 *
 * @returns {HTMLDivElement} Returns full app
 */
function startGame (deck) {
  deck.makeTheDeck(getLayoutOption(), filenames, facedown)
  return combineCounterAndLayout(deck.getDeck())
}

/**
 * Sets class 'flip' on card if flipped cards are less than 2,
 * then checks if they match.
 *
 * @param {Deck} deck Deck of cards
 * @param {Card} card Card clicked
 *
 * @returns {undefined} Nothing
 */
function flipCard (deck, card) {
  if (lockboard) return
  if (card === flippedCards[0]) return

  deck.getCard(card).getCardElement().classList.add('flip', 'wait')

  if (!hasFlippedCard) {
    hasFlippedCard = true
    flippedCards.first = deck.getCard(card)

    return
  }

  flippedCards.second = deck.getCard(card)

  checkMatch(deck, card)
}

/**
 * Checks for match.
 *
 * @param {Deck} deck Deck of cards
 */
function checkMatch (deck) {
  attemptsPlus()

  deck.getCard(flippedCards.first).getImg() === deck.getCard(flippedCards.second).getImg()
    ? setCardsToMatched(deck)
    : unFlipCards(deck)
}

/**
 * Disables cards because they are matched.
 *
 * @param {Deck} deck Deck of cards
 */
function setCardsToMatched (deck) {
  deck.getCard(flippedCards.first).getCardElement().removeEventListener('click', flipCard)
  deck.getCard(flippedCards.first).getCardElement().classList.replace('wait', 'match')

  deck.getCard(flippedCards.second).getCardElement().removeEventListener('click', flipCard)
  deck.getCard(flippedCards.second).getCardElement().classList.replace('wait', 'match')

  matchedCards.push(deck.getCard(flippedCards.first), deck.getCard(flippedCards.second))
  if (!gameOver(deck)) resetBoard()
}

/**
 * Removes class 'flip' on cards.
 *
 * @param {Deck} deck Deck of cards
 */
function unFlipCards (deck) {
  lockboard = true
  blinkNoMatch(deck)

  setTimeout(() => {
    deck.getCard(flippedCards.first).getCardElement().classList.remove('flip')
    deck.getCard(flippedCards.second).getCardElement().classList.remove('flip')
    resetBoard()
  }, 1000)
}

/**
 * Blink box shadow red.
 *
 * @param {Deck} deck Deck of cards
 */
function blinkNoMatch (deck) {
  setTimeout(() => {
    deck.getCard(flippedCards.first).getCardElement().classList.replace('wait', 'noMatch')
    deck.getCard(flippedCards.second).getCardElement().classList.replace('wait', 'noMatch')
    setTimeout(() => {
      deck.getCard(flippedCards.first).getCardElement().classList.remove('noMatch')
      deck.getCard(flippedCards.second).getCardElement().classList.remove('noMatch')
    }, 300)
  }, 300)
}

/**
 * Check if game over.
 *
 * @param {Deck} deck Deck of cards
 *
 * @returns {boolean} True or false
 */
function gameOver (deck) {
  if (matchedCards.length === deck.getDeck().length) {
    switchView(thisWindowId, congrats(attempts), document.getElementById('memory'))

    return true
  }
  return false
}

/**
 * Resets status of the board.
 */
function resetBoard () {
  hasFlippedCard = lockboard = false
  flippedCards.first = null
  flippedCards.second = null
}

/**
 * Sets event listeners for all cards.
 *
 * @param {Deck} deck Deck of cards
 */
function setFlipEvents (deck) {
  deck.getDeck().forEach(card => {
    card.getCardElement().addEventListener('click', e => {
      flipCard(deck, card)
    })
  })
}

/**
 * Add eventListener to button in order to switch view.
 *
 * @param {string} windowId Id of window
 */
function setSwitchEvent (windowId) {
  thisWindowId = windowId
  document.getElementById('confirmLayout').addEventListener('click', e => {
    const deck = new Deck()
    switchView(thisWindowId, startGame(deck), document.getElementById('overlay'))
    setFlipEvents(deck)
  })
}

/**
 * Increase the attemps by one, after flipping two cards.
 */
function attemptsPlus () {
  document.getElementById('attempts').textContent = `${++attempts}`
}

export {
  showMemory,
  setSwitchEvent
}
