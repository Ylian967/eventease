import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';
import Logo from './Logo';
import PaintedTitle from './PaintedTitle';
import PillButton from './PillButton';

type EventHeroProps = {
  name: string;
  eventCount: number;
  participationCount: number;
  onAdd: () => void;
};

// Grand en-tête noir de la liste : titre peint, chiffres clés et bouton d'ajout
export default function EventHero({ name, eventCount, participationCount, onAdd }: EventHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.hero, { paddingTop: insets.top + 16 }]}>
      <View style={styles.topRow}>
        <Logo size={26} />
        <Text style={styles.hello}>Salut {name} !</Text>
      </View>

      <PaintedTitle text={'Sorties,\nateliers &\nconférences'} style={styles.title} />

      <View style={styles.stats}>
        <View>
          <Text style={styles.statNumber}>{eventCount}</Text>
          <Text style={styles.statLabel}>Événements</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={[styles.statNumber, styles.highlight]}>{participationCount}</Text>
          <Text style={styles.statLabel}>Mes participations</Text>
        </View>
      </View>

      <PillButton title="+ Ajouter un événement" variant="white" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.header, paddingHorizontal: 24, paddingBottom: 32 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hello: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.headerMuted },
  title: {
    fontFamily: fonts.display,
    fontSize: 60,
    lineHeight: 60,
    color: colors.headerText,
    textTransform: 'uppercase',
    marginTop: 32,
  },
  highlight: { color: colors.highlight },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 24, marginVertical: 28 },
  statNumber: { fontFamily: fonts.display, fontSize: 44, lineHeight: 48, color: colors.headerText },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.headerMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  separator: { width: 1, alignSelf: 'stretch', backgroundColor: colors.headerLine },
});
