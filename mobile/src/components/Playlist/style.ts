import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        text: {
            color: theme.text,
            fontSize: 13,
        },
        title: {
            color: theme.text,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 5,
            marginLeft: 15
        },
        subTitle: {
            color: theme.text_gray,
            fontSize: 12,
        },
        image: {
            width: 130,
            height: 130,
        }
    })
}