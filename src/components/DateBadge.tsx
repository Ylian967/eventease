import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../theme';
import { formatDate } from '../utils/date';

// Petite pilule bleu nuit qui affiche la date d'un événement
export default function DateBadge({ date }: { date: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{formatDate(date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.textInv,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
