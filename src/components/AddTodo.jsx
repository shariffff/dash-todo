import { Card, CardBody, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function ({ created }) {
	const [todo, setTodo] = useState('');
	const [showForm, setShowForm] = useState(false);
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
		if (todo.trim().length !== 0) {
			createTodo();
		}
	};
	return (
		<Card>
			<CardBody>
				<Button
					__experimentalIsFocusable
					icon={'plus-alt2'}
					iconPosition="left"
					onClick={() => setShowForm(!showForm)}
					variant="secondary"
				>
					Add New
				</Button>
				{showForm && (
					<form
						onSubmit={handleFormSubmit}
						style={{
							marginTop: 10,
						}}
					>
						<TextControl
							autoFocus
							label={'Add Todo item'}
							hideLabelFromVision
							placeholder="Type here and press Enter ↵ hi"
							onChange={(value) => setTodo(value)}
							value={todo}
							onKeyDown={handleKeyDown}
						/>
					</form>
				)}
			</CardBody>
		</Card>
	);
}
