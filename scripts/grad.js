function init() {
  
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const grid = document.querySelector('.grid')
  const p = document.querySelector('.info')
  const label = document.querySelector('label')

  const colorsFromImage = []
  const shades = []
  const maxWidth = 800
  let calcHeight
  let calcWidth
  const cellSize = 20
  
  const rgb = (r,g,b) =>{
    return `rgb(${r},${g},${b})`
  }

  const calcShade = (r,g,b)=>{
    return Math.round(((r + g + b) / 3) / 255 * 50) // white on black
  }

  const hideMessage = () =>{
    p.classList.add('hidden')
  }

  const output = () =>{
    const uploadFile = document.querySelector('#uploadFile')
    const uploadedFiles = uploadFile.files[0]
    p.classList.add('hidden')
    const blobURL = window.URL.createObjectURL(uploadedFiles)
    const imageTarget = new Image()
    
    let iHeight
    let iWidth

    imageTarget.onload = () => {
      iWidth = imageTarget.naturalWidth 
      iHeight = imageTarget.naturalHeight 
      calcHeight = maxWidth * (iHeight / iWidth)
      calcWidth = calcHeight * (iWidth / iHeight)
      canvas.setAttribute('width', calcWidth)
      canvas.setAttribute('height', calcHeight - (calcHeight % cellSize))

      grid.style.height = `${calcHeight - (calcHeight % cellSize)}px`
      grid.style.width = `${calcWidth}px`

      //* cellX x cellY
      const column = maxWidth / cellSize
      const row = (calcHeight - (calcHeight % cellSize)) / cellSize

      // console.log('row',row, 'column',column)

      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)
      shades.length = 0
      colorsFromImage.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / column) * cellSize
        const x = i % column * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data

        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)

        const color = rgb(c[0],c[1],c[2])
        colorsFromImage.push(color)
      }
      // console.log(colorsFromImage, shades, row * column)
      const cellNo = new Array(Math.round(row * column)).fill('')
      grid.innerHTML = cellNo.map((_cell,i)=>{
        return `
          <div 
            class="sq"
            style="background-color:${colorsFromImage[i]};"
          >
            <img src="/g/${shades[i]}.png" />
          </div>
        `
      }).join('')
    }
    imageTarget.src = blobURL
  }
  



  outputButton.addEventListener('click', output)
  label.addEventListener('click', hideMessage)

}

window.addEventListener('DOMContentLoaded', init)