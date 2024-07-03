
import { Dimensions, Platform, StyleSheet } from "react-native";
import { ThemeColors } from "../../../constants/Colors";
const width = Dimensions.get('screen').width
export const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex:1,
            padding: 30
        },
        head: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Platform.OS == 'android' ? '25%' : '10%',
            marginTop: Platform.OS == 'android' ? 10 : 0
        },
        text: {
            color: theme.text,
            fontSize: 13,
        },
        text_meidum: {
            color: theme.text,
            fontSize: 15,
        },
        title: {
            color: theme.text,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 5,
        },
        progress :{
            marginTop: 20,
            marginBottom: 5,
            transform: [{scale: 0.5}, {translateX: - (width - 40)}],
            width: (width - 46) * 2
        },
        subTitle: {
            color: theme.text,
            fontSize: 14,
            fontWeight: "bold",
        },
        time: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        time_label: {
            color: theme.text,
            fontSize: 12,
            fontWeight: '500'
        },
        image: {
            width: width - 60,
            height: (width - 60) * 1.0,
            borderRadius: 10
        },
        control :{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            marginTop: 20
        }
    })
}