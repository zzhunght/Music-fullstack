
import { ThemeColors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
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
            fontWeight: '600'
        },


    })
}