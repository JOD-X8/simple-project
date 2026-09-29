import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:8080/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  // Fetch all tasks when the app loads
  useEffect(() => {
    fetchTodos()
  }, [])

  // GET — Fetch all tasks from the backend
  async function fetchTodos() {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  // POST — Add a new task
  async function addTodo() {
    if (newTask.trim() === '') return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      })
      const data = await response.json()
      setTodos([...todos, data])
      setNewTask('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // PUT — Toggle task completed/not completed
  async function toggleTodo(todo) {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      })
      const data = await response.json()
      setTodos(todos.map((t) => (t.id === data.id ? data : t)))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  // DELETE — Remove a task
  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setTodos(todos.filter((t) => t.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  // Handle Enter key press in input
  function handleKeyDown(e) {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      {/* Input to add new task */}
      <div className="input-row">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      {/* List of tasks */}
      {todos.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one above!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              <span className="task-text">{todo.task}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
