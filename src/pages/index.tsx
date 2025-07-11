import { useEffect, useState } from 'react'
import { Todo, TodoColor } from '@/types/todo'
import { getTodos, createTodo, deleteTodo, updateTodo } from '@/services/api'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterColor, setFilterColor] = useState<TodoColor | ''>('') // para filtro
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // 🔄 Buscar tarefas na montagem do componente
  useEffect(() => {
    async function loadTodos() {
      const data = await getTodos()
      setTodos(data)
    }
    loadTodos()
  }, [])

  // ✅ Criar nova tarefa
  const handleCreate = async (newTodoData: Omit<Todo, 'id'>) => {
    try {
      const created = await createTodo(newTodoData)
      setTodos((prev) => [created, ...prev])
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    }
  }

  // ✅ Atualizar tarefa (usado também para edição)
  const handleUpdate = async (updated: Todo) => {
    try {
      const result = await updateTodo(updated.id, updated)
      setTodos((prev) => prev.map((t) => (t.id === result.id ? result : t)))
      setEditingTodo(null)
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  // ✅ Excluir tarefa
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
      if (editingTodo?.id === id) setEditingTodo(null)
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  // ✅ Marcar/desmarcar favorito
  const handleToggleFavorite = async (id: string) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    try {
      const updated = await updateTodo(id, { isFav: !todo.isFav }) // campo correto
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (error) {
      console.error('Erro ao favoritar tarefa:', error)
    }
  }

  // ✅ Editar tarefa
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
  }

  const handleCancelEdit = () => {
    setEditingTodo(null)
  }

  // ✅ Filtro por cor
  const handleFilter = (color: TodoColor | '') => {
    setFilterColor((prev) => (prev === color ? '' : color))
  }

  const uniqueColors = [...new Set(todos.map((t) => t.color))]

  const filteredTodos = filterColor
    ? todos.filter((t) => t.color === filterColor)
    : todos

  return (
    <main className="container">
      <h1>Minhas Tarefas</h1>

      <TodoForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingTodo={editingTodo}
        onCancelEdit={handleCancelEdit}
      />

      {uniqueColors.length > 0 && (
        <div className="filter-bar">
          <span>Filtrar por cor:</span>
          {uniqueColors.map((color) => (
            <button
              key={color}
              className={`color-filter ${filterColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleFilter(color)}
            />
          ))}
          <button onClick={() => setFilterColor('')}>Limpar Filtro</button>
        </div>
      )}

      <TodoList
        todos={filteredTodos}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
        onEdit={handleEdit}
        filterColor={filterColor}
      />
    </main>
  )
}
