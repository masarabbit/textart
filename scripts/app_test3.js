function init() {

  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const grid = document.querySelector('.grid')
  const p = document.querySelector('.info')
  const label = document.querySelector('label')
  const downloadTxt = document.querySelector('.download_txt')
  
    
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
  ]

  const rawGradation = ' .,\'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■■'

  
  // .,'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■

  // const rgb = (r,g,b) =>{
  //   return `rgb(${r},${g},${b})`
  // }

  const calcShade = (r,g,b)=>{
    // return 50 - Math.round(((r + g + b) / 3) / 255 * 50) //? black on white
    return Math.round(((r + g + b) / 3) / 255 * 50) //? white on black
  }

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
    
    // const colorsFromImage = []
    const shades = []
    const maxWidth = 600
    // const cellSize = 20
    const cellSize = 4
    let iHeight
    let iWidth
    // const ratio = 4 / 6.6
    // grid.style.lineHeight = `${cellSize}px`
    // grid.style.fontSize = `${cellSize / ratio}px`

    imageTarget.onload = () => {
      iWidth = imageTarget.naturalWidth 
      iHeight = imageTarget.naturalHeight 
      const calcHeight = maxWidth * (iHeight / iWidth)
      const calcWidth = calcHeight * (iWidth / iHeight)
      canvas.setAttribute('width', calcWidth)
      canvas.setAttribute('height', calcHeight - (calcHeight % cellSize))

      grid.style.height = `${calcHeight - (calcHeight % cellSize)}px`
      grid.style.width = `${calcWidth}px`

      //* cellX x cellY
      const column = maxWidth / cellSize
      const row = (calcHeight - (calcHeight % cellSize)) / cellSize

      console.log('row',row, 'column',column)

      // ctx.filter = 'brightness(200)'
      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)
      shades.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / column) * cellSize
        const x = i % column * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data

        // const color = rgb(c[0],c[1],c[2])
        // colorsFromImage.push(color)

        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)
      }

      // ${gradation[shades[i]]}
      
      //! ascii with grid
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
      
      //! ascii with rows
      const rowDatas = new Array(row).fill('').map(()=>[])
      shades.forEach((shade,i)=>{
        rowDatas[Math.floor(i / (maxWidth / cellSize))].push(gradation[shade])
      })
      

      //! instead of inline styling, put style into the file.
      grid.innerHTML = rowDatas.map(data=>data.join('')).map(letter=>{
        return `<p class="ascii">${letter}</p>`
        // return `${letter}\n`
      }).join('')

      recordDownloadTxt(
        `
        <!doctype html>
        <html>
          <head>
            <title>ascii artwork :)</title>

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

              p {
                display: inline-block;
                margin-block-start: 0em;
                margin-block-end: 0em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                padding-inline-start: 0px;
              }

              p.ascii {
                font-size: 5px;
                letter-spacing: 1px;
                line-height: 4px;
                margin: 0;
                white-space: nowrap;
              }

              .grid {
                width: 400px;
                height: 0px;
                margin: 20px 0;
                font-size: 6.6px;
                line-height: 4px;
                height: ${calcHeight - (calcHeight % cellSize)}px;
                width: ${calcWidth}px;
                word-break: break-all;
              }
            
            </style>
          </head>
          <body>
            <div class="grid">
              ${grid.innerHTML}
            </div>
          </body>
        </html>
        `)

    
      //! processing file for txt file
      // const processedRowDatas = new Array(row).fill('').map(()=>[])
      // shades.forEach((shade,i)=>{
      //   processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(rawGradation[50 - shade])
      // })
      // const processedTexts = processedRowDatas.map(data=>data.join('')).map((letter)=>{
      //   // if (i % 2 !== 0) return '' //! returns every other lines
      //   return `${letter}\n`
      // }).join('')

      // const pref = `{ \\rtf1 \\ansi \\ansicpg1252 \\cocoartf2513
      //   \\cocoatextscaling0 \\cocoaplatform0{ \\fonttbl \\f0 \\fmodern \\fcharset0 Courier; \\f1 \\fnil \\fcharset0 Menlo-Regular;}
      //  { \\colortbl; \\red255 \\green255 \\blue255;}
      //  { \\* \\expandedcolortbl;;}
      //   \\paperw11900 \\paperh16840 \\margl1440 \\margr1440 \\vieww25900 \\viewh16520 \\viewkind0
      //   \\pard \\tx720 \\tx1440 \\tx2160 \\tx2880 \\tx3600 \\tx4320 \\tx5040 \\tx5760 \\tx6480 \\tx7200 \\tx7920 \\tx8640 \\sl120 \\slmult1 \\pardirnatural \\partightenfactor0`

      // recordDownloadTxt(processedTexts)


      
      // const enterText = limit =>{
      //   if (limit > (row * column)) return
      //   const text = cellNo.reduce((acc,_text,i)=>{
      //     if (i > limit) return `${acc}`
      //     return `${acc + gradation[shades[i]]}${i % row === 0 && i !== 0 ? '\n' : ''}`
      //   },'')
  
      //   grid.innerHTML = text

      //   setTimeout(()=>{
      //     enterText(limit + (row / cellSize) * 2)
      //   },5)
      // }
      
      // enterText(0)

    }

    imageTarget.src = blobURL
  }
  
  const recordDownloadTxt = text =>{
    // const data = new Blob([text], { type: 'text/rtf' })
    const data = new Blob([text], { type: 'text/html' })
    const url = window.URL.createObjectURL(data)
    const download = document.querySelector('.download_link')
    // download.download = `file-${new Date().getTime()}.txt`
    download.download = `file_${new Date().getTime()}.html`
    download.href = url
    // download.click()
  }

  const downloadWithButton = ()=>{
    const download = document.querySelector('.download_link')
    download.click()
  }
  outputButton.addEventListener('click', output)
  downloadTxt.addEventListener('click', downloadWithButton)
  label.addEventListener('click', hideMessage)

}

window.addEventListener('DOMContentLoaded', init)