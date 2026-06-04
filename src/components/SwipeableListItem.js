import React, { useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.7;

const SwipeableListItem = ({ item, onDelete, onArchive }) => {
  // Gunakan Animated API bawaan, bukan Reanimated
  const translateX = useRef(new Animated.Value(0)).current;

  // Konfigurasi gesture handling dengan PanResponder bawaan React Native
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Mengikuti gerakan jari ke kiri/kanan
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 1. Jika swipe ke kiri lewat dari 70% lebar layar -> Auto-Delete
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            if (onDelete) onDelete(item.id);
          });
        } 
        // 2. Jika swipe ke kanan melewati batas (misal 120px) -> Archive
        else if (gestureState.dx > 120) {
          if (onArchive) onArchive(item.id);
          // Balik ke posisi semula
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } 
        // 3. Dilepas di tengah -> Snap back pakai Spring Animation
        else {
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Atur opacity background berdasarkan arah geseran jari
  const deleteOpacity = translateX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const archiveOpacity = translateX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.itemContainer}>
      {/* Tombol Delete (Merah) */}
      <Animated.View style={[styles.background, styles.deleteBackground, { opacity: deleteOpacity }]}>
        <Text style={styles.actionText}>Delete</Text>
      </Animated.View>

      {/* Tombol Archive (Hijau) */}
      <Animated.View style={[styles.background, styles.archiveBackground, { opacity: archiveOpacity }]}>
        <Text style={styles.actionText}>Archive</Text>
      </Animated.View>

      {/* Konten utama yang digeser menggunakan PanResponder */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.mainContent, { transform: [{ translateX }] }]}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    marginVertical: 4,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  mainContent: {
    width: '100%',
    padding: 18,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  deleteBackground: {
    backgroundColor: '#ff3b30',
    alignItems: 'flex-end',
  },
  archiveBackground: {
    backgroundColor: '#34c759',
    alignItems: 'flex-start',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SwipeableListItem;