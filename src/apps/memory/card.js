'use strict'

export class Card {
  constructor (image, backside) {
    this.img = image
    this.backsideImg = backside
    this.matched = false
    this.flipped = false
  }

  flip () {
    this.flipped = true
  }

  isMatched () {
    return this.matched
  }

  matched () {
    this.matched = true
  }

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
      holder.classList.toggle('flip')
    })
    return holder
  }
}
