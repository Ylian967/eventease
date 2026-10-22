import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { usePressBounce } from '../hooks/usePressBounce';
import { colors, fonts, radius } from '../theme';

type PillButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'green' | 'white' | 'danger';
};

// Bouton en forme de pilule : vert pour valider, blanc sur bleu nuit, rouge pour supprimer
export default function PillButton({ title, onPress, variant = 'green' }: PillButtonProps) {
  const { scale, onPressIn, onPressOut } = usePressBounce();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        style={[styles.button, styles[variant]]}
      >
        <Text style={[styles.text, variant === 'green' ? styles.textLight : styles.textDark]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  green: { backgroundColor: colors.action },
  white: { backgroundColor: colors.secondary },
  danger: { backgroundColor: colors.secondary, borderWidth: 2, borderColor: colors.danger },
  text: {
    fontFamily: fonts.button,
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  textLight: { color: colors.onAction },
  textDark: { color: colors.onSecondary },
});
