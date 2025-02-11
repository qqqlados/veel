'use client'

import { ITodo } from '@/types'
import TodoItem from './todo-item'
import { Dispatch, SetStateAction } from 'react'

export default function TodoList({
	createdTodos,
	todos,
	setCreatedTodos,
}: {
	createdTodos?: ITodo[]
	todos?: ITodo[]
	setCreatedTodos: Dispatch<SetStateAction<ITodo[]>>
}) {
	return (
		<div className='flex-1 max-h-[450px] min-h-[400px] overflow-auto'>
			<ul>
				{createdTodos!.length > 0 && createdTodos?.map(todo => <TodoItem created changeCreatedTodos={setCreatedTodos} todo={todo} key={todo.id} />)}
				{todos!.length > 0 && todos?.map(todo => <TodoItem todo={todo} key={todo.id} />)}
			</ul>
		</div>
	)
}
