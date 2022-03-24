'use strict'

/**
 * Timer
 */
export class Timer {
  elmt
  info = {
    setDuration: 0,
    durationCount: 0,
    timeTaken: 0,
    t: 0,
    timerIsOn: false,
    id: '',
    inQuizOrMemory: true
  }

  /**
   * Constructor.
   *
   * @param {number} duration Duration of timer in seconds
   * @param {string} id Id of window
   * @param {boolean} quizOrGame Whether or not the timer is for the quiz or memory
   */
  constructor (duration, id, quizOrGame) {
    this.info.setDuration = duration
    this.info.id = id
    this.info.inQuizOrMemory = quizOrGame
    this.elmt = document.createElement('span')
  }

  /**
   * Updates the HTMLSpanElement with accordance
   * to what the timer stands on.
   */
  timedCount () {
    if (this.timerIsDone()) return

    this.elmt.textContent = this.info.setDuration - this.info.durationCount++
    this.info.t = setTimeout(this.timedCount, 1000)
  }

  /**
   * Starts timer.
   */
  startCount () {
    this.info.durationCount = 0
    if (!this.info.timerIsOn) {
      this.info.timerIsOn = true
      this.timedCount()
    }
    this.addTimeTaken()
  }

  /**
   * Stops timer and clear timeout.
   *
   * @returns {number} Duration it took to answer a question
   */
  stopCount () {
    clearTimeout(this.info.t)
    this.info.timerIsOn = false
    if (this.info.setDuration === this.info.durationCount) return 0
    return this.info.durationCount
  }

  /**
   * Checks if timer is down to 0.
   *
   * @returns {boolean} Return true
   */
  timerIsDone () {
    if (this.info.setDuration - this.info.durationCount === 0) {
      this.stopCount()
      document.getElementById(this.info.id).lastChild.lastChild.lastChild.click()
      return true
    }
  }

  /**
   * Adds the time taken on a question, to get total time taken.
   */
  addTimeTaken () {
    const that = this
    document.getElementById(this.info.id).lastChild.lastChild.lastChild.addEventListener('click', () => {
      that.info.timeTaken += that.stopCount()
    })
  }

  /**
   * Getter for accumulated time.
   *
   * @returns {number} Time taken
   */
  get timeTaken () {
    return this.info.timeTaken
  }

  /**
   * Getter for the HTMLSpanElement.
   *
   * @returns {HTMLSpanElement} Timer element
   */
  get timerElement () {
    return this.elmt
  }
}
