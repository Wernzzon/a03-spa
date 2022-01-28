'use strict'

// Imports
import { constructMsg, connect } from '../apps/chat/client'
import { Window } from './windowView'

/**
 * Chat.
 */
export class Chat {
  parentWindow
  info = {
    username: '',
    changeToChatView: false,
    channel: ''
  }

  /**
   * Sets up a chat.
   *
   * @param {Window} window Parent
   */
  constructor (window) {
    this.parentWindow = window

    this.info.username = this.checkForUsername()
    console.log(this.info)

    this.changeChatView()
    this.parentWindow.addApp(this)
  }

  /**
   * Changes the view for chat.
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
      this.changeWindowParams(false)
      this.elem.usernameView.confirmBtn.addEventListener('click', function () {
        window.localStorage.setItem('chatUsername', that.info.username = that.elem.usernameView.chatUsername.value)
        that.parentWindow.switchView(that.changeChatView(), that.elem.parent)
      })
    }
    if (this.info.changeToChatView) {
      e.parent.appendChild(this.header(true, true))
      e.parent.appendChild(this.messageWindow())
      e.parent.appendChild(this.messageInput())
      this.changeWindowParams(false)
      connect(this.info.id)
    }
    e.parent.appendChild(this.header(true, false))
    e.parent.appendChild(this.chooseChannel())
    this.changeWindowParams(true)
    this.elem.channelView.confirmBtn.addEventListener('click', function () {
      that.parentWindow.switchView(that.changeChatView(), that.elem.parent)
    })
  }

  /**
   * Appends children HTMLElements in an array to parent HTMLElement.
   *
   * @param {HTMLDivElement} parent Parent Element
   * @param {HTMLElement[]} children Array of children elements
   */
  appendChildrenToParent (parent, children) {
    children.forEach(child => {
      parent.appendChild(child)
    })
  }

  /**
   * Sets param for change of listener.
   *
   * @param {boolean} change True or false
   */
  changeWindowParams (change) {
    this.info.changeToChatView = change
  }

  /**
   * If username is not set in local-storage.
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

    e.confirmBtn = document.createElement('button')
    e.confirmBtn.id = 'confirmUsername'
    e.confirmBtn.textContent = 'Confirm username'

    e.parent.appendChild(e.paragraph)
    e.parent.appendChild(e.input)
    e.parent.appendChild(e.confirmBtn)
  }

  /**
   * Lets user select channel to write in.
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
  }

  /**
   * Creates a list of channels to choose from.
   *
   * @param {string[]} channels Channel names
   */
  makeChannelList (channels) {
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
        this.info.channel = e.opt.id
      }

      e.label = document.createElement('label')
      e.label.classList.add('medium')
      e.label.setAttribute('for', e.opt.id)
      e.label.textContent = channel

      e.parent.appendChild(e.opt)
      e.parent.appendChild(e.label)
    })
  }

  /**
   * Creates header for chat window, with channel displayed.
   *
   * @param {boolean} appendUser True or false
   * @param {boolean} appendChannel True or false
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
      e.channelP.textContent = this.info.channel
      e.parent.appendChild(e.channelP)
    }

    e.parent.classList.add('evenly')
  }

  /**
   * Creates window so all messages can be viewed.
   */
  messageWindow () {
    this.elem.messages = {}
    const e = this.elem.messages

    e.messageBox = document.createElement('ul')
    e.messageBox.id = 'messages'
  }

  /**
   * Appends message to message container.
   *
   * @param {string} windowId Id of window
   * @param {object} object Object from parsed JSON
   */
  appendMessage (windowId, object) {
    const message = document.createElement('li')
    message.textContent = object.data
    document.getElementById(windowId).firstChild.nextSibling.firstChild.nextSibling.appendChild(message)
  }

  /**
   * Creates message inputfield and send button.
   */
  messageInput () {
    this.elem.messageInput = {}
    const e = this.elem.messageInput

    e.parent = document.createElement('div')
    e.parent.id = 'messageInput'

    e.inputField = document.createElement('textarea')
    e.inputField.rows = '2'
    e.inputField.cols = '70'
    e.inputField.name = 'messageField'

    e.sendBtn = document.createElement('button')
    e.sendBtn.type = 'button'
    e.sendBtn.textContent = 'Send'
    e.sendBtn.id = 'sendMsg'
    e.sendBtn.addEventListener('click', function () {
      constructMsg(this.info.id, [e.inputField.value, this.info.username, this.info.channel])
      e.inputField.value = ''
    })

    e.parent.appendChild(e.inputField)
    e.parent.appendChild(e.sendBtn)
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

// const info = {
//   id: [],
//   username: '',
//   changeToChatView: false,
//   channel: ''
// }

// /**
//  * Creates complete chat window.
//  *
//  * @param {string} id Id of current window
//  * @returns {HTMLDivElement} Complete chat application
//  */
// function chatWindow (id) {
//   if (info.id.includes !== id) {
//     info.id = id
//     info.username = checkForUsername()
//     console.log(id, info)
//   }

//   const chatContainer = document.createElement('div')
//   chatContainer.id = 'chatCont'

//   if (!info.username) {
//     appendChildrenToParent(chatContainer, usernameView())
//     changeWindowParams(false)
//     return chatContainer
//   }
//   if (info.changeToChatView) {
//     appendChildrenToParent(chatContainer, chatView())
//     changeWindowParams(false)
//     connect(info.id)
//     return chatContainer
//   }
//   appendChildrenToParent(chatContainer, channelView())
//   changeWindowParams(true)
//   return chatContainer
// }

// /**
//  * Sets param for change of listener.
//  *
//  * @param {boolean} change True or false
//  */
// function changeWindowParams (change) {
//   info.changeToChatView = change
// }

// /**
//  * Decides which listener to set.
//  */
// function setListener () {
//   info.changeToChatView ? setListenerForChannelView() : setListenerForUsernameView()
// }

// /**
//  * Creates username view.
//  *
//  * @returns {Array} With HTMLDivElements
//  */
// function usernameView () {
//   return [header(false, false), chooseUsername()]
// }

// /**
//  * Creates channel selection view.
//  *
//  * @returns {Array} With HTMLDivElements
//  */
// function channelView () {
//   return [header(true, false), chooseChannel()]
// }

// /**
//  * Creates chat view.
//  *
//  * @returns {Array} With HTMLDivElements
//  */
// function chatView () {
//   return [header(true, true), messageWindow(), messageInput()]
// }

// /**
//  * Appends children HTMLElements in an array to parent HTMLElement.
//  *
//  * @param {HTMLDivElement} parent Parent Element
//  * @param {HTMLElement[]} children Array of children elements
//  */
// function appendChildrenToParent (parent, children) {
//   children.forEach(child => {
//     parent.appendChild(child)
//   })
// }

// /**
//  * If username is not set in local-storage.
//  *
//  * @returns {HTMLDivElement} Container for selection of username
//  */
// function chooseUsername () {
//   const cont = document.createElement('div')
//   cont.id = 'userCont'

//   const p = document.createElement('p')
//   p.classList.add('medium')
//   p.textContent = 'Choose your username...'

//   const input = document.createElement('input')
//   input.id = 'chatUsername'

//   const confirm = document.createElement('button')
//   confirm.id = 'confirmUsername'
//   confirm.textContent = 'Confirm username'

//   cont.appendChild(p)
//   cont.appendChild(input)
//   cont.appendChild(confirm)
//   return cont
// }

// /**
//  * Sets listener for username view.
//  */
// function setListenerForUsernameView () {
//   document.getElementById('confirmUsername').addEventListener('click', function () {
//     window.localStorage.setItem('chatUsername', info.username = document.getElementById('chatUsername').value)
//     document.getElementById(info.id).firstChild.nextSibling.replaceWith(chatWindow())
//     setListener()
//   })
// }

// /**
//  * Lets user select channel to write in.
//  *
//  * @returns {HTMLDivElement} Container for channel selection
//  */
// function chooseChannel () {
//   const cont = document.createElement('div')
//   cont.id = 'channelCont'

//   const p = document.createElement('p')
//   p.classList.add('medium')
//   p.textContent = 'Choose channel...'

//   const confirm = document.createElement('button')
//   confirm.id = 'confirmChannel'
//   confirm.textContent = 'Start chatting'

//   cont.appendChild(p)
//   cont.appendChild(makeChannelList(['Start', '1DV525', 'Network']))
//   cont.appendChild(confirm)
//   return cont
// }
// /**
//  * Creates a list of channels to choose from.
//  *
//  * @param {string[]} channels Channel names
//  * @returns {HTMLSelectElement} List of channels
//  */
// function makeChannelList (channels) {
//   const wrapper = document.createElement('div')
//   channels.forEach(channel => {
//     const opt = document.createElement('input')
//     opt.type = 'radio'
//     opt.name = 'channels'
//     opt.id = channel
//     /**
//      * Keep record of which button is checked.
//      */
//     opt.onclick = function () {
//       info.channel = opt.id
//     }

//     const label = document.createElement('label')
//     label.classList.add('medium')
//     label.setAttribute('for', opt.id)
//     label.textContent = channel

//     wrapper.appendChild(opt)
//     wrapper.appendChild(label)
//   })

//   return wrapper
// }

// /**
//  * Sets listener for channel view.
//  */
// function setListenerForChannelView () {
//   document.getElementById('confirmChannel').addEventListener('click', function () {
//     document.getElementById(info.id).firstChild.nextSibling.replaceWith(chatWindow())
//   })
// }

// /**
//  * Creates header for chat window, with channel displayed.
//  *
//  * @param {boolean} appendUser True or false
//  * @param {boolean} appendChannel True or false
//  * @returns {HTMLDivElement} Container for header
//  */
// function header (appendUser, appendChannel) {
//   const header = document.createElement('div')
//   header.id = 'chatHead'
//   header.classList.add('xLarge')

//   if (appendUser) {
//     const user = document.createElement('p')
//     user.textContent = info.username
//     header.appendChild(user)
//   }

//   const title = document.createElement('h3')
//   title.textContent = 'CHAT'
//   header.appendChild(title)

//   if (appendChannel) {
//     const channel = document.createElement('p')
//     channel.textContent = info.channel
//     header.appendChild(channel)
//   }

//   header.classList.add('evenly')
//   return header
// }

// /**
//  * Creates window so all messages can be viewed.
//  *
//  * @returns {HTMLDivElement} Container for all messages sent and received
//  */
// function messageWindow () {
//   const messages = document.createElement('ul')
//   messages.id = 'messages'

//   return messages
// }

// /**
//  * Appends message to message container.
//  *
//  * @param {string} windowId Id of window
//  * @param {object} object Object from parsed JSON
//  */
// function appendMessage (windowId, object) {
//   const message = document.createElement('li')
//   message.textContent = object.data
//   document.getElementById(windowId).firstChild.nextSibling.firstChild.nextSibling.appendChild(message)
// }

// // /**
// //  * Formats incoming data to a message.
// //  *
// //  * @param {object} data Incoming data
// //  * @returns {string} Formatted data
// //  */
// // function formatData (data) {
// //   return `${data.username}${data.data}`
// // }

// /**
//  * Creates message inputfield and send button.
//  *
//  * @returns {HTMLDivElement} Container for message input
//  */
// function messageInput () {
//   const inputCont = document.createElement('div')
//   inputCont.id = 'messageInput'

//   const inputField = document.createElement('textarea')
//   inputField.rows = '2'
//   inputField.cols = '70'
//   inputField.name = 'messageField'

//   const sendBtn = document.createElement('button')
//   sendBtn.type = 'button'
//   sendBtn.textContent = 'Send'
//   sendBtn.id = 'sendMsg'
//   sendBtn.addEventListener('click', function () {
//     constructMsg(info.id, [inputField.value, info.username, info.channel])
//     inputField.value = ''
//   })

//   inputCont.appendChild(inputField)
//   inputCont.appendChild(sendBtn)

//   return inputCont
// }

// /**
//  * Checks for username in localstorage.
//  *
//  * @returns {string | null} Username or null
//  */
// function checkForUsername () {
//   return window.localStorage.getItem('chatUsername')
// }

// export {
//   chatWindow,
//   setListener,
//   appendMessage
// }
