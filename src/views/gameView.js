'use strict'

import { options, makeLayout } from '../apps/memory/layout'
import { Deck } from '../apps/memory/deck'

let choosenLayout = options[3]
let numberOfCards = 8

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
      switch (btn.textContent) {
        case options[1]:
          numberOfCards = 16
          choosenLayout = options[1]
          break
        case options[2]:
          numberOfCards = 4
          choosenLayout = options[2]
          break
        case options[3]:
          numberOfCards = 8
          choosenLayout = options[3]
          break
      }
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
  return numberOfCards
}

export {
  bindCardsToCardHolder,
  giveOptions,
  getLayoutOption
}
