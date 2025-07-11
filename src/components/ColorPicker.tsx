import React from 'react'
import { TODO_COLORS, TodoColor } from '@/types/todo'

interface ColorPickerProps {
  selectedColor: TodoColor
  onSelectColor: (color: TodoColor) => void
}

export default function ColorPicker({
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  return (
    <div className="color-picker">
      {TODO_COLORS.map(({ name, value }) => (
        <button
          key={name}
          type="button"
          className={`color-swatch ${selectedColor === value ? 'selected' : ''}`}
          style={{ backgroundColor: value }}
          onClick={() => onSelectColor(value)}
          aria-label={`Selecionar cor ${name}`}
          title={name}
        >
          <span className="sr-only">{name}</span>
        </button>
      ))}
    </div>
  )
}
