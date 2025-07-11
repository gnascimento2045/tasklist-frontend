export interface ColorOption {
  name: string;
  value: `#${string}`; // restringe para apenas hex strings
}

export const TODO_COLORS = [
  { name: 'red', value: '#ff4040ff' },
  { name: 'pink', value: '#04a712ff' },
  { name: 'purple', value: '#5d45e6ff' },
  { name: 'yellow', value: '#ffff5eff' },
  { name: 'blue', value: '#5fdcffff' },
] as const;

export type TodoColor = string;

//export type TodoColor = ColorOption['value'] // só a string da cor

export interface Todo {
  id: string;
  title: string;
  color: TodoColor;
  isFav: boolean;
}
