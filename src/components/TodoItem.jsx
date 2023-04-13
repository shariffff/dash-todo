import {
	CheckboxControl,
	Button,
	__experimentalHStack as HStack,
	Icon,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function ( { title, id, status, deleted } ) {
	const isMounted = useRef( false );
	const [ isChecked, setChecked ] = useState( status === 'publish' );

	const setStatus = isChecked ? 'publish' : 'pending';

	useEffect( () => {
		if ( isMounted.current ) {
			apiFetch( {
				path: `/wp/v2/todo/${ id }`,
				method: 'PUT',
				data: { status: setStatus },
			} )
				.then( () => {} )
				.catch( ( err ) => console.log( err?.message ) );
		} else {
			isMounted.current = true;
		}
	}, [ isChecked, setChecked ] );
	const deleteTodo = () => {
		apiFetch( {
			path: `/wp/v2/todo/${ id }?force=true`,
			method: 'DELETE',
		} )
			.then( () => {
				deleted( true );
			} )
			.catch( ( err ) => console.log( err?.message ) );
	};
	return (
		<HStack alignment="left" className="single--todo">
			<CheckboxControl
				label={ title }
				checked={ isChecked }
				onChange={ setChecked }
				className={ isChecked ? 'completed' : 'incomplete' }
			/>

			<Button
				style={ { height: 20 } }
				className="delete"
				onClick={ deleteTodo }
			>
				<Icon
					icon="trash"
					size={ 15 }
					style={ { color: 'gray' } }
				></Icon>
			</Button>
		</HStack>
	);
}
