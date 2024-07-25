import { Dimensions, StyleSheet } from 'react-native';
import { ThemeColors } from '../../../constants/Colors';
const width = Dimensions.get('window').width

export const createStyles = (theme : ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            padding: 15,
            paddingBottom: 115
        },
        searchBox: {
            backgroundColor: theme.sheetBgColor,
            borderRadius: 8,
            height: 45,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            gap: 15
        },
        searchBoxInput: {
            backgroundColor: theme.sheetBgColor,
            borderRadius: 8,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            gap: 15,
            flex: 1
        },
        backButton: {
        },
        searchPlaceholder: {
            fontSize: 13,
            color: theme.text,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text,
            marginVertical: 15
        },
        categories: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 10
        },
        categoryBox: {
            width: (width - 40) / 2,
            height: width * 0.25,
            borderRadius: 10,
            padding: 10,
            overflow: 'hidden',
        },
        categoryText: {
            color: theme.text,
            fontSize: 13,
            fontWeight: '600'
        },
        categoryThumbnail: {
            width: 80,
            height: 80,
            borderRadius: 4,
            position: 'absolute',
            right: '-12%',
            bottom: 0,
            transform: [{ rotate: '30deg' }]
        }
    })
}