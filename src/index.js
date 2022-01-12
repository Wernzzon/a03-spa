
// Imports
import { createDesktop } from './views/desktopView'
import { createWindow, appendApplication, addEventListenersOnWindow } from './views/windowView'
import { setSwitchEvent, showMemory } from './apps/memory/game'
import { setNewGameListener, loadMenu } from './apps/quiz/quizStart'
import { chatWindow, setListener } from './views/chatView'
import { settings } from './helpers/backgroundSettings'

window.addEventListener('load', main)
const settingsCounter = ['settings', 0]
const quizCounter = ['quiz', 0]
const chatCounter = ['chat', 0]
const memoryCounter = ['memory', 0]

/**
 * Creates desktop.
 */
function main () {
  document.title = 'PWD'
  createDesktop([settingsCounter[0], quizCounter[0], chatCounter[0], memoryCounter[0]])
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
    appendApplication(`${appName}${num}`, settings())
  }

  if (appName === quizCounter[0]) {
    appendApplication(`${appName}${num}`, loadMenu(`${appName}${num}`))
    setNewGameListener()
  }

  if (appName === chatCounter[0]) {
    appendApplication(`${appName}${num}`, chatWindow(`${appName}${num}`))
    setListener()
  }

  if (appName === memoryCounter[0]) {
    appendApplication(`${appName}${num}`, showMemory())
    setSwitchEvent(`${appName}${num}`)
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
  if (param === quizCounter[0]) {
    return ++quizCounter[1]
  }

  if (param === chatCounter[0]) {
    return ++chatCounter[1]
  }

  if (param === memoryCounter[0]) {
    return ++memoryCounter[1]
  }
}
