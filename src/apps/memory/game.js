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

  movement = {
    layout: 0,
    left: -1,
    right: 1,
    up: -4,
    down: 4,
    4: {
      up: -2,
      down: 2
    }
  }

  facedown = '0'
  matchedCards = []
  indexToMoveBy = 0
  flippedCards = {
    first: Card,
    second: Card
  }

  hasFlippedCard = false
  lockboard = false
  attempts = 0
  timer = {
    id: '',
    count: 0
  }

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
    this.movement.layout = getLayoutOption()
    deck.makeTheDeck(this.movement.layout, this.filenames, this.facedown)
    return combineCounterAndLayout(deck.getDeck(), this.parentWindow.UUID)
  }

  /**
   * Sets class 'flip' on card if flipped cards are less than 2,
   * then checks if they match.
   *
   * @param {Deck} deck Deck of cards
   * @param {Card} card Card clicked
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
      this.stopTimer()
      this.parentWindow.switchView(congrats(this.attempts, this.timer.count), document.getElementById(this.parentWindow.UUID).firstChild.nextSibling)

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
      card.getCardElement().addEventListener('click', () => {
        this.flipCard(deck, card)
      })
    })
  }

  /**
   * Sets start position at card 1,1.
   *
   * @param {Deck} deck Deck of cards
   */
  setStartPosition (deck) {
    this.setCardAtPosition(0, deck)
  }

  /**
   * Setter for position of card.
   *
   * @param {number} index Index of card
   * @param {Deck} deck Deck of cards
   */
  setCardAtPosition (index, deck) {
    deck.getDeck().forEach(card => {
      if (card.getCardElement().classList.contains('position')) {
        card.getCardElement().classList.remove('position')
      }
    })
    this._cardAtPosition = deck.getCardAt(index)
    deck.getCard(this._cardAtPosition).getCardElement().classList.add('position')
  }

  /**
   * Getter for position of card.
   *
   * @returns {Card} Card at given position ingame
   */
  get cardAtPosition () {
    return this._cardAtPosition
  }

  /**
   * Moves the position to the card relative to the key pressed.
   *
   * @param {Deck} deck Deck of cards
   * @param {number} moveBy Index to move by
   */
  movePosition (deck, moveBy) {
    const index = deck.getIndexOfCard(this.cardAtPosition) + moveBy
    if (index < 0 || index > deck.getDeck().length - 1) return

    this.setCardAtPosition(index, deck)
  }

  /**
   * Add eventListener to button in order to switch view.
   */
  setSwitchEvent () {
    document.getElementById(`${this.parentWindow.UUID}-confirmLayout`).addEventListener('click', () => {
      const deck = new Deck()
      this.parentWindow.switchView(this.startGame(deck), document.getElementById(this.parentWindow.UUID).lastChild)
      this.setFlipEvents(deck)
      this.setStartPosition(deck)
      this.keyHandler(deck)
      this.startTimer()
    })
  }

  /**
   * Increase the attemps by one, after flipping two cards.
   */
  attemptsPlus () {
    document.getElementById(`${this.parentWindow.UUID}-attempts`).textContent = `${++this.attempts}`
  }

  /**
   * Increase the timer by one.
   *
   * @param {Memory} that Instance of this
   */
  timerPlus (that) {
    that.timer.count = parseInt(++document.getElementById(`${that.parentWindow.UUID}-timer`).textContent)
    document.getElementById(`${that.parentWindow.UUID}-timer`).textContent = that.timer.count
  }

  /**
   * Sets an update interval of 1000 ms for the timer.
   */
  startTimer () {
    this.timer.id = setInterval(this.timerPlus, 1000, this)
  }

  /**
   * Stops the interval.
   */
  stopTimer () {
    clearInterval(this.timer.id)
  }

  /**
   * Handles movement with keyboard.
   *
   * @param {Deck} deck Deck of cards
   */
  keyHandler (deck) {
    document.addEventListener('keydown', e => {
      switch (e.code) {
        case 'KeyA':
          this.movePosition(deck, this.movement.left)
          break
        case 'KeyW':
          switch (this.movement.layout) {
            case 4:
              this.movePosition(deck, this.movement[4].up)
              break
            default:
              this.movePosition(deck, this.movement.up)
              break
          }
          break
        case 'KeyD':
          this.movePosition(deck, this.movement.right)
          break
        case 'KeyS':
          switch (this.movement.layout) {
            case 4:
              this.movePosition(deck, this.movement[4].down)
              break
            default:
              this.movePosition(deck, this.movement.down)
              break
          }
          break
        case 'Enter':
          this.flipCard(deck, this.cardAtPosition)
          break
      }
    })
  }
}
