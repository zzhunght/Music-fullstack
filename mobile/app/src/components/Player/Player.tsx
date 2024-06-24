import { View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Modal, Touchable, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './style'
import { Image } from 'expo-image'
import Slider from '@react-native-community/slider';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from 'expo-router'
import { STACK_ROUTE } from '@/constants/route'
import PlayDetail from '../../screens/(un-authorize)/PlayDetail/PlayDetail'

const song = {
    name: 'Đừng làm trái tim anh đau',
    artist_name: 'Sơn Tùng MTP',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/e5/S%C6%A1n_T%C3%B9ng_M-TP_-_%C4%90%E1%BB%ABng_l%C3%A0m_tr%C3%A1i_tim_anh_%C4%91au.png/220px-S%C6%A1n_T%C3%B9ng_M-TP_-_%C4%90%E1%BB%ABng_l%C3%A0m_tr%C3%A1i_tim_anh_%C4%91au.png'
}

const Player = () => {
    const [openDetail, setOpenDetail] = useState(false)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(100)
    const [current, setCurrentTime] = useState(0)

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
        <TouchableHighlight onPress={() => {
            setOpenDetail(true)
        }}>
            <>
                <View style={styles.wrap} >
                    <ImageBackground
                    
                        source={{
                            uri: song.thumbnail
                        }}
                        blurRadius={230}
                    >
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
                    </ImageBackground>
                </View>
                <Modal visible={openDetail} animationType='slide'>
                    <PlayDetail onClose={()=>setOpenDetail(false)}/>
                </Modal>
            </>
        </TouchableHighlight>
    )
}





export default Player