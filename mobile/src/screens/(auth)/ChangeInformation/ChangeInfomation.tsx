import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { createStyles } from './style'
import { STACK_ROUTE } from '../../../constants/route'
import { useChangeNameMutation,  useGetUserInfoQuery } from '../../../api/user'
import { isErrorWithData } from '../../../utils'
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon'
import { TextCustom } from '../../../components/Text/TextCustome'
import WithHeader from '../../../components/Header/Header'

const ChangeInfomation= ({ navigation }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const {data : user} = useGetUserInfoQuery()
    const [form, setForm] = useState({
        name: '',

    });
    const [error, setError] = useState('')
    const [changeName, result] = useChangeNameMutation() 

    const validateForm = () => {
        if (form.name.length < 2) {
            setError('Tên không được nhỏ hơn 2 kí tự')
            return false
        }
        return true
    }

    const handleLogin = () => {
        const validate = validateForm()
        if(!validate) return
        changeName({name: form.name})
    }


    useEffect(() => {
        if (result.data) {
            navigation.goBack()
        }
    }, [result.isLoading])

    useEffect(()=>{
        setForm({
            name: user?.name || ''
        })
    },[user])
    useEffect(()=>{
        setError('')
    },[form])
    return (
        <WithHeader title='Thay đổi thông tin'>
            <View style={styles.wrap}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <TextCustom style={styles.label}>
                            Tên
                        </TextCustom>
                        <TextInput
                            value={form.name}
                            onChangeText={value => setForm({ ...form, name: value })}
                            style={styles.input}
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

export default ChangeInfomation