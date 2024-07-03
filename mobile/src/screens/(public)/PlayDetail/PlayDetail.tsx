import { View, Text, TouchableOpacity, ImageBackground, Platform, Dimensions, ProgressBarAndroidBase } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { RootState } from '../../../store/store';
import { useThemeColor } from '../../../hooks/useThemeColor';
import Container from '../../../components/Container';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Comment from '../../../components/Comment/Comment';
import Queue from '../../../components/Queue/Queue';
import { durationToTime } from '../../../utils';
import { setIsRepeat, setIsShuffe } from '../../../store/song/song.reducer';

interface Props {
    onClose: () => void;
}
export default function PlayDetail({ onClose }: Props) {

    const dispatch = useDispatch()

    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const isShuffe = useSelector((state: RootState) => state.songSlice.isShuffe)
    const isRepeat= useSelector((state: RootState) => state.songSlice.isRepeat)

    const progress = useProgress()
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetPlaylistRef = useRef<BottomSheet>(null);

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

    const handleShuffe = () => {
        if(!isShuffe){
            dispatch(setIsShuffe(true));
        }else{
            dispatch(setIsShuffe(false));
        }
    }

    const handleRepeat = () => {
        if(!isRepeat){
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            dispatch(setIsRepeat(true));
        }else{
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            dispatch(setIsRepeat(false));
        }
    }
    return (
        <Container>

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
                    <TouchableOpacity onPress={onClose}>
                        <Entypo name="chevron-thin-down" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>
                        Now Playing
                    </Text>
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
                    <Text style={styles.title} numberOfLines={1}>
                        {song?.name}
                    </Text>
                    <Text style={styles.text_meidum}>
                        {song?.artist_name}
                    </Text>
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
                            // transform: [
                            //     { scaleY: 2 },
                            //     { scaleX: 2 },
                            //     { translateX: 40 }
                            // ]
                        }}
                        onValueChange={async(value) => {
                            await TrackPlayer.seekTo(value);
                        }}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        value={progress.position}
                        thumbTintColor="#FFFFFF"
                        // thumbTintColor={songBg?.dominant ? songBg.dominant : theme.background}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#525252"
                    />

                </View>

                <View style={styles.time}>
                    <Text style={styles.time_label}>
                        {durationToTime(progress.position)}
                    </Text>
                    <Text style={styles.time_label}>
                        {durationToTime(progress.duration)}
                    </Text>
                </View>
                <View style={styles.control}>
                        <TouchableOpacity onPress={()=>handleShuffe()}>
                        {/* <Entypo name="shuffle" size={28} color={theme.icon} /> */}
                        <SimpleLineIcons name="shuffle" size={26} color={isShuffe? theme.iconActive : theme.icon} />
                        </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="backward-step" size={30} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.controlBackground,
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
                            <Entypo name="controller-paus" size={36} color={'black'} /> :
                            <Entypo name="controller-play" size={36} color={'black'} style={{ left: 2 }} />
                        }

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome6 name="forward-step" size={30} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>handleRepeat()}
                    >
                        <SimpleLineIcons name="loop" size={26} color={isRepeat? theme.iconActive : theme.icon}  />
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
                        <TouchableOpacity onPress={() => bottomSheetPlaylistRef.current?.close()}>
                            <Entypo name="chevron-thin-down" size={20} color={theme.icon} />
                        </TouchableOpacity>
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