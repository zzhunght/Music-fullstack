import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Container from '@/app/src/components/Container'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './styles'
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image'
import Slider from '@react-native-community/slider'
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const imageurl = 'https://bloganchoi.com/wp-content/uploads/2024/06/loi-bai-hat-dung-lam-trai-tim-anh-dau-lyrics-son-tung-mtp-5-1-696x870.jpg'
interface Props {
    onClose: () => void;
}

export default function PlayDetail({ onClose }: Props) {
    const theme = useThemeColor()
    const styles = createStyles(theme)

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
                    <TouchableOpacity>
                        <Ionicons name="chatbox" size={24} color={theme.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="playlist-music-outline" size={28} color={theme.icon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Container>
    )
}