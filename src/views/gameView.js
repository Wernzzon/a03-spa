'use strict'

import { options, makeLayout } from '../apps/memory/layout'
import { Deck } from '../apps/memory/deck'

let choosenLayout = 16

/**
 * Bind the cards to their cardholder.
 *
 * @param {Deck} deck Deck of cards
 * @returns {HTMLDivElement} Grid with cards
 */
function bindCardsToCardHolder (deck) {
  const grid = makeLayout(choosenLayout, deck.getDeck())

  return grid
}

/**
 * Gives all three layout options, and prints them.
 *
 * @returns {HTMLDivElement} Container with options for layout
 */
// eslint-disable-next-line no-unused-vars
function giveOptions () {
  const container = document.createElement('div')
  const inst = document.createElement('p')
  inst.textContent = 'Choose which layout you want'
  const wrapper = document.createElement('div')
  for (const value in options) {
    const btn = document.createElement('button')
    btn.id = value
    btn.textContent = value
    btn.addEventListener('click', e => {
      choosenLayout = btn.textContent
    })
    wrapper.appendChild(btn)
  }
  container.appendChild(inst)
  container.appendChild(wrapper)
  return container
}

/**
 * Returns user choosen layout.
 *
 * @returns {number} Layout option to return
 */
function getLayoutOption () {
  return choosenLayout
}

export {
  bindCardsToCardHolder,
  giveOptions,
  getLayoutOption
}
