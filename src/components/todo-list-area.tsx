'use client'

import { fetchTodos } from '@/services/todo.service'
import { ITodo } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CreateTodoForm from './forms/create-todo-form'
import TodoList from './todo-list'

export default function TodoListArea() {
	const [createdTodos, setCreatedTodos] = useState<ITodo[]>([])
	const {
		data: todos,
		error,
		isLoading,
		isError,
		isSuccess,
	} = useQuery<Array<ITodo>>({
		queryKey: ['todos'],
		queryFn: fetchTodos,
	})

	useEffect(() => {
		const storedTodos = localStorage.getItem('createdTodos')

		if (storedTodos) {
			const parsedTodos: ITodo[] = JSON.parse(storedTodos)
			if (parsedTodos.length > 0) {
				setCreatedTodos([...parsedTodos])
			}
		}
	}, [])

	return (
		<div className='flex flex-col h-full'>
			{isLoading ? (
				<h1>Loading...</h1>
			) : isError ? (
				<h1 className='text-red-500'>{error.message}</h1>
			) : isSuccess && todos ? (
				<div className='flex flex-col items-center'>
					<CreateTodoForm createdTodos={createdTodos} insertCreatedTodos={setCreatedTodos} />
					<TodoList createdTodos={createdTodos} todos={todos} setCreatedTodos={setCreatedTodos} />
				</div>
			) : null}
		</div>
	)
}
