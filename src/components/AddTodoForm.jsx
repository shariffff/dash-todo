import { Button, Card, CardBody, Flex, FlexBlock, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
// import { useState } from '@wordpress/element';
// import apiFetch from '@wordpress/api-fetch';

export const AddTodoForm = ({ addNewTodo, title, setTitle }) => {
	console.log(title);
	return (
		<Card>
			<CardBody>
				<Flex>
					<FlexBlock>
						<TextControl
							label={__('Todo item', 'dash-todo')}
							onChange={(value) => setTitle(value)}
							value={title}
						/>
					</FlexBlock>

					<Button
						style={{ height: 30, marginTop: 14 }}
						variant="secondary"
						onClick={addNewTodo}
					>
						{__('Add', 'dash-todo')}
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
};
