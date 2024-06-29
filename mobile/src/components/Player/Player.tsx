import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStyles } from './style'
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import PlayDetail from '../../screens/un-authorize/PlayDetail/PlayDetail'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import { useThemeColor } from '../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { ProgressBar } from '@react-native-community/progress-bar-android';


const Player = () => {
    const progress = useProgress()
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const [openDetail, setOpenDetail] = useState(false)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    // const [sound, setSound] = useState<Audio.Sound>();
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)
    const GetQueue = async()=>{
        const queue = await TrackPlayer.getQueue()
        console.log("queue: " , queue)
    }
    // useEffect(() => {
    //     GetQueue()
    // },[song])
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
                                            <Text style={styles.title} numberOfLines={1}>{song.name}</Text>
                                            <Text style={styles.text}>{song.artist_name}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (isPlaying) {
                                                    TrackPlayer.pause();
                                                } else {
                                                    TrackPlayer.play();
                                                }
                                            }}
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
                        <Modal visible={openDetail} animationType='slide'>
                            <PlayDetail onClose={() => setOpenDetail(false)} />
                        </Modal>
                    </>
                </TouchableHighlight>
            )}
        </>
    )
}





export default Player