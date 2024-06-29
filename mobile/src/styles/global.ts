import { StyleSheet } from "react-native";
import { ThemeColors } from "../constants/Colors";


const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        text: {
            color: theme.text,
            fontSize: 14
        },
        title: {
            
        }
    })
}