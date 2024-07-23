import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import WithHeader from '../../../components/Header/Header'
import FastImage from 'react-native-fast-image'
import { DEFAULT_AVATAR } from '../../../constants'
import { TextCustom } from '../../../components/Text/TextCustome'
import { STACK_ROUTE } from '../../../constants/route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEY } from '../../../constants/asyncStorageKey'
import { useGetUserInfoQuery, useLogoutMutation } from '../../../api/user'

const Profile = ({ navigation }: any) => {
    const { data: user } = useGetUserInfoQuery()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [logout, result] = useLogoutMutation()

    const handleLogout = () => {
        navigation.navigate(STACK_ROUTE.Home)
        AsyncStorage.removeItem(STORAGE_KEY.AccessToken)
        AsyncStorage.removeItem(STORAGE_KEY.RefreshToken)
        AsyncStorage.removeItem(STORAGE_KEY.User)
    }

    useEffect(() => {
        if(result.data){
            handleLogout()
        }
    }, [result])
    return (
        <WithHeader title='Thông tin cá nhân'>
            <View style={styles.wrap}>
                <View style={styles.avatar}>
                    <FastImage
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        source={DEFAULT_AVATAR}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.info}>
                    <TouchableOpacity style={styles.infoRow}>
                        <TextCustom style={styles.label}>Tên</TextCustom>
                        <TextCustom style={styles.infoValue}>{user?.name}</TextCustom>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoRow} disabled={true}>
                        <TextCustom style={styles.label}>Email</TextCustom>
                        <TextCustom style={styles.infoValue}>{user?.email}</TextCustom>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 15}}>
                    <TouchableOpacity style={styles.actionBtn}
                        onPress={()=> {
                            navigation.navigate(STACK_ROUTE.ChangePassword)
                        }}
                    >
                        <TextCustom style={styles.label}>Thay đổi mật khẩu</TextCustom>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.logoutBtn}
                        onPress={() => logout()}
                    >
                        <TextCustom style={styles.logoutText}>
                            Đăng xuất
                        </TextCustom>
                    </TouchableOpacity>
                </View>
            </View>
        </WithHeader>
    )
}

export default Profile