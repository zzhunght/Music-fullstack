import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from '../SearchDetailTab/styles'
import FastImage from 'react-native-fast-image'
import { TextCustom } from '../Text/TextCustome'
import { Artist } from '../../interface'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useCheckFollowArtistQuery, useFollowArtistMutation, useUnFollowArtistMutation } from '../../api/artist'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { useNavigation } from '@react-navigation/native'
import { STACK_ROUTE } from '../../constants/route'

const ArtistItem = ({ item }: { item: Artist }) => {
    const theme = useThemeColor()
    const navigation: any = useNavigation()
    const styles = createStyles(theme)
    const { data: check , refetch: refetchCheck, isLoading} = useCheckFollowArtistQuery(item.id)
    const [follow, followResult] = useFollowArtistMutation()
    const [unFollow, unFollowResult] = useUnFollowArtistMutation()

    const handleFollowOrUnFollow = () => {
        if(check) {
            unFollow(item.id)
        } else {
            follow(item.id)
        }
    }

    useEffect(() => {
        if(followResult.data){
            refetchCheck()
        }
    }, [followResult])

    useEffect(() => {
        if(unFollowResult.data){
            refetchCheck()
        }

    }, [unFollowResult])
    return (
        <TouchableOpacity style={styles.artistItem}
            onPress={()=>navigation.navigate(STACK_ROUTE.Artist, {artistId: item.id})}
        >
            <View style={styles.artistInfo}>
                <FastImage
                    source={{ uri: item.avatar_url }}
                    resizeMode='cover'
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginHorizontal: 10,
                    }}
                />
                <View style={{ justifyContent: 'center' }}>
                    <TextCustom style={styles.artistName}>
                        {item.name}
                    </TextCustom>
                    <TextCustom style={styles.artistFollowCount}>
                        {item.follow_count || 0} followers
                    </TextCustom>
                </View>
            </View>
            <TouchableOpacity onPress={handleFollowOrUnFollow}>
                <View style={styles.followBtn}>
                    {isLoading || followResult.isLoading || unFollowResult.isLoading ? 
                        <LoadingIcon />
                    : <TextCustom style={styles.follow}>
                        {check ? 'Đang theo dõi' : 'Theo dõi'}
                    </TextCustom>}
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ArtistItem