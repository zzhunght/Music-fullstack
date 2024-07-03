import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";
const IMG_HEIGHT = 300

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex:1
        },
        image: {
            width: '100%',
            height: IMG_HEIGHT
        },
        avatar: {
            width: 90,
            height: 90,
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: theme.border,
        },
        body: {
            // padding: 15,
            flex: 1,
            top: -60,
        },
        name: {
            fontSize: 48,
            color: theme.text,
            fontWeight: 'bold',
            top: -10
        },
        text_medium: {
            color: theme.text_gray,
            fontSize: 16,
            fontWeight: '600'
        },
        text: {
            color: theme.text_gray,
            fontSize: 13,
        },
        text_light: {
            color: theme.text,
            fontSize: 16,
        },
        text_light_meidum: {
            color: theme.text,
            fontSize: 16,
            fontWeight: '600'
        },
        control: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5
        },
        follow_btn: {
            borderColor: theme.text,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 15
        },
        play_btn: {
            backgroundColor: theme.text,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center'
        },
        head: {
            position: 'absolute',
            backgroundColor: theme.background,
            zIndex: 2,
            height: 60,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: theme.border,
            opacity: 0
        },
        name_2: {
            color: theme.text,
            fontSize: 16,
            fontWeight: '600',
            right: 12
        },
        backbtn: {
            position: 'absolute',
            height: 60,
            paddingHorizontal: 15,
            justifyContent: 'center',
            top: 0,
            zIndex: 99
        },
    })
}