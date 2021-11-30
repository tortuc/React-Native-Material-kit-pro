import { Platform, StatusBar, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 4 + StatusHeight);
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);