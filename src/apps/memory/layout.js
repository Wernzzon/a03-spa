'use strict'

import { Deck } from './deck'

const options = {
  1: 4 * 4,
  2: 2 * 2,
  3: 2 * 4
}

/**
 * Makes a 4x4, 2x2 or 2x4 grid layout for the game.
 *
 * @param {number} gridLayout Layout option
 * @param {Deck} deck Deck with cards
 *
 * @returns {HTMLDivElement} Grid with cardholders
 */
function makeLayout (gridLayout, deck) {
  const gridContainer = document.createElement('div')
  gridContainer.id = 'board'

  for (let i = 0; i < gridLayout; i++) {
    gridContainer.appendChild(deck[i].getImg())
  }

  return gridContainer
}

export {
  options,
  makeLayout
}
