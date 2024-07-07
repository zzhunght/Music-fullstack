
import { View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

const LoadingIcon = () => {
    return (
        <View>
            <FastImage
                style={{ width: 40, height: 40 }}
                source={require('../../assets/images/loding.gif')}
            />
        </View>
    )
}

export default LoadingIcon