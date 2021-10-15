'use strict'

const options = {
  1: 4 * 4,
  2: 2 * 2,
  3: 2 * 4
}

/**
 * Makes a 4x4, 2x2 or 2x4 grid layout for the game.
 *
 * @param {object} gridLayout Layout option
 */
function makeLayout (gridLayout) {
  const gridContainer = document.createElement('div')

  for (let i = 0; i < gridLayout; i++) {
    const cardHolder = document.createElement('div')
    cardHolder.id = i
    gridContainer.appendChild(cardHolder)
  }
}

export {
  options,
  makeLayout
}
