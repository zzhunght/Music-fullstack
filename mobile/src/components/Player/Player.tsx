import { View, Text, ImageBackground, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
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
import TrackPlayer from 'react-native-track-player';


const Player = () => {
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const [openDetail, setOpenDetail] = useState(false)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    // const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(100)
    const [current, setCurrentTime] = useState(0)
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)

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
                                            source={{uri: song.thumbnail}}
                                        />
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={styles.title}>{song.name}</Text>
                                            <Text style={styles.text}>{song.artist_name}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                
                                            }}
                                        >
                                            {isPlaying ? <Entypo name="controller-paus" size={24} color="white" /> :
                                                <Entypo name="controller-play" size={28} color="white" style={{ marginRight: 10 }} />
                                            }

                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{
                                    transform: [{ scaleY: 0.4 }],
                                    alignItems: 'center',
                                }}>
                                    <Slider
                                        style={{
                                            width: '96%',
                                            position: 'absolute',
                                            top: -23,
                                            height: 1
                                        }}
                                        minimumValue={0}
                                        maximumValue={duration}
                                        value={current}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#525252"
                                        thumbTintColor='transparent'

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