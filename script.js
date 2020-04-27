const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')

let todoList = []
actionPanel2.style.display = 'none'

inputElement.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.keyCode === 13) &&
   (inputElement.value)) {
    todoList.unshift({
      content: inputElement.value,
      done: false,
      selected: false,
    })
    inputElement.value = ''

    upgradeView()
  }
})

function upgradeView() {
  ulElement.innerHTML = ''

  for (let index = 0; index < todoList.length; index++) {
    const todoItem = todoList[index]

    const liElement = document.createElement('li')
    liElement.className = 'list-group-item  d-flex justify-content-between mb-1'
    ulElement.append(liElement)

    const divElementCheck = document.createElement('div')
    divElementCheck.className = 'form-group form-check'
    liElement.append(divElementCheck)

    const checkboxElement = document.createElement('input')
    checkboxElement.type = 'checkbox'
    checkboxElement.className = 'form-check-input'
    checkboxElement.id = 'todoItem' + index
    checkboxElement.checked = todoItem.selected 
    divElementCheck.append(checkboxElement)

    const labelElement = document.createElement('label')
    labelElement.className = 'form-check-label'
    labelElement.innerText = todoItem.content
    labelElement.setAttribute('for', 'todoItem' + index)
    divElementCheck.append(labelElement)
    
    if (todoItem.done) {
      labelElement.className += ' todoDone'
    }

    const divElementBtn = document.createElement('div')
    divElementBtn.className = 'btn-group btn-group-toggle btn-sm" data-toggle="buttons'
    liElement.append(divElementBtn)

    if (!todoItem.done) {
      const buttonDoneElement = document.createElement('button')
      buttonDoneElement.type = 'button'
      buttonDoneElement.className = 'btn btn-outline-primary btn-sm'
      buttonDoneElement.innerText = 'Done'
      divElementBtn.append(buttonDoneElement)

      buttonDoneElement.addEventListener('click', () => {
        todoItem.done = !todoItem.done 
        upgradeView()
      })
    } else {
      const btnRestoreElement = document.createElement('button')
      btnRestoreElement.type = 'button'
      btnRestoreElement.className = 'btn btn-outline-primary btn-sm'
      btnRestoreElement.innerText = 'Restore'
      divElementBtn.append(btnRestoreElement)
 
      btnRestoreElement.addEventListener('click', () => {
        todoItem.done = false
        upgradeView()
      })
     
      const buttonRemoveElement = document.createElement('button')
      buttonRemoveElement.type = 'button'
      buttonRemoveElement.className = 'btn btn-outline-danger btn-sm'
      buttonRemoveElement.innerText = 'Remove'
      divElementBtn.append(buttonRemoveElement)     

      buttonRemoveElement.addEventListener('click', () => {
        todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem)
        upgradeView()
      })
    }
    checkboxElement.addEventListener('change', () => {
      todoItem.selected = checkboxElement.checked
      upgradeView()
    })
  }
  const someSelected = todoList.some(todoItem => todoItem.selected) 
  if (someSelected) {
    actionPanel2.style.display = 'flex'
  } else {
    actionPanel1.style.display = 'flex'
    actionPanel2.style.display = 'none'
  }
}

document.getElementById('doneAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = true
      todoItem.selected = false
    }
    upgradeView()
  }
})

document.getElementById('restoreAction').addEventListener('click', () => {
  for (const todoItem of todoList) {
    if (todoItem.selected) {
      todoItem.done = false
      todoItem.selected = false
    }
    upgradeView()
  }
})

document.getElementById('removeAction').addEventListener('click', () => {
  todoList = todoList.filter(todoItem => !todoItem.selected)

  upgradeView()
})

document.getElementById('selectAll').addEventListener('click', () => {
  for(todoItem of todoList ) {
    todoItem.selected = true
  }
  upgradeView()
})
