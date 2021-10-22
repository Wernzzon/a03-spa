'use strict'
let item
let dropArea

/**
 * Drag start.
 *
 * @param {undefined} e Event
 */
function dragStart (e) {
  const style = window.getComputedStyle(e.target, null)
  e.dataTransfer.setData('text/html text/javascript image/png',
    (parseInt(style.getPropertyValue('left'), 10) - e.clientX) + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - e.clientY)
  )

  e.dataTransfer.effectAllowed = 'move'
}

/**
 * Drag Enter.
 *
 * @param {undefined} e Event
 */
function dragEnter (e) {
  e.preventDefault()
}

/**
 * Drag Over.
 *
 * @param {undefined} e Event
 *
 */
function dragOver (e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

/**
 * Drop.
 *
 * @param {undefined} e Event
 *
 */
function drop (e) {
  const offset = e.dataTransfer.getData('text/html text/javascript image/png').split(',')

  item.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px'
  item.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px'

  e.preventDefault()
}

/**
 * Sets all listeners for the specified id.
 */
function setEventsForId () {
  item.addEventListener('dragstart', dragStart)

  dropArea.addEventListener('dragenter', dragEnter)
  dropArea.addEventListener('dragover', dragOver)
  dropArea.addEventListener('drop', drop)
}

/**
 * Sets params for other functions.
 *
 * @param {string} itemId Id of draggable element
 * @param {string} dropId Id of droppable area
 */
function setParams (itemId, dropId) {
  item = document.getElementById(itemId)
  dropArea = document.getElementById('desktop')
}

export {
  setEventsForId,
  setParams
}
