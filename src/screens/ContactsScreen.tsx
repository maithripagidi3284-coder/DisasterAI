import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  Alert
} from 'react-native';

const CONTACTS = [
  { id: '1', name: 'National Disaster Helpline', phone: '108', type: 'Emergency' },
  { id: '2', name: 'Police', phone: '100', type: 'Police' },
  { id: '3', name: 'Fire Brigade', phone: '101', type: 'Fire' },
  { id: '4', name: 'Ambulance', phone: '102', type: 'Medical' },
  { id: '5', name: 'NDRF Helpline', phone: '011-24363260', type: 'Disaster' },
  { id: '6', name: 'Flood Control Delhi', phone: '1077', type: 'Flood' },
  { id: '7', name: 'Coast Guard', phone: '1554', type: 'Coast' },
  { id: '8', name: 'Women Helpline', phone: '1091', type: 'Safety' },
  { id: '9', name: 'Child Helpline', phone: '1098', type: 'Safety' },
  { id: '10', name: 'Senior Citizen Helpline', phone: '14567', type: 'Safety' },
];

const TYPE_COLORS: any = {
  Emergency: '#E74C3C',
  Police: '#2E6DA4',
  Fire: '#E67E22',
  Medical: '#27AE60',
  Disaster: '#8E44AD',
  Flood: '#2980B9',
  Coast: '#16A085',
  Safety: '#D35400',
};

export default function ContactsScreen() {
  const handleCall = (phone: string, name: string) => {
    Alert.alert(
      'Call ' + name,
      'Dial ' + phone + '?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL('tel:' + phone) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Emergency Contacts</Text>
      <Text style={styles.subtitle}>Tap any contact to call</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCall(item.phone, item.name)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: TYPE_COLORS[item.type] || '#666' }]}>
              <Text style={styles.badgeText}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, color: '#2E6DA4' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f4f8', padding: 14, borderRadius: 8, marginBottom: 10 },
  cardLeft: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  contactPhone: { fontSize: 18, color: '#2E6DA4', fontWeight: 'bold', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});