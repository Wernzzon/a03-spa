/* eslint-disable no-unused-vars */
import { constructMsg } from '../apps/chat/client'
/**
 * Creates complete chat window.
 *
 * @returns {HTMLDivElement} Complete chat application
 */
function createChatWindow () {
  const chatContainer = document.createElement('div')
  chatContainer.id = 'chatCont'

  return chatContainer
}

// /**
//  * Creates username view.
//  *
//  * @returns {Array} With HTMLDivElements
//  */
// function usernameView () {
//   return [header(false, [false]), chooseUsername()]
// }
// /**
//  * Creates channel selection view.
//  *
//  * @returns {Array} With HTMLDivElements
//  */
// function channelView () {
//   return [header(true, [false]), chooseChannel()]
// }

// /**
//  * Creates chat view.
//  *
//  * @param {string} channel Chosen channel
//  * @returns {Array} With HTMLDivElements
//  */
// function chatView (channel) {
//   return [header(true, [true, channel]), messageWindow(), messageInput()]
// }

/**
 * If username is not set in local-storage.
 *
 * @returns {HTMLDivElement} Container for selection of username
 */
function chooseUsername () {
  const cont = document.createElement('div')
  cont.id = 'userCont'

  const p = document.createElement('p')
  p.textContent = 'Choose your username...'

  const input = document.createElement('input')
  input.id = 'chatUsername'

  const confirm = document.createElement('button')
  confirm.id = 'confirmUsername'
  confirm.addEventListener('click', function () {
    window.localStorage.setItem('chatUsername', input.value)
  })

  cont.appendChild(p)
  cont.appendChild(input)
  cont.appendChild(confirm)
  return cont
}

/**
 * Lets user select channel to write in.
 */
function chooseChannel () {

}

/**
 * Creates header for chat window, with channel displayed.
 *
 * @param {boolean} appendUser True or false
 * @param {Array} appendChannel [boolean, string]
 * @returns {HTMLDivElement} Container for header
 */
function header (appendUser, appendChannel) {
  const header = document.createElement('div')
  header.id = 'chatHead'

  if (appendUser) {
    const user = document.createElement('p')
    user.textContent = checkForUsername()
    header.appendChild(user)
  }

  const title = document.createElement('h3')
  title.textContent = 'CHAT'

  if (appendChannel[0]) {
    const channel = document.createElement('p')
    channel.textContent = appendChannel[1]
    header.appendChild(channel)
  }

  header.appendChild(title)
  return header
}

/**
 * Creates window so all messages can be viewed.
 *
 * @returns {HTMLDivElement} Container for all messages sent and received
 */
function messageWindow () {
  const messages = document.createElement('div')
  messages.id = 'messages'

  return messages
}

/**
 * Creates message inputfield and send button.
 *
 * @returns {HTMLDivElement} Container for message input
 */
function messageInput () {
  const inputCont = document.createElement('div')
  inputCont.id = 'messageInput'

  const inputField = document.createElement('input')
  inputField.type = 'text'
  inputField.name = 'messageField'

  const sendBtn = document.createElement('button')
  sendBtn.id = 'sendMsg'
  sendBtn.addEventListener('click', function () {
    constructMsg(inputField.value, 'user')
    inputField.value = ''
  })

  inputCont.appendChild(inputField)
  inputCont.appendChild(sendBtn)

  return inputCont
}

/**
 * Checks for username in localstorage.
 *
 * @returns {string | null} Username or null
 */
function checkForUsername () {
  return window.localStorage.getItem('chatUsername')
}

export {
  createChatWindow
}
