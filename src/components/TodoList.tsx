import { Todo } from '@/types/todo'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
  filterColor?: string
}

export default function TodoList({
  todos,
  onToggleFavorite,
  onDelete,
  onEdit,
  filterColor,
}: Props) {
  const filtered = todos
    .filter((todo) => !filterColor || todo.color === filterColor)
    .sort((a, b) => (a.isFav === b.isFav ? 0 : a.isFav ? -1 : 1))

  return (
    <div className="todo-list">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
