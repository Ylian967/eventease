import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EventCard from '../components/EventCard';
import EventHero from '../components/EventHero';
import Marquee from '../components/Marquee';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';

export default function EventListScreen() {
  // Cet écran est dans un onglet : on récupère la navigation de la pile principale
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { events } = useEvents();

  // Les événements les plus proches en premier
  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const participationCount = events.filter(
    (event) => user && event.participants.includes(user.email)
  ).length;

  return (
    <FlatList
      style={styles.screen}
      data={sortedEvents}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.header}>
          <EventHero
            name={user?.name ?? ''}
            eventCount={events.length}
            participationCount={participationCount}
            onAdd={() => navigation.navigate('EventForm', {})}
          />
          <Marquee text="Conférences ✦ Ateliers ✦ Sorties ✦ Bénévolat ✦ Rencontres ✦" />
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>Aucun événement pour l'instant. Ajoute le premier !</Text>
      }
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <EventCard
            event={item}
            index={index}
            isParticipating={!!user && item.participants.includes(user.email)}
            onPress={() => navigation.navigate('EventDetail', { id: item.id })}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.mint },
  list: { paddingBottom: 24 },
  header: { marginBottom: 24 },
  item: { paddingHorizontal: 24 },
  empty: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
