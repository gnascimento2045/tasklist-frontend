import axios from 'axios'
import { Todo } from '@/types/todo'

export const api = axios.create({
  baseURL: 'http://localhost:3333/api', // Ajuste conforme seu backend
})

// Buscar todos os TODOs — rota correta: '/tasks' (plural)
export async function getTodos(): Promise<Todo[]> {
  const response = await api.get<Todo[]>('/tasks')
  return response.data
}

// Criar um novo TODO — rota correta: '/tasks'
export async function createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await api.post<Todo>('/tasks', data)
  return response.data
}

// Atualizar um TODO existente — rota correta: '/tasks/:id'
export async function updateTodo(
  id: string,
  data: Partial<Todo>
): Promise<Todo> {
  const response = await api.put<Todo>(`/tasks/${id}`, data)
  return response.data
}

// Deletar um TODO — rota correta: '/tasks/:id'
export async function deleteTodo(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`)
}

// Se você implementou o toggleFavorite no backend, não esqueça de criar função aqui:

export async function toggleFavorite(id: string): Promise<Todo> {
  const response = await api.patch<Todo>(`/tasks/${id}/favorite`)
  return response.data
}
