'use strict'

// Imports
import { Client } from '../apps/chat/client'
import { Window } from './window'

/**
 * Chat.
 */
export class Chat {
  parentWindow
  client
  info = {
    username: '',
    chosenChannel: ''
  }

  /**
   * Sets up a chat.
   */
  constructor () {
    this.parentWindow = new Window()
    this.info.username = this.checkForUsername()

    this.parentWindow.addApp(this.changeChatView())
    this.parentWindow.show()
  }

  /**
   * Changes the view for chat.
   *
   * @returns {HTMLDivElement} div
   */
  changeChatView () {
    const that = this
    this.elem = {}
    const e = this.elem

    e.parent = document.createElement('div')
    e.parent.id = 'chatCont'

    if (!this.info.username) {
      e.parent.appendChild(this.header(false, false))
      e.parent.appendChild(this.chooseUsername())
      this.elem.usernameView.confirmUser.addEventListener('click', () => {
        window.localStorage.setItem('chatUsername', that.info.username = that.elem.usernameView.input.value)
        that.parentWindow.switchView(that.changeChatView(), document.getElementById(that.parentWindow.UUID).firstChild.nextSibling)
      })
      return e.parent
    }
    if (this.info.username && this.info.chosenChannel) {
      e.parent.appendChild(this.header(true, true))
      e.parent.appendChild(this.messageWindow())
      e.parent.appendChild(this.messageInput())
      this.client = new Client(
        [this.info.username, this.info.chosenChannel, this.parentWindow.UUID])
      return e.parent
    }
    e.parent.appendChild(this.header(true, false))
    e.parent.appendChild(this.chooseChannel())
    this.elem.channelView.confirmBtn.addEventListener('click', () => {
      that.parentWindow.switchView(that.changeChatView(), document.getElementById(that.parentWindow.UUID).firstChild.nextSibling)
    })
    return e.parent
  }

  /**
   * If username is not set in local-storage.
   *
   * @returns {HTMLDivElement} Object
   */
  chooseUsername () {
    this.elem.usernameView = {}
    const e = this.elem.usernameView

    e.parent = document.createElement('div')
    e.parent.id = 'userCont'

    e.paragraph = document.createElement('p')
    e.paragraph.classList.add('medium')
    e.paragraph.textContent = 'Choose your username...'

    e.input = document.createElement('input')
    e.input.id = 'chatUsername'

    e.confirmUser = document.createElement('button')
    e.confirmUser.id = 'confirmUsername'
    e.confirmUser.textContent = 'Confirm username'

    e.parent.appendChild(e.paragraph)
    e.parent.appendChild(e.input)
    e.parent.appendChild(e.confirmUser)

    return e.parent
  }

  /**
   * Lets user select channel to write in.
   *
   * @returns {HTMLDivElement} div
   */
  chooseChannel () {
    this.elem.channelView = {}
    const e = this.elem.channelView

    e.parent = document.createElement('div')
    e.parent.id = 'channelCont'

    e.paragraph = document.createElement('p')
    e.paragraph.classList.add('medium')
    e.paragraph.textContent = 'Choose channel...'

    e.confirmBtn = document.createElement('button')
    e.confirmBtn.id = 'confirmChannel'
    e.confirmBtn.textContent = 'Start chatting'

    e.parent.appendChild(e.paragraph)
    e.parent.appendChild(this.makeChannelList(['Start', '1DV525', 'Network']))
    e.parent.appendChild(e.confirmBtn)

    return e.parent
  }

  /**
   * Creates a list of channels to choose from.
   *
   * @param {string[]} channels Channel names
   * @returns {HTMLDivElement} Object
   */
  makeChannelList (channels) {
    const that = this
    this.elem.channelList = {}
    const e = this.elem.channelList

    e.parent = document.createElement('div')
    channels.forEach(channel => {
      e.opt = document.createElement('input')
      e.opt.type = 'radio'
      e.opt.name = 'channels'
      e.opt.id = channel
      /**
       * Keep record of which button is checked.
       */
      e.opt.onclick = function () {
        that.info.chosenChannel = channel
      }

      e.label = document.createElement('label')
      e.label.classList.add('medium')
      e.label.setAttribute('for', channel)
      e.label.textContent = channel

      e.parent.appendChild(e.opt)
      e.parent.appendChild(e.label)
    })

    return e.parent
  }

  /**
   * Creates header for chat window, with channel displayed.
   *
   * @param {boolean} appendUser True or false
   * @param {boolean} appendChannel True or false
   * @returns {HTMLDivElement} Object
   */
  header (appendUser, appendChannel) {
    this.elem.header = {}
    const e = this.elem.header

    e.parent = document.createElement('div')
    e.parent.id = 'chatHead'
    e.parent.classList.add('xLarge')

    if (appendUser) {
      e.userP = document.createElement('p')
      e.userP.textContent = this.info.username
      e.parent.appendChild(e.userP)
    }

    e.title = document.createElement('h3')
    e.title.textContent = 'CHAT'
    e.parent.appendChild(e.title)

    if (appendChannel) {
      e.channelP = document.createElement('p')
      e.channelP.textContent = this.info.chosenChannel
      e.parent.appendChild(e.channelP)
    }

    e.parent.classList.add('evenly')

    return e.parent
  }

  /**
   * Creates window so all messages can be viewed.
   *
   * @returns {HTMLDivElement} Object
   */
  messageWindow () {
    this.elem.messages = {}
    const e = this.elem.messages

    e.messageBox = document.createElement('ul')
    e.messageBox.id = `messages-${this.info.chosenChannel}`

    return e.messageBox
  }

  /**
   * Appends message to message container.
   *
   * @param {string[]} msg Message
   * @returns {HTMLLIElement} Message
   */
  appendMessage (msg) {
    const message = document.createElement('li')
    message.textContent = `${msg[0]}:\t${msg[1]}`
    return message
  }

  /**
   * Creates message inputfield and send button.
   *
   * @returns {HTMLDivElement} Object
   */
  messageInput () {
    const that = this
    this.elem.messageInput = {}
    const e = this.elem.messageInput

    e.parent = document.createElement('div')
    e.parent.id = 'messageInput'
    e.parent.classList.add('evenly')

    e.inputField = document.createElement('textarea')
    e.inputField.rows = '2'
    e.inputField.cols = '70'

    e.sendBtn = document.createElement('button')
    e.sendBtn.type = 'button'
    e.sendBtn.textContent = 'Send'
    e.sendBtn.id = 'sendMsg'
    e.sendBtn.addEventListener('click', function () {
      that.client.constructMsg(that.elem.messageInput.inputField.value)
      if (document.querySelectorAll(`#messages-${that.info.chosenChannel}`).length === 1) {
        that.elem.messages.messageBox.appendChild(that.appendMessage([that.info.username, that.elem.messageInput.inputField.value]))
      }
      that.elem.messageInput.inputField.value = ''
    })

    e.parent.appendChild(e.inputField)
    e.parent.appendChild(e.sendBtn)

    return e.parent
  }

  /**
   * Checks for username in localstorage.
   *
   * @returns {string | null} Username or null
   */
  checkForUsername () {
    return window.localStorage.getItem('chatUsername')
  }
}
