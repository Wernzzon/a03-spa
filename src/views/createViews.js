'use strict'

// Imports
import { timerElements, startCount } from './timer'
import { getTopFiveTimes } from './storage'

let counter = 1
let checkedButton

/**
 * Creates HTML elements for the menu, and appends them to be visible.
 */
function createMenuElements () {
  const container = document.getElementById('container')
  container.innerHTML = ''

  const h1 = document.createElement('h1')
  h1.textContent = 'Welcome to the LNU quiz'

  const intro = document.createElement('p')
  intro.textContent = 'Pick a nickname and start the quiz'

  const nickname = document.createElement('input')
  nickname.type = 'text'
  nickname.id = 'nickname'

  const gameBtn = document.createElement('button')
  gameBtn.textContent = 'New Game'
  gameBtn.id = 'newGame'

  const scoreBtn = document.createElement('button')
  scoreBtn.textContent = 'Highscores'
  scoreBtn.id = 'highscores'
  /**
   * Append highscore list.
   */
  scoreBtn.onclick = function () {
    container.append(createHighscore())
  }
  container.append(h1)
  container.append(intro)
  container.append(nickname)
  container.append(gameBtn)
  container.append(scoreBtn)
}

/**
 * Creates HTML elements for the quiz question, and appends them to be visible.
 *
 * @param {object} params Data from server to be showed for user.
 */
function createQuizElements (params) {
  const container = document.getElementById('container')
  container.innerHTML = ''

  const numOfQuestion = document.createElement('p')
  numOfQuestion.id = 'numOfQuestion'
  numOfQuestion.textContent = 'Question ' + counter++

  const question = document.createElement('p')
  question.id = 'question'
  question.textContent = params.question

  const timer = document.createElement('span')
  timer.id = 'timer'

  const answerContainer = document.createElement('div')
  answerContainer.id = 'answerContainer'

  if (params.alternatives !== undefined) {
    const altWrapper = document.createElement('div')
    for (const [key, value] of Object.entries(params.alternatives)) {
      const alt = document.createElement('input')
      alt.type = 'radio'
      alt.id = key
      alt.value = value
      alt.name = 'alternatives'
      /**
       * Keep record of which button is checked.
       */
      alt.onclick = function () {
        checkedButton = alt.id
      }
      const label = document.createElement('label')
      label.setAttribute('for', key)
      label.textContent = value
      altWrapper.append(alt)
      altWrapper.append(label)
    }

    answerContainer.append(altWrapper)
  }

  if (params.alternatives === undefined) {
    const textAnswer = document.createElement('input')
    textAnswer.type = 'text'
    textAnswer.id = 'answer'
    answerContainer.append(textAnswer)
  }

  const button = createSubmitButton()
  answerContainer.append(button)

  container.append(numOfQuestion)
  container.append(question)
  container.append(timer)
  container.append(answerContainer)
  setupTimer(10, timer.id)
}

/**
 * Creates HTML elements to show the answer was correct, and appends them to be visible.
 *
 * @param {string} serverMsg Message from server to be shown
 *
 * @returns {boolean} false
 */
function createAnswerCorrect (serverMsg) {
  const container = document.getElementById('container')
  container.innerHTML = ''

  const h1 = document.createElement('h1')
  h1.textContent = 'Correct!'

  const h5 = document.createElement('h5')
  h5.textContent = serverMsg
  h5.id = 'serverMsg'

  const next = document.createElement('button')
  next.textContent = 'Next Question'
  next.id = 'nextQuestion'

  container.append(h1)
  container.append(h5)
  container.append(next)

  return false
}

/**
 * Creates HTML elements to show the quiz is over, and appends them to be visible.
 *
 * @param {string} serverMsg Message from server to be shown
 *
 * @returns {boolean} True
 */
function createQuizOver (serverMsg) {
  const container = document.getElementById('container')
  container.innerHTML = ''

  const h1 = document.createElement('h1')
  h1.textContent = 'GAME OVER'

  const message = document.createElement('h5')
  message.textContent = serverMsg

  const reloadInst = document.createElement('p')
  reloadInst.textContent = 'Reload page for menu'

  container.append(h1)
  container.append(message)
  container.append(reloadInst)

  return true
}

/**
 * Creates HTML elements to show the quiz is completed, and appends them to be visible.
 *
 * @param {string} serverMsg Message from server to be shown
 *
 * @returns {boolean} True
 */
function createQuizComplete (serverMsg) {
  const container = document.getElementById('container')
  container.innerHTML = ''

  const h1 = document.createElement('h1')
  h1.textContent = 'QUIZ COMPLETE'

  const message = document.createElement('h5')
  message.textContent = serverMsg

  const reloadInst = document.createElement('p')
  reloadInst.textContent = 'Reload page for menu'

  container.append(h1)
  container.append(message)
  container.append(reloadInst)
  container.append(createHighscore())

  return true
}

/**
 * Creates HTML elements to show the list of highscores.
 *
 * @returns {HTMLDivElement} Div containing a highscore table
 */
function createHighscore () {
  if (document.getElementById('scoreWrapper')) {
    document.getElementById('scoreWrapper').remove()
  }
  const wrapper = document.createElement('div')
  wrapper.id = 'scoreWrapper'

  const scoreTitle = document.createElement('h3')
  scoreTitle.textContent = 'Highscores'
  wrapper.append(scoreTitle)

  const topFive = getTopFiveTimes()
  if (topFive !== false) {
    const table = document.createElement('table')
    table.id = 'highscoreTable'

    const tBody = document.createElement('tbody')

    for (const a of topFive) {
      const row = document.createElement('tr')

      for (let i = 0; i < 2; i++) {
        const cell = document.createElement('td')
        let cellText
        if (i % 2 !== 0) {
          cellText = document.createTextNode(a[1])
        } else {
          cellText = document.createTextNode(a[0])
        }
        cell.append(cellText)
        row.append(cell)
      }
      tBody.append(row)
    }
    table.append(tBody)
    wrapper.append(table)
  } else {
    const noScore = document.createElement('p')
    noScore.textContent = 'No highscores to show!'
    wrapper.append(noScore)
  }

  return wrapper
}

/**
 * Create an alert with a message.
 *
 * @param {string} msg String to show
 */
function alert (msg) {
  const alertMsg = document.createElement('p')
  alertMsg.textContent = msg

  document.getElementById('container').append(alertMsg)
}

/**
 * Creates a button.
 *
 * @returns {HTMLButtonElement} Submit button
 */
function createSubmitButton () {
  const submit = document.createElement('button')
  submit.type = 'submit'
  submit.textContent = 'Send Answer'
  submit.id = 'sendAnswer'

  return submit
}

/**
 * Returns the button id, that is checked.
 *
 * @returns {string} Button id
 */
function getCheckedButton () {
  return checkedButton
}

/**
 * Set timer with duration and the id of the HTML element.
 *
 * @param {number} durationOfQuestion Time in seconds the timer should go on for
 * @param {string} idOfElement HTML element for updates
 */
function setupTimer (durationOfQuestion, idOfElement) {
  timerElements(durationOfQuestion, idOfElement)
  startCount()
}

export {
  createMenuElements,
  createQuizElements,
  createAnswerCorrect,
  createQuizOver,
  createQuizComplete,
  getCheckedButton,
  alert
}
