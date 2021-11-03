
// Imports
import { createDesktop } from './views/desktopView'
import { createWindow, appendApplication, addEventListenersOnWindow } from './views/windowView'
import { startGame, setFlipEvents } from './apps/memory/game'

window.addEventListener('load', main)
const settingsCounter = ['settings', 0]
const messageCounter = ['message', 0]
const diceCounter = ['dice', 0]

/**
 * Creates desktop.
 */
function main () {
  document.title = 'PWD'
  createDesktop()
  addEventListeners()
}

/**
 * Adds event listeners for icons on click.
 */
function addEventListeners () {
  document.querySelectorAll('.menuIcon').forEach(item => {
    item.addEventListener('click', e => {
      const instanceNumber = addInstance(item.id)
      document.getElementById('desktop').appendChild(createWindow(`${item.id}${instanceNumber}`))
      addEventListenersOnWindow(`${item.id}${instanceNumber}`)
      addApp(item.id, instanceNumber)
    })
  })
}

/**
 * Returns an application depending on what icon is clicked.
 *
 * @param {string} appName Name of application
 * @param {number} num Number of instance
 */
function addApp (appName, num) {
  if (appName === settingsCounter[0]) {
    return
  }

  if (appName === messageCounter[0]) {
    return
  }

  if (appName === diceCounter[0]) {
    appendApplication(`${appName}${num}`, startGame())
    setFlipEvents()
  }
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
