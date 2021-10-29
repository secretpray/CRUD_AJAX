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
