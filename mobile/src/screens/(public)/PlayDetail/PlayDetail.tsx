import { View, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback, useContext, useRef } from 'react'
import { createStyles } from './styles'
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux'
import TrackPlayer, { RepeatMode, useProgress } from 'react-native-track-player';
import { useThemeColor } from '../../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Comment from '../../../components/Comment/Comment';
import Queue from '../../../components/Queue/Queue';
import { durationToTime } from '../../../utils';
import { setIsRepeat, setIsShuffe } from '../../../store/song/song.reducer';
import { TextCustom } from '../../../components/Text/TextCustome';
import usePlay from '../../../hooks/usePlay';
import { PlayDetailSheetContext } from '../../../context/PlayDetailSheet';
import { RootState } from '../../../store/store';


export default function PlayDetail() {
    const dispatch = useDispatch()
    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const isShuffe = useSelector((state: RootState) => state.songSlice.isShuffe)
    const isRepeat = useSelector((state: RootState) => state.songSlice.isRepeat)
    const progress = useProgress()
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetPlaylistRef = useRef<BottomSheet>(null);
    const { handleCloseSheet } = useContext(PlayDetailSheetContext)

    const { next, prev } = usePlay()

    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) {
            bottomSheetRef?.current?.close()
        }
    }, [])
    const handleSheetPlaylistChanges = useCallback((index: number) => {
        console.log("index changed", index)
        if (index == 0) {
            bottomSheetPlaylistRef?.current?.close()
        }
    }, [])

    const handleShuffe = () => {
        if (!isShuffe) {
            dispatch(setIsShuffe(true));
        } else {
            dispatch(setIsShuffe(false));
        }
    }

    const handleRepeat = () => {
        if (!isRepeat) {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            dispatch(setIsRepeat(true));
        } else {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            dispatch(setIsRepeat(false));
        }
    }
    return (
        <View style={{
            flex: 1,
        }}>

            <LinearGradient
                colors={
                    songBg ? [songBg?.average, songBg?.dominant] :
                        [theme.background, 'transparent']

                }
                style={styles.wrap}
                end={{ x: 1, y: 1, }}
                start={{ x: 1, y: 0 }}
            >

                <View style={styles.head}>
                    <TouchableOpacity onPress={() => handleCloseSheet()}>
                        <Entypo name="chevron-thin-down" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TextCustom style={styles.subTitle}>
                        Now Playing
                    </TextCustom>
                    <Entypo name="dots-three-horizontal" size={24} color={theme.icon} />
                </View>
                <View>
                    <FastImage
                        style={styles.image}
                        source={{ uri: song?.thumbnail }}
                    />
                </View>
                <View style={{
                    marginTop: Platform.OS == 'android' ? '12%' : '5%'
                }}>
                    <TextCustom style={styles.title} numberOfLines={1}>
                        {song?.name}
                    </TextCustom>
                    <TextCustom style={styles.text_meidum}>
                        {song?.artist_name}
                    </TextCustom>
                </View>

                <View style={{
                    width: '106%',
                    marginVertical: 20
                }}>
                    <Slider
                        style={{
                            width: '100%',
                            position: 'absolute',
                            left: '-3%'

                        }}
                        onValueChange={async (value) => {
                            await TrackPlayer.seekTo(value);
                        }}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        value={progress.position}
                        thumbTintColor="#FFFFFF"
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#525252"
                    />

                </View>

                <View style={styles.time}>
                    <TextCustom style={styles.time_label}>
                        {durationToTime(progress.position)}
                    </TextCustom>
                    <TextCustom style={styles.time_label}>
                        {durationToTime(progress.duration)}
                    </TextCustom>
                </View>
                <View style={styles.control}>
                    <TouchableOpacity onPress={() => handleShuffe()}>
                        {/* <Entypo name="shuffle" size={28} color={theme.icon} /> */}
                        <SimpleLineIcons name="shuffle" size={26} color={isShuffe ? theme.iconActive : theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={prev}>
                        <FontAwesome6 name="backward-step" size={30} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.light,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                        }}
                        onPress={() => {
                            if (isPlaying) {
                                TrackPlayer.pause();
                            } else {
                                TrackPlayer.play();
                            }
                        }}
                    >
                        {isPlaying ?
                            <Entypo name="controller-paus" size={36} color={theme.dark} /> :
                            <Entypo name="controller-play" size={36} color={theme.dark} style={{ left: 2 }} />
                        }

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={next}
                    >
                        <FontAwesome6 name="forward-step" size={30} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleRepeat()}
                    >
                        <SimpleLineIcons name="loop" size={26} color={isRepeat ? theme.iconActive : theme.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.control}>
                    <TouchableOpacity onPress={() => bottomSheetRef?.current?.expand()}>
                        <Ionicons name="chatbox" size={28} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => bottomSheetPlaylistRef?.current?.expand()}>
                        <MaterialCommunityIcons name="playlist-music-outline" size={28} color={theme.icon} />
                    </TouchableOpacity>

                </View>
            </LinearGradient>
            {song && (
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    snapPoints={[1, '95%']}
                    backgroundStyle={{ backgroundColor: theme.background }}
                    handleComponent={() => (
                        <View style={{ alignItems: 'center', height: 40, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                                <Entypo name="chevron-thin-down" size={20} color={theme.icon} />
                            </TouchableOpacity>
                            <TextCustom style={[{ fontWeight: 'bold', color: theme.text, fontSize: 17 }]}>Bình luận</TextCustom>
                            <TextCustom></TextCustom>
                        </View>
                    )}
                >
                    <BottomSheetScrollView
                        style={{ flex: 1, backgroundColor: theme.background }}
                    >
                        <Comment song={song} />
                    </BottomSheetScrollView >
                </BottomSheet>
            )}

            <BottomSheet
                ref={bottomSheetPlaylistRef}
                onChange={handleSheetPlaylistChanges}
                snapPoints={[1, '95%']}
                index={-1}
                backgroundStyle={{ backgroundColor: theme.background }}
                handleComponent={() => (
                    <View style={{ alignItems: 'center', height: 40, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => bottomSheetPlaylistRef.current?.close()}>
                            <Entypo name="chevron-thin-down" size={20} color={theme.icon} />
                        </TouchableOpacity>
                        <TextCustom style={[{ fontWeight: 'bold', color: theme.text, fontSize: 17 }]}>Danh sách phát</TextCustom>
                        <TextCustom></TextCustom>
                    </View>
                )}
            >
                <BottomSheetScrollView
                    style={{ flex: 1, backgroundColor: theme.background }}
                >
                    <Queue />
                </BottomSheetScrollView >
            </BottomSheet>
        </View>
    )
}