import { View, Text, TextStyle, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import OTPTextInput from 'react-native-otp-textinput'
const OTP = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)

    const otpInput = useRef<any>(null)
    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Xác thực OTP</Text>
            <Text style={styles.note}>Một OTP đã được gửi tới email của bạn. Vui lòng kiểm tra email</Text>
            <OTPTextInput
                ref={e => (otpInput.current = e)}
                textInputStyle={styles.value as TextStyle}
                inputCount={6}
                containerStyle={{ marginVertical: 20 }}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Xác thực</Text>
            </TouchableOpacity>

            <View style={styles.options}>
                <Text style={styles.note}>
                    Không nhận được OTP?
                </Text>
                <TouchableOpacity style={styles.resendBtn}>
                    <Text style={styles.resendLink}>Gửi lại</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OTP