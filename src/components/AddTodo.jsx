import {
	Button,
	Card,
	CardBody,
	Flex,
	FlexBlock,
	TextControl,
} from '@wordpress/components';
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
	return (
		<Card>
			<CardBody>
				<Flex>
					<FlexBlock>
						<TextControl
							label={'Todo item'}
							onChange={(value) => setTodo(value)}
							value={todo}
						/>
					</FlexBlock>

					<Button
						isSmall={true}
						style={{ height: 30, marginTop: 14 }}
						variant="secondary"
						onClick={createTodo}
						disabled={Boolean(!todo)}
					>
						Add
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
}
