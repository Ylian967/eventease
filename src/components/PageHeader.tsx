import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

// Bandeau bleu nuit en haut des onglets, avec un titre en capitales condensées
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.navy, paddingHorizontal: 24, paddingBottom: 24 },
  title: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 46,
    color: colors.textInv,
    textTransform: 'uppercase',
  },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.mutedInv, marginTop: 4 },
});
