import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

// Bandeau vert dont le texte défile en boucle de droite à gauche
export default function Marquee({ text }: { text: string }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    // On attend de connaître la largeur du texte pour savoir jusqu'où le faire glisser
    if (textWidth === 0) {
      return;
    }
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: textWidth * 20,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    // Pas d'animation si le téléphone demande de réduire les mouvements
    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (!reduceMotion) {
        animation.start();
      }
    });
    return () => animation.stop();
  }, [textWidth]);

  return (
    <View style={styles.band} accessible accessibilityLabel={text}>
      {/* Le texte est écrit deux fois pour que la boucle ne laisse pas de trou */}
      <Animated.View style={[styles.track, { transform: [{ translateX }] }]}>
        <Text
          style={styles.text}
          numberOfLines={1}
          onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
        >
          {text}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: { backgroundColor: colors.band, paddingVertical: 14, overflow: 'hidden' },
  track: { flexDirection: 'row', alignSelf: 'flex-start' },
  text: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.onBand,
    textTransform: 'uppercase',
    paddingRight: 16,
    flexShrink: 0,
  },
});
