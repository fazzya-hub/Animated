import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnimatedCard from './src/components/AnimatedCard';
import SwipeableListItem from './src/components/SwipeableListItem';
import { registerQuoteTask } from './src/tasks/quoteTask';

export default function App() {
  const [items, setItems] = useState([
    { id: '1', title: ' Tonton Film Bioskop Cinix Baru' },
    { id: '2', title: ' Selesaikan Tugas Praktikum Web' },
    { id: '3', title: ' Audit Risiko Kerangka Kerja Pay Forward' },
  ]);

  const [quote, setQuote] = useState(null);

  const fetchLocalQuote = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@stored_quote');
      if (jsonValue != null) {
        setQuote(JSON.parse(jsonValue));
      } else {
        setQuote({ text: "Belum ada quote tersimpan. Tunggu background task berjalan!", author: "System", time: "-" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLocalQuote();

    registerQuoteTask()
      .then(() => console.log("Background Task terdaftar secara sukses!"))
      .catch((err) => console.log("Gagal mendaftarkan Background Task:", err));
  }, []);

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    Alert.alert("Dihapus", "Item berhasil dihapus via auto-delete swipe!");
  };

  const handleArchive = (id) => {
    Alert.alert("Diarsipkan", `Item dengan ID ${id} berhasil dipindahkan ke arsip.`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainHeader}>React Native Advanced Practice</Text>

        <Text style={styles.sectionTitle}>Latihan 1: Animated Card</Text>
        <AnimatedCard />

        <Text style={styles.sectionTitle}>Latihan 3: Background Quote Fetcher</Text>
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>"{quote?.text}"</Text>
          <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
          <Text style={styles.quoteTime}>Diperbarui pada: {quote?.time}</Text>
        </View>

        <Text style={styles.sectionTitle}>Latihan 2: Swipeable List Item</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SwipeableListItem 
              item={item} 
              onDelete={handleDelete} 
              onArchive={handleArchive} 
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: 40,
  },
  mainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#666',
    marginLeft: 16,
    marginTop: 15,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  quoteBox: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'right',
    marginTop: 4,
  },
  quoteTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});