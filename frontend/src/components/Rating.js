import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

const Rating = ({ value, text, color = 'red.500' }) => {
	return (
		<Flex align='center'>
			<Box mr='2'>
				<Icon
					as={value >= 1 ? IoStar : value >= 0.5 ? IoStarHalf : IoStarOutline}
					color={color}
				/>
				<Icon
					as={value >= 2 ? IoStar : value >= 1.5 ? IoStarHalf : IoStarOutline}
					color={color}
				/>
				<Icon
					as={value >= 3 ? IoStar : value >= 2.5 ? IoStarHalf : IoStarOutline}
					color={color}
				/>
				<Icon
					as={value >= 4 ? IoStar : value >= 3.5 ? IoStarHalf : IoStarOutline}
					color={color}
				/>
				<Icon
					as={value >= 5 ? IoStar : value >= 4.5 ? IoStarHalf : IoStarOutline}
					color={color}
				/>
			</Box>
			<Text>{text}</Text>
		</Flex>
	);
};

export default Rating;
