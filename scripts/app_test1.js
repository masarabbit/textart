function init() {

  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const grid = document.querySelector('.grid')

  const gradation = [
    '','&#x2e;','&#x2c;','&#x27;','&#x22;',
    '&#x275E;','&#x2013;','&#x5e;','&#x7e;','&#43;',
    
    '&#x3a;','&#x3b;','&#x21;','&#x2729;','&#x2a;',
    '&#x28;','&#x2f;','&#x7b;','i','c',
    
    'o','I','v','J','D',
    'V','Y','S','A','E',
    
    'Z','X','&#x25;','&#x26;','&#x40;',
    '&#x23;','&#36;','&#x272D;','&#x274B;','&#x2756;',
    
    '&#x2764;','&#x271A;','&#x2663;','&#xb6;','&#x275A;',
    '&#9650;','&#9698;','&#9673;','&#9635;','&#9632;'
  ]
  // .,'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■
  // grid.innerHTML = gradation.map(letter=>{
  //   return `${letter}`
  // }).join('') + `${gradation.length}`

  
  // const rgb = (r,g,b) =>{
  //   return `rgb(${r},${g},${b})`
  // }

  const calcShade = (r,g,b)=>{
    return 50 - Math.round(((r + g + b) / 3) / 255 * 50) 
  }

  const output = () =>{
    const uploadFile = document.querySelector('#uploadFile')
    const uploadedFiles = uploadFile.files[0]
    const blobURL = window.URL.createObjectURL(uploadedFiles)
    const imageTarget = new Image()
    
    // console.log({ uploadedFiles })
    // console.log({ imageTarget })
    // const colorsFromImage = []
    const shades = []
    const maxWidth = 400
    // const cellSize = 20
    const cellSize = 4
    let iHeight
    let iWidth
    

    imageTarget.onload = () => {
      iWidth = imageTarget.naturalWidth 
      iHeight = imageTarget.naturalHeight 
      const calcHeight = maxWidth * (iHeight / iWidth)
      canvas.setAttribute('width', maxWidth)
      // canvas.setAttribute('height', calcHeight)
      canvas.setAttribute('height', calcHeight - (calcHeight % cellSize))

      grid.style.height = `${calcHeight - (calcHeight % cellSize)}px`
      // grid.style.height = `${calcHeight}px`
      
      //* cellX x cellY
      const row = maxWidth / cellSize
      const column = (calcHeight - (calcHeight % cellSize)) / cellSize

      // ctx.drawImage(imageTarget, 0, 0, maxWidth, calcHeight - (calcHeight % cellSize))
      ctx.filter = 'grayscale(100)'
      ctx.drawImage(imageTarget, 0, 0, maxWidth, calcHeight)

      // colorsFromImage.length = 0
      shades.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / row) * cellSize
        const x = i % row * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data
  
        // const color = rgb(c[0],c[1],c[2])
        // colorsFromImage.push(color)

        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)
      }
      // console.log('color',colorsFromImage)
      console.log('shade', shades)

      const cellNo = new Array(row * column).fill('')
      // style="background-color:${colorsFromImage[i]};"
      grid.innerHTML = cellNo.map((_cell,i)=>{
        console.log(i,shades[i],gradation[shades[i]])
        return `
          <div 
            class="cell"
          >
            ${gradation[shades[i] - 1]}
          </div>
        `
      }).join('')
    }
    imageTarget.src = blobURL


    // setTimeout(()=>{
    //   ctx.drawImage(imageTarget, 0, 0, maxWidth, maxWidth * (iHeight / iWidth))
    //   // textOutput[0].style.padding = '10px'
    //   // textOutput[0].innerHTML = canvas.toDataURL()
      
    //   var imgData = ctx.getImageData(0, 0, maxWidth, maxWidth * (iHeight / iWidth))
    //   // textOutput[1].style.padding = '10px'
    //   // textOutput[1].innerHTML = imgData.data
    //   console.log(imgData)

    // },200)
  }
  

  outputButton.addEventListener('click', output)

}

window.addEventListener('DOMContentLoaded', init)