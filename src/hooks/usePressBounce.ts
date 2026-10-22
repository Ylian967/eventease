import { useRef } from 'react';
import { Animated } from 'react-native';

// Effet ressort : l'élément rétrécit un peu quand on appuie, puis rebondit quand on relâche
export function usePressBounce() {
  const scale = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(scale, { toValue: 0.95, speed: 50, useNativeDriver: true }).start();
  }

  function onPressOut() {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }).start();
  }

  return { scale, onPressIn, onPressOut };
}
