import onePageScroll from './modules/one-page-scroll.esm.js'

document.addEventListener('turbolinks:load', () => {
  var fullPageSlider = document.querySelector('.mainpage')
  if (fullPageSlider) {
    var el = document.querySelectorAll('section')
    var app = new onePageScroll({
      el: el,
      loop: true
    })
  }
})

// remove onepage scrolling after exit home#index
document.addEventListener('turbolinks:load', () => {
  const controllerName = document.body.dataset.controllerName
  const actionName = document.body.dataset.actionName

  if (controllerName == 'users' && actionName == 'index' && document.getElementById('onepagestyle')) {
    document.getElementById('onepagestyle').remove()
  }
})
