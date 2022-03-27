'use strict'

// Imports
import { getFirstQuestion, getQuestion } from './quiz'

/**
 * Get first question if firstCall is true, else get next question in quiz.
 *
 * @param {object} info info
 * @returns {object} Data from server
 */
export async function gatherInfo (info) {
  try {
    const newInfo = {
      first: false,
      next: '',
      alt: false
    }

    const response = info.firstCall ? await getFirstQuestion() : await getQuestion(info.nextURL)

    const data = await response.json()
    newInfo.next = data.nextURL
    if (info.firstCall) newInfo.first = false
    if (data.alternatives) newInfo.alt = true

    return [data, newInfo]
  } catch (err) {
    console.error(err)
  }
}
