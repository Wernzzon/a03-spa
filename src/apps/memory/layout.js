'use strict'

// Imports
import { Card } from './card'

const options = ['4 * 4', '2 * 2', '2 * 4']

/**
 * Makes a 4x4, 2x2 or 2x4 grid layout for the game.
 *
 * @param {string} gridLayout Layout option
 * @param {Card[]} cards Deck with cards
 *
 * @returns {HTMLDivElement} Grid with cardholders
 */
function makeLayout (gridLayout, cards) {
  const gridContainer = document.createElement('div')
  gridContainer.classList.add('board')

  for (let i = 0; i < cards.length; i++) {
    gridContainer.appendChild(cards[i].getCardElement())
  }

  switch (gridLayout) {
    case options[0]:
      gridContainer.childNodes.forEach(card => {
        card.classList.add('fourbyfour')
      })
      break
    case options[1]:
      gridContainer.childNodes.forEach(card => {
        card.classList.add('twobytwo')
      })
      break
    case options[2]:
      gridContainer.childNodes.forEach(card => {
        card.classList.add('twobyfour')
      })
      break
  }

  return gridContainer
}

export {
  options,
  makeLayout
}
