
import { ThemeColors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get('screen').width
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex:1,
            gap:20
        },
        comment_scroll:{
            padding:20,
            gap:20,
        },
        text: {
            color: theme.text,
            fontSize: 15,
        },
        name: {
            color: theme.text,
            fontSize: 12,
            fontWeight:'600'
        },
        time: {
            color: theme.text,
            fontSize: 12,
        },
        comment: {
            flexDirection: 'row',
            gap:10,
            alignItems: 'flex-start'
        },
        comment_detail:{
            gap: 4
        },
        avatar: {
            width: 35,
            height: 35,
            borderRadius: 20
        },

    })
}