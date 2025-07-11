import React, { useState, useEffect } from 'react'
import { Todo, TodoColor } from '@/types/todo'
import ColorPickerDropdown from './ColorPickerDropdown'

interface TodoFormProps {
  editingTodo: Todo | null
  onCreate: (data: Omit<Todo, 'id'>) => void
  onUpdate: (data: Todo) => void
  onCancelEdit: () => void
}

export default function TodoForm({
  editingTodo,
  onCreate,
  onUpdate,
  onCancelEdit,
}: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState<TodoColor>('#FF6633' as TodoColor)

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setColor(editingTodo.color)
    } else {
      setTitle('')
      setColor('#FF6633')
    }
  }, [editingTodo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    if (editingTodo) {
      onUpdate({ ...editingTodo, title, color })
    } else {
      onCreate({ title, color, isFav: false })
    }

    // Resetar após criação
    setTitle('')
    setColor('#FF6633')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ColorPickerDropdown selectedColor={color} onSelectColor={setColor} />

      <button className="btn-primary" type="submit">
        {editingTodo ? 'Atualizar' : 'Adicionar'}
      </button>

      {editingTodo && (
        <button className="btn-primary" type="button" onClick={onCancelEdit}>
          Cancelar
        </button>
      )}
    </form>
  )
}
