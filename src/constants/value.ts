import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

const listHeaderGapCompensation = 280;
const emptyListHeight = height - listHeaderGapCompensation;

export { emptyListHeight };
