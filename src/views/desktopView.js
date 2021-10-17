'use strict'

// Imports

/**
 * Creates desktop div and appends to body.
 */
function createDesktop () {
  const dsktp = document.createElement('div')
  dsktp.id = 'desktop'
  dsktp.style.width = '100vw'
  dsktp.style.height = '100vh'
  dsktp.style.padding = '1.6rem'
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
  iconWrapper.style.border = '0.1rem solid black'
  iconWrapper.style.borderRadius = '1rem'
  iconWrapper.style.width = 'fit-content'
  iconWrapper.style.height = '5rem'
  iconWrapper.style.padding = '0.5rem'
  const imgFilenames = ['settings', 'dice', 'message']
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
  const icon = document.createElement('button')
  icon.id = imgFilename
  icon.classList.add('menuIcon')
  icon.style.height = '4rem'
  icon.style.width = '4rem'
  icon.style.margin = '0.5rem'
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
  img.src = `/images/icons/${imgFilename}.svg`
  img.alt = imgFilename
  img.style.height = '100%'
  img.style.width = '100%'
  img.style.objectFit = 'contain'

  return img
}

export {
  createDesktop
}
