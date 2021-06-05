function init() {

  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const grid = document.querySelector('.grid')
  const p = document.querySelector('p')
  const label = document.querySelector('label')



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


  const rgb = (r,g,b) =>{
    return `rgb(${r},${g},${b})`
  }

  const calcShade = (r,g,b)=>{
    // return 50 - Math.round(((r + g + b) / 3) / 255 * 49) 
    return Math.round(((r + g + b) / 3) / 255 * 50) 
  }

  // const activate = ()=>{
  //   const uploadFile = document.querySelector('#uploadFile')
  //   const uploadedFiles = uploadFile.files[0]
  //   const blobURL = window.URL.createObjectURL(uploadedFiles)
  //   const imageTarget = new Image()

  //   imageTarget.onload = () => {
  //     if (!uploadedFiles) {
  //       outputButton.classList.add('disable')
  //       console.log('test1')
  //       return
  //     }
  //     outputButton.classList.remove('disable')
  //     console.log('test2')
  //   }
  //   imageTarget.src = blobURL
  // } 

  const hideMessage = () =>{
    p.classList.add('hidden')
  }

  const output = () =>{
    const uploadFile = document.querySelector('#uploadFile')
    const uploadedFiles = uploadFile.files[0]
    if (!uploadedFiles) {
      console.log('error')
      p.classList.remove('hidden')
      return
    }
    p.classList.add('hidden')
    const blobURL = window.URL.createObjectURL(uploadedFiles)
    const imageTarget = new Image()
    
    const colorsFromImage = []
    const shades = []
    const maxWidth = 600
    // const cellSize = 20
    const cellSize = 4
    let iHeight
    let iWidth
    

    imageTarget.onload = () => {
      iWidth = imageTarget.naturalWidth 
      iHeight = imageTarget.naturalHeight 
      const calcHeight = maxWidth * (iHeight / iWidth)
      const calcWidth = calcHeight * (iWidth / iHeight)
      canvas.setAttribute('width', calcWidth)
      // canvas.setAttribute('height', calcHeight)
      canvas.setAttribute('height', calcHeight - (calcHeight % cellSize))

      grid.style.height = `${calcHeight - (calcHeight % cellSize)}px`
      grid.style.width = `${calcWidth}px`
      // grid.style.height = `${calcHeight}px`
      
      //* cellX x cellY
      const row = maxWidth / cellSize
      const column = (calcHeight - (calcHeight % cellSize)) / cellSize

      // ctx.filter = 'brightness(200)'
      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)
      shades.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / row) * cellSize
        const x = i % row * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data

        const color = rgb(c[0],c[1],c[2])
        colorsFromImage.push(color)

        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)
      }
      // console.log('shade', shades)

      const cellNo = new Array(row * column).fill('')
      grid.innerHTML = cellNo.map((_cell,i)=>{
        return `
          <div 
            class="cell"
            
          >
            ${gradation[shades[i] - 1]}
          </div>
        `
      }).join('')
      // style="animation-delay:${i * 0.0001}s;"



      // const cells = document.querySelectorAll('.cell')
      // const changeText = (count,index) =>{ 

      //   if (count >= 50 || cells[index].dataset.id <= count) {
      //     triggerChange(index + 1)
      //     return
      //   } 
      //   if (count >= 50) return
      //   cells[index].innerHTML = gradation[count]
      
      //   setTimeout(()=>{
      //     changeText(count + 1,index)
      //   },0)
      // }

      // function triggerChange(index){
      //   if (index >= (row)) return
      //   changeText(0,index)
      // }

      // triggerChange(0)

      //?

      // const changeText = (count,index) =>{ 
      //   if (count >= 50) return
      //   cells.forEach(cell=>{
      //     if (cell.dataset.id <= count) cell.innerHTML = gradation[count]
      //   })
      //   setTimeout(()=>{
      //     changeText(count + 1,index)
      //   },0)
      // }
      // changeText()

    }

    imageTarget.src = blobURL
  }
  

  outputButton.addEventListener('click', output)
  label.addEventListener('click', hideMessage)

}

window.addEventListener('DOMContentLoaded', init)