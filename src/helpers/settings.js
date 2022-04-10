'use strict'

import { Window } from '../views/window'

/**
 * Background settings application.
 */
export class Settings {
  parentWindow
  /**
   * Constructor.
   */
  constructor () {
    if (Settings._instance) {
      return console.error('Settings can only be instantiated once.')
    }
    Settings._instance = this
    this.parentWindow = new Window()

    this.parentWindow.elem.closeBtn.addEventListener('click', () => {
      Settings._instance = null
    })

    this.parentWindow.addApp(this.createElements())
    this.parentWindow.show()
  }

  /**
   * Sets background of body.
   *
   * @param {string} key Choice
   */
  setBackground (key) {
    if (key === '1') {
      document.getElementById('desktop').classList.remove('background2')
      document.getElementById('desktop').classList.remove('background3')
      document.getElementById('desktop').classList.add('background1')
    }
    if (key === '2') {
      document.getElementById('desktop').classList.remove('background1')
      document.getElementById('desktop').classList.remove('background3')
      document.getElementById('desktop').classList.add('background2')
    }
    if (key === '3') {
      document.getElementById('desktop').classList.remove('background1')
      document.getElementById('desktop').classList.remove('background2')
      document.getElementById('desktop').classList.add('background3')
    }
  }

  /**
   * Create background selector.
   *
   * @returns {HTMLDivElement} Container
   */
  createElements () {
    const that = this
    const cont = document.createElement('div')

    const inst = document.createElement('p')
    inst.classList.add('large')
    inst.textContent = 'Select background'

    const altWrapper = document.createElement('div')
    for (let i = 1; i < 4; i++) {
      const alt = document.createElement('input')
      alt.type = 'radio'
      alt.name = 'backgrounds'
      alt.id = i
      if (that.checkBackToSetButton(i)) {
        alt.checked = true
      }
      /**
       * Call function to set background.
       */
      alt.onclick = function () {
        that.setBackground(alt.id)
      }
      const label = document.createElement('label')
      label.classList.add('medium')
      label.setAttribute('for', i)
      label.textContent = i
      altWrapper.append(alt)
      altWrapper.append(label)
    }

    cont.appendChild(inst)
    cont.appendChild(altWrapper)

    return cont
  }

  /**
   * Checks which class desktop has.
   *
   * @param {string} key Number 1 -> 3
   * @returns {boolean} True or false
   */
  checkBackToSetButton (key) {
    return document.getElementById('desktop').classList.contains(`background${key}`)
  }
}
