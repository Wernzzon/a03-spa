'use strict'

import { Deck } from './deck'

const options = {
  1: '4 * 4',
  2: '2 * 2',
  3: '2 * 4'
}

/**
 * Makes a 4x4, 2x2 or 2x4 grid layout for the game.
 *
 * @param {string} gridLayout Layout option
 * @param {Deck} deck Deck with cards
 *
 * @returns {HTMLDivElement} Grid with cardholders
 */
function makeLayout (gridLayout, deck) {
  const gridContainer = document.createElement('div')
  gridContainer.classList.add('board')

  for (let i = 0; i < deck.length; i++) {
    gridContainer.appendChild(deck[i].getCard())
  }

  switch (gridLayout) {
    case options[1]:
      gridContainer.childNodes.forEach(card => {
        card.classList.add('fourbyfour')
      })
      break
    case options[2]:
      gridContainer.childNodes.forEach(card => {
        card.classList.add('twobytwo')
      })
      break
    case options[3]:
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
