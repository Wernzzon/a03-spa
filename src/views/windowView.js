'use strict'

/**
 * Creates a window for applications.
 *
 * @param {string} idOfWindow Id of the window, equal to application name and # of application instance
 *
 * @returns {HTMLDivElement} Window
 */
function createWindow (idOfWindow) {
  const window = document.createElement('div')
  window.id = idOfWindow
  window.classList.add('draggableWindow')
  window.draggable = true
  window.appendChild(createCloseButton(window.id))
  return window
}

/**
 * Creates a button to close current window.
 *
 * @param {string} idOfRoot Id of root element
 *
 * @returns {HTMLButtonElement} Button for closing/deleting a node
 */
function createCloseButton (idOfRoot) {
  const closeBtn = document.createElement('button')
  closeBtn.id = `close-${idOfRoot}`
  closeBtn.classList.add('close')
  closeBtn.textContent = 'Close'
  return closeBtn
}

/**
 * Appends application to window.
 *
 * @param {string} windowId Id of window to append to
 * @param {HTMLDivElement} app Application container to append
 */
function appendApplication (windowId, app) {
  document.getElementById(windowId).appendChild(app)
}

export {
  createWindow,
  appendApplication
}
