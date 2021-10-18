
// Imports
import { createDesktop } from './views/desktopView'
import { createWindow } from './views/windowView'
import { helper } from './helpers/dragAndDropHelper'

window.addEventListener('load', main)
const settingsCounter = ['settings', 0]
const messageCounter = ['message', 0]
const diceCounter = ['dice', 0]

/**
 * Creates desktop.
 */
function main () {
  document.title = 'PWA'
  createDesktop()
  addEventListeners()
}

/**
 * Adds event handlers for icons on click.
 */
function addEventListeners () {
  document.querySelectorAll('.menuIcon').forEach(item => {
    item.addEventListener('click', event => {
      const instanceNumber = counterForApplicationInstances(item.id, true)
      document.getElementById('desktop').appendChild(createWindow(`${item.id}${instanceNumber}`))
      helper(`${item.id}${instanceNumber}`)
    })
  })
}

/**
 * Keeps count of how many instances every application has.
 *
 * @param {string} param Name of application
 * @param {boolean} addOrRemove True if a new instance is created, else false
 *
 * @returns {number} Returns number of instance if instance is added
 */
function counterForApplicationInstances (param, addOrRemove) {
  if (addOrRemove) {
    return addInstance(param)
  }

  removeInstance(param)
}

/**
 * Add one instance to application counter.
 *
 * @param {string} param Name of application
 *
 * @returns {number} Returns number of instance
 */
function addInstance (param) {
  if (param === settingsCounter[0]) {
    return settingsCounter[1]++
  }

  if (param === messageCounter[0]) {
    return messageCounter[1]++
  }

  if (param === diceCounter[0]) {
    return diceCounter[1]++
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
