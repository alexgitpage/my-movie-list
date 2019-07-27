(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const dataPanel = document.getElementById('data-panel')
  const data = []
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')

  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 12
  let paginationData = []
  let pageNum = 1

  const modeSwitch = document.getElementById('mode-switch')
  let displayMode = 'bar-mode'



  // bar mode
  function displayDataBar(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Car_indexge cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <!-- favorite button -->
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  // list mode
  function displayDataList(data) {
    let htmlContent = `
    <table class="table">
      <tbody>
    `
    data.forEach(function (item, index) {
      htmlContent += `
        <tr>
          <td>${item.title}</td>
          <td>
            <!-- "More" button -->
          <td class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
            <!-- favorite button -->
            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </td>
        </tr>  
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  // modeSwitch
  modeSwitch.addEventListener('click', (event) => {
    if (event.target.classList.contains('list-mode')) {
      displayMode = 'list-mode'
      displayDataList(data)
      // console.log(111111)
    } else {
      displayMode = 'bar-mode'
      displayDataBar(data)
      // console.log(22222)
    }
    getData(data)
  })

  function getData(data) {
    if (displayMode === 'list-mode') {
      displayDataList(data)
      getTotalPages(data)
      getPageData(1, data)
      // console.log(33333)
    } else {
      displayDataBar(data)
      // console.log(44444)
    }

  }

  // main function
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    // displayDataBar(data)
    // getTotalPages(data)
    // getPageData(1, data)
    getData(data)
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else {
      if (event.target.matches('.btn-add-favorite')) {
        addFavoriteItem(event.target.dataset.id)
      }
    }
  })

  function showMovie(id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data.results
      console.log(data)

      // insert data into modal ui
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }


  // listen to search form submit event
  searchForm.addEventListener('submit', event => {
    let results = []
    event.preventDefault()
    // console.log('click!')
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    console.log(results)
    displayDataList(results)
  })

  // add favorite item
  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = data.find(item => item.id === Number(id))

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

  // get total pages
  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }

  pagination.addEventListener('click', event => {
    console.log(event.target.dataset.page)
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
    }
  })

  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }

})()