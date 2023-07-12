import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import './App.css';
import AddTodo from './components/AddTodo';
import LoadingScreen from './components/Loading';
import TodoList from './components/TodoList';

export default function () {
	const [todoItems, setTodoItems] = useState([]);
	const [reFetch, setReFetch] = useState(false);
	const [loading, setLoading] = useState(true);

	const query = new URLSearchParams({
		_fields: 'id,title,status,menu_order,excerpt',
		status: 'pending,publish',
		per_page: 100,
		orderby: 'menu_order',
	});

	useEffect(() => {
		apiFetch({
			path: `/wp/v2/todo?${query}`,
		})
			.then((posts) => {
				setTodoItems(posts);
				setLoading(false);
				setLoading(false);
			})
			.catch((error) => console.error(error?.message));
	}, [reFetch, setReFetch]);

	const created = () => {
		setReFetch(!reFetch);
	};
	const deleted = () => {
		setReFetch(!reFetch);
	};

	return (
		<div className="dash-todo-layout">
			<div className="dash-todo-layout-body hide-if-no-js">
				<AddTodo created={created} />
				{loading ? (
					<LoadingScreen />
				) : (
					<TodoList items={todoItems} deleted={deleted} />
				)}
			</div>
		</div>
	);
}
