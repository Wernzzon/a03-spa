'use strict'

/**
 * Makes an element draggable.
 *
 * @param {HTMLDivElement} elmnt Element to be draggable
 */
function dragElement (elmnt) {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0

  elmnt.onmousedown = dragMouseDown

  /**
   * Sets event on dragMouseDown.
   *
   * @param {Event} e Event
   */
  function dragMouseDown (e) {
    e = e || window.event
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  /**
   * Sets event onmousemove.
   *
   * @param {Event} e Event
   */
  function elementDrag (e) {
    e = e || window.event
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  /**
   * Sets event onmouseup.
   */
  function closeDragElement () {
    /* stop moving when mouse button is released: */
    document.onmouseup = null
    document.onmousemove = null
  }
}

export {
  dragElement
}
