import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import { STACK_ROUTE } from '../../../constants/route'
import { useLoginMutation } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'

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
            <Text style={styles.title}>Xin chào 👋</Text>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Mật khẩu
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={{ marginTop: -10 }}>
                    <Text style={styles.forgetPassword}>Quên mật khẩu ?</Text>
                </TouchableOpacity>

                {result.isError && result.isError && (
                    <Text style={styles.error}>{
                        isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                    }</Text>
                )}
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    {result.isLoading ? <LoadingIcon /> : <Text style={styles.btnText}>
                        Đăng nhập
                    </Text>
                    }

                </TouchableOpacity>
                <View style={styles.options}>
                    <Text style={styles.note}>
                        Chưa có tài khoản ?
                    </Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate(STACK_ROUTE.Register)}>
                        <Text style={styles.signUpLink}> Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login