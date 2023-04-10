import { Card, CardBody, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function ({ created }) {
	const [todo, setTodo] = useState('');

	const createTodo = () => {
		apiFetch({
			path: '/wp/v2/todo',
			method: 'POST',
			data: { title: todo, status: 'pending' },
		})
			.then((res) => {
				setTodo('');
				created(true);
			})
			.catch((err) => console.log(err?.message));
	};
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleFormSubmit(event);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		createTodo();
	};
	return (
		<Card>
			<CardBody>
				<form onSubmit={handleFormSubmit}>
					<TextControl
						autoFocus
						label={'Add Todo item'}
						hideLabelFromVision
						placeholder="Type here and Press ENTER to create a todo item."
						onChange={(value) => setTodo(value)}
						value={todo}
						onKeyDown={handleKeyDown}
					/>
				</form>
			</CardBody>
		</Card>
	);
}
