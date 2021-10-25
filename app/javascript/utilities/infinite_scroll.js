import { debounce } from './modules/debouncer';

document.addEventListener("turbolinks:load", () => {
  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 1.0
  };
  const observer = new IntersectionObserver(callback, options);
  // simple autoscroll
  // const observer = new IntersectionObserver(handleIntersect, options);
  const footer = document.querySelector("footer")
  const loader = document.getElementById("loader");

  if (footer) {
    observer.observe(footer);
  }
})

// with debounce: const loadAfterDelay = debounce(() => getData(), 1500)

// Very simple Autoscroll (without delay)
// function handleIntersect(entries) {
//   if (entries[0].intersectionRatio >= 0.75) {
//     // loadAfterDelay
//     getData()
//   }
// }

// Auutoscroll only after delay
const intersections = new Map();

const intersectionChanged = (entry) => {
  if (entry.isIntersecting) {
    loader.classList.add("show");
    intersections.set(entry.target, setInterval(() => {
      loader.classList.remove("show");
      getData()
    }, 2500));
  } else if (!entry.isIntersecting && intersections.get(entry.target) != null) {
    loader.classList.remove("show");
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
