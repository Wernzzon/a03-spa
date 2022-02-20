'use strict'

// Imports
import { Deck } from './deck'
import { Window } from '../../views/window'
import { getLayoutOption, giveOptions, combineCounterAndLayout, congrats } from '../../views/gameView'
import { Card } from './card'

/**
 * Memory
 */
export class Memory {
  parentWindow
  filenames = [
    '1', '1', '2', '2',
    '3', '3', '4', '4',
    '5', '5', '6', '6',
    '7', '7', '8', '8'
  ]

  facedown = '0'
  matchedCards = []
  flippedCards = {
    first: Card,
    second: Card
  }

  hasFlippedCard = false
  lockboard = false
  thisWindowId
  attempts = 0

  /**
   * Constructor.
   */
  constructor () {
    this.parentWindow = new Window()
    this.parentWindow.addApp(giveOptions(this.parentWindow.UUID))
    this.parentWindow.show()
    this.setSwitchEvent()
  }

  /**
   * Starts the game.
   *
   * @param {Deck} deck An empty deck
   *
   * @returns {HTMLDivElement} Returns full app
   */
  startGame (deck) {
    deck.makeTheDeck(getLayoutOption(), this.filenames, this.facedown)
    return combineCounterAndLayout(deck.getDeck(), this.parentWindow.UUID)
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
  flipCard (deck, card) {
    if (this.lockboard) return
    if (card === this.flippedCards[0]) return

    deck.getCard(card).getCardElement().classList.add('flip', 'wait')

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true
      this.flippedCards.first = deck.getCard(card)

      return
    }

    this.flippedCards.second = deck.getCard(card)

    this.checkMatch(deck, card)
  }

  /**
   * Checks for match.
   *
   * @param {Deck} deck Deck of cards
   */
  checkMatch (deck) {
    this.attemptsPlus()

    deck.getCard(this.flippedCards.first).getImg() === deck.getCard(this.flippedCards.second).getImg()
      ? this.setCardsToMatched(deck)
      : this.unFlipCards(deck)
  }

  /**
   * Disables cards because they are matched.
   *
   * @param {Deck} deck Deck of cards
   */
  setCardsToMatched (deck) {
    deck.getCard(this.flippedCards.first).getCardElement().removeEventListener('click', this.flipCard)
    deck.getCard(this.flippedCards.first).getCardElement().classList.replace('wait', 'match')

    deck.getCard(this.flippedCards.second).getCardElement().removeEventListener('click', this.flipCard)
    deck.getCard(this.flippedCards.second).getCardElement().classList.replace('wait', 'match')

    this.matchedCards.push(deck.getCard(this.flippedCards.first), deck.getCard(this.flippedCards.second))
    if (!this.gameOver(deck)) this.resetBoard()
  }

  /**
   * Removes class 'flip' on cards.
   *
   * @param {Deck} deck Deck of cards
   */
  unFlipCards (deck) {
    this.lockboard = true
    this.blinkNoMatch(deck)

    setTimeout(() => {
      deck.getCard(this.flippedCards.first).getCardElement().classList.remove('flip')
      deck.getCard(this.flippedCards.second).getCardElement().classList.remove('flip')
      this.resetBoard()
    }, 1000)
  }

  /**
   * Blink box shadow red.
   *
   * @param {Deck} deck Deck of cards
   */
  blinkNoMatch (deck) {
    setTimeout(() => {
      deck.getCard(this.flippedCards.first).getCardElement().classList.replace('wait', 'noMatch')
      deck.getCard(this.flippedCards.second).getCardElement().classList.replace('wait', 'noMatch')
      setTimeout(() => {
        deck.getCard(this.flippedCards.first).getCardElement().classList.remove('noMatch')
        deck.getCard(this.flippedCards.second).getCardElement().classList.remove('noMatch')
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
  gameOver (deck) {
    if (this.matchedCards.length === deck.getDeck().length) {
      this.parentWindow.switchView(congrats(this.attempts), document.getElementById(this.parentWindow.UUID).firstChild.nextSibling)

      return true
    }
    return false
  }

  /**
   * Resets status of the board.
   */
  resetBoard () {
    this.hasFlippedCard = this.lockboard = false
    this.flippedCards.first = null
    this.flippedCards.second = null
  }

  /**
   * Sets event listeners for all cards.
   *
   * @param {Deck} deck Deck of cards
   */
  setFlipEvents (deck) {
    deck.getDeck().forEach(card => {
      card.getCardElement().addEventListener('click', e => {
        this.flipCard(deck, card)
      })
    })
  }

  /**
   * Add eventListener to button in order to switch view.
   */
  setSwitchEvent () {
    document.getElementById(`${this.parentWindow.UUID}-confirmLayout`).addEventListener('click', e => {
      const deck = new Deck()
      this.parentWindow.switchView(this.startGame(deck), document.getElementById(this.parentWindow.UUID).firstChild.nextSibling)
      this.setFlipEvents(deck)
    })
  }

  /**
   * Increase the attemps by one, after flipping two cards.
   */
  attemptsPlus () {
    document.getElementById(`${this.parentWindow.UUID}-attempts`).textContent = `${++this.attempts}`
  }
}

// const filenames = [
//   '1', '1', '2', '2',
//   '3', '3', '4', '4',
//   '5', '5', '6', '6',
//   '7', '7', '8', '8'
// ]

// const facedown = '0'
// const matchedCards = []
// const flippedCards = {
//   first: Card,
//   second: Card
// }
// let hasFlippedCard = false
// let lockboard = false
// let thisWindowId
// let attempts = 0

// /**
//  * Gives first view of game.
//  *
//  * @returns {HTMLDivElement} First view of game
//  */
// function showMemory () {
//   return giveOptions()
// }

// /**
//  * Starts the game.
//  *
//  * @param {Deck} deck An empty deck
//  *
//  * @returns {HTMLDivElement} Returns full app
//  */
// function startGame (deck) {
//   deck.makeTheDeck(getLayoutOption(), filenames, facedown)
//   return combineCounterAndLayout(deck.getDeck())
// }

// /**
//  * Sets class 'flip' on card if flipped cards are less than 2,
//  * then checks if they match.
//  *
//  * @param {Deck} deck Deck of cards
//  * @param {Card} card Card clicked
//  *
//  * @returns {undefined} Nothing
//  */
// function flipCard (deck, card) {
//   if (lockboard) return
//   if (card === flippedCards[0]) return

//   deck.getCard(card).getCardElement().classList.add('flip', 'wait')

//   if (!hasFlippedCard) {
//     hasFlippedCard = true
//     flippedCards.first = deck.getCard(card)

//     return
//   }

//   flippedCards.second = deck.getCard(card)

//   checkMatch(deck, card)
// }

// /**
//  * Checks for match.
//  *
//  * @param {Deck} deck Deck of cards
//  */
// function checkMatch (deck) {
//   attemptsPlus()

//   deck.getCard(flippedCards.first).getImg() === deck.getCard(flippedCards.second).getImg()
//     ? setCardsToMatched(deck)
//     : unFlipCards(deck)
// }

// /**
//  * Disables cards because they are matched.
//  *
//  * @param {Deck} deck Deck of cards
//  */
// function setCardsToMatched (deck) {
//   deck.getCard(flippedCards.first).getCardElement().removeEventListener('click', flipCard)
//   deck.getCard(flippedCards.first).getCardElement().classList.replace('wait', 'match')

//   deck.getCard(flippedCards.second).getCardElement().removeEventListener('click', flipCard)
//   deck.getCard(flippedCards.second).getCardElement().classList.replace('wait', 'match')

//   matchedCards.push(deck.getCard(flippedCards.first), deck.getCard(flippedCards.second))
//   if (!gameOver(deck)) resetBoard()
// }

// /**
//  * Removes class 'flip' on cards.
//  *
//  * @param {Deck} deck Deck of cards
//  */
// function unFlipCards (deck) {
//   lockboard = true
//   blinkNoMatch(deck)

//   setTimeout(() => {
//     deck.getCard(flippedCards.first).getCardElement().classList.remove('flip')
//     deck.getCard(flippedCards.second).getCardElement().classList.remove('flip')
//     resetBoard()
//   }, 1000)
// }

// /**
//  * Blink box shadow red.
//  *
//  * @param {Deck} deck Deck of cards
//  */
// function blinkNoMatch (deck) {
//   setTimeout(() => {
//     deck.getCard(flippedCards.first).getCardElement().classList.replace('wait', 'noMatch')
//     deck.getCard(flippedCards.second).getCardElement().classList.replace('wait', 'noMatch')
//     setTimeout(() => {
//       deck.getCard(flippedCards.first).getCardElement().classList.remove('noMatch')
//       deck.getCard(flippedCards.second).getCardElement().classList.remove('noMatch')
//     }, 300)
//   }, 300)
// }

// /**
//  * Check if game over.
//  *
//  * @param {Deck} deck Deck of cards
//  *
//  * @returns {boolean} True or false
//  */
// function gameOver (deck) {
//   if (matchedCards.length === deck.getDeck().length) {
//     Window.switchView(thisWindowId, congrats(attempts), document.getElementById(thisWindowId).firstChild.nextSibling)

//     return true
//   }
//   return false
// }

// /**
//  * Resets status of the board.
//  */
// function resetBoard () {
//   hasFlippedCard = lockboard = false
//   flippedCards.first = null
//   flippedCards.second = null
// }

// /**
//  * Sets event listeners for all cards.
//  *
//  * @param {Deck} deck Deck of cards
//  */
// function setFlipEvents (deck) {
//   deck.getDeck().forEach(card => {
//     card.getCardElement().addEventListener('click', e => {
//       flipCard(deck, card)
//     })
//   })
// }

// /**
//  * Add eventListener to button in order to switch view.
//  *
//  * @param {string} windowId Id of window
//  */
// function setSwitchEvent (windowId) {
//   thisWindowId = windowId
//   document.getElementById('confirmLayout').addEventListener('click', e => {
//     const deck = new Deck()
//     Window.switchView(thisWindowId, startGame(deck), document.getElementById('overlay'))
//     setFlipEvents(deck)
//   })
// }

// /**
//  * Increase the attemps by one, after flipping two cards.
//  */
// function attemptsPlus () {
//   document.getElementById('attempts').textContent = `${++attempts}`
// }

// export {
//   showMemory,
//   setSwitchEvent
// }
