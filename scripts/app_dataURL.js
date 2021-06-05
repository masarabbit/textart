function init() {

  const combineCanvas = document.querySelector('#combineCanvas')
  const context = combineCanvas.getContext('2d')
  const imageWrapper = document.querySelector('.image_wrapper')
  // const imageTarget = document.createElement('img')
  const outputButton = document.querySelector('#output')
  const outputFromDataButton = document.querySelector('#output_from_data')
  const textOutput = document.querySelectorAll('.text_output')
  const dataInput = document.querySelector('#data_input')



  function output(){

    const uploadFile = document.getElementById('uploadFile')
    const uploadedFiles = uploadFile.files[0]
    const blobURL = window.URL.createObjectURL(uploadedFiles)
    const imageTarget = new Image()
    // console.log({ uploadedFiles })
    // console.log({ imageTarget })

    let height
    let width
    

    imageTarget.addEventListener('load', function() {
      width = imageTarget.naturalWidth 
      height = imageTarget.naturalHeight 
      // context.drawImage(imageTarget, 0, 0, width, height)
      // context.drawImage(imageTarget, 0, 0)
      
      combineCanvas.setAttribute('width', 200)
      combineCanvas.setAttribute('height', 200 * (height / width)) 
    }, false)



    imageWrapper.innerHTML = ''
    imageTarget.src = blobURL
    imageWrapper.appendChild(imageTarget)


    setTimeout(()=>{
      context.drawImage(imageTarget, 0, 0, 200, 200 * (height / width))
      textOutput[0].style.padding = '10px'
      textOutput[0].innerHTML = combineCanvas.toDataURL()
      
      var imgData = context.getImageData(0, 0, 200, 200 * (height / width))
      textOutput[1].style.padding = '10px'
      textOutput[1].innerHTML = imgData.data
      console.log(imgData)
    },200)
  }
  

  function outputImage(){
    const imageTarget = new Image()

    let height
    let width
    
    imageTarget.addEventListener('load', function() {
      width = imageTarget.naturalWidth 
      height = imageTarget.naturalHeight 

      combineCanvas.setAttribute('width', 200)
      combineCanvas.setAttribute('height', 200 * (height / width)) 
    }, false)

    imageWrapper.innerHTML = ''
    imageTarget.src = dataInput.value
    imageWrapper.appendChild(imageTarget)

    setTimeout(()=>{
      context.drawImage(imageTarget, 0, 0, 200, 200 * (height / width))
    },200)
  }

  outputButton.onclick = output
  outputFromDataButton.onclick = outputImage
}

window.addEventListener('DOMContentLoaded', init)
