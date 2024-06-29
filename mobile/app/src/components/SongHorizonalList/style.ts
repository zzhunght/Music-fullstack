import { ThemeColors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get('window').width
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
        item_group: {
            width: width * 0.8,
            gap: 10,
            marginHorizontal: 15
        },
        row:{
            flexDirection: 'row'
        },
        item: {
            width:  '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        item_left: {
            gap: 10
        },
        subTitle: {
            color: theme.text,
            fontSize: 14,
            fontWeight: "bold",
            maxWidth: width - 80
        },
        image: {
            width: 60,
            height: 60,
            borderRadius: 10
        },
        desc: {
            justifyContent: 'space-around'
        }
    })
}