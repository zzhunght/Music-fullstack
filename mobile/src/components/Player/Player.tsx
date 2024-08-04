import { View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createStyles } from './style'
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import { useThemeColor } from '../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { loadSongBg } from '../../store/song/song.reducer';
import { getColors } from 'react-native-image-colors';
import { TextCustom } from '../Text/TextCustome';
import { PlayDetailSheetContext } from '../../context/PlayDetailSheet';
import useRecentPlay from '../../hooks/useRecentPlay';


 
const Player = () => {
    const dispatch = useDispatch()
    const progress = useProgress()
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)
    const {handleOpenSheet} = useContext(PlayDetailSheetContext)
    
    
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

    
    useEffect(() => {
        if (song) {
            handleGetColors(song?.thumbnail)
        }
    }, [song])

    return (
        <>
            {song && (
                <TouchableHighlight onPress={() => {
                    handleOpenSheet()
                }}>
                    <>
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
                                            {isPlaying ? <Entypo name="controller-paus" size={24} color={theme.icon} style={{ marginRight: 10 }} /> :
                                                <Entypo name="controller-play" size={28} color={theme.icon} style={{ marginRight: 10 }} />
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
                                        color={theme.icon}
                                    />
                                </View>
                            </View>
                        </LinearGradient>
                        
                       
                    </>
                </TouchableHighlight>
            )}
        </>
    )
}





export default Player