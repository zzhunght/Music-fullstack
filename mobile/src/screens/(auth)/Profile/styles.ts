import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            padding: 15
        },
        avatar: {
            alignItems: "center",
        },
        logoutBtn: {
            width: 120,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: theme.light,
            marginTop: 20,
        },
        logoutText: { color: theme.dark, fontWeight: 'bold' },
        info: {
            marginTop: 15,
            gap: 10,
            backgroundColor: theme.sheetBgColor,
            padding: 15,
            borderRadius: 8
        },
        infoValue: {
            fontSize: 13,
            fontWeight: 'bold',
            color: theme.text
        },
        actionBtn: {
            backgroundColor: theme.sheetBgColor,
            padding: 15,
            borderRadius: 8
        },
        label: {
            fontSize: 13,
            color: theme.text_gray
        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40
        }
    })
}