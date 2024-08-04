import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";


export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        title: {
            fontSize: 15,
            color: theme.text,
            fontWeight: "bold",
            marginBottom: 10
        }
    })
}