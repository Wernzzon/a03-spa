
// Imports
import { createDesktop } from './views/desktopView'
import { createWindow, appendApplication } from './views/windowView'
import { startGame } from './apps/memory/gameLogic'
import { setEventsForId, setParams } from './helpers/dragAndDropHelper'

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
 * Adds event listeners for icons on click.
 */
function addEventListeners () {
  document.querySelectorAll('.menuIcon').forEach(item => {
    item.addEventListener('click', event => {
      const instanceNumber = addInstance(item.id)
      document.getElementById('desktop').appendChild(createWindow(`${item.id}${instanceNumber}`))
      appendApplication(`${item.id}${instanceNumber}`, startGame())
      setParams(`${item.id}${instanceNumber}`)
      setEventsForId()
      addEventToCloseBtn(`${item.id}${instanceNumber}`, item.id)
    })
  })
}

/**
 * Adds event listener to close button.
 *
 * @param {string} windowId Id of window to close
 * @param {string} appName Name of application
 */
function addEventToCloseBtn (windowId, appName) {
  document.getElementById(`close-${windowId}`).addEventListener('click', e => {
    document.getElementById(windowId).remove()
  })
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
    return ++settingsCounter[1]
  }

  if (param === messageCounter[0]) {
    return ++messageCounter[1]
  }

  if (param === diceCounter[0]) {
    return ++diceCounter[1]
  }
}
