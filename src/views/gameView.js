'use strict'

import { options, makeLayout } from '../apps/memory/layout'
import { Deck } from '../apps/memory/deck'

const filenameOfCards = [
  '1', '1', '2', '2',
  '3', '3', '4', '4',
  '5', '5', '6', '6',
  '7', '7', '8', '8'
]

let choosenLayout = 16

/**
 * Bind the cards to their cardholder.
 *
 * @returns {HTMLDivElement} Grid with cards.
 */
export function bindCardsToCardHolder () {
  const deck = new Deck(choosenLayout)
  deck.initDeck(filenameOfCards)

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
