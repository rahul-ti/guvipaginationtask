
let apiuri = 'https://60f30ed76d44f300177888b3.mockapi.io/pagination'

let state = {
  'tableData': [], 'page': 1, 'rows': 10, 'pages': 1
}

function firstRender() {
  let container = document.createElement("div");
  container.className = 'container'
  document.body.appendChild(container);
  container.style.overflowX = 'auto'
  let table = document.createElement("table");
  let pages = document.createElement("div");
  pages.className = 'pages'
  container.append(table, pages);
  let thead = document.createElement("thead")
  let tbody = document.createElement("tbody")
  let trh = document.createElement("tr")
  let trb1 = document.createElement("td")
  let th1 = document.createElement("th")
  let th2 = document.createElement("th")
  let th3 = document.createElement("th")
  th1.innerText = "ID"
  th2.innerText = "Name"
  th3.innerText = "Email"
  trb1.setAttribute('colspan', 3)
  trb1.innerText = "Data loading..."
  table.append(thead, tbody)
  thead.append(trh)
  trh.append(th1, th2, th3)
  tbody.append(trb1)
  getUserData();
}
firstRender();

async function getUserData() {
  let resp = await fetch(apiuri)
  let data = await resp.json()
  let pageButtons = []
  state.tableData = data
  state.pages = Math.ceil(data.length / state.rows)
  let first = document.createElement("a")
  first.id = "firstButton"
  first.innerText = "First"
  first.setAttribute('href', 'javascript:void(0);')
  first.setAttribute('onclick', 'paginate("1")')
  let previous = document.createElement("a")
  previous.id = "previousButton"
  previous.innerText = "Previous"
  previous.setAttribute('href', 'javascript:void(0);')
  let next = document.createElement("a")
  next.id = "nextButton"
  next.innerText = "Next"
  next.setAttribute('href', 'javascript:void(0);')
  let last = document.createElement("a")
  last.id = "lastButton"
  last.innerText = "Last"
  last.setAttribute('href', 'javascript:void(0);')
  last.setAttribute('onclick', `paginate(${state.pages})`)


  for (let i = 1; i <= state.pages; i++) {
    let pagebutton = document.createElement("a")
    pagebutton.id = `page-${i}`
    pagebutton.innerText = `${i}`
    pagebutton.setAttribute('href', 'javascript:void(0);')
    pagebutton.setAttribute('onclick', `paginate(${i})`)
    pageButtons.push(pagebutton)

  }
  document.getElementsByClassName('pages')[0].append(first, previous, ...pageButtons, next, last)
  paginate(state.page)
}
//getUserData()
async function paginate(page = 1) {
  state.page = page
  let data = state.tableData
  let rows = state.rows
  let trimStart = (page - 1) * rows;
  let trimEnd = trimStart + rows;
  let trimmedData = data.slice(trimStart, trimEnd)
  document.getElementById('previousButton').setAttribute('onclick', `paginate(${+page - 1})`)
  document.getElementById('nextButton').setAttribute('onclick', `paginate(${+page + 1})`)
  page == 1 ? document.getElementById('previousButton').style.display = 'none' : document.getElementById('previousButton').style.display = 'unset';
  page == state.pages ? document.getElementById('nextButton').style.display = 'none' : document.getElementById('nextButton').style.display = 'unset';
  renderRows(trimmedData)
  let buttons = document.getElementsByTagName('a')
  Array.from(buttons).forEach(element => {
    element.classList.remove('active')
    element.innerText == state.page ? element.classList.add('active') : null;
  });

}

function renderRows(trimmedData) {
  let tbody = document.getElementsByTagName('tbody')[0]
  tbody.innerHTML = '';
  let datarows = []
  trimmedData.forEach(element => {
    let bodyrow = document.createElement("tr")
    let th1 = document.createElement("th")
    let th2 = document.createElement("th")
    let th3 = document.createElement("th")
    th1.innerText = `${element.id}`
    th2.innerText = `${element.name}`
    th3.innerText = `${element.email}`
    bodyrow.append(th1, th2, th3)
    datarows.push(bodyrow)
    //   tbody.innerHTML += `<tr>
    //   <td></td>
    //   <td>${element.name}</td>
    //   <td>${element.email}</td>
    // </tr>`
  });
  tbody.append(...datarows)
}