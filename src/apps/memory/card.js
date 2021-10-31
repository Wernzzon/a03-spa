'use strict'

/**
 * Memorycard.
 */
export class Card {
  /**
   * Constructor to set up a memorycard.
   *
   * @param {string} image Filename of frontside of the card
   * @param {string} backside Filename of backside of the card
   */
  constructor (image, backside) {
    this.img = image
    this.backsideImg = backside
    this.matched = false
    this.flipped = false
  }

  /**
   * Sets the status if the card has been flipped or not.
   *
   * @param {boolean} value True or false
   */
  flip (value) {
    this.flipped = value
  }

  /**
   * Returns status of matched card.
   *
   * @returns {boolean} True or false
   */
  isMatched () {
    return this.matched
  }

  /**
   * Sets the status if the card has matched or not.
   *
   * @param {boolean} value True or false
   */
  matched (value) {
    this.matched = value
  }

  /**
   * Sets the frontside image and backside image and appends them into a holder.
   *
   * @returns {HTMLDivElement} Memorycard holder for front and- backside
   */
  getImg () {
    const imgElement = document.createElement('img')
    imgElement.src = `/images/memoryCards/${this.img}.png`
    imgElement.classList.add('frontside')
    imgElement.title = this.img

    const backImgElement = document.createElement('img')
    backImgElement.src = `/images/memoryCards/${this.backsideImg}.png`
    backImgElement.classList.add('backside')
    backImgElement.title = this.backsideImg

    const holder = document.createElement('div')
    holder.classList.add('cardHolder')
    holder.appendChild(imgElement)
    holder.appendChild(backImgElement)
    holder.addEventListener('click', e => {
      holder.classList.add('flip')
    })
    return holder
  }
}
