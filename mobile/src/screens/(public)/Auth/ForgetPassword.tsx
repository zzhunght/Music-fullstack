import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import { STACK_ROUTE } from '../../../constants/route'
import { useForgetPasswordMutation, useLoginMutation } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'
import { TextCustom } from '../../../components/Text/TextCustome'
import WithHeader from '../../../components/Header/Header'
import FastImage from 'react-native-fast-image'

const ForgetPassword = ({ navigation }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [email, setEmail] = useState('');
    const [forgetPassword, result] = useForgetPasswordMutation()

    const handleLogin = () => {
        if (email) {
            forgetPassword(email)
        }
    }

    useEffect(() => {
        if (result.data) {
            console.log("forget password request success ", result.data)
        }
    }, [result.data])
    return (
        <WithHeader title='Quên mật khẩu'>
            <View style={styles.wrap}>

                {result.data ? (
                    <View style={styles.success}>
                        <FastImage
                            style={{
                                width: 100,
                                height: 100
                            }}
                            source={require('../../../assets/images/sendSuccess.webp')}
                        />
                        <TextCustom style={styles.successText}>
                            Vui lòng kiểm tra email của bạn và làm theo hướng dẫn
                        </TextCustom>

                    </View>
                ) : (
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <TextCustom style={styles.label}>
                                Email
                            </TextCustom>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                        </View>
                        {result.isError && result.isError && (
                            <TextCustom style={styles.error}>{
                                isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                            }</TextCustom>
                        )}
                        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                            {result.isLoading ? <LoadingIcon /> : <TextCustom style={styles.btnText}>
                                Quên mật khẩu
                            </TextCustom>
                            }
                        </TouchableOpacity>

                    </View>
                )}
            </View>
        </WithHeader>
    )
}

export default ForgetPassword