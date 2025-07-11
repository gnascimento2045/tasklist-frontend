import { Todo } from '@/types/todo'

interface Props {
  todo: Todo
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

export default function TodoItem({
  todo,
  onToggleFavorite,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div
      className="todo-item"
      style={{
        backgroundColor: todo.color,
        padding: '18px',
        borderRadius: '15px',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Container dos botões no topo, alinhados à direita */}
      <div
        className="actions-top"
        style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)', // Centraliza horizontalmente
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          className="action-btn"
          onClick={() => onEdit(todo)}
          style={{
            cursor: 'pointer',
            fontSize: '18px', // Aumentar o tamanho do emoji
            padding: '4px 8px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '6px',
          }}
          title="Editar"
        >
          ✏️
        </button>

        <button
          className="action-btn"
          onClick={() => onToggleFavorite(todo.id)}
          style={{ cursor: 'pointer' }}
          title="Favorito"
        >
          {todo.isFav ? '⭐' : '☆'}
        </button>

        <button
          className="action-btn"
          onClick={() => onDelete(todo.id)}
          style={{ cursor: 'pointer' }}
          title="Excluir"
        >
          🗑️
        </button>
      </div>

      {/* Título da task, com margem para não ficar atrás dos botões */}
      <span
        onClick={() => onEdit(todo)}
        style={{
          cursor: 'pointer',
          display: 'block',
          paddingTop: '45px', // Aumentar para dar mais espaço
          fontWeight: 'bold',
          wordBreak: 'break-word',
          textAlign: 'center', // Centralizar o texto
        }}
      >
        {todo.title}
      </span>
    </div>
  )
}
