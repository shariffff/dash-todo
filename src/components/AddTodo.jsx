import {
	Card,
	CardBody,
	TextControl,
	Button,
	DatePicker,
	Dropdown,
	Flex,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function ({ created }) {
	const [date, setDate] = useState();
	const [todo, setTodo] = useState('');
	const [priority, setPriority] = useState('0');
	const createTodo = () => {
		apiFetch({
			path: '/wp/v2/todo',
			method: 'POST',
			data: {
				title: todo,
				status: 'pending',
				excerpt: date,
				menu_order: priority,
			},
		})
			.then(() => {
				setTodo('');
				created(true);
			})
			.catch((err) => console.log(err?.message));
	};
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleFormSubmit(event);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (todo.trim().length !== 0) {
			createTodo();
		}
	};
	const resetDatePriority = () => {
		setDate(null);
		setPriority('0');
	};

	return (
		<Card style={{ boxShadow: 'none' }}>
			<CardBody>
				<form onSubmit={handleFormSubmit}>
					<TextControl
						autoFocus
						label={'Add Todo item'}
						hideLabelFromVision
						placeholder="Type here and press Enter ↵"
						onChange={(value) => setTodo(value)}
						value={todo}
						onKeyDown={handleKeyDown}
						autoComplete="off"
						style={{ fontSize: 15, minHeight: 36 }}
					/>
					<Flex>
						<Flex justify='flex-start' align='start'>
							<Dropdown
								popoverProps={{ placement: 'bottom-start' }}
								renderToggle={({ isOpen, onToggle }) => (
									<Button
										variant="tertiary"
										onClick={onToggle}
										aria-expanded={isOpen}
										icon="calendar-alt"
										style={{ backgroundColor: 'rgba(56, 88, 233, 0.4)', minWidth: 64 }}
									>
										{date &&
											new Date(date)
												?.getDate()
												?.toString()}
									</Button>
								)}
								renderContent={() => (
									<DatePicker
										style={{ padding: 10 }}
										currentDate={date}
										onChange={(newDate) =>
											setDate(newDate)
										}
									/>
								)}
							/>

							<ToggleGroupControl
								isBlock
								hideLabelFromVision
								label="Priority"
								value={priority}
								onChange={(value) =>
									setPriority(value)
								}
							>
								<ToggleGroupControlOption
									value="3"
									label="High"
								/>
								<ToggleGroupControlOption
									value="2"
									label="Medium"
								/>
								<ToggleGroupControlOption
									value="1"
									label="Low"
								/>
								<ToggleGroupControlOption
									value="0"
									label="None"
								/>
							</ToggleGroupControl>
						</Flex>



						<Button
							variant="tertiary"
							onClick={resetDatePriority}
						>
							Reset
						</Button>


					</Flex>
				</form>
			</CardBody>
		</Card>
	);
}
