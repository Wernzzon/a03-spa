const connections = []
/**
 * Connects to websocket and logs when open.
 */
function connect () {
  const socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
  connections.push(socket)
  /**
   * Log when connection is open.
   */
  socket.onopen = function () {
    console.log('Websocket now open')
  }
}

/**
 * Sends message in JSON format.
 *
 * @param {JSON} data JSON data to be sent
 * @param {number} index Index of connection
 */
function send (data, index) {
  connections[index].send(data)
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
 * @param {number} index Index of connection
 * @param {string} msgToSend Message user wants to send
 * @param {string} user Name of the user sending
 */
function constructMsg (index, msgToSend, user) {
  const msg = {
    type: 'message',
    data: msgToSend,
    username: user,
    channel: 'channel',
    key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }
  send(JSON.stringify(msg), index)
}

export {
  connect,
  constructMsg
}
