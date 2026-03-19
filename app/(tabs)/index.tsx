import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { products } from '../../app/_data';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(products);
  const [showSuggestions, setShowSuggestions] = useState(false); 

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData([]); 
      setShowSuggestions(false); 
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
      setShowSuggestions(true); 
    }
  };

  const handleItemClick = (item: any) => {
    if (item.name.toLowerCase() === 'burger') {
      router.push('/order');
    }
  };

  const handleSelectSuggestion = (item: any) => {
    setSearchQuery(item.name); 
    setShowSuggestions(false); 
    handleItemClick(item); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" 
      >
        <LinearGradient colors={['#fffde7', '#ffffff']} style={styles.headerArea}>
          <View style={styles.header}>
            <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location-outline" size={18} color="#5c45fd" />
                <Text style={styles.locationText}>Savar, Dhaka</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bellIcon}>
              <Feather name="bell" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={{ zIndex: 10, position: 'relative' }}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={22} color="#fff" style={styles.searchIcon} />
              <TextInput 
                placeholder="Search your food" 
                placeholderTextColor="#d1c4e9" 
                style={styles.searchInput} 
                value={searchQuery}
                onChangeText={handleSearch}
                onFocus={() => {
                  if (searchQuery.trim() !== '') setShowSuggestions(true);
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')} style={{ paddingHorizontal: 10 }}>
                  <Feather name="x" size={18} color="#fff" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.filterBtn}>
                <Feather name="sliders" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {showSuggestions && (
              <View style={styles.suggestionsContainer}>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TouchableOpacity 
                      key={item.id} 
                      style={[
                        styles.suggestionItem, 
                        index === filteredData.length - 1 && { borderBottomWidth: 0 } 
                      ]} 
                      onPress={() => handleSelectSuggestion(item)} 
                    >
                      <Image source={item.image} style={styles.suggestionImg} resizeMode="contain" />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.suggestionText}>{item.name}</Text>
                        <Text style={styles.suggestionPrice}>${item.price}</Text>
                      </View>
                      <Feather name="arrow-up-left" size={18} color="#ccc" />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.suggestionNoResult}>No food found for "{searchQuery}"</Text>
                )}
              </View>
            )}
          </View>
        </LinearGradient>

        {/* --- CATEGORIES --- */}
        <View style={styles.categoriesWrapper}>
          <TouchableOpacity style={[styles.categoryBox, { backgroundColor: '#2ecc71' }]}>
            <Image source={require('../../assets/pizza.png')} style={styles.catImg} resizeMode="contain" /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
            <Image source={require('../../assets/burger.png')} style={styles.catImg} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
           <Image source={require('../../assets/drink.png')} style={styles.catImg} resizeMode="contain" /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}>
            <Image source={require('../../assets/rice.png')} style={styles.catImg} resizeMode="contain" /> 
          </TouchableOpacity>
        </View>

        <View style={[styles.banner, { zIndex: 1 }]}>
          <Image source={require('../../assets/banner3.png')} style={styles.bannerImage} />
        </View>

        {/* --- POPULAR ITEMS --- */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.itemsWrapper}>
            {products.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.itemCard} 
                onPress={() => handleItemClick(item)} // Truyền món ăn vào hàm kiểm tra
                activeOpacity={0.8}
              >
                <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
                <View style={styles.itemInfo}>
                   <Text style={styles.itemTitle}>{item.name}</Text>
                   <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 20 }, 
  headerArea: { paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  locationInfo: { flex: 1, marginLeft: 15 },
  locationLabel: { color: '#888', fontSize: 13 },
  locationText: { fontWeight: 'bold', fontSize: 17, marginLeft: 5 },
  bellIcon: { padding: 10, backgroundColor: '#fff', borderRadius: 22, elevation: 3, shadowOpacity: 0.1, shadowRadius: 5 },
  
  searchContainer: { flexDirection: 'row', backgroundColor: '#5c45fd', borderRadius: 25, marginTop: 20, alignItems: 'center', paddingHorizontal: 15, height: 55 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 15 },
  filterBtn: { padding: 5, borderLeftWidth: 1, borderColor: '#7b68ee', paddingLeft: 10 },
  
  suggestionsContainer: {
    position: 'absolute',
    top: 85, 
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 999,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionImg: { width: 40, height: 40, borderRadius: 10, marginRight: 15, backgroundColor: '#f9f9f9' },
  suggestionText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  suggestionPrice: { fontSize: 14, color: '#5c45fd', fontWeight: 'bold', marginTop: 2 },
  suggestionNoResult: { padding: 15, textAlign: 'center', color: '#888', fontStyle: 'italic' },

  categoriesWrapper: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 20, zIndex: 1 },
  categoryBox: { width: (width - 70) / 4, height: 85, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6fa' },
  catImg: { width: 45, height: 45 },
  banner: { marginHorizontal: 20, height: 160, borderRadius: 20, overflow: 'hidden' },
  bannerImage: { width: '100%', height: '100%' },
  
  popularSection: { padding: 20, zIndex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  viewAll: { color: '#5c45fd', fontSize: 14, fontWeight: '600' },
  
  itemsWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  itemCard: { width: '47%', backgroundColor: '#fff', borderRadius: 20, padding: 15, marginBottom: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05 },
  itemImg: { width: 200, height: 110, borderRadius: 15, marginBottom: 10 },
  itemInfo: { alignItems: 'center' },
  itemTitle: { fontWeight: 'bold', fontSize: 16, color: '#000', textAlign: 'center' },
  itemPrice: { color: '#5c45fd', fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
});