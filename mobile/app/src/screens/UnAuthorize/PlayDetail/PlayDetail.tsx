import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Container from '@/app/src/components/Container'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image'
import Slider from '@react-native-community/slider'
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Comment from '@/app/src/components/Comment/Comment'
import Queue from '@/app/src/components/Queue/Queue'
const imageurl = 'https://bloganchoi.com/wp-content/uploads/2024/06/loi-bai-hat-dung-lam-trai-tim-anh-dau-lyrics-son-tung-mtp-5-1-696x870.jpg'
interface Props {
    onClose: () => void;
}
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
    useAnimatedStyle,
    interpolateColor,
} from "react-native-reanimated";

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
}) => {
    //#region styles
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        // @ts-ignore
        backgroundColor: interpolateColor(
            animatedIndex.value,
            [0, 1],
            ["#ffffff", "#a8b5eb"]
        ),
    }));
    const containerStyle = useMemo(
        () => [style, containerAnimatedStyle],
        [style, containerAnimatedStyle]
    );
    //#endregion

    // render
    return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default function PlayDetail({ onClose }: Props) {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetPlaylistRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = (index: number) => {
        if (index == 0) {
            bottomSheetRef?.current?.close()
        }
    }
    const handleSheetPlaylistChanges = useCallback((index: number) => {
        if (index == 0) {
            bottomSheetPlaylistRef?.current?.close()
        }
    }, [])
    return (
        <Container>
            <ImageBackground
                source={{
                    uri: imageurl,
                }}
                blurRadius={230}
                style={styles.wrap}
            >
                <View style={styles.head}>
                    <TouchableOpacity onPress={onClose}>
                        <Entypo name="chevron-thin-down" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>
                        Now Playing
                    </Text>
                    <Entypo name="dots-three-horizontal" size={24} color={theme.icon} />
                </View>
                <View>
                    <Image
                        style={styles.image}
                        priority='high'
                        source={{ uri: imageurl }}
                        contentFit='contain'
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title} numberOfLines={1}>
                        Đừng Làm Trái Tim Anh Đau
                    </Text>
                    <Text style={styles.text_meidum}>
                        Sơn Tùng MTP
                    </Text>
                </View>
                <View style={styles.progress}>
                    <Slider
                        style={{
                            width: '96%',
                            position: 'absolute',
                            top: -23,
                            height: 1
                        }}
                        minimumValue={0}
                        maximumValue={100}
                        value={0}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#525252"
                    />
                </View>
                <View style={styles.time}>
                    <Text style={styles.time_label}>
                        0:00
                    </Text>
                    <Text style={styles.time_label}>
                        2:00
                    </Text>
                </View>
                <View style={styles.control}>
                    <TouchableOpacity>
                        <Entypo name="shuffle" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="backward-step" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.controlBackground,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                        }}
                    >
                        <Entypo name="controller-play" size={36} color={'black'} style={{ left: 2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="forward-step" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="repeat" size={24} color={theme.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.control}>
                    <TouchableOpacity onPress={() => bottomSheetRef?.current?.expand()}>
                        <Ionicons name="chatbox" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => bottomSheetPlaylistRef?.current?.expand()}>
                        <MaterialCommunityIcons name="playlist-music-outline" size={28} color={theme.icon} />
                    </TouchableOpacity>

                </View>
            </ImageBackground>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, '95%']}
                index={-1}
                backgroundStyle={{ backgroundColor: theme.background }}
                handleComponent={() => (
                    <View style={{ alignItems: 'center', height: 40, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                        <Entypo name="chevron-thin-down" size={20} color={theme.icon} />
                        <Text style={[{ fontWeight: 'bold', color: theme.text, fontSize: 17 }]}>Bình luận</Text>
                        <Text></Text>
                    </View>
                )}
            >
                <BottomSheetScrollView
                    style={{ flex: 1, backgroundColor: theme.background }}
                    stickyHeaderIndices={[1]}
                    stickyHeaderHiddenOnScroll={true}
                >
                    <Comment />
                </BottomSheetScrollView >
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetPlaylistRef}
                onChange={handleSheetPlaylistChanges}
                snapPoints={[1, '95%']}
                index={-1}
                backgroundStyle={{ backgroundColor: theme.background }}
                handleComponent={() => (
                    <View style={{ alignItems: 'center', height: 40, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                        <Entypo name="chevron-thin-down" size={20} color={theme.icon} />
                        <Text style={[{ fontWeight: 'bold', color: theme.text, fontSize: 17 }]}>Danh sách phát</Text>
                        <Text></Text>
                    </View>
                )}
            >
                <BottomSheetScrollView
                    style={{ flex: 1, backgroundColor: theme.background }}
                    stickyHeaderIndices={[1]}
                    stickyHeaderHiddenOnScroll={true}
                >
                    <Queue />
                </BottomSheetScrollView >
            </BottomSheet>
        </Container>
    )
}