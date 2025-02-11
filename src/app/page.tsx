import TodoListArea from '@/components/todo-list-area'

export default function Home() {
	return (
		<div className='grid place-items-center h-screen'>
			<main className='flex flex-col items-center sm:items-start'>
				<TodoListArea />
			</main>
		</div>
	)
}
