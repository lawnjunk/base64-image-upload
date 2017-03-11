'use strict';

let {log} = console

window.onload = () => {
  let readFile = document.getElementById('read-file')
  let photo = document.getElementById('photo')

  window.renderPhoto = (dataURL) => {
    photo.setAttribute('src', dataURL)
  }

  window.fileHandleChange = (id) => {
    let input = document.getElementById(id)
    if(input.files[0])
      input.style.background = '#0f0'
    else 
      input.style.background = '#f00'
  }

  window.fileToDataURL = (file) => {

    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.addEventListener('error', reject)
      reader.addEventListener('load', () => {
        resolve(reader.result)
      })

      if(file)
        return reader.readAsDataURL(file)
      throw new Error('no file supplied')
    })
  }

  readFile.addEventListener('submit', (e) => {
    e.preventDefault();
    window.file = e.target.file.files[0]

    log('file', file)
    fileToDataURL(file)
    .then(dataURL => {
      console.log('data', dataURL)
      renderPhoto(dataURL)
      return axios.post('http://localhost:2000', { file: dataURL })
    })
    .then(res => {
      console.log(res)
    })
    .catch(console.error)
  })
}

