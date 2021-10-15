'use strict'

/**
 * Creates a window for applications.
 *
 * @param {string} idOfWindow Id of the window, equal to application name and # of application instance
 */
function createWindow (idOfWindow) {
  const window = document.createElement('div')
  window.id = idOfWindow
  window.style.border = '1px solid black'
  window.style.width = '200px'
  window.style.height = '150px'
}

/**
 * Appends application to window.
 *
 * @param {string} windowId Id of window to append to
 * @param {HTMLDivElement} app Application container to append
 */
// eslint-disable-next-line no-unused-vars
function appendApplication (windowId, app) {
  document.getElementById(windowId).appendChild(app)
}

export {
  createWindow
}
