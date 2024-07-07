import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { createStyles } from './styles';
import { STACK_ROUTE } from '../../../constants/route';
import { useSignUpMutation } from '../../../api/user';
import { isErrorWithData } from '../../../utils';
import LoadingIcon from '../../../components/LoadingIcon/LoadingIcon';

const Register = ({ navigation }: any) => {
    const theme = useThemeColor();
    const styles = createStyles(theme);

    const [signUp, result] = useSignUpMutation()

    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to validate email format
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Function to handle form submission
    const handleRegister = () => {
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Weak Password', 'Password should be at least 6 characters long.');
            return;
        }

        const body = {
            name,
            email,
            password
        }
        signUp(body)
        // Alert.alert('Success', 'Account created successfully!');
        // navigation.navigate(STACK_ROUTE.OTP)
    };

    const handleRegisterSuccess = () => {
        navigation.navigate(STACK_ROUTE.OTP, {email: email})
    }


    useEffect(() => {
        console.log("result register ", result)
        if (result.data) {
            handleRegisterSuccess()
        }
    }, [result.data])
    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Tạo tài khoản mới 👋</Text>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Tên đăng nhập (Email)
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Tên
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={value => setName(value)}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Mật khẩu
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={value => setPassword(value)}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Nhập lại mật khẩu
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={value => setConfirmPassword(value)}
                        secureTextEntry
                    />
                </View>
                {result.isError && result.isError && (
                    <Text style={styles.error}>{
                        isErrorWithData(result.error) ? result.error.data.error : 'Có lỗi xảy ra vui lòng thử lại sau'
                    }</Text>
                )}
                <TouchableOpacity style={styles.btn} onPress={handleRegister}
                >{
                        result.isLoading ? <LoadingIcon /> :
                            <Text style={styles.btnText}>
                                Đăng ký
                            </Text>
                    }
                </TouchableOpacity>
                <View style={styles.options}>
                    <Text style={styles.note}>
                        Đã có tài khoản ?
                    </Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate(STACK_ROUTE.Login)}>
                        <Text style={styles.signUpLink}> Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Register;
