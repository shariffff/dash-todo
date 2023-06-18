import {
	Card,
	CardBody,
	TextControl,
	Button,
	DatePicker,
	Dropdown,
	RadioControl,
	Flex,
	FlexBlock,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import { priorityLabel } from '../functions';

export default function ( { created } ) {
	const [ date, setDate ] = useState();
	const [ todo, setTodo ] = useState( '' );
	const [ priority, setPriority ] = useState( '0' );
	const createTodo = () => {
		apiFetch( {
			path: '/wp/v2/todo',
			method: 'POST',
			data: {
				title: todo,
				status: 'pending',
				excerpt: date,
				menu_order: priority,
			},
		} )
			.then( () => {
				setTodo( '' );
				created( true );
			} )
			.catch( ( err ) => console.log( err?.message ) );
	};
	const handleKeyDown = ( event ) => {
		if ( event.key === 'Enter' ) {
			handleFormSubmit( event );
		}
	};

	const handleFormSubmit = ( event ) => {
		event.preventDefault();
		if ( todo.trim().length !== 0 ) {
			createTodo();
		}
	};
	const resetDatePriority = () => {
		setDate( null );
		setPriority( '0' );
	};

	return (
		<Card>
			<CardBody>
				<form
					onSubmit={ handleFormSubmit }
					style={ {
						marginTop: 10,
					} }
				>
					<Flex align="center">
						<FlexBlock>
							<Dropdown
								popoverProps={ { placement: 'bottom-start' } }
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Button
										variant="tertiary"
										onClick={ onToggle }
										aria-expanded={ isOpen }
										icon="calendar-alt"
									>
										{ date &&
											new Date( date )
												?.getDate()
												?.toString() }
									</Button>
								) }
								renderContent={ () => (
									<DatePicker
										style={ { padding: 10 } }
										currentDate={ date }
										onChange={ ( newDate ) =>
											setDate( newDate )
										}
									/>
								) }
							/>
							<Dropdown
								contentClassName="dropdown-due-date"
								popoverProps={ { placement: 'bottom-start' } }
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Button
										variant="tertiary"
										onClick={ onToggle }
										aria-expanded={ isOpen }
										icon="flag"
									>
										{ priority !== '0' &&
											priorityLabel( priority ) }
									</Button>
								) }
								renderContent={ () => (
									<RadioControl
										style={ {} }
										label="Priority"
										selected={ priority }
										options={ [
											{ label: 'High', value: '3' },
											{ label: 'Medium', value: '2' },
											{ label: 'Low', value: '1' },
											{ label: 'None', value: '0' },
										] }
										onChange={ ( value ) =>
											setPriority( value )
										}
									/>
								) }
							/>
						</FlexBlock>

						<Button
							variant="tertiary"
							onClick={ resetDatePriority }
						>
							Reset
						</Button>
					</Flex>
					<TextControl
						autoFocus
						label={ 'Add Todo item' }
						hideLabelFromVision
						placeholder="Type here and press Enter ↵"
						onChange={ ( value ) => setTodo( value ) }
						value={ todo }
						onKeyDown={ handleKeyDown }
					/>
				</form>
			</CardBody>
		</Card>
	);
}
