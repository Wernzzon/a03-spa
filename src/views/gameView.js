'use strict'

import { options, makeLayout } from '../apps/memory/layout'
import { Card } from '../apps/memory/card'

let choosenLayout

/**
 * Combines counter and layout.
 *
 * @param {Card[]} cards Deck of cards
 * @param {string} windowId Id of window
 *
 * @returns {HTMLDivElement} Counter and layout wrapped together
 */
function combineCounterAndLayout (cards, windowId) {
  const wrapper = document.createElement('div')
  wrapper.id = 'memory'
  wrapper.appendChild(counter(windowId))
  wrapper.appendChild(bindCardsToCardHolder(cards))

  return wrapper
}

/**
 * Bind the cards to their cardholder.
 *
 * @param {Card[]} cards Deck of cards
 * @returns {HTMLDivElement} Grid with cards
 */
function bindCardsToCardHolder (cards) {
  return makeLayout(choosenLayout, cards)
}

/**
 * Creates a counter.
 *
 * @param {string} windowId Id of window
 * @returns {HTMLDivElement} Container for counter
 */
function counter (windowId) {
  const countContainer = document.createElement('div')

  const atmps = document.createElement('span')
  atmps.classList.add('xLarge')
  atmps.textContent = 'Attempts: '

  const atmpsCounter = document.createElement('span')
  atmpsCounter.id = `${windowId}-attempts`
  atmpsCounter.classList.add('xLarge')
  atmpsCounter.textContent = '0'

  countContainer.appendChild(atmps)
  countContainer.appendChild(atmpsCounter)

  return countContainer
}

/**
 * Gives all three layout options.
 *
 * @param {string} windowId Id of window
 * @returns {HTMLDivElement} Container with options for layout
 */
function giveOptions (windowId) {
  const container = document.createElement('div')
  container.id = 'overlay'

  const inst = document.createElement('p')
  inst.classList.add('xxLarge')
  inst.textContent = 'Choose which layout you want for the memorycards'

  const choosen = document.createElement('span')
  choosen.classList.add('large')
  choosen.id = 'layoutOfChoice'
  choosen.textContent = 'Choosen layout will appear here'

  const wrapper = document.createElement('div')
  for (const value of options) {
    const btn = document.createElement('button')
    btn.id = options.indexOf(value)
    btn.textContent = value
    btn.addEventListener('click', () => {
      choosenLayout = btn.textContent
      choosen.textContent = choosenLayout
    })
    wrapper.appendChild(btn)
  }

  container.appendChild(inst)
  container.appendChild(choosen)
  container.appendChild(wrapper)
  container.appendChild(confirmButton(windowId))

  return container
}

/**
 * Congratulations overlay.
 *
 * @param {number} attempts Number of moves made by user
 * @returns {HTMLDivElement} Div
 */
function congrats (attempts) {
  const tmp = document.createElement('div')
  tmp.classList.add('xLarge', 'centerText')

  const title = document.createElement('h2')
  title.textContent = 'Congratulations you won'

  const movesMade = document.createElement('p')
  movesMade.textContent = `You made ${attempts} moves!`

  tmp.appendChild(title)
  tmp.appendChild(movesMade)

  return tmp
}

/**
 * Creates a confirm button.
 *
 * @param {string} windowId Id of window
 * @returns {HTMLButtonElement} Button
 */
function confirmButton (windowId) {
  const btn = document.createElement('button')
  btn.id = `${windowId}-confirmLayout`
  btn.textContent = 'Confirm'
  return btn
}

/**
 * Returns user choosen layout.
 *
 * @returns {number} Layout option to return
 */
function getLayoutOption () {
  if (choosenLayout === options[1]) return 4
  if (choosenLayout === options[2]) return 8

  return 16
}

export {
  congrats,
  giveOptions,
  getLayoutOption,
  combineCounterAndLayout
}
