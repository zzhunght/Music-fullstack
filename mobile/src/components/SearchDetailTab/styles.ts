import { Dimensions, StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";

const width = Dimensions.get('screen').width
const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            padding: 15,
        },
        subTitle: {
            color: theme.text_gray,
            fontSize: 12,
        },
        image: {
            width: 130,
            height: 130,
        },
        artistItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        artistInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        artistName: {
            color: theme.text,
            fontWeight: 'bold',
            fontSize: 15
        },
        artistFollowCount: {
            color: theme.text_gray,
            fontSize: 13
        },
        follow: {
            color: theme.text,
            fontWeight: 'bold',
        },
        followBtn: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.light,
            alignItems: 'center',
            justifyContent: 'center',
        },
        playlistItem: {
            // width:'50%',
            borderRadius: 10,
            overflow: 'hidden',
        },
        playlistImage: {
            width: (width - 45) / 2,
            height: (width - 45) / 2,
            borderRadius: 10,
            resizeMode:'cover',
            marginRight:15
        },
        playlistName: {
            width: '90%',
            color: theme.text
        }
    })
}
export default createStyles