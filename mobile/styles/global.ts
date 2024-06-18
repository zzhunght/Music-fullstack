import { ThemeColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";


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