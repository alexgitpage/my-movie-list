const movies = [{
  title: 'The Avengers',
  image: 'https://bit.ly/2NQOG6H',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://bit.ly/2OsGmv2',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://bit.ly/2zmcLxo',
  rating: 0
}]

function createTableAndHeader() {
  // create table
  const table = document.createElement('table')
  table.className = 'table'

  // create header
  const row = document.createElement('tr')
  table.appendChild(row)

  const header = ['Image', 'Title', 'Ratings']
  for (let i = 0; i < header.length + 1; i++) {
    const cell = document.createElement('th')
    row.appendChild(cell)
    cell.innerHTML = header[i]

    if (header[i] === undefined) {
      cell.innerHTML = ''
    }
  }

  return table
}

function addRow(data) {
  // create first row from first movie data
  const newRow = document.createElement('tr')

  // append data to cell
  newRow.appendChild(document.createElement('td')).innerHTML = `<img src = ${data.image} width = "70" class="img-thumbnail" >`
  newRow.appendChild(document.createElement('td')).innerHTML = data.title
  // newRow.appendChild(document.createElement('td')).innerHTML = data.rating 修改如 ratingIcon 如下
  const ratingIcon = `
  <span class="fa fa-thumbs-up"></span>
  <span class="fa fa-thumbs-down px-2"></span>
  <span>${data.rating}</span>
`
  newRow.appendChild(document.createElement('td')).innerHTML = ratingIcon


  // add delete button to be used later on to remove a row
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'X'
  deleteButton.classList.add('btn', 'btn-sm', 'btn-danger')
  newRow.appendChild(document.createElement('td')).appendChild(deleteButton)

  // // < span class="fa fa-thumbs-up" ></span > 修改如 ratingIcon 
  // // <span class="fa fa-thumbs-down"></span>
  // const thumpUp = document.createElement('button')
  // const thumpDown = document.createElement('button')
  // thumpUp.className = "fa fa-thumbs-up"
  // thumpDown.className = "fa fa-thumbs-down"
  // newRow.children[2].appendChild(thumpUp)
  // newRow.children[2].appendChild(thumpDown)

  return newRow
}

// select element from html template
const dataPanel = document.querySelector('#data-panel')

// append html content to data panel
const table = createTableAndHeader()
dataPanel.appendChild(table)

// create first row from first movie data
// table.appendChild(addRow(movies[0]))

// display movie list
for (let i = 0; i < movies.length; i++) {
  table.appendChild(addRow(movies[i]))
}