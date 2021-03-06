'use strict'

// Imports
import { saveValues, getFormattedValues } from '../../helpers/storage'

/**
 * Client for chat
 */
export class Client {
  socket
  chatInfo = {
    user: '',
    channel: '',
    id: ''
  }

  /**
   * Constructor.
   *
   * @param {string[]} info Username, channel, windowId
   */
  constructor (info) {
    const that = this
    this.chatInfo.user = info[0]
    this.chatInfo.channel = info[1]
    this.chatInfo.id = info[2]
    this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.setEvents()

    document.getElementById(this.chatInfo.id).firstChild.addEventListener('click', () => {
      that.closeSocket(that.chatInfo.id)
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
      that.getSavedMessages()
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
      const parsedData = JSON.parse(event.data)
      if (parsedData.type === 'notification' || parsedData.type === 'heartbeat') return
      that.receive([parsedData.username, parsedData.data], true)
      that.saveToStorage(parsedData)
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
   * Handles incoming and cached messages.
   *
   * @param {Array} parsedData data
   * @param {boolean} skipSameId True or false
   */
  receive (parsedData, skipSameId) {
    const message = document.createElement('li')
    message.textContent = `${parsedData[0]}:\t${parsedData[1]}`
    document.querySelectorAll(`#messages-${this.chatInfo.channel}`).forEach(item => {
      if (skipSameId) {
        if (item.parentElement.parentElement.id !== this.chatInfo.id) {
          item.appendChild(message)
        }
      }
      if (!skipSameId) {
        item.appendChild(message)
      }
    })
  }

  /**
   * Constructs message into JSON, calls send.
   *
   * @param {string} msg data
   */
  constructMsg (msg) {
    const toJSON = {
      type: 'message',
      data: msg,
      username: this.chatInfo.user,
      channel: this.chatInfo.channel,
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.sendMsg(JSON.stringify(toJSON))
  }

  /**
   * Cache message history.
   *
   * @param {object} parsedData data
   */
  saveToStorage (parsedData) {
    const toSave = [
      parsedData.username,
      parsedData.data
    ]
    saveValues(parsedData.channel, toSave)
  }

  /**
   * Get saved message history.
   */
  getSavedMessages () {
    const archive = getFormattedValues(this.chatInfo.channel, false)
    if (!archive[0]) return

    archive.forEach(arr => {
      this.receive(arr, false)
    })
  }
}
