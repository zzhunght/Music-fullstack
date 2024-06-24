import { ThemeColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        text: {
            color: theme.text,
            fontSize: 12,
        },

    })
}