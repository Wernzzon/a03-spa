'use strict'

/**
 * Helper function for drag and drop events.
 *
 * @param {string} itemId Id of item to be dragged and dropped
 */
export function helper (itemId) {
  const item = document.getElementById(itemId)
  const desktop = document.getElementById('desktop')

  /**
   * Drag start.
   *
   * @param {undefined} e Nothing
   */
  function dragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    // const style = window.getComputedStyle(event.target, null)

    // event.dataTransfer.setData('text/plain',
    //   (parseInt(style.getPropertyValue('left'), 10) - event.clientX) + ',' +
    //   (parseInt(style.getPropertyValue('top'), 10) - event.clientY)
    // )

    e.dataTransfer.dropEffect = 'move'
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
   */
  function dragOver (e) {
    e.preventDefault()
  }

  /**
   * Drop.
   *
   * @param {undefined} e Nothing
   */
  function drop (e) {
    const id = e.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)
    e.target.appendChild(draggable)

    // const offset = event.dataTransfer.getData('text/plain').split(',')

    // item.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px'
    // item.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px'

    // event.preventDefault()
  }

  item.addEventListener('dragstart', dragStart)

  desktop.addEventListener('dragenter', dragEnter)
  desktop.addEventListener('dragover', dragOver)
  desktop.addEventListener('drop', drop)
}
