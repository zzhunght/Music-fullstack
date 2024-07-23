import { Dimensions, StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";

const height = Dimensions.get('screen').height
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flex: 1,
            backgroundColor: theme.background,
        },
        userWr: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.4
        },

        user: {
            width: 100,
            height: 100,
            borderRadius: 60,
            backgroundColor: theme.sheetBgColor,
            alignItems: 'center',
            justifyContent: 'center',
        },
        loginBtn: {
            backgroundColor: theme.light,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 15,
            marginTop:10
        },
        editBtn: {
            backgroundColor: theme.light,
            borderRadius: 15,
            paddingHorizontal: 15,
            paddingVertical: 6,
            justifyContent: 'center',
            alignItems: 'center',
        },
        favorite: {
            marginHorizontal: 15,
            marginVertical: 10,
            padding: 15,
            backgroundColor: theme.sheetBgColor,
            borderRadius: 10,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        },
        playlist: {
            marginHorizontal: 15,
            marginVertical: 10,
            padding: 15,
            backgroundColor: theme.sheetBgColor,
            borderRadius: 10,
            gap: 15,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        playlistItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        textTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.text
        },
        logoutTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.text
        },
        playlistName: {
            fontSize: 13,
            color: theme.text
        },
        playlistName2: {
            fontSize: 12,
            color: theme.text_gray
        },
        followSection: {
            flexDirection: 'row',
            gap: 20
        },
        followCount: { color: theme.text, fontSize: 13 , fontWeight: 'bold'}
    })
}