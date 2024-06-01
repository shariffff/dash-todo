import {
	Icon,
	Button,
	CheckboxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stripTag, formatDate, priorityLabel } from '../functions';

export default function TodoItem(props) {

	const { title, id, status, priority, due, openModal } = props;
	const isMounted = useRef(false);
	const [isChecked, setChecked] = useState(status === 'publish');

	const setStatus = isChecked ? 'publish' : 'pending';

	const priorityClass = priorityLabel(priority);
	const dueDate = formatDate(stripTag(due));
	const hasPriority = priority !== 0 ? 'has--priority' : 'has--no-priority';
	const hasDueDate = dueDate !== '' ? 'has--due-date' : 'has--no-due-date';
	const completedClass = isChecked ? 'completed' : 'incomplete';

	useEffect(() => {
		if (isMounted.current) {
			apiFetch({
				path: `/wp/v2/todo/${id}`,
				method: 'PUT',
				data: { status: setStatus },
			})
				.then(() => { })
				.catch((err) => console.log(err?.message));
		} else {
			isMounted.current = true;
		}
	}, [isChecked, setChecked]);

	const deleteTodo = () => {
		mutation.mutate(id)
	};
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (id) => apiFetch({
			path: `/wp/v2/todo/${id}?force=true`,
			method: 'DELETE',
		}),
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		},
	})
	return (
		<>
			<HStack
				alignment="topLeft"
				className={`single--todo ${completedClass}  ${priorityClass.toLowerCase()} ${hasPriority} ${hasDueDate}`}
			>
				<CheckboxControl
					label={`${title}`}
					checked={isChecked}
					onChange={setChecked}
				/>
				<span className="todo--priority">{priorityClass}</span>
				<span className="due--date">{dueDate}</span>
				<Button
					style={{ height: 20 }}
					className="edit-todo"
					onClick={() => openModal(props)}
				>
					<Icon
						icon="edit"
						size={15}
						style={{ color: 'gray' }}
					></Icon>
				</Button>
				<Button
					style={{ height: 20 }}
					className="delete"
					onClick={deleteTodo}
				>
					<Icon
						icon="trash"
						size={15}
						style={{ color: 'gray' }}
					></Icon>
				</Button>
			</HStack >
		</>
	);
}
