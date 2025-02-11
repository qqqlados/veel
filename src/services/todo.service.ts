'use server'

import { ITodo } from '@/types'
import { axiosInstance } from '@/utils/axios-instance'

export async function fetchTodos() {
	try {
		const response = await axiosInstance.get('?_limit=10')

		return response.data
	} catch (err) {
		console.error('Internal server error')
	}
}

export async function createTodo(newTodo: ITodo): Promise<ITodo | undefined> {
	try {
		const response = await axiosInstance.post('/', newTodo)

		console.log('Todo was created successfully')

		return response.data
	} catch (err) {
		console.error('Internal server error')
	}
}

export async function deleteTodo(id: ITodo['id']): Promise<ITodo | undefined> {
	try {
		const response = await axiosInstance.delete(`/${id}`)

		console.log('Todo was deleted successfully')

		return response.data
	} catch (err) {
		console.error('Internal server error')
	}
}
