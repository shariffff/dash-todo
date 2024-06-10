export const priorityLabel = ( number ) => {
	const priorities = {
		0: 'No Priority',
		1: 'Low',
		2: 'Medium',
		3: 'High',
	};

	return priorities[ number ] || 'No Priority';
};
export const formatDate = ( date ) => {
	const options = {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	};

	return date
		? new Date( date.trim() ).toLocaleString( 'en-US', options )
		: '';
};

export const stripTag = ( htmlString ) => {
	const div = document.createElement( 'div' );
	div.innerHTML = htmlString;
	return div.textContent || div.innerText || '';
};

export const queryString = new URLSearchParams( {
	_fields: 'id,title,status,menu_order,excerpt',
	status: 'pending,publish',
	per_page: 100,
	orderby: 'menu_order',
} );
