import {
	Card,
	CardBody,
	Spinner,
	__experimentalVStack as VStack,
} from '@wordpress/components';

export default function () {
	return (
		<Card>
			<CardBody>
				<VStack>
					<Spinner />
					<Spinner />
				</VStack>
			</CardBody>
		</Card>
	);
}
