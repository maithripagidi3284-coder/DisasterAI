import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('Starting up...');

  useEffect(() => {
    async function init() {
      try {
        setStatus('Loading...');
        setStatus('Ready!');
        setReady(true);
      } catch (err: any) {
        setStatus('Error: ' + err.message);
      }
    }
    init();
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>🛟 Disaster Assistant</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>🔍 Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>📞 Contacts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === 'home' ? <HomeScreen /> : <ContactsScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { fontSize: 28, fontWeight: 'bold', color: '#2E6DA4', marginBottom: 20 },
  status: { fontSize: 16, color: '#666' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', backgroundColor: '#fff', paddingTop: 50 },
  tab: { flex: 1, padding: 14, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2E6DA4' },
  tabText: { fontSize: 15, color: '#888' },
  activeTabText: { color: '#2E6DA4', fontWeight: 'bold' },
});