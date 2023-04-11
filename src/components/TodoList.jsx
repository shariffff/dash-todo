import {
	__experimentalVStack as VStack,
	Card,
	CardBody,
} from '@wordpress/components';
import TodoItem from './TodoItem';

export default function ({ items, deleted }) {
	return (
		<Card>
			<CardBody>
				<VStack>
					{items.map(({ id, title, status }) => (
						<TodoItem
							key={id}
							title={title.raw ?? title.rendered}
							id={id}
							status={status}
							deleted={deleted}
						/>
					))}
				</VStack>
			</CardBody>
		</Card>
	);
}
