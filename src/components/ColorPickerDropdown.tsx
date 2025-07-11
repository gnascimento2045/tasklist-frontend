import { useState, useRef, useEffect } from 'react'
import { Palette, X } from 'lucide-react'
import { TODO_COLORS, TodoColor } from '@/types/todo'

interface Props {
  selectedColor: TodoColor
  onSelectColor: (color: TodoColor) => void
}

export default function ColorPickerDropdown({
  selectedColor,
  onSelectColor,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(selectedColor)
  const [tab, setTab] = useState<'preset' | 'custom'>('preset')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', () => setIsOpen(false), true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', () => setIsOpen(false), true)
    }
  }, [isOpen])

  // Fecha com ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <div className="color-picker-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="color-picker-dropdown__button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette size={18} />
        <div
          className="color-picker-dropdown__color-preview"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay para mobile */}
          <div className="color-picker-dropdown__overlay" onClick={close} />

          {/* Dropdown */}
          <div className="color-picker-.color-picker-dropdown__content">
            {/* Seta indicadora */}
            <div className="color-picker-dropdown__arrow" />

            <div className="color-picker-dropdown__header">
              <h3 className="color-picker-dropdown__title">Escolher Cor</h3>
              <button
                onClick={close}
                className="color-picker-dropdown__close"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="color-picker-dropdown__tabs">
              <button
                onClick={() => setTab('preset')}
                className={`color-picker-dropdown__tab ${
                  tab === 'preset' ? 'color-picker-dropdown__tab--active' : ''
                }`}
              >
                Cores
              </button>
              <button
                onClick={() => setTab('custom')}
                className={`color-picker-dropdown__tab ${
                  tab === 'custom' ? 'color-picker-dropdown__tab--active' : ''
                }`}
              >
                Personalizada
              </button>
            </div>

            {/* Preset Colors */}
            {tab === 'preset' && (
              <div className="color-picker-dropdown__preset-colors">
                {TODO_COLORS.map(({ name, value }) => (
                  <button
                    key={name}
                    onClick={() => {
                      onSelectColor(value)
                      close()
                    }}
                    className={`color-picker-dropdown__color-button ${
                      selectedColor === value
                        ? 'color-picker-dropdown__color-button--selected'
                        : ''
                    }`}
                    style={{ backgroundColor: value }}
                    title={name}
                    aria-label={`Selecionar cor ${name}`}
                  />
                ))}
              </div>
            )}

            {/* Custom Color */}
            {tab === 'custom' && (
              <div className="color-picker-dropdown__custom-color">
                <div className="color-picker-dropdown__custom-inputs">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="color-picker-dropdown__color-input"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="color-picker-dropdown__text-input"
                    placeholder="#000000"
                  />
                </div>

                <div
                  className="color-picker-dropdown__custom-preview"
                  style={{ backgroundColor: customColor }}
                />

                <button
                  className="color-picker-dropdown__use-color-button"
                  onClick={() => {
                    onSelectColor(customColor)
                    close()
                  }}
                >
                  Usar esta cor
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
