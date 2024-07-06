import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flex: 1,
            zIndex: 99,
            backgroundColor: theme.background,
            padding: 15,
        },
        title: {
            marginTop: 32,
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.text,
        },
        form: {
            gap: 5,
            marginTop: 40
        },
        label: {
            color: theme.text,
            fontSize: 13,

        },
        inputGroup: {
            gap: 10,
        },
        input: {
            backgroundColor: theme.sheetBgColor,
            padding: 10,
            marginBottom: 15,
            borderRadius: 6,
            height: 45
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
        note: {
            fontSize: 13,
            color: theme.text_gray,
        },
        options: {
            marginTop: 20,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
        },
        signUpBtn: {
            justifyContent: 'center',
            alignContent: 'center',
        },
        signUpLink: {
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