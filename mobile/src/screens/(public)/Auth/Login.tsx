import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import { STACK_ROUTE } from '../../../constants/route'
import { useLoginMutation } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'
import { TextCustom } from '../../../components/Text/TextCustome'

const Login = ({ navigation }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, result] = useLoginMutation()

    const handleLogin = () => {
        const body = {
            email: email,
            password: password
        }
        login(body)
    }

    const handleLoginSuccess = () => {
        navigation.navigate(STACK_ROUTE.Home)
    }

    useEffect(() => {
        if (result.data) {
            handleLoginSuccess()
        }
    }, [result.isLoading])
    return (
        <View style={styles.wrap}>
            <TextCustom style={styles.title}>Xin chào 👋</TextCustom>
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
                <View style={styles.inputGroup}>
                    <TextCustom style={styles.label}>
                        Mật khẩu
                    </TextCustom>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={{ marginTop: -10 }}
                    onPress={() => navigation.navigate(STACK_ROUTE.ForgetPassword)}
                >
                    <TextCustom style={styles.forgetPassword}>Quên mật khẩu ?</TextCustom>
                </TouchableOpacity>

                {result.isError && result.isError && (
                    <TextCustom style={styles.error}>{
                        isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                    }</TextCustom>
                )}
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    {result.isLoading ? <LoadingIcon /> : <TextCustom style={styles.btnText}>
                        Đăng nhập
                    </TextCustom>
                    }

                </TouchableOpacity>
                <View style={styles.options}>
                    <TextCustom style={styles.note}>
                        Chưa có tài khoản ?
                    </TextCustom>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate(STACK_ROUTE.Register)}>
                        <TextCustom style={styles.signUpLink}> Đăng ký</TextCustom>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login