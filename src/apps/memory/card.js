'use strict'

/**
 * Memory card
 */
export class Card {
  /**
   * Constructor to set up a memorycard.
   *
   * @param {string} image Filename of frontside of the card
   * @param {string} backside Filename of backside of the card
   */
  constructor (image, backside) {
    this.card = document.createElement('div')
    this.img = image
    this.backsideImg = backside
    this.makeCard()
  }

  /**
   * Returns the name of the image.
   *
   * @returns {string} Name of image
   */
  getImg () {
    return this.img
  }

  /**
   * Returns this memory-card.
   *
   * @returns {HTMLDivElement} Complete memory-card
   */
  getCardElement () {
    return this.card
  }

  /**
   * Sets the frontside image and backside image and appends them into a holder.
   */
  makeCard () {
    const imgElement = document.createElement('img')
    imgElement.src = `/images/memoryCards/${this.img}.png`
    imgElement.classList.add('frontside')

    const backImgElement = document.createElement('img')
    backImgElement.src = `/images/memoryCards/${this.backsideImg}.png`
    backImgElement.classList.add('backside')

    this.card.classList.add('cardHolder')
    this.card.appendChild(imgElement)
    this.card.appendChild(backImgElement)
  }
}
