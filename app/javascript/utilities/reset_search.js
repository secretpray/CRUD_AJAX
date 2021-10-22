document.addEventListener("turbolinks:load", function(event) {
  document.getElementById('search-submit').disabled = true
  if (document.querySelector("#query")) {
    document.querySelector("#query").addEventListener('keyup', (event) => {
      if(event.target.value.length < 2) {
        event.preventDefault()
        document.getElementById('search-submit').disabled = true
      } else {
        document.getElementById('search-submit').disabled = false
      }
    })
    document.querySelector("#query").addEventListener("search", (event) => {
      if(event.target.value == 0) {
        document.getElementById('search-submit').disabled = false
        document.getElementById('search-submit').click()
      }
    })
  }
})
