import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import TodoList from './components/TodoList';
import './App.css';
import AddTodo from './components/AddTodo';
import LoadingScreen from './components/Loading';
export default function () {
	const [todoItems, setTodoItems] = useState([]);
	const [reFetch, setReFetch] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiFetch({
			path: '/wp/v2/todo?status=pending,publish&per_page=100&orderby=id&context=edit',
		})
			.then((posts) => {
				setTodoItems(posts);
				setLoading(false);
			})
			.catch((error) => console.error(error?.message));
	}, [reFetch, setReFetch, loading, setLoading]);

	const created = () => setReFetch(!reFetch);
	const deleted = () => setReFetch(!reFetch);

	return (
		<div className="dash-todo-layout">
			<div className="dash-todo-header">
				<div className="dash-todo-title-section">
					<h1>Todo</h1>
				</div>
			</div>
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
