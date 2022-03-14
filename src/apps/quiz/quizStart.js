'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer, startCount } from '../../views/quizViews'
import { nicknameExists } from './storage'
import { Window } from '../../views/window'

/**
 * Quiz
 */
export class Quiz {
  parentWindow
  info = {
    args: [true],
    checker: '',
    nickname: ''
  }

  /**
   * Constructor.
   */
  constructor () {
    this.parentWindow = new Window()
    this.parentWindow.addApp(getMenu(this.info.args))
    this.parentWindow.show()
    this.setNewGameListener()
  }

  /**
   * Load in functions to render the menu for the quiz.
   */
  loadMenu () {
    this.parentWindow.switchView(getMenu(this.info.args), document.getElementById(this.parentWindow.UUID).firstChild.nextSibling)
  }

  /**
   * Sets listener on newGame button.
   */
  setNewGameListener () {
    const that = this
    document.getElementById('newGame').addEventListener('click', () => {
      that.checkpoint()
    })
  }

  /**
   * Sets listener on sendAnswer button.
   */
  setSendAnswerListener () {
    const that = this
    document.getElementById('sendAnswer').addEventListener('click', () => {
      that.loadAnswer()
    })
  }

  /**
   * Check nickname in storage, save nickname and load in the quiz,
   * gives error message if nickname exists.
   */
  checkpoint () {
    console.log('check')
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
    const chosenNickname = document.getElementById('nickname').value
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
      this.parentWindow.switchView(getQuiz(), document.getElementById(this.parentWindow.UUID).firstChild.nextSibling)
      this.setSendAnswerListener()
      startCount()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Load in functions to check if the user given answer is correct or not.
   */
  async loadAnswer () {
    try {
      // eslint-disable-next-line no-unused-expressions
      await checkAnswer(this.parentWindow.UUID, this.info.nickname) ? '' : document.getElementById('next').addEventListener('click', this.loadQuiz)
    } catch (error) {
      console.log(error)
    }
  }
}
