function init() {
  
  const elements = {
    body: document.querySelector('body'),
    canvas: document.querySelector('canvas'),
    p: document.querySelector('.info'),
    label: document.querySelector('label'),
    contrast: document.querySelector('.contrast'),
    brightness: document.querySelector('.brightness'),
    textOutput: document.querySelector('textarea'),
    uploadFile: document.querySelector('#upload_file'),
    gradationInput: document.querySelector('.gradation'),
    radioInputs: document.querySelectorAll('.radio_input'),
    switchLabel: document.querySelector('.switch_label')
  }

  const defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDCAYAAABqS6DaAAAAAXNSR0IArs4c6QAAFV5JREFUeF7t3AWobVW3B/Bpd3d3dweKfna3Yis2KgYodqCigoFgYmNiB7bYYnd3d3fH4zd5/8O6233O2ffcfY/3ve9OOOxaa84xx3/0HOuM8vfff/9dRo4RhgOjjARkhMGiEjISkBELj5GAjGB4jARkJCAjGgdGMHpG+pCRgIxgHBjByBmpIaUUqdhWW21VllhiibLvvvv+qxD9VwNyww03lA033LCMOuqoZaGFFiovvPBCGWWUUcpXX31Vxh133H8FmP9aQKaccsryxRdfVO248847y2STTVZBWWaZZer3b7755v8vQF599dUy33zzlWmmmaYsueSSZccddyxrrbXWv7LJ5qL33Xdf2WSTTco333xTLr300jLmmGOWueeeu8w222xljDHGKO+9916ZaaaZyuWXX14233zzQad3uGnIOOOMU37//ffy559/1k2NPvro9f3ZZ59ddtppp0HfqAWZoZ9//rmg7bLLLqs0zDjjjBWASSedtJorY7TRRiuTTDJJ1ZTBHsMFkCmmmKKMN9545Z133ik//PBDGX/88eu+5p9//vLyyy9XcH799ddB3esEE0xQlltuubLrrrv2rDvhhBOWWWaZpcw888w9YPhx9dVXL3fccUc1Z4M9hgsgACCJJGziiSceYrM2SEJ/+eWX8tdff/3jt4Ey4I8//qgC8Omnn5Z55523SnjG0UcfXfxde+21VUsxeqyxxiqzzjprmXrqqctEE000xLJPP/102XrrrcuLL744UHIGfF/XAbnkkkvKdtttVxlusMut48svv6xM++yzzypgX3/9ddsNYB5nO88885Sxxx67sP/mA/iPP/5YNY1Z5KMw0Zp8AnB8P/3005cPP/ywXnfllVf2mE2ATD755NVczTDDDG2FYvbZZy/77bdf2W233QbM3IHc2HVATjvttLLPPvuUTz75pNpi0iesbDc222yzctVVV1Umen/++eeXI488spx88snVpMVk0CimhURPO+205T//+U+1+eb1BwDaZgARGIb7/d40Pa4DEL8BWM683TA/0ys4GczRdUDCgEgmO026exsY8tZbb9Wf55xzzsoEDDzmmGOqv9l99917bv3888/Lc889V5nOAWO81zD8t99+G+IzWmIWm6DwGejyR1PajQhRgB4sULoOCK0QRt52223VHHGmnQySeM8995Sdd965ala78f7775dnn322B+BEcDTEPUwW30C7aFUCB2AEuLynafwHk9VuLLzwwhX8//OA2DggOFf2HpMwp6+BsfwKnyIS62288sor5YMPPqg/AwFzAeHVZ6bIe+vGbPkeTV5jxrz6brrppquATDXVVP9Y0hzAFSUO5hguGmIDfAhg2jn1bBDz3njjjcLUfP/999VHyKB7Gy+99FIFhDkBIjBIcAIIAQBn77eYzjj++BlANKWelphHHas5+Bj3ML2DOboOCH8hO3/77bdr9CQZI2mtQ1TEnNEM0RDtcK+IqrfhGvdhIKYzSeYHKN8DVMymHfKgmLBEXV5j5gDjz2f3Ao5vibagY+mlly4XXHDBYOLR/RNDzDriiCNq6CsX4Dib46mnnqrMUroQXQl/+QYSTUP6GgB+/vnnK6Mx86effqrguBcwGO49oGhmsnLXYDjzA6ymqQtA1kWvawEhyvK+t5B8eKHUdQ3BKFK1xRZbVPOBSTFDCnZ8C4YwL4AROWEWrSKpfY133323vP7661ULMN5amIyR1vEXv0UrExL7LvegKdrRdPrNddFz0003lYsuuqiCPpijq4DwGxjrlfTTjkRMGClzJ8nif8yTo2AKU8Rc9AcIaWWymCjzx+Gaz/s44jhxwYRrrZWoizD4Lg47URmmxye5ZuONN64mFICDOboKiMxWUvfQQw/VaImk2aQSBDODcZgFiJROMIumuFbU09cg5a+99lr56KOPKkOZpEi8Ob0HuLm+/fbbChrtcR3AgBJ/wlRheLQkOQ3NJTh77LFHXWew61ldBURZ+5prrqkbslEaIirCFOYGIJiEYRiIucJOZuG7774riy66aL/C+MQTT1Qwk8ljmD9z0DCHS6ljYTowgJSyCoEAHHMGIPe5LjWuJJO0cZdddqmaS7sHa3QVEOUNBT7MxwRMxgAmTG0I4wDkupiCSO8iiyzS0Z6Fvu7he8ydiIsZIgBekxgCX/DQzIOS4fvNcD0wkq80Q2JrHXLIIeXJJ58s6Et5viNCB3hRVwFhRmwQEECwUaYC0zArEQ4miWKYB2Ev6XVa18kg0SSWBCensI61mSnmL+ceQPd9mJ1oC2Deu9Y1ADMfGmlYQEaPsxv0JrHshMZhuaargERDaAkmY7bkMAyQJzAJ8g6aItZXr3Js2ukwB9suEAAOSU9ZJP6EySIUwEjiCCTvvZrDAETyGZ/lRTTPQCehAdD6669fQ3JJ7PAeXQXEJiRWnDhm0Agb5DyFu3HgNu6za9SMhnY8+OCD9d5INWASLWE2SU+kxVcRDNogB1KJbjcUMTGeIAFNxOYV4AqdfONg1LW6CginbRO33357lTZAJE+g9qTt4osvrs6SYwfQQABRiAR2MnMM5leMJH0pzaPh5ptvLkcdddQQODBLpP6www6rGus+oCXZ9HtABoozF+UU2j88R9cAkZ2feuqp5YQTTqjZ9xxzzFGlVDJI2hZffPG2EjaQU0NgcLSY7X5M5Lt8nwMqzPVZowJ/FhNFYE455ZQaWCS6Sm0MncyeOQiX77333YorrljXGN5hcNcAUaTjK0ijjQFFYc53tAQ4a6yxRo/9bqp/yh823OlQbjGv+WlaiormAIb1ll9++Z7prE1LXEubXJOQ2Csa0pPFB+UMh6YDzlzZS6c0DuS6rgGSA53HHnusp5TBsRoplSdbXmqppXoOmDbddNOiYS3juuuuKxtssEFHe9HYllNB/iSZNloOOuigcv/991fTKOumwfElKUgCIqEzWjGeRhAWgJlPUOIzIWOyADU8yyldA8RGEHv33XfXDSTpYhrUsjhLJ4M0p93gD5zeMTPHHntsOfDAA/sFBWPkPNGQnIFgOD/z+OOP10iOufQbmpIY8g/ek3rMBwim+xM+pznDnoDuXoAk1FbnEiEed9xx/dI5NBd0BZBkyGeddVZtjkM8tSdxjmgxW7TVXzU3hKvoLrDAAh3tA+OjJZib3CfaGIk3GeZGi3yfpDCBgGvSthRwBCOtZyUhjCa6XmsRgLoxhhkQR7UcJ6Y7A3HsKSu3EaCkWaAbxLabA1NpCeaQciYqIS+TBAS0AUvhM9qbAy7X5IweWLQJQNE2a5qP1q266qrlxhtvrHvjW6wFOHukVccff3zZc889h2mrAwbExpIFh+h2XR6+Y7JswPth7Zk96aSTamK49tpr1+bovfbaq7Z/Np07EwQgYCUySsSUyCzZvfuAgrHyDd0vzKrr3JueLQBJDFdeeeW6Nn/EXyaDF8AIn1PqT/1saAKVysdhfQqX3UdcU40VDEVBCnPpKPG7z+uss04NjwcylFrkMiI5I87fptWdcgYi4sKYaEqzBuUaYPgdMwESXyLUjdmj3fEv1iKAvnMNOvgYABEyZovA+U2L6nrrrVd7mfUO53i50/12DAhTtOCCC/bMa2NyDYnVtttuW4nh5PgKBFNroTCweut96pTI5nW0zRo5q29KoO8T2ZFoJsWIBtCc5B6JqDA0JXhMbZ6rZN34Hf5qpZVWqtqjC9L7+J92vQNZ3zwazZm7/kZHgNACDKa+zjwOP/zwujGffW/wI5rcSB3pobLNA6r+CGn9vVmNbf3N3Dmm/fjjj4doG3WtbFoZ5Lzzzqu0mCvn6zmyxcD4ndTCsk9zJLqKT8J4rUOLLbZYPSQTZvsNyCoTWp9EYc1hDVqVfEnFWPele3obbQHJhjFe/E7C2X4bi0RghD+lD9LIkSPM+5wGYoLaVqe9Wa1EYpR2T+tgBpOnBuazcxEFytVWW60yJgdgHLj7VlhhhaKt1UgvFm3C6ISuvvfZ+Q0605mCgTmnt5/kWDSNVRAF+k50+cwzz/T4qebjFu4DCKuRxg1WxXsC4+xI/az1DKgtIE77Hn744WpyECGR89kQTSDChmMOACjsE6rGDts0AkiDeQY6Ug4JgxQuY44SCRGYnAyy39pTM5qllfiL9G/5DSheJZEarNGskKj7XaOGUD19xBy+Rj39YTQN+KrO5mW+Mu66665aamlt+KNZACDYOerWO6yUk9EDSDr1ckaQ0oYYm6MSUQhrMXrNNdes2oAoUpEyhKNbC+XMO8kYSemr36oTsERUq6yySlHpjYnJfRtttFEt/p177rm9ToWpOaZt9g1nLkzi+1KrysmhCdOMhyesxsEHH1zNEI1SQVZWySMXt9xyS6WBgLQ7VsDLLbfcsl5DW1ieph/sASRMQ5i4PoCIasTZJIGZMICQhb13vYx87733rkkSM0Cz+BAbZHa8mqcZkXUCRPMaa91666095xJM1hlnnFEjOsIwtCOHUfYMrJzhoBs/EjY7pNLm2hwsRWuLk9+bfGl+jiA358ArHToHHHBAfVzCqICQfr1IAcGDkGpK0QIMZcYeeOCBqqbtHk2zoOzYXJw9Zi277LI969u0OVRph3XEpjMvpDrtpcMyL+1neu0hPgfQButBwzWD69BXqOykK17SnGo2q5JBuM2nPCSvGiIJBYjn6bbZZpuqgkwDCeekSdAjjzzSoxV9bZgaX3jhhdXpNiu522+/fQ2XzY+BA3Xww8Lsvu5VD0OvEj1/AQQmDZM4e0EDTRFUqNNJ/vqKkpprCcMFAPxJWltpeKwMzZCr8Mnpwq8aktSfPZNg5QavCnS91XKai4smUjikLRynjNpmRSOkwqtEEdj/9khmz0zJXQDA7qMT/cm50M9CYKTfaWRrzhEzZU8Aa+ZrzX3mOrwBNOEkBAKFjB4fwnEpU5NoauuhmNYh8vAbBykbV0jsmeh/H5iMOVFKoGGJtoSVzB3nxyQwYe16fgcDKOsDQg6FLk0TyVUAoCbF+XqPaSLMueaaq0q575oJH3qZr9aSEOEUpjcHUGlCBJwPQkdbp56ODBdQ1WYX4b333lvPAJqRh4WStXp/5pln1k0If2kAws8555waGaVYl3YcTGDaqL7ELSAmwmlGUc2yR2x7Ntk8vWtt0Ul27hUtac7zmUNOvoSmdMvIDXxPYs139dVX14jSPQQJj1pD2SbDPe/e9Ad9PQae42IWSEHzHxqSOlFaZsIkmSWQmk3JbsZ0Tq7VZsa+kg4aQr3F+NQ9GmFzmJToLRXTVu2wrt/aMcH9odF9PpP4dg+Z+i0lFRLPXwCCxtJ25y+kN4dUeIFmIOYkNCeKqSD0pcl4ho7eWpvwMlrWeiQ8RGJoUYwTccT5QjD/8QARCCL1vQ2bTxgsinDGHifPMdooIhCcEj3V5W+ASaVpo/AYM2LemusRGnlAHjlIg0OztzdNFLJ6UiuqiYZxtvbqcEnYiT70mJODzaNuqdzaM/C6FZDEwdNAbqI5hgAkap9qac66B2LX+RCmQcSm+8/iKVXnfEHIxyRgvOsBhliOXwgKHJ8xJtGQOTCbltFA81uHdKf3ym/5PU3fQBFBinh22GGH+g8Mcg5CaJLg5syEEOo1Nm8aHgbCh9Z7+Bt1rzRWtP4+BCC0g7RcccUVNdY2Wu320BDFWSlRJ6TDFGUYmpFWUgzFZODLU5g6pko5wW+Yz7TRWgPTc1IX0PIoQh5/Fn5bw3VAaLaSppnO3Hq0hONG6k0xhWlx7a8jv1N+iN6YQtaFT07y3CcgfiSN/IOSAOkiIc2H8DslINelTMF/pJsw5+AYyDStu+66Vdp9jtSmm11YyOYDMw4acCTYb0xq/AyABAxAAEaAzvkHmk4//fSaBKeBAcObYSxNzPHt0O61r+vtj3BHOFt9xz+cer5I3SZPKSkzA6RdvX9YCGav+Q0jIJCa66+/vpZoJKvJclNhbj6Olg01z8j9zhyw9xh76KGH1jI8XwMc4AMKU3K0y0wOz5HuTXQ6Q+FXCVZvJ4ltq700w8Y4YPY+/bMIT6tlJ9FGXxuNbaZBCacjRekBzn9ZUBoBTgBJE1yirzyUk3laQ2V0pKmBcHnPQTNfzGG3h0CCL+LbDNaBAKCvvx7htoAknHz00Uero00omef4MIKNttBA/9FXzte9MlXsK8Ymw+dIMStV1PijOPk8FeU+AUHOcERIrkEjgJNj5Iw7R7dMW4KXbkVPmE/A0nfMdynFEKATTzyx1sHkbjSlt9HriWGkTO0/jpV2CB+pob9h2YjEMG2a0UJMJ1XKDwBXski1ORtIRZaGNcviJI95FbEJa/kG5RyaRdPywCcgmDN/oqhOnqPvRIPSxULA+Dd/AhTrM5XepxrQ13y9AmIi0pkGAlJnA2loE/WQYASQuqEFhyRhBgAQTKVJVtYQlfidc3cAla7DNLjZFKY6fSMkAGYmMAbdrmPqaDiBynXmZMP5kZwYdsLw3q5J0IJ+mop+34kuaS+NlSAK5dWvUlwcag1xg7KzuFmxTB4RSbaR2OsAN7SAmB+4CKfa5sH4VJsxmZTbJAbTGGfW2TQ7zQwRDGcxvnc9yRTCmhc4alA5YQQqcPLMykBracmFaC9NTXcNLSXAqU957/BKmxJw0vQ9IA3JTSYyJFP7779/XTARCg2J2SFxUdtOJY4kYRIw0opKM/KotCKc93H8yZMwlfTnXMHv/vJvOYCquIdWYGMEM0hKaVU639sdMDVpp73N/6VFs9DJVAKZQOFBnlNEF02lJen6dwZPoFUAOhkddZ0k5BWmYjpCSQlgUgIBXA72EYYRfRXiEJeiY0rhpN6mzcnUKPLRAvPYmHUxwCGX7g9nDSrOeaKXDwnzMUmtzYOl5gCI4RpMk2u1Vm3DMAJiL2kETPMDMNyTfQoKCAwA7IWAEMzU1fhAvQfO2DsdHQFiMoSw0U4ESR5iSA8pQThzYaOAYb4wF6GtVdhWwvKPBJhA8zA9mGYzCa0BxjRwzqRcO42GAaaCUCQTT7hJ65iyRIjNSNA1KenYR2uBtFmZSO9vmiLScEFACYG1CWnaSgmD9/knOvaUc/yuA9KswTjKZR4snAVtJP/8hZRgIADTD9WftiDY4Rh/YZP8CT/ALouMrJ/MO+1BATGbRYOzizzvnuffaVxzMHcEqNWHELJUqwlB2p7SARkgrOOP8NAG2idoCDCaLmgxgGLyuw6ICS2eCqgFEe+75BIhOBLl95RM2GuS3N/xJ5MFaMDQPnPSGKYqZxiYaa7eqgfpsowp7G/N7C2BSh7oafpEe8zJYpq3+TQgup61AAoT5VoCxMwO7fgfeMa0KB2webkAAAAASUVORK5CYII='

  const size_stat = {
    sm: {
      cellD: 4,
      ratio: 1.2,
    },
    md: {
      cellD: 8,
      ratio: 1.1,
    },
    lg: {
      cellD: 8,
      ratio: 1,
    }
  }

  const defaultGradation = ' .,\`\'"–^~+:;!?*(/icmvILJYAXEGBMÆ%£&@#$'
  const settings = {
    size: 'md',
    maxWidth: 0,
    imgURL: defaultImg,
    cellD: 8,
    calcHeight: null,
    calcWidth: null,
    ratio: 1,
    column: 0,
    row: 0,
    isDarkMode: false,
    uploadedFile: null,
    gradation: defaultGradation,
    shades: []
  }

  const ctx = elements.canvas.getContext('2d')
  const numberOfLetters = () => settings.gradation.length - 1

  const processedTexts = ({ column, row }) =>{
    const processedRowDatas = new Array(row).fill('').map(() => [])
    settings.shades.forEach((shade, i) => {
      const index = settings.isDarkMode ? shade : numberOfLetters() - shade
      processedRowDatas[Math.floor(i / column)]?.push(settings.gradation[index])
    })
    // remove filter if you need to increase density
    return processedRowDatas.map(data => data.join('')).map(letter => `${letter}\n`).filter((_l, i) => i % 2 === 0).join('')
  }

  const nearestN = (n, denom) => n === 0 ? 0 : (n - 1) + Math.abs(((n - 1) % denom) - denom)

  const calcShade = (r, g, b) => Math.round(((r + g + b) / 3) / 255 * numberOfLetters()) // white on black

  const drawImageAndRecordShades = ({ dataURL, update }) => {
    const imageTarget = new Image()    
    imageTarget.onload = () => {
      const { naturalWidth: iWidth, naturalHeight: iHeight } = imageTarget
      settings.calcWidth = settings.maxWidth
      settings.calcHeight = Math.round(settings.maxWidth / (iWidth / iHeight))
      const { cellD, calcWidth, calcHeight } = settings
      elements.canvas.width = calcWidth
      elements.canvas.height = calcHeight

      settings.column = nearestN(settings.maxWidth, cellD) / cellD
      settings.row = (calcHeight - (calcHeight % cellD)) / cellD

      if (update) settings.imgURL = dataURL
      ctx.filter = `brightness(${elements.brightness.value}%) contrast(${elements.contrast.value}%)`
      ctx.drawImage(imageTarget, 0, 0, calcWidth, calcHeight)

      settings.shades.length = 0
      const { column, row } = settings
      new Array(row * column).fill('').forEach((_a, i)=>{
        const y = Math.floor(i / column) * cellD
        const x = i % column * cellD
        const c = ctx.getImageData(x + 2, y + 2, 1, 1).data
        const shade = calcShade(c[0], c[1], c[2])
        settings.shades.push(c[3] === 0 ? numberOfLetters() : shade)
      })
      elements.textOutput.value = processedTexts({ column, row })
      elements.textOutput.style.height = '0px' // reset height
      elements.textOutput.style.height = `${elements.textOutput.scrollHeight}px`
    }
    imageTarget.src = dataURL
  }
  
  const isValidFile = file =>{
    return ['jpg','jpeg','png','gif'].some(type => file.split('.')[file.split('.').length - 1].toLowerCase() === type)
  }

  const output = () =>{
    if (settings.uploadedFile) {
      elements.p.classList.add('hidden')
      const blobURL = window.URL.createObjectURL(settings.uploadedFile)
      drawImageAndRecordShades({ dataURL:blobURL, update:true })
    } else {
      elements.p.classList.remove('hidden')
    }
  }
  
  const toggleColor = () =>{
    settings.isDarkMode = !settings.isDarkMode
    elements.body.classList.toggle('light')
    elements.switchLabel.innerHTML = `${settings.isDarkMode ? 'dark' : 'light'} mode:`
    const { column, row } = settings
    if (column) {
      elements.textOutput.value = processedTexts({ column, row })
      elements.textOutput.style.height = `${elements.textOutput.scrollHeight}px`
    }
  }

  const copyText = box =>{
    box.select()
    box.setSelectionRange(0, 999999) // For mobile devices 
    document.execCommand('copy')
  }

  const updateImageDataAndDraw = size => {
    const { ratio, cellD } = size_stat[size]
    settings.ratio = ratio
    settings.cellD = cellD
    settings.maxWidth = Math.round(elements.textOutput.getBoundingClientRect().width - 20) * ratio
    elements.textOutput.className = `${size}`
    drawImageAndRecordShades({ dataURL: settings.imgURL })
  }

  elements.gradationInput.value = settings.gradation
  document.querySelectorAll('.number').forEach(setting => setting.addEventListener('change',()=> drawImageAndRecordShades({ dataURL: imgURL })))
  updateImageDataAndDraw(settings.size)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  if (isSafari) elements.textOutput.style.textAlign = 'left'

  // event
  elements.uploadFile.addEventListener('change',()=>{
    settings.uploadedFile = elements.uploadFile.files[0]
    // console.log(settings.uploadedFile.name)
    document.querySelector('.name_output').innerHTML = isValidFile(settings.uploadedFile.name) 
      ? settings.uploadedFile.name 
      : 'not valid file'
    output()
  })

  document.querySelector('.copy').addEventListener('click',()=> copyText(elements.textOutput))
  elements.label.addEventListener('click', ()=> elements.p.classList.add('hidden'))
  document.querySelector('.color_toggle').addEventListener('change', toggleColor)

  document.querySelectorAll('.plus_minus').forEach(button=>{
    button.addEventListener('click', e =>{
      const param = e.target.dataset.setting
      elements[param].value = +elements[param].value + +e.target.dataset.no * 10
      elements[param].value = +elements[param].value < 0 ? 0 : elements[param].value
      drawImageAndRecordShades({ dataURL: settings.imgURL })
    })
  })

  const updateTextImage = () =>{
    settings.maxWidth = Math.round(elements.textOutput.getBoundingClientRect().width - 10) * settings.ratio
    drawImageAndRecordShades({ dataURL: settings.imgURL })
  }

  elements.textOutput.addEventListener('change', () => {
    elements.textOutput.style.height = '0px' // resetting
    elements.textOutput.style.height = `${elements.textOutput.scrollHeight}px`
  })

  elements.radioInputs.forEach(radioInput =>{
    radioInput.addEventListener('change', e => {
      settings.size = e.target.value
      updateImageDataAndDraw(settings.size)
    })
  })

  window.addEventListener('resize', updateTextImage)

  elements.gradationInput.addEventListener('change', e => {
    settings.gradation = e.target.value
    updateTextImage()
  })
  
  document.querySelector('.reset').addEventListener('click', () => {
    elements.gradationInput.value = defaultGradation
    settings.gradation = defaultGradation
    ;['contrast', 'brightness'].forEach(param => elements[param].value = 100)
    settings.size = 'md'
    elements.radioInputs.forEach(input =>{
      input.checked = input.value === settings.size
    })
    updateImageDataAndDraw(settings.size)
  })

  const downloadTextLink = document.querySelector('.download_text_link')
  const downloadButton = document.querySelector('.download')
  // const prefix = `{\rtf1\ansi\ansicpg1252\cocoartf2580
  //   \cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier;}
  //   {\colortbl;\red255\green255\blue255;}
  //   \f0\fs10 \cf0`
  const downloadTextFile = () =>{
    const data = new Blob([elements.textOutput.value], { type: 'text/rtf' })
    const url = window.URL.createObjectURL(data)
    downloadTextLink.download = `ascii_art_${new Date().getTime()}.txt`
    downloadTextLink.href = url
    downloadTextLink.click()
  }

  downloadButton.addEventListener('click', downloadTextFile)

}

window.addEventListener('DOMContentLoaded', init)
