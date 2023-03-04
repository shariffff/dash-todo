import { CheckboxControl } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export const TodoItem = ({ title, id, status }) => {
	const [isChecked, setChecked] = useState(status === 'publish');
	const firstRender = useFirstRender();

	const setStatus = isChecked ? 'publish' : 'pending';
	useEffect(() => {
		if (firstRender) {
			return;
		}
		apiFetch({
			path: `/wp/v2/todo/${id}`,
			method: 'PUT',
			data: { status: setStatus },
		}).then((res) => {});
	}, [isChecked]);
	return (
		<CheckboxControl
			label={title}
			checked={isChecked}
			onChange={setChecked}
			className={isChecked ? 'completed' : 'incomplete'}
		/>
	);
};

export function useFirstRender() {
	const firstRender = useRef(true);

	useEffect(() => {
		firstRender.current = false;
	}, []);

	return firstRender.current;
}
