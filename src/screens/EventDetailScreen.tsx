import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import DateBadge from '../components/DateBadge';
import HoldButton from '../components/HoldButton';
import PillButton from '../components/PillButton';
import PopIn from '../components/PopIn';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { colors, fonts, radius } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen({ route, navigation }: Props) {
  const { user } = useAuth();
  const { events, deleteEvent, toggleParticipation } = useEvents();
  const event = events.find((item) => item.id === route.params.id);

  // L'événement vient d'être supprimé : on n'affiche plus rien
  if (!event || !user) {
    return null;
  }

  const isParticipating = event.participants.includes(user.email);

  function remove() {
    deleteEvent(route.params.id);
    navigation.goBack();
  }

  // Demande une confirmation avant de supprimer
  function confirmDelete() {
    // Alert n'existe pas sur le web, on utilise la fenêtre de confirmation du navigateur
    if (Platform.OS === 'web') {
      if (window.confirm('Supprimer cet événement ?')) {
        remove();
      }
      return;
    }
    Alert.alert('Supprimer cet événement ?', 'Cette action est définitive.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: remove },
    ]);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <DateBadge date={event.date} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description || 'Pas de description.'}</Text>
        <PopIn trigger={isParticipating}>
          <Text style={styles.participants}>
            {event.participants.length} participant{event.participants.length > 1 ? 's' : ''}
            {isParticipating ? ' · dont toi ✓' : ''}
          </Text>
        </PopIn>
      </View>

      <View style={styles.actions}>
        <Text style={styles.hint}>
          Maintiens la touche pour {isParticipating ? 'te désinscrire' : 'participer'}
        </Text>
        <HoldButton
          title={isParticipating ? 'Je ne participe plus' : 'Je participe'}
          onComplete={() => toggleParticipation(event.id, user.email)}
        />
        <PillButton title="Modifier" variant="white" onPress={() => navigation.navigate('EventForm', { id: event.id })} />
        <PillButton title="Supprimer" variant="danger" onPress={confirmDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, gap: 24 },
  card: { backgroundColor: colors.card, borderRadius: radius.card, padding: 24 },
  title: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 44,
    color: colors.title,
    textTransform: 'uppercase',
    marginTop: 16,
  },
  description: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.text, marginTop: 12 },
  participants: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.success, marginTop: 16 },
  actions: { gap: 12 },
  hint: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, textAlign: 'center' },
});
