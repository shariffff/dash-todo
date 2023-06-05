import {
	CheckboxControl,
	Button,
	__experimentalHStack as HStack,
	Icon,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { stripTag, formatDate, priorityLabel } from '../functions';
export default function ({ title, id, status, deleted, priority, due }) {
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
				.then(() => {})
				.catch((err) => console.log(err?.message));
		} else {
			isMounted.current = true;
		}
	}, [isChecked, setChecked]);
	const deleteTodo = () => {
		apiFetch({
			path: `/wp/v2/todo/${id}?force=true`,
			method: 'DELETE',
		})
			.then(() => {
				deleted(true);
			})
			.catch((err) => console.log(err?.message));
	};
	return (
		<HStack
			alignment="topLeft"
			className={`single--todo ${completedClass}  ${priorityClass.toLowerCase()} ${hasPriority} ${hasDueDate}`}
		>
			<CheckboxControl
				label={`${title}`}
				checked={isChecked}
				onChange={setChecked}
				// className={isChecked ? 'completed' : 'incomplete'}
			/>
			<span className="todo--priority">{priorityClass}</span>
			<span className="due--date">{dueDate}</span>

			<Button style={{ height: 20 }} className="delete" onClick={deleteTodo}>
				<Icon icon="trash" size={15} style={{ color: 'gray' }}></Icon>
			</Button>
		</HStack>
	);
}
