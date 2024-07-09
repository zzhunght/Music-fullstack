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
        banner: {
            width: '100%',
            position: 'relative',
            justifyContent: 'flex-start',
            paddingTop: '9%',
            paddingBottom: 10
        },
        img_banner: {
            width: 220,
            height: 200
        },
        banner_overlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            height: 500,
            bottom: 0
        },
        playlist_name: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.text,
            marginTop: 10,
            marginLeft: 15
        },
        artist_name: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text_gray,
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
            paddingHorizontal: 15,
        },
        head: {
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width,
            height: 60,
            top: 0,
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
        headName: {

        },
        playBtn: {
            backgroundColor: theme.text,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 13,
            color: theme.text_gray,
            marginLeft: 15
        }
    })

}