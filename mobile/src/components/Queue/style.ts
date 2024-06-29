import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        text: {
            color: theme.text,
            fontSize: 12,
        },

    })
}