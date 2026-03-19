import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../app/_layout'; 

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const MenuItem = ({ icon, title, hasSwitch }: any) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name={icon} size={20} color="#000" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      {hasSwitch ? (
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ false: '#767577', true: '#5c45fd' }} />
      ) : (
        <Feather name="chevron-right" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
       <LinearGradient colors={['#fffde7', '#ffffff']} style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity><Feather name="arrow-left" size={24} color="#000" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.profileInfo}>
          <Image source={require('../../assets/avatar.png')}  style={styles.avatarLarge} />
          <Text style={styles.name}>Rakibul Hasan</Text>
          <Text style={styles.email}>rakibhbrand@gmail.com</Text>
        </View>
      </LinearGradient>

      <View style={styles.menuSection}>
        <MenuItem icon="home" title="Home" />
        <MenuItem icon="credit-card" title="My Card" />
        <MenuItem icon="moon" title="Dark Mood" hasSwitch />
        <MenuItem icon="map-pin" title="Truck Your Order" />
        <MenuItem icon="settings" title="Settings" />
        <MenuItem icon="help-circle" title="Help Center" />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
        <Feather name="log-out" size={18} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: { paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  profileInfo: { alignItems: 'center', marginTop: 10 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#e9f0ff' },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  email: { color: '#888', marginTop: 5 },
  menuSection: { padding: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', backgroundColor: '#5c45fd', marginHorizontal: 20, padding: 18, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 20 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});