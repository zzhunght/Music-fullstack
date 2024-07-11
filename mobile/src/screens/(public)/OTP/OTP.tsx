import { View, Text, TextStyle, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './styles'
import OTPTextInput from 'react-native-otp-textinput'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'
import { useConfirmOTPMutation, useResendOTPMutation } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import { STACK_ROUTE } from '../../../constants/route'
import { TextCustom } from '../../../components/Text/TextCustome'
const OTP = ({ navigation, route }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [confirmOTP, result] = useConfirmOTPMutation()
    const [resendOTP, resultResend] = useResendOTPMutation()
    const otpInput = useRef<any>(null)
    const { email } = route.params

    const handleConfirmOTP = () => {
        if (result.isLoading) return
        if (otpInput.current.state.otpText?.length == 0 ||

            otpInput.current.state.otpText?.includes("")
        ) {
            return
        }
        if (!email) return
        const otp = otpInput.current.state.otpText.join("")
        if (otp.length != 6) return

        const body = {
            email: email,
            otp: otp
        }
        confirmOTP(body)
    }

    const handleResendOTP = () => {
        if (resultResend.isLoading) return
        if (!email) return
        resendOTP({ email: email as string })
    }

    const handleVerifyOTPSuccess = ()=>{
        navigation.navigate(STACK_ROUTE.Login)
    }
    useEffect(() => {
        if(result.data){
            handleVerifyOTPSuccess()
        }
    }, [result])

    return (
        <View style={styles.wrap}>
            <TextCustom style={styles.title}>Xác thực OTP</TextCustom>
            <TextCustom style={styles.note}>Một OTP đã được gửi tới email của bạn. Vui lòng kiểm tra email</TextCustom>
            <OTPTextInput
                ref={e => (otpInput.current = e)}
                textInputStyle={styles.value as TextStyle}
                inputCount={6}
                containerStyle={{ marginVertical: 20 }}
            />
            {result.isError && result.isError && (
                <TextCustom style={styles.error}>{
                    isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                }</TextCustom>
            )}
            <TouchableOpacity style={styles.btn}
                onPress={handleConfirmOTP}
            >
                {result.isLoading ? <LoadingIcon /> : <TextCustom style={styles.btnText}>Xác thực</TextCustom>}

            </TouchableOpacity>

            <View style={styles.options}>
                <TextCustom style={styles.note}>
                    Không nhận được OTP?
                </TextCustom>
                <TouchableOpacity style={styles.resendBtn} onPress={handleResendOTP}>
                    <TextCustom style={styles.resendLink}>Gửi lại</TextCustom>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OTP