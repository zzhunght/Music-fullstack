import { ThemeColors } from "../../../constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
const height = Dimensions.get('window').height

export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex: 1,
        },
        banner: {
            width: '100%',
            height: height * 0.4,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '9%'
        },
        img_banner: {
            width: 220,
            height: 200
        },
        banner_overlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            height: 300,
            bottom: 0
        },
        album_name: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.text,
            marginTop: 10
        },
        artist_name: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginTop: 5
        },
        song_item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        song_item_name: {
            fontSize: 15,
            color: theme.text,
            fontWeight: '500'
        },
        song_item_artist: {
            fontSize: 13,
            color: theme.text_gray,
            fontWeight: '500',
            marginTop: 3
        },
        songs: {
            padding: 15,
            gap: 20,
        }

    })
}