import { __ } from '@wordpress/i18n';
import { __experimentalHeading as Heading } from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect, useRef } from '@wordpress/element';
import { Todo } from './Todo';
import './styles/styles.css';

export const App = () => {
	const [todoItems, setTodoItems] = useState([]);
	const [title, setTitle] = useState('');
	const [created, setCreated] = useState(false);

	useEffect(() => {
		apiFetch({ path: '/wp/v2/todo?status=pending,publish&per_page=100' }).then((posts) => {
			setTodoItems(posts);
		});
	}, [created, setCreated]);

	const addNewTodo = () => {
		apiFetch({
			path: '/wp/v2/todo',
			method: 'POST',
			data: { title, status: 'pending' },
		}).then((res) => {
			setTitle('');
			setCreated(true);
		});
	};

	return (
		<div className="dash-todo-layout">
			<div className="dash-todo-header">
				<div className="dash-todo-title-section">
					<Heading as="h1">Todo</Heading>
				</div>
			</div>
			<div className="dash-todo-layout-body hide-if-no-js">
				<Todo todoItems={todoItems} addNewTodo={addNewTodo} setTitle={setTitle} />
			</div>
		</div>
	);
};
