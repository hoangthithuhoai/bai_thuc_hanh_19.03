import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY_PURPLE = '#5c45fd';
const LIGHT_PURPLE = '#e9f0ff';
const LIGHT_GREEN = '#e0f2f1';
const TEXT_GRAY = '#888';
const SEPARATOR_COLOR = '#eee';
const NEON_GREEN_BORDER = '#2ecc71'; 

export default function OrderScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(2);

  return (
    
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <TouchableOpacity>
            <Feather name="trash-2" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* ---  Khối Ảnh  --- */}
        <View style={styles.imageSection}>
          <View style={styles.imageMainContainer}>
            <Image 
              source={require('../../assets/banner1.png')} 
              style={styles.mainImage} 
              resizeMode="cover" 
            />
            <View style={styles.offBadge}>
              <Text style={styles.offBadgeText}>10%</Text>
              <Text style={styles.offBadgeText}>OFF</Text>
            </View>
          </View>
          
          {/* Khối ảnh nhỏ phía dưới banner */}
          <View style={styles.thumbnailListContainer}>
            <View style={[styles.thumbnailRow, { borderColor: NEON_GREEN_BORDER }]}>
                <Image 
                  source={require('../../assets/banner2.png')} 
                  style={styles.combinedThumbnailImage} 
                  resizeMode="contain"
                />
            </View>
          </View>
        </View>

        {/* ---Thông tin sản phẩm --- */}
        <View style={styles.detailsSection}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>BURGER</Text>
            <Text style={styles.productPrice}>$28</Text>
          </View>
          
          <View style={styles.ratingQuantityRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.9 (3k+ Rating)</Text>
            </View>
            
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Feather name="minus-circle" size={24} color={TEXT_GRAY} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity.toString().padStart(2, '0')}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Feather name="plus-circle" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Logistic & Payment --- */}
          <View style={styles.logisticsSection}>
            <View style={[styles.infoBox, { backgroundColor: LIGHT_GREEN }]}>
              <View style={[styles.iconWrapper, {backgroundColor: '#fff'}]}>
                <Feather name="map-pin" size={18} color={PRIMARY_PURPLE} />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.infoDesc}>Dhaka, Bangladesh</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
                <Feather name="edit-2" size={20} color={PRIMARY_PURPLE} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentCardWrapper}>
                <Image 
                  source={require('../../assets/credit card icon.png')} 
                  style={styles.paymentIcon} 
                />
                <Text style={styles.paymentMethodTitle}>Payment Method</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* --- Tổng kết --- */}
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Checkout Summary</Text>
            <View style={styles.separator} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({quantity})</Text>
              <Text style={styles.summaryValue}>${(quantity * 28).toFixed(0)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$6.20</Text>
            </View>
            <View style={styles.separator} />
            <View style={[styles.summaryRow, { marginTop: 10 }]}>
              <Text style={styles.payableLabel}>Payable Total</Text>
              <Text style={styles.payableValue}>${((quantity * 28) + 6.20).toFixed(1)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmBtnText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    alignItems: 'center' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  imageSection: { marginTop: 5 }, 
  imageMainContainer: { 
    height: 180, 
    marginHorizontal: 20, 
    borderRadius: 20, 
    overflow: 'hidden', 
    backgroundColor: '#f0f0f0' 
  },
  mainImage: { width: '100%', height: '100%' },
  offBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: PRIMARY_PURPLE, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, alignItems: 'center' },
  offBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  
  thumbnailListContainer: { 
    position: 'absolute', 
    bottom: -10, 
    width: '100%', 
    alignItems: 'center',
    zIndex: 10 
  },
  thumbnailRow: { 
    flexDirection: 'row', 
    borderWidth: 1.5, 
    padding: 4, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255, 255, 255, 1)',
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  combinedThumbnailImage: { width: 140, height: 45 }, 
  
  detailsSection: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    marginTop: 10 
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontSize: 24, fontWeight: 'bold' },
  productPrice: { fontSize: 24, fontWeight: 'bold', color: PRIMARY_PURPLE },
  ratingQuantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, color: TEXT_GRAY, fontSize: 13 },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  logisticsSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoBox: { flex: 1, flexDirection: 'row', padding: 12, borderRadius: 15, alignItems: 'center' },
  iconWrapper: { padding: 6, borderRadius: 8 },
  infoTextContainer: { marginLeft: 10 },
  infoLabel: { color: TEXT_GRAY, fontSize: 11 },
  infoDesc: { fontWeight: 'bold', fontSize: 13, marginTop: 2 },
  editBtn: { backgroundColor: LIGHT_PURPLE, padding: 12, borderRadius: 15 },
  paymentMethodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  paymentCardWrapper: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  paymentIcon: { width: 40, height: 25, borderRadius: 4, marginRight: 12 },
  paymentMethodTitle: { fontSize: 14, color: '#333', fontWeight: '500' },
  changeBtn: { backgroundColor: 'transparent' },
  changeText: { color: PRIMARY_PURPLE, fontWeight: 'bold', fontSize: 13 },
  summarySection: { marginTop: 20 },
  summaryTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 5 },
  separator: { height: 1, backgroundColor: SEPARATOR_COLOR, marginVertical: 6 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { color: TEXT_GRAY, fontSize: 13 },
  summaryValue: { fontWeight: 'bold', fontSize: 13, color: '#000' },
  payableLabel: { fontWeight: 'bold', fontSize: 15 },
  payableValue: { fontWeight: 'bold', fontSize: 15, color: PRIMARY_PURPLE },
  confirmBtn: { backgroundColor: PRIMARY_PURPLE, padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});