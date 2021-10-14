'use strict'

/**
 * Creates desktop div and appends to body.
 */
function createDesktop () {
  const dsktp = document.createElement('div')
  dsktp.id = 'desktop'
  dsktp.style.width = '100vw'
  dsktp.style.height = '100vh'
  dsktp.style.margin = '2%'
  dsktp.appendChild(createIconMenu())
  document.body.appendChild(dsktp)
  document.body.style.backgroundColor = 'lightgrey'
}

/**
 * Creates wrapper for application icons.
 *
 * @returns {HTMLDivElement} Wrapper for icon elements
 */
function createIconMenu () {
  const iconWrapper = document.createElement('div')
  iconWrapper.id = 'iconContainer'
  iconWrapper.style.display = 'flex'
  iconWrapper.style.flexDirection = 'row'
  iconWrapper.style.border = '1px solid black'
  iconWrapper.style.borderRadius = '10px'
  iconWrapper.style.width = 'fit-content'
  iconWrapper.style.height = '50px'
  iconWrapper.style.padding = '5px'
  const imgFilenames = ['settings', 'message', 'dice']
  for (let i = 0; i < 3; i++) {
    iconWrapper.appendChild(createIcon(imgFilenames[i]))
  }
  return iconWrapper
}

/**
 * Create container for application icon.
 *
 * @param {string} imgFilename Filename of image
 *
 * @returns {HTMLDivElement} Container for icon
 */
function createIcon (imgFilename) {
  const icon = document.createElement('div')
  icon.id = imgFilename
  icon.style.height = '40px'
  icon.style.width = '40px'
  icon.style.margin = '5px'
  icon.appendChild(setIconImg(imgFilename))

  return icon
}

/**
 * Sets image for icons.
 *
 * @param {string} imgFilename Filename of image
 *
 * @returns {HTMLImageElement} Image element
 */
function setIconImg (imgFilename) {
  const img = document.createElement('img')
  img.src = `/images/${imgFilename}.svg`
  img.style.height = '100%'
  img.style.width = '100%'
  img.style.objectFit = 'contain'

  return img
}

export {
  createDesktop
}
