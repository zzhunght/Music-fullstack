import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";


export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 16
        },
        title: {
            marginTop: 32,
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.text,
        },
        value: {
            color: theme.text
        },
        note: {
            color: theme.text_gray,
            fontSize: 13
        },
        btn: {
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            height: 45,
            backgroundColor: theme.light,
            marginTop: 20
        },
        forgetPassword: {
            color: theme.text_gray,
            fontSize: 13,
        },
        btnText: {
            fontWeight: 'bold',
            color: theme.dark,
            fontSize: 15,
        },
        options: {
            marginTop: 20,
            marginBottom: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 5
        },
        resendBtn: {
            justifyContent: 'center',
            alignContent: 'center',
        },
        resendLink: {
            fontSize: 13,
            fontWeight: '600',
            color: theme.text,
        },
        error: {
            color: theme.error,
            fontSize: 13,
        }

    })
}