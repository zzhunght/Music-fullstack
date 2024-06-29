import { View, Text, ImageBackground, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './style'
import { Image } from 'expo-image'
import Slider from '@react-native-community/slider';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import PlayDetail from '../../screens/un-authorize/PlayDetail/PlayDetail'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { LinearGradient } from 'expo-linear-gradient'

// const song = {
//     name: 'Đừng làm trái tim anh đau',
//     artist_name: 'Sơn Tùng MTP',
//     thumbnail: 'https://i.scdn.co/image/ab67616d0000b273ff2d5a6f74d5141af7a371ea'
// }

const Player = () => {
    const song = useSelector((state: RootState) => state.songSlice.selectedSong)
    const [openDetail, setOpenDetail] = useState(false)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(100)
    const [current, setCurrentTime] = useState(0)
    const songBg = useSelector((state: RootState) => state.songSlice.songBackground)

    async function playSound(uri: string) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({
            uri: uri
        });
        setSound(sound);

        console.log('Playing Sound');
        const status = await sound.getStatusAsync();
        console.log("status: ", status)
        if (status.isLoaded && status.durationMillis) {
            console.log("durations: " + status.durationMillis / 1000)
            setDuration(status.durationMillis / 1000)
            setCurrentTime(0)
        }
        await sound.playAsync();
        setIsPlaying(true);
    }
    async function pauseSound() {
        if (sound) {
            sound?.pauseAsync()
            setIsPlaying(false)
        }

    }
    async function resumeSound() {
        if (sound) {
            sound?.playAsync()
            setIsPlaying(true)
        }

    }

    useEffect(() => {
        // console.log("current sound ", curentSound)
        if (sound) {
            sound.setOnPlaybackStatusUpdate((status: any) => {
                if (status.isPlaying) {
                    setCurrentTime(() => status.positionMillis / 1000);
                }
            });
        }
    }, [sound]);

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

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
                                        <Image
                                            style={styles.image}
                                            source={song.thumbnail}
                                        />
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={styles.title}>{song.name}</Text>
                                            <Text style={styles.text}>{song.artist_name}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                isPlaying ? pauseSound() : resumeSound();
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