
// Imports
import { createDesktop } from './views/desktopView'
import { createWindow } from './views/windowView'

window.addEventListener('load', main)
const settingsCounter = ['settings', 0]
const messageCounter = ['message', 0]
const diceCounter = ['dice', 0]

/**
 * Creates desktop.
 */
function main () {
  createDesktop()
  addEventListeners()
}

/**
 * Adds event handlers for icons on click.
 */
function addEventListeners () {
  document.querySelectorAll('.menuIcon').forEach(item => {
    item.addEventListener('click', event => {
      counterForApplicationInstances(item.id, true)
      document.getElementById('desktop').appendChild(createWindow(item.id))
    })
  })
}

/**
 * Keeps count of how many instances every application has.
 *
 * @param {string} param Name of application
 * @param {boolean} addOrRemove True if a new instance is created, else false
 */
function counterForApplicationInstances (param, addOrRemove) {
  if (addOrRemove) {
    addInstance(param)
    return
  }

  removeInstance(param)
}

/**
 * Add one instance to application counter.
 *
 * @param {string} param Name of application
 */
function addInstance (param) {
  if (param === settingsCounter[0]) {
    settingsCounter[1]++
    return
  }

  if (param === messageCounter[0]) {
    messageCounter[1]++
    return
  }

  if (param === diceCounter[0]) {
    diceCounter[1]++
  }
}

/**
 * Remove one instance from application counter.
 *
 * @param {string} param Name of application
 */
function removeInstance (param) {
  if (param === settingsCounter[0]) {
    settingsCounter[1]--
    return
  }

  if (param === messageCounter[0]) {
    messageCounter[1]--
    return
  }

  if (param === diceCounter[0]) {
    diceCounter[1]--
  }
}
