import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={ queryClient }>
			<div className="dash-todo-layout">
				<div className="dash-todo-layout-body hide-if-no-js">
					<AddTodo />
					<TodoList />
				</div>
			</div>
			<ReactQueryDevtools initialIsOpen={ false } />
		</QueryClientProvider>
	);
}
