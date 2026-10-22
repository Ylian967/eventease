import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type SlideInProps = {
  delay?: number; // en millisecondes, pour faire arriver les éléments les uns après les autres
  children: ReactNode;
};

// Fait apparaître son contenu en fondu, en glissant légèrement vers le haut
export default function SlideIn({ delay = 0, children }: SlideInProps) {
  // 0 = caché, 1 = à sa place
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 400,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [30, 0] });

  return (
    <Animated.View style={{ opacity: progress, transform: [{ translateY }] }}>{children}</Animated.View>
  );
}
