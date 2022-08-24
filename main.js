// Elements of table
const TABLE_VIEW_HEAD = document.querySelector('#table thead')
const TABLE_VIEW_BODY = document.querySelector('#table tbody')

// Checkbox for hide elements
const CHECKFILTERS = document.querySelector('.filter')

const table = {
  headers: [
    { title: '#', key: 'key' },
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Actions', key: 'actions' },
  ],
  rows: [
    {
      key: {
        value: 1,
        key: 'key',
      },
      name: {
        value: 'Herlander Bento',
        key: 'name',
      },
      email: {
        value: 'herlanderbento@gmail.com',
        key: 'email',
      },
      actions: {
        key: 'actions',
      },
    },
    {
      key: {
        value: 2,
        key: '#',
      },
      name: {
        value: 'Kiala Gabriel',
        key: 'name',
      },
      email: {
        value: 'kialagabriel@gmail.com',
        key: 'email',
      },
      actions: {
        key: 'actions',
      },
    },
  ],
}

window.addEventListener('load', () => {
  loadCheckboxHeaders()
  loadHeaderElementsOfTable()
  loadBodyElementsOfTable()
})

function loadCheckboxHeaders() {
  const filterTemplate = `
    ${table.headers
      .map(
        (header) => `
        <li class="form-check form-check-inline">
          <input 
            class="form-check-input" 
            type="checkbox" 
            name="checkbok" 
            id="${header.key}" 
            onclick="handleHideCheckedElements(this)"
          >
          <label for="${header.key}">${header.title}</label>
        </li>        
    `,
      )
      .join('')}
`

  CHECKFILTERS.insertAdjacentHTML('afterbegin', filterTemplate)
}

let checkItems = []

function handleHideCheckedElements(e) {
  const { id, checked } = e

  if (checked) {
    checkItems.push(id)

    loadHeaderElementsOfTable()
    loadBodyElementsOfTable()
    return
  }

  checkItems.splice(
    checkItems.findIndex((item) => item === id),
    1,
  )

  loadHeaderElementsOfTable()
  loadBodyElementsOfTable()
}

function loadHeaderElementsOfTable() {
  let theadTemplate = `

    ${table.headers
      .filter((header) => !checkItems.includes(header.key))
      .map(
        (header) => `
        <th>${header.title}</th>
    `,
      )
      .join('')}
    
    `

  TABLE_VIEW_HEAD.innerHTML = theadTemplate
}

function loadBodyElementsOfTable() {
  let bodyTemplate = []

  table.rows.map((row) => {
    Object.entries(row).forEach((elem) => {
      if (!checkItems.includes(elem[0])) {
        if (elem[0] === 'actions') {
          bodyTemplate.push(
            `<td data-key="${row[elem[0]].key}">
              <button onclick="actions(this, ${
                row.key.value
              })" class="btn btn-primary">Action</button>
            </td>`,
          )

          return
        }

        bodyTemplate.push(
          `<td data-key="${row[elem[0]].key}">${row[elem[0]].value}</td>`,
        )
      }
    })
  })

  setTimeout(() => {
    const html = group(bodyTemplate, bodyTemplate.length / 2).value.map(
      (elem) => `<tr>${elem.join('')}</tr>`,
    )

    TABLE_VIEW_BODY.innerHTML = html.join('')
  }, 200)
}

function actions(e, id) {
  alert('Clicked on ' + id)
}

function group(payload, max) {
  return payload.reduce(
    (p, value) =>
      (p.value[
        Array.isArray(p.value[p.key]) && p.value[p.key].length === max
          ? ++p.key
          : p.key
      ] = Array.isArray(p.value[p.key])
        ? p.value[p.key].concat([value])
        : [value]) && p,
    { key: 0, value: [] },
  )
}
