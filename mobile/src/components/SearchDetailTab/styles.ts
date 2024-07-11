import { StyleSheet } from "react-native";
import { ThemeColors } from "../../constants/Colors";


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
        }
    })
}
export default createStyles