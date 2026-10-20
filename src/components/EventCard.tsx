import { Pressable, StyleSheet, Text } from 'react-native';
import DateBadge from './DateBadge';
import { colors, fonts, radius } from '../theme';
import { EventItem } from '../types';

type EventCardProps = {
  event: EventItem;
  index: number;
  isParticipating: boolean;
  onPress: () => void;
};

// Carte d'un événement dans la liste : date, titre, début de la description et participation
export default function EventCard({ event, index, isParticipating, onPress }: EventCardProps) {
  // Une carte sur deux est vert pâle
  const backgroundColor = index % 2 === 0 ? colors.card : colors.cardAlt;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        { backgroundColor, transform: [{ translateY: pressed ? -4 : 0 }] },
      ]}
    >
      <DateBadge date={event.date} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {event.description}
      </Text>
      {isParticipating ? <Text style={styles.going}>✓ J'y participe</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.card, padding: 20, marginBottom: 16 },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 28,
    color: colors.navy,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  description: { fontFamily: fonts.body, fontSize: 15, color: colors.muted, marginTop: 4 },
  going: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.greenInk, marginTop: 12 },
});
