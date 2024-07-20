import { Dimensions, StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/Colors';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const createStyles = (theme : ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex: 1,
        },
        head: {
            height: height * 0.12,
            justifyContent: 'flex-end',
            padding: 15
        },
        header: {
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width,
            height: 60,
            top: 0,
            alignItems: 'center',
            paddingHorizontal: 15
        },
        title: {
            fontSize: 24,
            color: theme.text,
            fontWeight: 'bold',
        },
        backbtn: {
            position: 'absolute',
            height: 60,
            paddingHorizontal: 15,
            justifyContent: 'center',
            top: 0,
            zIndex: 99
        }
    })
}