document.addEventListener("turbolinks:load", () => {
  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 1.0
  };
  const observer = new IntersectionObserver(callback, options);
  const footer = document.querySelector("footer")
  const loader = document.getElementById("loader");

  if (footer) {
    observer.observe(footer);
  }
})

const intersections = new Map(); // Auutoscroll only after delay 
const intersectionChanged = (entry) => {
  if (entry.isIntersecting && document.querySelector("a[rel='next']")) {
    loader.classList.add("show");
    mOld = new Date().getTime();
    running = true
    count = 2500
    draw();
    intersections.set(entry.target, setInterval(() => {
      loader.classList.remove("show");
      running = false
      getData()
    }, 2500));
  } else if (!entry.isIntersecting && intersections.get(entry.target) != null) {
    loader.classList.remove("show");
    running = false
    // console.log('Infinity scroll disabled');
    clearInterval(intersections.get(entry.target));
  }
};

const callback = (entries, observer) => {
  entries.forEach(intersectionChanged)
}

// rerender Bootstrap tooltips after fetching
const refreshTooltips = () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

// fetching new page data from server
function getData() {
  var usersTarget = document.querySelector('.infinity-scroll-target')
  let paginationTarget = document.querySelector('.pagination-link')
  let next_page = document.querySelector("a[rel='next']")
  if (next_page == null) { return }

  let url = next_page.href

  const loadNewPage = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const { entries, pagination } = await response.json()
    usersTarget.innerHTML += entries
    paginationTarget.innerHTML = pagination
    refreshTooltips()
  }

  loadNewPage()
}

// timer
var count = 2500, // 2.5 sec
    running = true,
    mOld,
    mNew;

function draw() {
  if (count > 0 && running) {
    requestAnimationFrame(draw);
    mNew = new Date().getTime();
    count = count - mNew + mOld;
    count = count >= 0 ? count : 0;
    mOld = mNew;
    document.getElementById("seconds").innerHTML = Math.floor(count / 1000);
    document.getElementById("milliseconds").innerHTML = count % 1000;
  } else {
    document.getElementById("seconds").innerHTML = 0
     document.getElementById("milliseconds").innerHTML = 0
  }
}
