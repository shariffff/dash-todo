import {
	__experimentalVStack as VStack,
	Card,
	CardBody,
	Modal,
	Button,
	TextareaControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { decodeEntities } from '@wordpress/html-entities';
import TodoItem from './TodoItem';

export default function ({ items, deleted }) {
	const [modalData, setModalData] = useState({});
	const [isOpen, setOpen] = useState(false);
	const openModal = (data) => {
		setOpen(true);
		setModalData(data);
		console.log(data);
	};

	const closeModal = () => setOpen(false);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		// set a loading state - disable the button
		// update the todo
		apiFetch({
			path: `/wp/v2/todo/${modalData.id}`,
			method: 'PUT',
			data: { title: modalData.title },
		})
			.then(() => {
				deleted(true); // refetch the items
				closeModal();
			})
			.catch((err) => console.log(err?.message));
	};
	return (
		<Card style={{ boxShadow: 'none' }}>
			<CardBody>
				<VStack>
					{items.map(({ id, title, status, menu_order, excerpt }) => (
						<>
							<TodoItem
								key={id}
								title={decodeEntities(title.rendered)}
								id={id}
								status={status}
								deleted={deleted}
								due={excerpt.rendered}
								priority={menu_order}
								openModal={openModal}
							/>
						</>
					))}
				</VStack>
				{isOpen && (
					<Modal
						className="dash-todo-modal"
						style={{ minWidth: '600px' }}
						onRequestClose={closeModal}
						isDismissible={false}
					>
						<form onSubmit={handleFormSubmit}>
							<TextareaControl
								required
								autoFocus
								label={'Update Todo item'}
								onChange={(value) =>
									setModalData({
										...modalData,
										title: value,
									})
								}
								value={modalData.title}
							/>

							<Button type="submit" variant="primary">
								Update
							</Button>
						</form>
					</Modal>
				)}
			</CardBody>
		</Card>
	);
}
