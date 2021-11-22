let setDuration
let elementId
let durationCount
let timeTaken = 0
let t
let timerIsOn = false

/**
 * Updates the HTML elements text content with
 * accordance to what the timer stands on.
 */
function timedCount () {
  if (timerDone()) return

  document.getElementById(elementId).textContent = setDuration - durationCount++
  t = setTimeout(timedCount, 1000)
}

/**
 * Sets params for timer.
 *
 * @param {number} duration Time in seconds the timer should go on for
 * @param {string} id HTML element for updates
 */
function timerElements (duration, id) {
  setDuration = duration
  elementId = id
}

/**
 * Starts timer.
 */
function startCount () {
  durationCount = 0
  if (!timerIsOn) {
    timerIsOn = true
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
  clearTimeout(t)
  timerIsOn = false
  if (setDuration === durationCount) {
    return 0
  }
  return durationCount
}

/**
 * Checks if timer is down to 0.
 *
 * @returns {boolean} Return true
 */
function timerDone () {
  if (setDuration - durationCount === 0) {
    stopCount()
    document.getElementById('sendAnswer').click()
    return true
  }
}

/**
 * Adds the time taken on a question, to get total time taken.
 */
function addTimeTaken () {
  document.getElementById('sendAnswer').addEventListener('click', (e) => {
    const returnedCount = stopCount()
    timeTaken = timeTaken + returnedCount
  })
}

/**
 * Returns the time taken on all questions.
 *
 * @returns {number} Total time taken
 */
function getTimeTaken () {
  return timeTaken
}

export {
  timerElements,
  startCount,
  stopCount,
  getTimeTaken
}
