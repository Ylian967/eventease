import { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type PopInProps = {
  trigger: unknown; // l'animation se rejoue chaque fois que cette valeur change
  children: ReactNode;
};

// Fait « sauter » son contenu avec un petit rebond
export default function PopIn({ trigger, children }: PopInProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    scale.setValue(0.6);
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 120, useNativeDriver: true }).start();
  }, [trigger]);

  return (
    <Animated.View style={{ alignSelf: 'flex-start', transform: [{ scale }] }}>{children}</Animated.View>
  );
}
