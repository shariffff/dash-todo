import {
	__experimentalSpacer as Spacer,
	__experimentalVStack as VStack,
	Card,
	CardBody,
} from '@wordpress/components';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import apiFetch from '@wordpress/api-fetch';

export const Todo = ({ todoItems, addNewTodo, title, setTitle }) => {
	console.log('ren');
	return (
		<>
			<Spacer marginBottom={6} />
			<AddTodoForm addNewTodo={addNewTodo} title={title} setTitle={setTitle} />
			<Card>
				<CardBody>
					<VStack>
						{todoItems.map(({ id, title, status }) => (
							<TodoItem key={id} title={title.rendered} id={id} status={status} />
						))}
					</VStack>
				</CardBody>
			</Card>

			<Spacer marginBottom={6} />
		</>
	);
};
