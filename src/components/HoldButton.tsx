import { useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, holdDuration, radius } from '../theme';

type HoldButtonProps = {
  title: string;
  onComplete: () => void;
};

// La « touche » à maintenir : elle se remplit pendant l'appui et valide quand elle est pleine
export default function HoldButton({ title, onComplete }: HoldButtonProps) {
  // 0 = vide, 1 = pleine
  const progress = useRef(new Animated.Value(0)).current;

  function startHold() {
    Animated.timing(progress, {
      toValue: 1,
      duration: holdDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      // finished vaut false si on a relâché avant la fin
      if (finished) {
        onComplete();
        progress.setValue(0);
      }
    });
  }

  // Relâchée trop tôt, la touche se vide en douceur
  function stopHold() {
    Animated.timing(progress, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  }

  const fillWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <Pressable
      onPressIn={startHold}
      onPressOut={stopHold}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint="Maintenir appuyé pour valider"
      // Avec un lecteur d'écran, un double appui suffit
      accessibilityActions={[{ name: 'activate' }]}
      onAccessibilityAction={onComplete}
      style={styles.wrapper}
    >
      <View style={styles.edge} />
      <View style={styles.key}>
        <Animated.View style={[styles.fill, { width: fillWidth }]} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingBottom: 4 },
  edge: {
    position: 'absolute',
    top: 4,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  key: {
    minHeight: 56,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fill: { position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor: colors.action },
  text: {
    fontFamily: fonts.button,
    fontSize: 16,
    color: colors.onSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
});
