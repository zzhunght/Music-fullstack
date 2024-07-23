import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './style'
import { STACK_ROUTE } from '../../../constants/route'
import { useChangePasswordMutation } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'
import { TextCustom } from '../../../components/Text/TextCustome'
import WithHeader from '../../../components/Header/Header'

const ChangePassword = ({ navigation }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [form, setForm] = useState({
        old: '',
        new: '',
        confirm: ''
    });
    const [error, setError] = useState('')
    const [changePassword, result] = useChangePasswordMutation()

    const validateForm = () => {
        if (form.old === '') {
            setError('Mật khẩu cũ không được để trống')
            return false
        }
        if (form.new === '') {
            setError('Mật khẩu mới không được để trống')
            return false
        }
        if (form.confirm === '') {
            setError('Nhập lại ật khẩu không được để trống')
            return false
        }
        if (form.new !== form.confirm) {
            setError('Mật khẩu nhập lại không trùng khớp')
            return false
        }
        return true
    }

    const handleLogin = () => {
        const validate = validateForm()
        if(!validate) return
        changePassword({
            old_password: form.old,
            password: form.new,
        })
    }


    useEffect(() => {
        if (result.data) {
            navigation.goBack()
            setForm({
                old: '',
                new: '',
                confirm: '',
            })
        }
    }, [result.isLoading])

    useEffect(()=>{
        setError('')
    },[form])
    return (
        <WithHeader title='Thay đổi mật khẩu'>
            <View style={styles.wrap}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <TextCustom style={styles.label}>
                            Mật khẩu cũ
                        </TextCustom>
                        <TextInput
                            value={form.old}
                            onChangeText={value => setForm({ ...form, old: value })}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextCustom style={styles.label}>
                            Mật khẩu mới
                        </TextCustom>
                        <TextInput
                            style={styles.input}
                            value={form.new}
                            onChangeText={value => setForm({ ...form, new: value })}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextCustom style={styles.label}>
                            Nhập lại mật khẩu mới
                        </TextCustom>
                        <TextInput
                            style={styles.input}
                            value={form.confirm}
                            onChangeText={value => setForm({ ...form, confirm: value })}
                            secureTextEntry
                        />
                    </View>
                    {error && (
                        <TextCustom style={styles.error}>
                            {error}
                        </TextCustom>
                    )}
                    {result.isError && result.isError && (
                        <TextCustom style={styles.error}>{
                            isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                        }</TextCustom>
                    )}
                    <TouchableOpacity style={[
                        styles.btn
                    ]} onPress={handleLogin}>
                        {result.isLoading ? <LoadingIcon /> : <TextCustom style={styles.btnText}>
                            Thay đổi
                        </TextCustom>
                        }
                    </TouchableOpacity>

                </View>
            </View>
        </WithHeader>
    )
}

export default ChangePassword