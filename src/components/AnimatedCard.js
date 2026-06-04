import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AnimatedCard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;      
  const slideAnim = useRef(new Animated.Value(60)).current;    
  const scaleAnim = useRef(new Animated.Value(1)).current;      
  const rotateAnim = useRef(new Animated.Value(0)).current;     

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleLongPress = () => {
    rotateAnim.setValue(0); 
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const rotationInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongPress}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
              { rotate: rotationInterpolate }
            ],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Cinix Premium Card</Text>
        <Text style={styles.cardBody}>Tap untuk bounce, tahan lama untuk putar 360°.</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardBody: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default AnimatedCard;