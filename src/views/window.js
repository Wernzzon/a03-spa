'use strict'

import { Chat } from './chatView'
import { dragElement } from '../helpers/dragAndDropHelper'
import { Memory } from '../apps/memory/game'
import { Settings } from '../helpers/backgroundSettings'
import { v4 as uuidv4 } from 'uuid'
import { Quiz } from '../apps/quiz/quizStart'

/**
 * Window.
 */
export class Window {
  /**
   * Sets up a window.
   */
  constructor () {
    this.genUUID()
    const that = this

    this.createElements()

    this.elem.closeBtn.addEventListener('click', function () {
      that.close()
    }, false)

    this.elem.parent.addEventListener('mousedown', function () {
      that.gainFocus(that)
    }, false)

    this.setZIndex(1)
  }

  /**
   * Generates UUID with UUID v4.
   */
  genUUID () {
    this._UUID = uuidv4()
  }

  /**
   * Get UUID.
   *
   * @returns {string} UUID of instance
   */
  get UUID () {
    return this._UUID.toString()
  }

  /**
   * Appends application to window.
   *
   * @param {Chat | Memory | Settings | Quiz} app Application
   */
  addApp (app) {
    this.elem.parent.appendChild(app)
  }

  /**
   * Append element to desktop.
   */
  show () {
    document.getElementById('desktop').appendChild(this.elem.parent)
    dragElement(this.elem.parent)
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
    if (this.getZIndex() >= 0) this.elem.parent.style.zIndex = index
  }

  /**
   * Get the z-index of the window.
   *
   * @returns {number} Z-index-property, 0 if not present.
   */
  getZIndex () {
    return parseInt(this.elem.parent.style.zIndex) || 0
  }

  /**
   * Creates elements needed.
   */
  createElements () {
    this.elem = {}
    const e = this.elem

    e.parent = document.createElement('div')
    e.parent.id = this.UUID
    e.parent.classList.add('draggableWindow')

    e.closeBtn = document.createElement('button')
    e.closeBtn.classList.add('close')
    e.closeBtn.textContent = 'Close'

    e.parent.append(e.closeBtn)
  }

  /**
   * Makes the calling window the topmost window.
   *
   * @param {Window} that Instance of window
   */
  gainFocus (that) {
    this.setZIndex(that.getZIndex() + 1)
  }
}
