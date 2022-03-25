
// Imports
import { createDesktop } from './views/desktopView'
import { Memory } from './apps/memory/game'
import { Quiz } from './apps/quiz/quizStart'
import { Chat } from './views/chatView'
import { Settings } from './helpers/settings'

window.addEventListener('load', main)
const apps = ['settings', 'quiz', 'chat', 'memory']

/**
 * Creates desktop.
 */
function main () {
  document.title = 'PWD'
  createDesktop(apps)
  addEventListeners()
}

/**
 * Adds event listeners for icons on click.
 */
function addEventListeners () {
  document.querySelectorAll('.menuIcon').forEach(item => {
    item.addEventListener('click', () => {
      addApp(item.id)
    })
  })
}

/**
 * Returns an application depending on what icon is clicked.
 *
 * @param {string} appName Name of application
 * @returns {Chat | Memory | Settings | Quiz} application
 */
function addApp (appName) {
  if (appName === apps[0]) {
    return new Settings()
  }
  if (appName === apps[1]) {
    return new Quiz()
    // FIXME: Some funky behavior
  }
  if (appName === apps[2]) {
    return new Chat()
  }
  if (appName === apps[3]) {
    return new Memory()
  }
}
