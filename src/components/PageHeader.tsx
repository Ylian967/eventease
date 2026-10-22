import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';
import PaintedTitle from './PaintedTitle';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

// Bandeau noir en haut des onglets, avec un titre peint
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
      <PaintedTitle text={title} style={styles.title} />
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.header, paddingHorizontal: 24, paddingBottom: 24 },
  title: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 46,
    color: colors.headerText,
    textTransform: 'uppercase',
  },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.headerMuted, marginTop: 4 },
});
