'use strict'

const todos = getLocalTodos()

const filters = {
    searchText: '',
    isComplete: false
}

listTodos(todos, filters)

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Add Clickity')
    const text = e.target.elements.newTodoText.value
    if (text) {
        todos.push({ id: uuidv4(), text, completed: false })
        e.target.elements.newTodoText.value = ''
        listTodos(todos, filters)
        saveTodos(todos)
    }
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value.toLowerCase()
    listTodos(todos, filters)
})

document.querySelector('#toShow').addEventListener('change', (e) => {
    filters.isComplete = e.target.checked
    listTodos(todos, filters)
})