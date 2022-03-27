'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer } from '../../views/quizViews'
import { valueExists } from '../../helpers/storage'
import { getElmt, setup, startCount } from './timer'
import { Window } from '../../views/window'

/**
 * Quiz
 */
export class Quiz {
  parentWindow
  timer
  info = {
    args: [true],
    nickname: '',
    questionNum: 1,
    firstCall: true,
    altExists: false,
    nextURL: ''
  }

  /**
   * Constructor.
   */
  constructor () {
    this.parentWindow = new Window()
    setup(10, this.parentWindow.UUID)
    this.start()
  }

  /**
   * Adds application to window starting the quiz.
   */
  start () {
    this.parentWindow.addApp(getMenu(this.info.args))
    this.parentWindow.show()
    this.setNewGameListener()
  }

  /**
   * Load in functions to render the menu for the quiz.
   */
  loadMenu () {
    this.parentWindow.switchView(getMenu(this.info.args), document.getElementById(this.parentWindow.UUID).lastChild)
  }

  /**
   * Sets listener on newGame button.
   */
  setNewGameListener () {
    const that = this
    document.getElementById(this.parentWindow.UUID).lastChild.lastChild.previousSibling.addEventListener('click', () => {
      that.checkpoint()
    })
  }

  /**
   * Sets listener on sendAnswer button.
   */
  setSendAnswerListener () {
    const that = this
    document.getElementById(this.parentWindow.UUID).lastChild.lastChild.lastChild.addEventListener('click', () => {
      that.loadAnswer()
    })
  }

  /**
   * Check nickname in storage, save nickname and load in the quiz,
   * gives error message if nickname exists.
   */
  checkpoint () {
    const res = this.saveNickname()
    if (!res[0]) {
      this.info.args = res
      this.loadMenu()
      return
    }

    this.info.nickname = res[1]
    this.loadQuiz()
  }

  /**
   * Save the user given nickname to be used for storage, and call loadQuiz.
   *
   * @returns {Array} Returns false if nickname is empty or exists in local storage
   */
  saveNickname () {
    const res = []
    const chosenNickname = document.getElementById(this.parentWindow.UUID).lastChild.firstChild.nextSibling.nextSibling.value
    if (chosenNickname === '') {
      res[0] = false
      res[1] = 'Nickname cannot be empty'
      return res
    }

    if (chosenNickname) {
      if (valueExists(chosenNickname)) {
        res[0] = false
        res[1] = 'Nickname already exists'
        return res
      }
    }

    res[0] = true
    res[1] = chosenNickname
    return res
  }

  /**
   * Load in functions to render the question from the server.
   */
  async loadQuiz () {
    try {
      const [newInfo, question] = await getQuiz(getElmt(), this.info)
      this.parentWindow.switchView(question, document.getElementById(this.parentWindow.UUID).lastChild)
      startCount()
      this.setNewInfo(newInfo)
      this.setSendAnswerListener()
      this.incrementQuestionNumber()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Load in functions to check if the user given answer is correct or not.
   */
  async loadAnswer () {
    const that = this
    try {
      const resp = await checkAnswer(this.parentWindow.UUID, this.info)
      this.parentWindow.switchView(resp[1], document.getElementById(this.parentWindow.UUID).lastChild)
      console.log(resp)
      if (!resp[0]) {
        this.setNewInfo(resp[2])
        document.getElementById(this.parentWindow.UUID).lastChild.lastChild.addEventListener('click', () => {
          that.loadQuiz()
        })
      } else {
        document.getElementById(this.parentWindow.UUID).lastChild.lastChild.previousSibling.addEventListener('click', () => {
          that.restart()
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Increments the number of the question by 1.
   */
  incrementQuestionNumber () {
    this.info.questionNum++
  }

  /**
   * Restarts quiz.
   */
  restart () {
    this.info = this.resetInfo()
    this.parentWindow.removeApp()
    this.start()
  }

  /**
   * Sets the new params for the questions.
   *
   * @param {object} newInfo Object containing the info
   */
  setNewInfo (newInfo) {
    this.info.firstCall = newInfo.first
    this.info.nextURL = newInfo.next
    this.info.altExists = newInfo.alt
  }

  /**
   * Resets info to original.
   *
   * @returns {object} info object
   */
  resetInfo () {
    return {
      args: [true],
      nickname: '',
      questionNum: 1,
      firstCall: true,
      altExists: false,
      nextURL: ''
    }
  }
}
