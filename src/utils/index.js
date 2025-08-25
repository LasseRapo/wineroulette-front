export function generateUniqueID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b }
}

export function generateRandomHexColor() {
  
  // 255 is maximum value for each color channel
  const {r, g, b} = {
    r: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256)
  }

  return rgbToHex(r, g, b)
}

export function calculateLuminance(r, g, b) {
  // rec. 709 standard luminance formula 
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
} 

export function calculateLuminanceHex(hex) {
  const {r, g, b} = hexToRgb(hex) 
  return calculateLuminance(r, g, b)
}

export function calculateRotations(minSpin, maxSpin) {
  const offset = Math.floor(Math.random() * 360)
  const rotationDeg = (minSpin + Math.floor(Math.random() * maxSpin)) * 360 + offset

  return [rotationDeg, offset]
}

export function polar(cx, cy, r, angle) {

  // Angle is given in degrees so it must be converted first into radians
  const rad = (angle * Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}


export function generateLinearGradient(startHex='#000000', endHex='#ffffff', objects, cyclical=false) {
  /* generates the linear gradient, where:
       startHex - hex code of starting color
       endHex - hex code of ending color
       objects - list of sector objects

       TODO: Implement this bellow
       cyclical - determines if gradient is flipped 
                  in midway point, useful when sectors
                  are visualized in circular format
  */

  const startRGB = hexToRgb(startHex)
  const endRGB = hexToRgb(endHex)
  const numObjects = objects.length
  const midPoint = Math.floor(numObjects / 2)

  const gradientObjects = objects.map((obj, i) => {
    let gradientPos
    
    if (i < midPoint) {
      // Continue normal linear gradient
      gradientPos = i / (midPoint)
    } 
    else {
      // Flip the gradient around
      gradientPos = (i - midPoint) / (numObjects - midPoint)
      gradientPos = 1 - gradientPos
    }


    const interpolatedR = Math.round(startRGB.r + (endRGB.r - startRGB.r) * gradientPos)
    const interpolatedG = Math.round(startRGB.g + (endRGB.g - startRGB.g) * gradientPos)
    const interpolatedB = Math.round(startRGB.b + (endRGB.b - startRGB.b) * gradientPos)

    const colorHex = rgbToHex(interpolatedR, interpolatedG, interpolatedB)

    return {...obj, color: colorHex}
  })

  return gradientObjects
}

export function wrapText(text, maxCharPerLine) {
  // Wrap text based on words (TODO: implement also character based solution if necessary)

  const words = text.split(' ')
  let lines  = []
  let currentLine = ""

  words.forEach(word => {
   if( (currentLine + " " + word).trim().length <= maxCharPerLine ) {
    currentLine = (currentLine + " " + word).trim()
   } else {
    if( currentLine.length > 0) lines.push(currentLine)
    currentLine = word
   }
  })

  if (currentLine.length > 0) lines.push(currentLine)
  
  return lines

}


export function generateRadialGradient() { 
  // do nothing 
}