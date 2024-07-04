import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";


export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flex: 1,
            backgroundColor: theme.background,
        },
        userWr: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingTop: '10%',
            paddingHorizontal: 15,
            paddingBottom: '5%'
        },

        user: {
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: theme.sheetBgColor,
            alignItems: 'center',
            justifyContent: 'center',
        },
        loginBtn: {
            backgroundColor: theme.light,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 15,
            marginLeft: 'auto'
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
            flexDirection:'row',
            justifyContent:'space-between',
        },
        playlistItem: {
            flexDirection:'row',
            alignItems:'center',
            gap: 10
        },
        textTitle: {
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
        }
    })
}