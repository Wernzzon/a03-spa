'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer, startCount, resetInfo } from '../../views/quizViews'
import { nicknameExists } from './storage'
import { Window } from '../../views/window'

/**
 * Quiz
 */
export class Quiz {
  parentWindow
  info = {
    args: [true],
    nickname: '',
    questionNum: 1
  }

  /**
   * Constructor.
   */
  constructor () {
    this.parentWindow = new Window()
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
    console.log(chosenNickname)
    if (chosenNickname === '') {
      res[0] = false
      res[1] = 'Nickname cannot be empty'
      return res
    }

    if (chosenNickname) {
      if (nicknameExists(chosenNickname)) {
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
      this.parentWindow.switchView(await getQuiz(this.info.questionNum), document.getElementById(this.parentWindow.UUID).lastChild)
      this.setSendAnswerListener()
      startCount()
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
      const resp = await checkAnswer(this.parentWindow.UUID, this.info.nickname)
      this.parentWindow.switchView(resp[1], document.getElementById(this.parentWindow.UUID).lastChild)
      if (!resp[0]) {
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
    resetInfo()
    this.parentWindow.removeApp()
    this.start()
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
      questionNum: 1
    }
  }
}
