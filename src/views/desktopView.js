'use strict'

/**
 * Creates desktop div and appends to body.
 *
 * @param {string[]} iconNames Filenames of icon-images
 */
function createDesktop (iconNames) {
  const dsktp = document.createElement('div')
  dsktp.classList.add('backgroundCover')
  dsktp.id = 'desktop'
  dsktp.appendChild(createIconMenu(iconNames))
  document.body.appendChild(dsktp)
}

/**
 * Creates wrapper for application icons.
 *
 * @param {string[]} filenames Filenames of icon-images
 *
 * @returns {HTMLDivElement} Wrapper for icon elements
 */
function createIconMenu (filenames) {
  const iconWrapper = document.createElement('div')
  iconWrapper.id = 'iconContainer'
  filenames.forEach(icon => {
    iconWrapper.appendChild(createIcon(icon))
  })
  return iconWrapper
}

/**
 * Create div for application icon.
 *
 * @param {string} imgFilename Filename of image
 *
 * @returns {HTMLDivElement} Div for icon
 */
function createIcon (imgFilename) {
  const icon = document.createElement('div')
  icon.id = imgFilename
  icon.classList.add('menuIcon')
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
  img.title = imgFilename

  return img
}

export {
  createDesktop
}
