import { constructMsg, connect } from '../apps/chat/client'
const info = {
  id: [],
  username: '',
  changeToChatView: false,
  channel: ''
}

/**
 * Creates complete chat window.
 *
 * @param {string} id Id of current window
 * @returns {HTMLDivElement} Complete chat application
 */
function chatWindow (id) {
  if (info.id.includes !== id) {
    info.id = id
    info.username = checkForUsername()
    console.log(id, info)
  }

  const chatContainer = document.createElement('div')
  chatContainer.id = 'chatCont'

  if (!info.username) {
    appendChildrenToParent(chatContainer, usernameView())
    changeWindowParams(false)
    return chatContainer
  }
  if (info.changeToChatView) {
    appendChildrenToParent(chatContainer, chatView())
    changeWindowParams(false)
    connect(info.id)
    return chatContainer
  }
  appendChildrenToParent(chatContainer, channelView())
  changeWindowParams(true)
  return chatContainer
}

/**
 * Sets param for change of listener.
 *
 * @param {boolean} change True or false
 */
function changeWindowParams (change) {
  info.changeToChatView = change
}

/**
 * Decides which listener to set.
 */
function setListener () {
  info.changeToChatView ? setListenerForChannelView() : setListenerForUsernameView()
}

/**
 * Creates username view.
 *
 * @returns {Array} With HTMLDivElements
 */
function usernameView () {
  return [header(false, false), chooseUsername()]
}

/**
 * Creates channel selection view.
 *
 * @returns {Array} With HTMLDivElements
 */
function channelView () {
  return [header(true, false), chooseChannel()]
}

/**
 * Creates chat view.
 *
 * @returns {Array} With HTMLDivElements
 */
function chatView () {
  return [header(true, true), messageWindow(), messageInput()]
}

/**
 * Appends children HTMLElements in an array to parent HTMLElement.
 *
 * @param {HTMLDivElement} parent Parent Element
 * @param {HTMLElement[]} children Array of children elements
 */
function appendChildrenToParent (parent, children) {
  children.forEach(child => {
    parent.appendChild(child)
  })
}

/**
 * If username is not set in local-storage.
 *
 * @returns {HTMLDivElement} Container for selection of username
 */
function chooseUsername () {
  const cont = document.createElement('div')
  cont.id = 'userCont'

  const p = document.createElement('p')
  p.classList.add('medium')
  p.textContent = 'Choose your username...'

  const input = document.createElement('input')
  input.id = 'chatUsername'

  const confirm = document.createElement('button')
  confirm.id = 'confirmUsername'
  confirm.textContent = 'Confirm username'

  cont.appendChild(p)
  cont.appendChild(input)
  cont.appendChild(confirm)
  return cont
}

/**
 * Sets listener for username view.
 */
function setListenerForUsernameView () {
  document.getElementById('confirmUsername').addEventListener('click', function () {
    window.localStorage.setItem('chatUsername', info.username = document.getElementById('chatUsername').value)
    document.getElementById(info.id).firstChild.nextSibling.replaceWith(chatWindow())
    setListener()
  })
}

/**
 * Lets user select channel to write in.
 *
 * @returns {HTMLDivElement} Container for channel selection
 */
function chooseChannel () {
  const cont = document.createElement('div')
  cont.id = 'channelCont'

  const p = document.createElement('p')
  p.classList.add('medium')
  p.textContent = 'Choose channel...'

  const confirm = document.createElement('button')
  confirm.id = 'confirmChannel'
  confirm.textContent = 'Start chatting'

  cont.appendChild(p)
  cont.appendChild(makeChannelList(['Start', '1DV525', 'Network']))
  cont.appendChild(confirm)
  return cont
}
/**
 * Creates a list of channels to choose from.
 *
 * @param {string[]} channels Channel names
 * @returns {HTMLSelectElement} List of channels
 */
function makeChannelList (channels) {
  const wrapper = document.createElement('div')
  channels.forEach(channel => {
    const opt = document.createElement('input')
    opt.type = 'radio'
    opt.name = 'channels'
    opt.id = channel
    /**
     * Keep record of which button is checked.
     */
    opt.onclick = function () {
      info.channel = opt.id
    }

    const label = document.createElement('label')
    label.classList.add('medium')
    label.setAttribute('for', opt.id)
    label.textContent = channel

    wrapper.appendChild(opt)
    wrapper.appendChild(label)
  })

  return wrapper
}

/**
 * Sets listener for channel view.
 */
function setListenerForChannelView () {
  document.getElementById('confirmChannel').addEventListener('click', function () {
    document.getElementById(info.id).firstChild.nextSibling.replaceWith(chatWindow())
  })
}

/**
 * Creates header for chat window, with channel displayed.
 *
 * @param {boolean} appendUser True or false
 * @param {boolean} appendChannel True or false
 * @returns {HTMLDivElement} Container for header
 */
function header (appendUser, appendChannel) {
  const header = document.createElement('div')
  header.id = 'chatHead'
  header.classList.add('xLarge')

  if (appendUser) {
    const user = document.createElement('p')
    user.textContent = info.username
    header.appendChild(user)
  }

  const title = document.createElement('h3')
  title.textContent = 'CHAT'
  header.appendChild(title)

  if (appendChannel) {
    const channel = document.createElement('p')
    channel.textContent = info.channel
    header.appendChild(channel)
  }

  header.classList.add('evenly')
  return header
}

/**
 * Creates window so all messages can be viewed.
 *
 * @returns {HTMLDivElement} Container for all messages sent and received
 */
function messageWindow () {
  const messages = document.createElement('ul')
  messages.id = 'messages'

  return messages
}

/**
 * Appends message to message container.
 *
 * @param {string} windowId Id of window
 * @param {object} object Object from parsed JSON
 */
function appendMessage (windowId, object) {
  const message = document.createElement('li')
  message.textContent = object.data
  document.getElementById(windowId).firstChild.nextSibling.firstChild.nextSibling.appendChild(message)
}

// /**
//  * Formats incoming data to a message.
//  *
//  * @param {object} data Incoming data
//  * @returns {string} Formatted data
//  */
// function formatData (data) {
//   return `${data.username}${data.data}`
// }

/**
 * Creates message inputfield and send button.
 *
 * @returns {HTMLDivElement} Container for message input
 */
function messageInput () {
  const inputCont = document.createElement('div')
  inputCont.id = 'messageInput'

  const inputField = document.createElement('textarea')
  inputField.rows = '2'
  inputField.cols = '70'
  inputField.name = 'messageField'

  const sendBtn = document.createElement('button')
  sendBtn.type = 'button'
  sendBtn.textContent = 'Send'
  sendBtn.id = 'sendMsg'
  sendBtn.addEventListener('click', function () {
    constructMsg(info.id, [inputField.value, info.username, info.channel])
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
  chatWindow,
  setListener,
  appendMessage
}
