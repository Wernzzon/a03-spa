'use strict'

let elmt
const info = {
  setDuration: 0,
  durationCount: 0,
  timeTaken: 0,
  t: 0,
  timerIsOn: false,
  id: ''
}

/**
 * Constructor.
 *
 * @param {number} duration Duration of timer in seconds
 * @param {string} id Id of window
 */
function setup (duration, id) {
  info.setDuration = duration
  info.id = id
}

/**
 * Updates the HTMLSpanElement with accordance
 * to what the timer stands on.
 */
function timedCount () {
  if (timerIsDone()) {
    stop()
    return
  }
  elmt.textContent = info.setDuration - info.durationCount++
  info.t = setTimeout(timedCount, 1000)
}

/**
 * Starts timer.
 */
function startCount () {
  info.durationCount = 0
  if (!info.timerIsOn) {
    info.timerIsOn = true
    timedCount()
  }
  addTimeTaken()
}

/**
 * Stops timer and clear timeout.
 *
 * @returns {number} Duration it took to answer a question
 */
function stopCount () {
  clearTimeout(info.t)
  info.timerIsOn = false
  if (info.setDuration === info.durationCount) return 0
  return info.durationCount
}

/**
 * Checks if timer is down to 0.
 *
 * @returns {boolean} True or false
 */
function timerIsDone () {
  return info.setDuration - info.durationCount === 0
}

/**
 * Stops timer and clicks button to send answer.
 */
function stop () {
  stopCount()
  document.getElementById(info.id).lastChild.lastChild.lastChild.click()
}

/**
 * Adds the time taken on a question, to get total time taken.
 */
function addTimeTaken () {
  document.getElementById(info.id).lastChild.lastChild.lastChild.addEventListener('click', () => {
    info.timeTaken += stopCount()
  })
}

/**
 * Getter for accumulated time.
 *
 * @returns {number} Time taken
 */
function getTimeTaken () {
  return info.timeTaken
}

/**
 * Getter for the HTMLSpanElement.
 *
 * @returns {HTMLSpanElement} Timer element
 */
function getElmt () {
  elmt = document.createElement('span')
  return elmt
}

export {
  getElmt,
  getTimeTaken,
  setup,
  startCount
}
