import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePressBounce } from '../hooks/usePressBounce';
import { colors, fonts, radius } from '../theme';

type PillButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'green' | 'white' | 'danger';
};

// Bouton en forme de touche de clavier : contour noir et relief qui s'enfonce à l'appui
export default function PillButton({ title, onPress, variant = 'green' }: PillButtonProps) {
  const { scale, onPressIn, onPressOut } = usePressBounce();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        style={styles.wrapper}
      >
        {({ pressed }) => (
          <>
            <View style={styles.edge} />
            <View
              style={[styles.button, styles[variant], { transform: [{ translateY: pressed ? 4 : 0 }] }]}
            >
              <Text style={[styles.text, variant === 'danger' && styles.dangerText]}>{title}</Text>
            </View>
          </>
        )}
      </Pressable>
    </Animated.View>
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
  button: {
    minHeight: 48,
    paddingHorizontal: 32,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  green: { backgroundColor: colors.action },
  white: { backgroundColor: colors.secondary },
  danger: { backgroundColor: colors.secondary },
  text: {
    fontFamily: fonts.button,
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.onSecondary,
  },
  dangerText: { color: colors.danger },
});
