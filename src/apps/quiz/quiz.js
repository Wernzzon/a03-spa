'use strict'

/**
 * Get the first question in the quiz.
 *
 * @returns {Promise<Response>} Response from server
 */
async function getFirstQuestion () {
  const url = 'https://courselab.lnu.se/question/1'
  const response = await fetch(url)

  if (!response.ok) {
    const data = await response.json()

    console.log(response)
    console.log(JSON.stringify(data, null, 4))

    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

/**
 * Sends POST with answer, checks the HTTP status.
 *
 * @param {string} url URL to be sent to
 * @param {object} answer Answer to check if correct or not
 *
 * @returns {Promise<Array>} Data from server response
 */
async function sendQuestionResponsePost (url, answer) {
  const data = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(answer)
  }

  try {
    const response = await fetch(url, data)
    const parsedData = await response.json()

    if (response.status !== 200) {
      return ['GameOver', parsedData.message]
    }

    if (!response.ok) {
      console.log(response)
      console.log(JSON.stringify(parsedData, null, 4))

      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return parsedData
  } catch (error) {
    console.error(error)
  }
}

/**
 * GET to provided url, to get the next question.
 *
 * @param {string} url URL of API to send to
 *
 * @returns {Promise<Response>} Response from server
 */
async function getQuestion (url) {
  const response = await fetch(url)

  if (!response.ok) {
    const data = await response.json()

    console.log(response)
    console.log(JSON.stringify(data, null, 4))

    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export {
  getFirstQuestion,
  sendQuestionResponsePost,
  getQuestion
}
