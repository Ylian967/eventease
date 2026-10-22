import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, radius } from '../theme';

// On reprend toutes les props d'un TextInput, plus un libellé
type InputProps = TextInputProps & {
  label: string;
  dark?: boolean; // true quand le champ est posé sur le fond bleu nuit
};

export default function Input({ label, dark = false, ...props }: InputProps) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: dark ? colors.headerMuted : colors.text }]}>{label}</Text>
      <TextInput
        {...props}
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, props.multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  multiline: {
    minHeight: 110,
    paddingTop: 14,
    borderRadius: radius.card,
    textAlignVertical: 'top',
  },
});
