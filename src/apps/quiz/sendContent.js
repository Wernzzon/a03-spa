'use strict'

// Imports
import { sendQuestionResponsePost } from './quiz'

/**
 * Sends POST to provided URL, to get an answer back.
 *
 * @param {string} urlToSendTo URL of API to send to
 * @param {string} userAnswer Answer to send with POST
 *
 * @returns {Array} Data from server response
 */
async function sendAnswerToServer (urlToSendTo, userAnswer) {
  try {
    const body = {
      answer: userAnswer
    }

    const data = await sendQuestionResponsePost(urlToSendTo, body)

    if (Object.keys(data).length === 1) {
      return ['Complete', data.message]
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  sendAnswerToServer
}
