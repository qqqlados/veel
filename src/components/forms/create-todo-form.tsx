'use client'

import { createTodo } from '@/services/todo.service'
import { ITodo } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

export default function CreateTodoForm({
	createdTodos,
	insertCreatedTodos,
}: {
	createdTodos: ITodo[] | []
	insertCreatedTodos: Dispatch<SetStateAction<ITodo[]>>
}) {
	const { mutate, data, isSuccess, isPending } = useMutation({
		mutationFn: createTodo,
		mutationKey: ['createdTodo'],
		onSuccess: () => {
			localStorage.setItem('createdTodos', JSON.stringify([...createdTodos]))
		},
	})

	const [title, setTitle] = useState<string>('')
	const [completed, setCompleted] = useState<boolean>(false)

	const [error, setError] = useState<boolean>(false)

	const handleSubmit = (newTodo: ITodo) => {
		if (title.length > 3) {
			setError(false)

			mutate(newTodo)

			insertCreatedTodos(state => [newTodo, ...state])

			setTitle('')
			setCompleted(false)
		} else {
			setError(true)
		}
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				const uniqueTodoId = crypto.randomUUID()
				handleSubmit({ userId: '101', id: uniqueTodoId, title, completed })
			}}
			className='basis-[200px] flex flex-col items-center justify-end gap-5'
		>
			<h1 className='uppercase italic font-bold'>Create your todo</h1>
			<div className='flex gap-5 items-center'>
				<input
					name='title'
					type='text'
					onChange={e => setTitle(e.target.value)}
					value={title}
					className='px-2.5 py-1 h-10 w-full rounded-lg bg-transparent border-l border-b border-white/90 text-white placeholder:text-white/70 placeholder:font-normal focus:outline-none'
					placeholder='Type a todo title'
				/>
				<div className='flex items-center gap-2'>
					<label htmlFor='completed'>Completed</label>
					<input name='completed' type='checkbox' onChange={e => setCompleted(state => !state)} checked={completed} />
				</div>
			</div>

			{error && <p className='text-red-500'>Your todo title must include minimum 3 characters.</p>}

			<button
				type='submit'
				className='outline lowercase outline-ring outline-offset-2 relative inline-flex items-center justify-center gap-x-2 border inset-shadow-white/15  h-8 px-4 rounded-lg cursor-pointer outline-0 text-s'
			>
				Create
			</button>
		</form>
	)
}
