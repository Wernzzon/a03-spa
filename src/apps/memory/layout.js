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
 *
 * @returns {HTMLDivElement} Grid with carholders
 */
function makeLayout (gridLayout) {
  const gridContainer = document.createElement('div')
  gridContainer.id = 'board'

  for (let i = 0; i < gridLayout; i++) {
    const cardHolder = document.createElement('div')
    cardHolder.id = `card ${i}`
    cardHolder.classList.add('cardHolder')
    gridContainer.append(cardHolder)
  }

  return gridContainer
}

export {
  options,
  makeLayout
}
