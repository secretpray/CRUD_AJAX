import { debounce } from './modules/debouncer';

document.addEventListener("turbolinks:load", function(event) {
  // Target function
  var searchFired = debounce(function() {
    document.getElementById('search-submit').click()
  }, 250)

  const resetList = () => {
    document.getElementById('search-submit').disabled = false
    document.getElementById('search-submit').click()
  }

  if (document.querySelector("#query")) {
    document.querySelector("#query").addEventListener('keyup', (event) => {
      // filter input
      if(event.target.value.length < 2) {
        //  prevent search if input length < 2
        event.preventDefault()
        document.getElementById('search-submit').disabled = true
      } else {
        // if length > 2 and input puase > 250ms
        document.getElementById('search-submit').disabled = false
        searchFired()
      }
      // reset index list if clear search input by Backspace or Delete
      if ((event.keyCode == 8 || event.keyCode == 46 ) && event.target.value == 0) {
        resetList()
      }
    })
    // reset index list if click on X (input form)
    document.querySelector("#query").addEventListener("search", (event) => {
      if(event.target.value == 0) {
        resetList()
      }
    })
  }
})
