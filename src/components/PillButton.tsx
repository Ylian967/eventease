import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts, radius } from '../theme';

type PillButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'green' | 'white' | 'danger';
};

// Bouton en forme de pilule : vert pour valider, blanc sur bleu nuit, rouge pour supprimer
export default function PillButton({ title, onPress, variant = 'green' }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        { transform: [{ scale: pressed ? 0.97 : 1 }] },
      ]}
    >
      <Text style={[styles.text, variant === 'green' ? styles.textLight : styles.textDark]}>
        {title}
      </Text>
    </Pressable>
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
