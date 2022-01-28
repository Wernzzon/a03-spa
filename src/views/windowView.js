'use strict'

import { Chat } from './chatView'

/**
 * Window.
 */
export class Window {
  /**
   * Sets up a window.
   */
  constructor () {
    const that = this

    this.createElements()

    this.elem.closeBtn.addEventListener('click', function () {
      that.close()
    }, false)

    this.elem.parent.addEventListener('mousedown', function () {
      that.gainFocus()
    }, false)

    this.gainFocus()
  }

  /**
   * Appends application to window.
   *
   * @param {Chat} app Application
   */
  addApp (app) {
    this.elem.parent.appendChild(app)
  }

  /**
   * Append element to desktop.
   */
  show () {
    document.getElementById('desktop').appendChild(this.elem.parent)
  }

  /**
   * Replaces old child with new, in order to switch view in an app.
   *
   * @param {HTMLDivElement} newApp New node to replace with
   * @param {HTMLDivElement} oldApp Id of old node to be replaced
   */
  switchView (newApp, oldApp) {
    this.elem.parent.replaceChild(newApp, oldApp)
  }

  /**
   * Removes element from desktop.
   */
  close () {
    if (typeof (this.onclose) === 'function') {
      this.onclose()
    }

    document.getElementById('desktop').removeChild(this.elem.parent)
  }

  /**
   * Sets the z-index.
   *
   * @param {number} index The z-index to be set.
   */
  setZIndex (index) {
    index = parseInt(index, 10)
    if (!isNaN(index)) {
      this.elem.parent.style.zIndex = index
    }
  }

  /**
   * Get the z-index of the window.
   *
   * @returns {number} Z-index-property, 0 if not present.
   */
  getZIndex () {
    const index = this.elem.parent.style.zIndex
    return index || 0
  }

  /**
   * Creates elements needed.
   */
  createElements () {
    this.elem = {}
    const e = this.elem

    e.parent = document.createElement('div')
    e.parent.classList.add('draggableWindow')

    e.closeBtn = document.createElement('button')
    e.closeBtn.classList.add('close')
    e.closeBtn.textContent = 'Close'

    e.parent.appendChild(e.closeBtn)
  }

  /**
   * Makes the calling window the topmost window.
   *
   * @returns {Function} Local function for setting focus
   */
  gainFocus () {
    let counter = 0
    return function (that) {
      this.setZIndex(counter++)
    }
  }
}

// // Imports
// // import { makeElementDraggable } from '../helpers/dragAndDropHelper'
// const info = {
//   id: '',
//   app: ''
// }

// /**
//  * Creates a window for applications.
//  *
//  * @param {string} idOfWindow Id of the window, equal to application name and # of application instance
//  *
//  * @returns {HTMLDivElement} Window
//  */
// function createWindow (idOfWindow) {
//   info.id = idOfWindow
//   const window = document.createElement('div')
//   window.id = idOfWindow
//   window.classList.add('draggableWindow')
//   window.appendChild(createCloseButton(window.id))
//   return window
// }

// /**
//  * Creates a button to close current window.
//  *
//  * @param {string} idOfRoot Id of root element
//  *
//  * @returns {HTMLButtonElement} Button for closing/deleting a node
//  */
// function createCloseButton (idOfRoot) {
//   const closeBtn = document.createElement('button')
//   closeBtn.id = `close-${idOfRoot}`
//   closeBtn.classList.add('close')
//   closeBtn.textContent = 'Close'
//   return closeBtn
// }

// /**
//  * Adds event listener to close button.
//  *
//  * @param {string} windowId Id of window to close
//  */
// function addEventToCloseBtn (windowId) {
//   document.getElementById(`close-${windowId}`).addEventListener('click', e => {
//     document.getElementById(windowId).remove()
//   })
// }

// /**
//  * Appends application to window.
//  *
//  * @param {string} windowId Id of window to append to
//  * @param {HTMLDivElement} app Application container to append
//  */
// function appendApplication (windowId, app) {
//   document.getElementById(windowId).appendChild(app)
// }

// /**
//  * Replaces old child with new, in order to switch view in an app.
//  *
//  * @param {string} windowId Id of window which the switch should happen in
//  * @param {HTMLDivElement} newApp New node to replace with
//  * @param {HTMLDivElement} oldApp Id of old node to be replaced
//  */
// function switchView (windowId, newApp, oldApp) {
//   document.getElementById(windowId).replaceChild(newApp, oldApp)
// }

// /**
//  * Adds event listeners to the window.
//  *
//  * @param {string} windowId Id of window to append to
//  */
// function addEventListenersOnWindow (windowId) {
//   makeElementDraggable(windowId)
//   addEventToCloseBtn(windowId)
// }

// export {
//   switchView,
//   createWindow,
//   appendApplication,
//   addEventListenersOnWindow
// }
