import { Spinner, __experimentalVStack as VStack } from '@wordpress/components';

export default function Loading() {
	return (
		<VStack>
			<Spinner />
			<Spinner />
		</VStack>
	);
}
