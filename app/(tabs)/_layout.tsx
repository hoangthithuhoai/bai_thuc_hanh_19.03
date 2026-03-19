import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  
  const pathname = usePathname();
  
  const isHomeActive = pathname === '/' || pathname.includes('/order');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5c45fd',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 5 },
      }}>
      
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'HOME', 
        
          tabBarIcon: () => (
            <Ionicons 
              name={isHomeActive ? "home" : "home-outline"} 
              size={22} 
              color={isHomeActive ? '#5c45fd' : '#888'} 
            />
          ),
          tabBarLabelStyle: { color: isHomeActive ? '#5c45fd' : '#888' }
        }} 
      />
      
      <Tabs.Screen name="cart" options={{ href: null, title: 'SHOPPING CART' }} />
      
      <Tabs.Screen 
        name="order" 
        options={{ 
          title: 'ORDER', 
          tabBarLabelStyle: { color: '#888' }, 
          tabBarIcon: () => (<Ionicons name="bag-outline" size={22} color="#888" />) 
        }} 
        listeners={{ tabPress: (e) => e.preventDefault() }} 
      />
      
      <Tabs.Screen 
        name="inbox" 
        options={{ 
          title: 'INBOX', 
          tabBarLabelStyle: { color: '#888' }, 
          tabBarIcon: () => (<Ionicons name="chatbox-ellipses-outline" size={22} color="#888" />) 
        }} 
       
        listeners={{ tabPress: (e) => e.preventDefault() }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'PROFILE', 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
          ) 
        }} 
      />
    </Tabs>
  );
}