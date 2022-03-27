'use strict'

// Imports
import { getTopFiveTimes } from '../helpers/storage'

let checkedButton = false

/**
 * Creates HTML elements for the menu, and appends them to be visible.
 *
 * @param {Array} params If first is false an alert gets appended
 * @returns {HTMLDivElement} Menu
 */
function createMenuElements (params) {
  const container = document.createElement('div')
  container.id = 'quizMenu'

  const h1 = document.createElement('h1')
  h1.classList.add('xxLarge')
  h1.textContent = 'Welcome to the LNU quiz'

  const intro = document.createElement('p')
  intro.classList.add('large')
  intro.textContent = 'Pick a nickname and start the quiz'

  const nickname = document.createElement('input')
  nickname.id = 'nickname'
  nickname.required = true

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
  if (!params[0]) container.append(alert(params[1]))

  return container
}

/**
 * Creates HTML elements for the quiz question, and appends them to be visible.
 *
 * @param {object} data Data from server to be showen for user
 * @param {number} counter Number of question
 * @param {HTMLSpanElement} timer Timer for a question
 *
 * @returns {HTMLDivElement} Container
 */
function createQuizElements (data, counter, timer) {
  const container = document.createElement('div')
  container.id = 'quizQuestion'

  const numOfQuestion = document.createElement('p')
  numOfQuestion.id = 'numOfQuestion'
  numOfQuestion.textContent = 'Question ' + counter

  const question = document.createElement('p')
  question.id = 'question'
  question.textContent = data.question

  const time = timer

  const answerContainer = document.createElement('div')
  answerContainer.id = 'answerContainer'

  if (data.alternatives !== undefined) {
    const altWrapper = document.createElement('div')
    for (const [key, value] of Object.entries(data.alternatives)) {
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

  if (data.alternatives === undefined) {
    const textAnswer = document.createElement('input')
    textAnswer.type = 'text'
    textAnswer.id = 'answer'
    answerContainer.append(textAnswer)
  }

  answerContainer.append(createSubmitButton())

  container.append(numOfQuestion)
  container.append(question)
  container.append(time)
  container.append(answerContainer)

  return container
}

/**
 * Creates HTML elements to show status of the quiz.
 *
 * @param {string} h1Text Text for h1 tag
 * @param {string} serverMsg Message from server to be shown
 * @param {string} reloadOrNext Reload or next question text
 * @param {boolean} score Either append highscore list or not
 *
 * @returns {HTMLDivElement} Generic container-div
 */
function createGeneric (h1Text, serverMsg, reloadOrNext, score) {
  const container = document.createElement('div')

  const h1 = document.createElement('h1')
  h1.classList.add('xxLarge')
  h1.textContent = h1Text

  const message = document.createElement('h5')
  message.classList.add('large')
  message.textContent = serverMsg

  const action = document.createElement('p')
  action.classList.add('large')
  action.textContent = reloadOrNext

  container.appendChild(h1)
  container.appendChild(message)
  container.appendChild(action)
  if (score) container.appendChild(createHighscore())

  return container
}

/**
 * Creates HTML elements to show the list of highscores.
 *
 * @returns {HTMLDivElement} Div containing a highscore table
 */
function createHighscore () {
  if (document.getElementById('scoreWrapper')) document.getElementById('scoreWrapper').remove()

  const wrapper = document.createElement('div')
  wrapper.id = 'scoreWrapper'

  const scoreTitle = document.createElement('h3')
  scoreTitle.classList.add('medium')
  scoreTitle.textContent = 'Highscores'
  wrapper.appendChild(scoreTitle)

  const topFive = getTopFiveTimes()

  if (!topFive) {
    wrapper.appendChild(noScoreAvailable())
    return wrapper
  }
  wrapper.appendChild(makeTable(topFive))

  return wrapper
}

/**
 * Creates p tag if there is no scores.
 *
 * @returns {HTMLParagraphElement} Paragraph element
 */
function noScoreAvailable () {
  const noScore = document.createElement('p')
  noScore.classList.add('medium')
  noScore.textContent = 'No highscores to show!'
  return noScore
}

/**
 * Creates highscore-table.
 *
 * @param {string[]} topFive Top 5 lowest times
 * @returns {HTMLTableElement} Highscore-table
 */
function makeTable (topFive) {
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

  return table
}

/**
 * Create an alert with a message.
 *
 * @param {string} msg String to show
 *
 * @returns {HTMLParagraphElement} Alert message
 */
function alert (msg) {
  const alertMsg = document.createElement('p')
  alertMsg.classList.add('large')
  alertMsg.textContent = msg

  return alertMsg
}

/**
 * Creates a button.
 *
 * @returns {HTMLButtonElement} Submit button
 */
function createSubmitButton () {
  const submit = document.createElement('button')
  submit.type = 'button'
  submit.textContent = 'Send Answer'
  submit.id = 'sendAnswer'

  return submit
}

/**
 * Returns the button id, if any is checked otherwise false.
 *
 * @returns {string | boolean} Button id or false
 */
function getCheckedButton () {
  return checkedButton
}

export {
  createMenuElements,
  createQuizElements,
  createGeneric,
  getCheckedButton,
  alert
}
