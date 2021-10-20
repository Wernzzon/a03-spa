'use strict'
let item
let dropArea

/**
 * Drag start.
 *
 * @param {undefined} e Nothing
 */
function dragStart (e) {
  // e.dataTransfer.setData('text/plain', e.target.id)

  const style = window.getComputedStyle(e.target, null)
  e.dataTransfer.setData('text/plain',
    (parseInt(style.getPropertyValue('left'), 10) - e.clientX) + ',' +
    (parseInt(style.getPropertyValue('top'), 10) - e.clientY)
  )

  e.dataTransfer.effectAllowed = 'move'
}

/**
 * Drag Enter.
 *
 * @param {undefined} e Nothing
 */
function dragEnter (e) {
  e.preventDefault()
}

/**
 * Drag Over.
 *
 * @param {undefined} e Nothing
 *
 * @returns {boolean} False
 */
function dragOver (e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  return false
}

/**
 * Drop.
 *
 * @param {undefined} e Nothing
 *
 */
function drop (e) {
  // const id = e.dataTransfer.getData('text/plain')
  // const draggable = document.getElementById(id)
  // e.target.appendChild(draggable)

  const offset = e.dataTransfer.getData('text/plain').split(',')

  item.style.left = (e.clientX + parseInt(offset[0], 10)) + 'px'
  item.style.top = (e.clientY + parseInt(offset[1], 10)) + 'px'

  e.preventDefault()
}

/**
 * Sets all listeners for the specified id.
 *
 * @param {string} itemId Id
 */
function setEventsForId (itemId) {
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

// Skriva avtal - tid? Dagen jag börjar
// Vilket fack?
//    fackligt ombud? - Transport - Fora
// Prata om mitt schema
//    kan självklart komma in andra dagar några timmar här o där
//    kan skicka hela schemat
