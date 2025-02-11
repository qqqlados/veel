'use client'

import { Trash } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function DeleteButton(props: Props) {
	return (
		<button {...props}>
			<Trash className={props.className} />
		</button>
	)
}
