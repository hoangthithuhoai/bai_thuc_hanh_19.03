import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from './_layout';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const VALID_USER = { email: 'admin@gmail.com', pass: '123456' };

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (email.toLowerCase() === VALID_USER.email.toLowerCase() && password === VALID_USER.pass) {
        setError(''); 
        login(); 
        router.replace('/(tabs)'); 
    } else {
        setError('Email hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <Text style={styles.subTitle}>Chào mừng bạn quay trở lại!</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="admin@gmail.com" value={email} onChangeText={(text) => { setEmail(text); if(error) setError(''); }} keyboardType="email-address" autoCapitalize="none" />
            
            <Text style={[styles.label, { marginTop: 20 }]}>Mật khẩu</Text>
            <View style={styles.passContainer}>
              <TextInput style={{ flex: 1 }} placeholder="123456" secureTextEntry={!showPassword} value={password} onChangeText={(text) => { setPassword(text); if(error) setError(''); }} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity><Text style={styles.forgotPass}>Quên mật khẩu?</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.btnText}>Đăng Nhập</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Chưa có tài khoản? <Text style={styles.signUpText}>Đăng ký ngay</Text></Text>

          <View style={styles.socialContainer}>
            <View style={styles.line} /><Text style={{ marginHorizontal: 10, color: 'gray' }}>hoặc</Text><View style={styles.line} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-google" size={20} color="red" /><Text style={{ marginLeft: 10 }}>Google</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-facebook" size={20} color="blue" /><Text style={{ marginLeft: 10 }}>Facebook</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, justifyContent: 'center' },
  headerBox: { backgroundColor: '#fffde7', paddingVertical: 40, alignItems: 'center', borderRadius: 30, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  subTitle: { color: 'gray', marginTop: 10, fontSize: 14, textAlign: 'center' },
  form: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 8, color: '#444' },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 15, fontSize: 15 },
  passContainer: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center' },
  errorText: { color: 'red', marginTop: 10, fontSize: 13, fontWeight: '500' },
  forgotPass: { textAlign: 'right', marginTop: 15, color: '#5c45fd', fontWeight: '500' },
  btnLogin: { backgroundColor: '#5c45fd', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10, elevation: 4, shadowColor: '#5c45fd', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  footerText: { textAlign: 'center', marginTop: 25, color: 'gray' },
  signUpText: { color: '#5c45fd', fontWeight: 'bold' },
  socialContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  socialButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  socialBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 15, width: '48%', justifyContent: 'center' }
});