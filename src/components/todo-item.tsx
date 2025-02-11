'use client'

import { ITodo } from '@/types'
import DeleteButton from './ui/buttons/delete-button'
import { Dispatch, SetStateAction } from 'react'
import { deleteTodo } from '@/services/todo.service'
import { useMutation } from '@tanstack/react-query'

type Props = {
	todo: ITodo
	created?: boolean
	changeCreatedTodos?: Dispatch<SetStateAction<ITodo[]>>
}

export default function TodoItem({ todo, created, changeCreatedTodos }: Props) {
	const { mutate, data, isPending, isSuccess, isError } = useMutation({
		mutationFn: deleteTodo,
		mutationKey: ['deletedTodo', todo.id],
		onSuccess: () => {
			const storageTodos: ITodo[] = JSON.parse(localStorage.getItem('createdTodos') as string)

			const updatedStorageTodos = storageTodos.filter(createdTodo => {
				return createdTodo.id !== todo.id
			})

			localStorage.setItem('createdTodos', JSON.stringify(updatedStorageTodos))
		},
	})

	const onDelete = () => {
		mutate(todo.id)

		changeCreatedTodos!(prevTodos => {
			const updatedTodos = prevTodos.filter(createdTodo => {
				return createdTodo.id !== todo.id
			})

			return [...updatedTodos]
		})
	}

	const x = todo.completed.toString()

	return (
		<>
			<li className='w-100 h-10 -outline-offset-2 relative flex justify-between cursor-default select-none gap-3 border-y px-3 py-2 outline-hidden transition first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 sm:text-sm'>
				<p className='truncate'>{todo.title}</p>
				<div className='flex gap-2 items-center'>
					{created && <DeleteButton className='w-5' onClick={() => onDelete()} />}
					<div className='basis-[100px] flex gap-2 items-center'>
						<label className='text-white opacity-80'>Completed</label>
						<input type='checkbox' checked={todo.completed} onChange={e => {}} />
					</div>
				</div>
			</li>
		</>
	)
}
