'use strict'

/**
 * Client for chat
 */
export class Client {
  socket
  latestMessage

  /**
   * Constructor.
   *
   * @param {string} windowId Id of window
   */
  constructor (windowId) {
    const that = this

    this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.setEvents()

    document.getElementById(windowId).firstChild.addEventListener('click', () => {
      that.closeSocket(windowId)
    })
  }

  /**
   * Sets events for WebSocket.
   */
  setEvents () {
    const that = this
    /**
     * Log when connection is open.
     */
    this.socket.onopen = function () {
      console.log('Websocket now open')
    }
    /**
     * Log when connection is closed.
     */
    this.socket.onclose = function () {
      console.log('Connection closed')
    }

    /**
     * Log when connection recevied a message.
     *
     * @param {Event} event event
     */
    this.socket.onmessage = function (event) {
      console.log(event.data)
      const parsedData = JSON.parse(event.data)
      if (parsedData.username !== 'The Server') {
        that.setLatestMessage(parsedData)
      }
    }

    /**
     * Log when connection has an error.
     *
     * @param {Event} event event
     */
    this.socket.onerror = function (event) {
      console.error(event.data)
    }
  }

  /**
   * Close connection associated with the windowId.
   *
   * @returns {false | void} False if bufferedAmount is not 0
   */
  closeSocket () {
    if (this.socket.bufferedAmount !== 0) return false

    return this.socket.close()
  }

  /**
   * Sends message in JSON format.
   *
   * @param {JSON} data JSON data to be sent
   */
  sendMsg (data) {
    this.socket.send(data)
  }

  /**
   * Receives message in JSON format.
   */
  // eslint-disable-next-line no-unused-vars
  receive () {

  }

  /**
   * Constructs message into JSON, calls send.
   *
   * @param {string[]} params [data, username, channel]
   */
  constructMsg (params) {
    const msg = {
      type: 'message',
      data: params[0],
      username: params[1],
      channel: params[2],
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.sendMsg(JSON.stringify(msg))
  }

  /**
   * Set the message to be appended to chat.
   *
   * @param {object} data Message
   */
  setLatestMessage (data) {
    this.latestMessage = data
  }

  /**
   * Get the message to be appended to chat.
   *
   * @returns {object} Message
   */
  getLatestMessage () {
    return this.latestMessage
  }
}
