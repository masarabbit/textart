function init() {
  
  const body = document.querySelector('body')
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const outputButton = document.querySelector('.output')
  const p = document.querySelector('.info')
  const label = document.querySelector('label')
  const colorToggle = document.querySelector('.color_toggle')
  const copy = document.querySelector('.copy')
  const plusMinus = document.querySelectorAll('.plus_minus')
  const settings = document.querySelectorAll('.number')
  const contrast = document.querySelector('.contrast')
  const brightness = document.querySelector('.brightness')
  const nameOutput = document.querySelector('.name_output')
  const textOutput = document.querySelector('.text_output')
  const uploadFile = document.querySelector('#upload_file')

  const gradation = ' .,\'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■■'
  const shades = []
  const maxWidth = 600
  const cellSize = 6
  let uploadedFile

  let isDarkMode = false
  let calcHeight
  let calcWidth
  let imgDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADCUlEQVRoQ+2ZXVbCMBCF6SpkCfgk7siluSPhSZaAq6jnRi4OY/4zASzpi+dI2s6Xe2cySad5nufVA13TAF642kPhhQu8GgoPhRc2A8PSCxP0D85QeCi8sBkYll6YoKNoDUvfi6X3r5ML5eXD9nzCTGGrAPGc7e532q0PZEyBEehuW6eKBiXy3QJP048FcZUGiXs5UV/759V6e6h6Tk46miq8ft+4dyLgXGjAcixgcR3fDs7Wuc/IAeUYM2AGywfnQPtgCWxdrEyBkX8I0AetZ5+qhWBLHVKiLsaaKKyBYcnQksJc1zZm4Li3l7pmwIA47jYu93zBauVjquSkQqmqcryJwrLKyodLUFZeTIy+8Bv+3xvWTGFYGhX66eXTsYQKGO0cgk5VZZ0ONUqbKsxlyaeg/F8NsCxyLeDNwAyEeRya9Zilc5YyCeyseWp0Uq7Q8ZgAnyvsKQ99Cl4ofKri2hGxHOaEIm2QMvxbmvdNwMxdFp2cnOKSdVZVdGf4n0+xEGyOM0wV9tmY1sWLqLScEB+wVElbl/aNuaZE5SaFuRzJHtqnsg6W0LiPweolTCodqw8lsM3LkgbGA6kwdj/YAKSU0b/jfr3FDAGXwjYDh+xGBVPAPjforaGlut2AqXSqWoc6Lrk9tFTXBDinqORUb04S7IyL++EYcKiqx97XVLTkg3mmFeq2cqF9S42lrc2AU51WKTAVl/tnqC8ntOYoyAS4B6wEDq33pW3l3eUwXSCrvGxg5LJXA2sCLDf/FvkrOzFf4apZe2U6NVuawCX9dCqftcIYL/O3BboJmJuH2nU3Bc6ui+P4RaLWzs2W7gksYS1AOWlNCsvqyQAt8lgWp5rmomvjwZOHc4X1HNKlrOv7vSVPuwJfVMDTZ5PUsSxPK2KB/StggORAh8b1gm0uWj6FYp9QuAvifb6vDzXtYknKNBWt0It4MOCKT+TMSuY/Dwysi5SO0Ry4tO/V43vauYul3UPFx/EcxeT4lqYix9rmCue89JZjBvAtZ/8a7x4KX2OWb/mOh1P4Gyi2AnoOdUU1AAAAAElFTkSuQmCC'


  const processedTexts = () =>{
    const row = (calcHeight - (calcHeight % cellSize)) / cellSize
    const processedRowDatas = new Array(row).fill('').map(()=>[])
    shades.forEach((shade,i)=>{
      const index = isDarkMode ? shade : 50 - shade
      processedRowDatas[Math.floor(i / (maxWidth / cellSize))].push(gradation[index])
    })
    return processedRowDatas.map(data=>data.join('')).map((letter)=>{
      return `${letter}\n`
    }).join('')
  }

  const calcShade = (r,g,b)=>{
    return Math.round(((r + g + b) / 3) / 255 * 50) // white on black
  }

  const hideMessage = () =>{
    p.classList.add('hidden')
  }

  const drawImageAndRecordShades = (dataURL,update) =>{
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
      textOutput.style.height = `${calcHeight - (calcHeight % cellSize)}px`

      const column = maxWidth / cellSize
      const row = (calcHeight - (calcHeight % cellSize)) / cellSize
      ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`

      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)
      if (update) imgDataURL = canvas.toDataURL()
      shades.length = 0
      
      for (let i = 0; i < row * column; i++) {
        const y = Math.floor(i / column) * cellSize
        const x = i % column * cellSize
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data
        const shade = calcShade(c[0],c[1],c[2])
        shades.push(shade)
      }
      textOutput.value = processedTexts()
    }
    imageTarget.src = dataURL
  }

  const isValidFile = file =>{
    return !!(file.split('.')[1].toLowerCase() === 'jpg' ||
              file.split('.')[1].toLowerCase() === 'jpeg' ||
              file.split('.')[1].toLowerCase() === 'png' ||
              file.split('.')[1].toLowerCase() === 'gif')
  }

  uploadFile.addEventListener('change',()=>{
    uploadedFile = uploadFile.files[0]
    nameOutput.innerHTML = isValidFile(uploadedFile.name) ? uploadedFile.name : 'not valid file'
  })

  const output = () =>{
    if (!uploadedFile) {
      p.classList.remove('hidden')
      return
    }
    p.classList.add('hidden')
    const blobURL = window.URL.createObjectURL(uploadedFile)
    drawImageAndRecordShades(blobURL,true)
  }
  
  const toggleColor = () =>{
    isDarkMode = !isDarkMode
    body.classList.toggle('light')
    if (!calcHeight) return
    textOutput.value = processedTexts()
  }

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
  }

  // event
  copy.addEventListener('click',()=>copyText(textOutput))
  outputButton.addEventListener('click', output)
  label.addEventListener('click', hideMessage)
  colorToggle.addEventListener('change', toggleColor)

  plusMinus.forEach(button=>{
    button.addEventListener('click',(e)=>{
      if (e.target.dataset.setting === 'contrast'){
        contrast.value = +contrast.value + +e.target.dataset.no * 10
        contrast.value = +contrast.value < 0 ? 0 : contrast.value
      }
      if (e.target.dataset.setting === 'brightness'){
        brightness.value = +brightness.value + +e.target.dataset.no * 10
        brightness.value = +brightness.value < 0 ? 0 : brightness.value
      }
      if (imgDataURL) drawImageAndRecordShades(imgDataURL,false)
    })
  })

  settings.forEach(setting=>{
    setting.addEventListener('change',()=>{
      drawImageAndRecordShades(imgDataURL,false)
    })
  })

  drawImageAndRecordShades(imgDataURL,false)
}

window.addEventListener('DOMContentLoaded', init)
