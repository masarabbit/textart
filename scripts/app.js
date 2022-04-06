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
  const textOutput = document.querySelector('textarea')
  const uploadFile = document.querySelector('#upload_file')
  const radioInputs = document.querySelectorAll('.radio_input')

  // const gradation = ' .,\'"❞–^~+:;!✩*(/{icoIvJDVYSAEZX%&@#$✭❋❖❤✚♣¶❚▲◢◉▣■'
  const gradation = ' .,\`\'"–^~+:;!?>*(/{ilconmvsILJODVYSAZKXFEGHBM%&@#$'
  const shades = []
  const size_stat = {
    xs: {
      cellD: 3,
      ratio: 0.01
    },
    sm: {
      cellD: 4,
      ratio: 0.05
    },
    md: {
      cellD: 8,
      ratio: 2,
    },
    lg: {
      cellD: 8,
      ratio: 9.3
    }
  }
  const defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDCAYAAABqS6DaAAAAAXNSR0IArs4c6QAAFV5JREFUeF7t3AWobVW3B/Bpd3d3dweKfna3Yis2KgYodqCigoFgYmNiB7bYYnd3d3fH4zd5/8O6233O2ffcfY/3ve9OOOxaa84xx3/0HOuM8vfff/9dRo4RhgOjjARkhMGiEjISkBELj5GAjGB4jARkJCAjGgdGMHpG+pCRgIxgHBjByBmpIaUUqdhWW21VllhiibLvvvv+qxD9VwNyww03lA033LCMOuqoZaGFFiovvPBCGWWUUcpXX31Vxh133H8FmP9aQKaccsryxRdfVO248847y2STTVZBWWaZZer3b7755v8vQF599dUy33zzlWmmmaYsueSSZccddyxrrbXWv7LJ5qL33Xdf2WSTTco333xTLr300jLmmGOWueeeu8w222xljDHGKO+9916ZaaaZyuWXX14233zzQad3uGnIOOOMU37//ffy559/1k2NPvro9f3ZZ59ddtppp0HfqAWZoZ9//rmg7bLLLqs0zDjjjBWASSedtJorY7TRRiuTTDJJ1ZTBHsMFkCmmmKKMN9545Z133ik//PBDGX/88eu+5p9//vLyyy9XcH799ddB3esEE0xQlltuubLrrrv2rDvhhBOWWWaZpcw888w9YPhx9dVXL3fccUc1Z4M9hgsgACCJJGziiSceYrM2SEJ/+eWX8tdff/3jt4Ey4I8//qgC8Omnn5Z55523SnjG0UcfXfxde+21VUsxeqyxxiqzzjprmXrqqctEE000xLJPP/102XrrrcuLL744UHIGfF/XAbnkkkvKdtttVxlusMut48svv6xM++yzzypgX3/9ddsNYB5nO88885Sxxx67sP/mA/iPP/5YNY1Z5KMw0Zp8AnB8P/3005cPP/ywXnfllVf2mE2ATD755NVczTDDDG2FYvbZZy/77bdf2W233QbM3IHc2HVATjvttLLPPvuUTz75pNpi0iesbDc222yzctVVV1Umen/++eeXI488spx88snVpMVk0CimhURPO+205T//+U+1+eb1BwDaZgARGIb7/d40Pa4DEL8BWM683TA/0ys4GczRdUDCgEgmO026exsY8tZbb9Wf55xzzsoEDDzmmGOqv9l99917bv3888/Lc889V5nOAWO81zD8t99+G+IzWmIW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'
  const imgData = {
    size: 'md',
    maxWidth: 0,
    imgDataURL: defaultImg,
    cellD: 8,
    calcHeight: null,
    calcWidth: null,
    ratio: 1,
    column: 0,
    row: 0,
    isDarkMode: false,
    uploadedFile: null,
  }


  const processedTexts = ({ column, row }) =>{
    const processedRowDatas = new Array(row).fill('').map(()=> [])
    shades.forEach((shade, i)=>{
      const index = imgData.isDarkMode ? shade : 49 - shade
      processedRowDatas[Math.floor(i / column)]?.push(gradation[index])
    })
    return processedRowDatas.map(data => data.join('')).map(letter =>`${letter}\n`).join('')
  }

  const nearestN = (n, denom) => n === 0 ? 0 : (n - 1) + Math.abs(((n - 1) % denom) - denom)

  const calcShade = (r, g, b) => Math.round(((r + g + b) / 3) / 255 * 49) // white on black

  const drawImageAndRecordShades = ({ dataURL, update }) =>{
    const imageTarget = new Image()    
    imageTarget.onload = () => {
      const { naturalWidth: iWidth, naturalHeight: iHeight } = imageTarget
      imgData.calcWidth = imgData.maxWidth
      imgData.calcHeight = Math.round(imgData.maxWidth / (iWidth / iHeight))
      const { cellD, calcWidth, calcHeight } = imgData
      canvas.width = calcWidth
      canvas.height = calcHeight

      imgData.column = nearestN(imgData.maxWidth, cellD) / cellD
      imgData.row = (calcHeight - (calcHeight % cellD)) / cellD

      if (update) imgData.imgDataURL = dataURL
      ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`
      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)

      shades.length = 0
      const { column, row } = imgData
      new Array(row * column).fill('').forEach((_a, i)=>{
        const y = Math.floor(i / column) * cellD
        const x = i % column * cellD
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data
        const shade = calcShade(c[0], c[1], c[2])
        c[3] === 0
          ? shades.push(49)
          : shades.push(shade)
      })
      textOutput.value = processedTexts({ column, row })
      textOutput.style.height = '0px' // reset height
      textOutput.style.height = `${textOutput.scrollHeight}px`
    }
    imageTarget.src = dataURL
  }
  
  const isValidFile = file =>{
    return ['jpg','jpeg','png','gif'].some(type => file.split('.')[1].toLowerCase() === type)
  }

  uploadFile.addEventListener('change',()=>{
    imgData.uploadedFile = uploadFile.files[0]
    nameOutput.innerHTML = isValidFile(imgData.uploadedFile.name) ? imgData.uploadedFile.name : 'not valid file'
  })

  const output = () =>{
    if (imgData.uploadedFile) {
      p.classList.add('hidden')
      const blobURL = window.URL.createObjectURL(imgData.uploadedFile)
      drawImageAndRecordShades({ dataURL:blobURL, update:true })
    } else {
      p.classList.remove('hidden')
    }
  }
  
  const toggleColor = () =>{
    imgData.isDarkMode = !imgData.isDarkMode
    body.classList.toggle('light')
    const { column, row } = imgData
    if (column) {
      textOutput.value = processedTexts({ column, row })
      textOutput.style.height = `${textOutput.scrollHeight}px`
    }
  }

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 99999) // For mobile devices 
    document.execCommand('copy')
  }

  // event
  copy.addEventListener('click',()=> copyText(textOutput))
  outputButton.addEventListener('click', output)
  label.addEventListener('click', ()=> p.classList.add('hidden'))
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
      drawImageAndRecordShades({ dataURL: imgData.imgDataURL })
    })
  })

  settings.forEach(setting => setting.addEventListener('change',()=> drawImageAndRecordShades({ dataURL: imgDataURL })))

  textOutput.addEventListener('change', ()=> {
    textOutput.style.height = '0px' // resetting
    textOutput.style.height = `${textOutput.scrollHeight}px`
  })

  radioInputs.forEach(radioInput =>{
    radioInput.addEventListener('change', e => {
      imgData.size = e.target.value
      const { size } = imgData
      imgData.ratio = size_stat[size].ratio
      imgData.cellD = size_stat[size].cellD
      imgData.maxWidth = Math.round(textOutput.getBoundingClientRect().width - 10 * imgData.ratio)
      textOutput.className = `${size}`
      drawImageAndRecordShades({ dataURL: imgData.imgDataURL })
    })
  })

  drawImageAndRecordShades({ dataURL: imgData.imgDataURL })

  imgData.maxWidth = textOutput.getBoundingClientRect().width - 10
  window.addEventListener('resize', ()=>{
    imgData.maxWidth = Math.round(textOutput.getBoundingClientRect().width - 10 * imgData.ratio)
    drawImageAndRecordShades({ dataURL: imgData.imgDataURL })
  })

}

window.addEventListener('DOMContentLoaded', init)
