import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        text: {
            color: theme.text,
            fontSize: 11,
        },
        title: {
            color: theme.text,
            fontSize: 13,
            fontWeight: '500',
            maxWidth: '80%'
        },
        wrap:{
            overflow: 'hidden',
            position: 'absolute',
            bottom: 49,
            width: '96%',
            left: '2%',
            borderRadius: 8
        },
        player: {
            borderRadius:6,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
        },
        left_block: {
            flexDirection: 'row',
            gap: 10
        },
        image: {
            width: 40,
            height: 40,
            borderRadius: 6
        }
    })
}