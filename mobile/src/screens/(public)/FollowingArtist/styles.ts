import { Dimensions, StyleSheet } from "react-native"
import { ThemeColors } from "../../../constants/Colors"
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export const  createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex: 1,
        },
        artists: {
            paddingHorizontal: 15,
        },
        head: {
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width,
            height: 60,
            alignItems: 'center',
            paddingHorizontal: 15
        },
        backbtn: {
            position: 'absolute',
            height: 60,
            paddingHorizontal: 15,
            justifyContent: 'center',
            top: 0,
            zIndex: 99
        },
        text: {
            fontSize: 13,
            color: theme.text_gray,
            marginLeft: 15
        },
        headName: {
            color: theme.text,
            fontSize: 15,
            fontWeight: 'bold',
        }
    })

}