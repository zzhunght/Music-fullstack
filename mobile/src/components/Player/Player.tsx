import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStyles } from './style'
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import PlayDetail from '../../screens/(public)/PlayDetail/PlayDetail'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import { useThemeColor } from '../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import TrackPlayer, { Event, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { Song } from '../../interface';
import { addPlayedTrack, loadSongBg, selectSong, setIsPlay } from '../../store/song/song.reducer';
import { getColors } from 'react-native-image-colors';
import { TextCustom } from '../Text/TextCustome';

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackQueueEnded
];

const Player = () => {
    const dispatch = useDispatch()

    const progress = useProgress()
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const hasPlayed = useSelector((state: RootState) => state.songSlice.hasPlayed)
    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const isShuffe = useSelector((state: RootState) => state.songSlice.isShuffe)
    const [openDetail, setOpenDetail] = useState(false)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    // const [sound, setSound] = useState<Audio.Sound>();
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)
    const GetQueue = async () => {
        const queue = await TrackPlayer.getQueue()
        console.log("queue: ", queue)
    }
    // useEffect(() => {
    //     GetQueue()
    // },[song])

    const currentTrack = useSelector((state: RootState) => state.songSlice.selectedSong)
    const queue = useSelector((state: RootState) => state.songSlice.queue)
    const handleEvent = async (event: any) => {
        console.log("Event :>>>>>>>>>>>>>> ", event)
        if (event.type === Event.PlaybackState) {
            if (event.state == 'playing') {
                dispatch(setIsPlay(true))
            } else if (event.state == 'stopped') {
                dispatch(setIsPlay(false))
            }
            else if (event.state == 'paused') {
                dispatch(setIsPlay(false))
            }
        }

        if (event.type === Event.PlaybackQueueEnded) {
            let i = 0
            let nextTrack: Song | undefined
            if (isShuffe) {
                while (i < queue.length) {
                    const index = Math.floor(Math.random() * queue.length)
                    nextTrack = queue[index]
                    const check = hasPlayed.findIndex((s: Song) => s.id === nextTrack?.id)
                    if (check === -1) {
                        break
                    }
                    nextTrack = undefined
                    i++
                }

            } else {
                const index = queue.findIndex((track: Song) => track.id === currentTrack?.id)
                if (index < queue.length - 1 && index >= 0) {
                    nextTrack = queue[index + 1]
                }
            }
            if (nextTrack) {
                await TrackPlayer.reset()
                await TrackPlayer.load({
                    id: nextTrack.id,
                    url: nextTrack.path,
                    title: nextTrack.name,
                    artist: nextTrack.artist_name,
                    artwork: nextTrack.thumbnail
                })
                await TrackPlayer.play()
                dispatch(selectSong(nextTrack))
                dispatch(addPlayedTrack(nextTrack))
                console.log("next ====>>>>>>>>>>>>> " + nextTrack.name)
            } else {
                dispatch(setIsPlay(false))
            }

        }
    }
    const handleGetColors = async (url: string) => {
        getColors(url, {
            fallback: '#228B22',
            cache: true,
            key: url,
        }).then((colors) => {
            dispatch(loadSongBg(colors))
        })
            .catch((error) => {
                console.log("error", error)
            })
    }
    const handlePlayPause = () => {
        {
            if (isPlaying) {
                console.log("pause :>>>>>>>")
                TrackPlayer.pause();
            } else {
                console.log("resume play")
                TrackPlayer.getActiveTrack().then(async (track) => {
                    if (track) {
                        TrackPlayer.play();
                    } else if (song) {
                        await TrackPlayer.load({
                            id: song.id,
                            url: song.path,
                            title: song.name,
                            artist: song.artist_name,
                            artwork: song.thumbnail
                        })
                        await TrackPlayer.play()
                    }
                })
            }
        }
    }

    useTrackPlayerEvents(events, (event) => {
        handleEvent(event)
    });

    useEffect(() => {
        if (song) {
            handleGetColors(song?.thumbnail)
        }
    }, [song])

    return (
        <>
            {song && (
                <TouchableHighlight onPress={() => {
                    setOpenDetail(true)
                }}>
                    <>
                        {/* <View style={styles.wrap} > */}
                        {/* <ImageBackground
    
                            source={{
                                uri: song.thumbnail
                            }}
                            blurRadius={150}
                        > */}
                        <LinearGradient
                            colors={
                                songBg ? [songBg?.dominant, songBg?.darkVibrant] :
                                    [theme.background, 'transparent']

                            }
                            style={styles.wrap}
                            end={{ x: 0, y: 0, }}
                            start={{ x: 1, y: 0 }}
                        >
                            <View>
                                <View style={styles.player}>
                                    <View style={styles.left_block}>
                                        <FastImage
                                            style={styles.image}
                                            source={{ uri: song.thumbnail }}
                                        />
                                        <View style={{ justifyContent: 'center' }}>
                                            <TextCustom style={styles.title} numberOfLines={1}>{song.name}</TextCustom>
                                            <TextCustom style={styles.text}>{song.artist_name}</TextCustom>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => handlePlayPause()}
                                        >
                                            {isPlaying ? <Entypo name="controller-paus" size={24} color="white" style={{ marginRight: 10 }} /> :
                                                <Entypo name="controller-play" size={28} color="white" style={{ marginRight: 10 }} />
                                            }

                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{
                                    alignItems: "center",
                                    paddingHorizontal: 10
                                }}>
                                    <ProgressBar
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={(progress.position / progress.duration) || 0}
                                        style={{
                                            width: '100%',
                                            height: 2
                                        }}
                                        color={'#ffffff'}
                                    />
                                </View>
                            </View>
                        </LinearGradient>
                        {/* </ImageBackground> */}
                        {/* </View> */}
                        <Modal visible={openDetail} >
                            <PlayDetail onClose={() => setOpenDetail(false)} />
                        </Modal>
                    </>
                </TouchableHighlight>
            )}
        </>
    )
}





export default Player