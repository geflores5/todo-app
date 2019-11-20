'use strict'

// Checks localstorage for todos
const getLocalTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// Save Todos to storage
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// Generates todo element and inserts into DOM
const generateTodoDom = (todo) => {
    const todoEl = document.createElement('div')
    const todoText = document.createElement('span')
    const button = document.createElement('button')
    const checkbox = document.createElement('input')

    // Setup delete button
    button.textContent = 'X'
    button.addEventListener('click', () => {
        deleteTodo(todo.id)
        saveTodos(todos)
        listTodos(todos, filters)
    })
    todoEl.appendChild(button)

    // Setup todo Text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup todo completed checkbox
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', (e) => {
        todo.completed = e.target.checked
        saveTodos(todos)
        listTodos(todos, filters)
    })
    todoEl.appendChild(checkbox)

    // Render div to Dom
    document.querySelector('#todos').appendChild(todoEl)
}

// Display # of incomplete todos
const todoSummary = (incompleteTodos) => {
    const notice = document.createElement('h3')
    notice.textContent = `You have ${incompleteTodos.length} todos left.`
    document.querySelector('#todos').appendChild(notice)
}

// Renders the list of todos
const listTodos = (todos, filters) => {
    document.querySelector('#todos').innerHTML = ''
    
    const filteredTodos = todos.filter((todo) => {
        const searchMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const isCompleteMatch = !filters.isComplete || !todo.completed

        return searchMatch && isCompleteMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    
    todoSummary(incompleteTodos)

    filteredTodos.forEach((todo) => generateTodoDom(todo))
}

// Deletes todo using ID
const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    todos.splice(todoIndex, 1)
}