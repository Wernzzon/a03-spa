import { appendMessage } from '../../views/chatView'

const connections = new Map()
/**
 * Connects to websocket and logs when open.
 *
 * @param {string} windowId Id of window
 */
function connect (windowId) {
  const socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
  setEvents(socket, windowId)
  connections.set(windowId, socket)
}

/**
 * Sets events for WebSocket.
 *
 * @param {WebSocket} socket WebSocket
 * @param {string} windowId Id of window
 */
function setEvents (socket, windowId) {
  /**
   * Log when connection is open.
   */
  socket.onopen = function () {
    console.log('Websocket now open')
  }
  /**
   * Log when connection is closed.
   */
  socket.onclose = function () {
    console.log('Connection closed')
  }

  /**
   * Log when connection recevied a message.
   *
   * @param {Event} event event
   */
  socket.onmessage = function (event) {
    console.log(event.data)
    appendMessage(windowId, event)
  }

  /**
   * Log when connection has an error.
   *
   * @param {Event} event event
   */
  socket.onerror = function (event) {
    console.error(event.data)
  }
}

/**
 * Close connection associated with the windowId.
 *
 * @param {string} windowId Id of window
 * @returns {boolean} True or false
 */
function close (windowId) {
  if (connections.get(windowId).bufferedAmount() !== 0) return false

  return connections.get(windowId).CLOSED
}

/**
 * Sends message in JSON format.
 *
 * @param {JSON} data JSON data to be sent
 * @param {string} windowId Index of connection
 */
function send (data, windowId) {
  connections.get(windowId).send(data)
}

/**
 * Receives message in JSON format.
 */
// eslint-disable-next-line no-unused-vars
function receive () {

}

/**
 * Constructs message into JSON, calls send.
 *
 * @param {string} windowId Index of connection
 * @param {string[]} params [data, username, channel]
 */
function constructMsg (windowId, params) {
  const msg = {
    type: 'message',
    data: params[0],
    username: params[1],
    channel: params[2],
    key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }
  send(JSON.stringify(msg), windowId)
}

export {
  connect,
  constructMsg,
  close
}
