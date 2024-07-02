
import { Dimensions, StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";
const width = Dimensions.get('screen').width
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            flex: 1
        },
        image: {
            width: 50,
            height: 50,
            borderRadius: 6
        },
        image_play: {
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 19
        },
        text: {
            color: theme.text,
            fontSize: 12,
        },
        desc: {
            gap: 5
        },
        name: {
            color: theme.text,
            fontSize: 12,
            fontWeight: '600',
            maxWidth: width * 0.7
        },
        row: {
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            flex: 1
        }

    })
}