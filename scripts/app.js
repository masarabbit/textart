function init() {

  //! refactor css - the one used to extract html seems to be inconsistent
  // add option to adjust contrast
  // add option to tweak line height etc
  
  const body = document.querySelector('body')
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const grid = document.querySelector('.grid')
  const p = document.querySelector('.info')
  const label = document.querySelector('label')
  const downloadButton = document.querySelector('.download_button')
  const downloadTextButton = document.querySelector('.download_text_button')
  const downloadHtmlLink = document.querySelector('.download_link')
  const downloadTextLink = document.querySelector('.download_text_link')
  const colorToggle = document.querySelector('.color_toggle')
  const copy = document.querySelector('.copy')

  const textOutput = document.querySelector('.text_output')

  let isDarkMode = true
  const shades = []
  let rowDatas
  let calcHeight
  let calcWidth
  // const maxWidth = 600
  // const cellSize = 4

  const maxWidth = 600
  const cellSize = 6

  // const maxWidth = 600
  // const cellSize = 8
  
    
  const gradation = [
    // .,'"
    // ❞–^~+
    '&nbsp;','&#x2e;','&#x2c;','&#x27;','&#x22;',
    '&#x275E;','&#x2013;','&#x5e;','&#x7e;','&#43;',
    
    //:;!✩*
    //(/{ic
    '&#x3a;','&#x3b;','&#x21;','&#x2729;','&#x2a;',
    '&#x28;','&#x2f;','&#x7b;','i','c',
    
    //oIvJD
    //VYSAE
    'o','I','v','J','D',
    'V','Y','S','A','E',
    
    //ZX%&@
    //#$✭❋❖
    'Z','X','&#x25;','&#x26;','&#x40;',
    '&#x23;','&#36;','&#x272D;','&#x274B;','&#x2756;',
    
    //❤✚♣¶❚
    //▲◢◉▣■
    '&#x2764;','&#x271A;','&#x2663;','&#xb6;','&#x275A;',
    '&#9650;','&#9698;','&#9673;','&#9635;','&#9632;',
    
    //■
    '&#9632;'
    // '&#9606;'
  ]

  const rawGradation = ' .,\'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■■'


  const calcShade = (r,g,b)=>{
    return Math.round(((r + g + b) / 3) / 255 * 50) // white on black
  }

  const hideMessage = () =>{
    p.classList.add('hidden')
  }

  const output = () =>{
    const uploadFile = document.querySelector('#uploadFile')
    const uploadedFiles = uploadFile.files[0]
    if (!uploadedFiles) {
      p.classList.remove('hidden')
      downloadButton.classList.add('disabled')
      downloadTextButton.classList.add('disabled')
      return
    }
    p.classList.add('hidden')
    downloadButton.classList.remove('disabled')
    downloadTextButton.classList.remove('disabled')
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
      // grid.style.width = `${calcWidth}px`
      
      //! newly adding
      textOutput.style.height = `${calcHeight - (calcHeight % cellSize)}px`
      // textOutput.style.width = `${calcWidth}px`

      //* cellX x cellY
      const column = maxWidth / cellSize
      const row = (calcHeight - (calcHeight % cellSize)) / cellSize

      // console.log('row',row, 'column',column)

      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)
      shades.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / column) * cellSize
        const x = i % column * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data

        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)
      }
      
      //! store data at this point?
      rowDatas = new Array(row).fill('').map(()=>[])
      shades.forEach((shade,i)=>{
        const index = isDarkMode ? shade : 50 - shade
        rowDatas[Math.floor(i / (maxWidth / cellSize))].push(gradation[index])
      })
      

      //! instead of inline styling, put style into the file.
      grid.innerHTML = rowDatas.map(data=>data.join('')).map(letter=>{
        return `<p class="textart">${letter}</p>`
        // return `${letter}\n`
      }).join('')

      textOutput.value = processedTexts()

      recorddownloadButton()

    }

    imageTarget.src = blobURL
  }
  
  const toggleColor = () =>{
    isDarkMode = !isDarkMode
    body.classList.toggle('light')

    if (shades.length > 0){
      rowDatas.forEach(row=>row.length = 0)
      shades.forEach((shade,i)=>{
        const index = isDarkMode ? shade : 50 - shade
        rowDatas[Math.floor(i / (maxWidth / cellSize))].push(gradation[index])
      })
      
      grid.innerHTML = rowDatas.map(data=>data.join('')).map(letter=>{
        return `<p class="textart">${letter}</p>`
      }).join('')

      recorddownloadButton()
    }
  }

  const recorddownloadButton = () =>{
    const text =  `
    <!doctype html>
    <html>
      <head>
        <title>text art :)</title>

        <style media="screen" type="text/css">
          body {
            margin: 0;
            padding: 0;    
            background-color: black;
            color: white;
            font-family: 'Courier', monospace;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          body.light {
            background-color: white;
            color: black;
          }

          p {
            display: inline-block;
            margin-block-start: 0em;
            margin-block-end: 0em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 0px;
          }

          p.textart {
            font-size: 5px;
            letter-spacing: 1px;
            line-height: 4px;
            margin: 0;
            white-space: nowrap;
          }

          .grid {
            margin: 20px 0;
            font-size: 6.6px;
            line-height: 4px;
            height: ${calcHeight - (calcHeight % cellSize)}px;
            width: ${calcWidth}px;
            word-break: break-all;
          }
        
        </style>
      </head>
      <body class=${isDarkMode ? '' : 'light'}>
        <div class="grid">
          ${grid.innerHTML}
        </div>
      </body>
    </html>
    `
    const data = new Blob([text], { type: 'text/html' })
    const url = window.URL.createObjectURL(data)
    downloadHtmlLink.download = `text_art_${new Date().getTime()}.html`
    downloadHtmlLink.href = url
  }

  const downloadWithButton = link =>{
    link.click()
  }

  // //! doesn't work
  // const convertToRtf = plain => {

  //   return '{\\rtf1\\ansi\n ' + plain + '\\par\n}'
  // }
  // // plain = plain.replace(/\n/g, '\\par\n')

  const processedTexts = () =>{
    const row = (calcHeight - (calcHeight % cellSize)) / cellSize
    const processedRowDatas = new Array(row).fill('').map(()=>[])

    shades.forEach((shade,i)=>{
      // processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(' ')
      processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(rawGradation[50 - shade])
    })
    return processedRowDatas.map(data=>data.join('')).map((letter)=>{
      return `${letter}\n`
    }).join('')
  }

  const downloadTextFile = () =>{
    // const row = (calcHeight - (calcHeight % cellSize)) / cellSize
    // const processedRowDatas = new Array(row).fill('').map(()=>[])

    // shades.forEach((shade,i)=>{
    //   // processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(' ')
    //   processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(rawGradation[50 - shade])
    // })
    // const processedTexts = processedRowDatas.map(data=>data.join('')).map((letter)=>{
    //   return `${letter}\n`
    // }).join('')
    
    // //! test
    // textOutput.value = processedTexts()

    const data = new Blob([processedTexts()], { type: 'text/rtf' })
    const url = window.URL.createObjectURL(data)
    downloadTextLink.download = `text_art_${new Date().getTime()}.txt`
    downloadTextLink.href = url
    
    downloadWithButton(downloadTextLink)

  }


  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
  }
  copy.addEventListener('click',()=>copyText(textOutput))


  outputButton.addEventListener('click', output)
  downloadButton.addEventListener('click', ()=>downloadWithButton(downloadHtmlLink))
  downloadTextButton.addEventListener('click', downloadTextFile)
  label.addEventListener('click', hideMessage)
  colorToggle.addEventListener('change', toggleColor)

}

window.addEventListener('DOMContentLoaded', init)



      //! textart with grid
      // const cellNo = new Array(row * column).fill('')
      // grid.innerHTML = cellNo.map((_cell,i)=>{
      //   return `
      //     <div 
      //       class="cell"
      //     >
      //       ${gradation[shades[i]]}
      //     </div>
      //   `
      // }).join('')

      //? style="color:${colorsFromImage[i]};"
      //? style="background-color:${colorsFromImage[i]};"

      // grid.innerHTML = cellNo.reduce((acc,_text,i)=>{
      //   return ` ${i % row === 0 ? '<p>' : ''}${acc + gradation[shades[i]]}${(i + 1) % row === 0 && i !== 0 ? '</p>' : ''}`
      // },'')


      // grid.innerHTML = cellNo.reduce((acc,_text,i)=>{
      //   return `${acc + gradation[shades[i]]}${(i + 1) % column === 0 && i !== 0 ? '\n' : ''}`
      // },'')
      