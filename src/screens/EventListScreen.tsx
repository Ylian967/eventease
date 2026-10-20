import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EventCard from '../components/EventCard';
import PageHeader from '../components/PageHeader';
import PillButton from '../components/PillButton';
import { useEvents } from '../context/EventContext';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';

export default function EventListScreen() {
  // Cet écran est dans un onglet : on récupère la navigation de la pile principale
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { events } = useEvents();

  // Les événements les plus proches en premier
  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <View style={styles.screen}>
      <PageHeader title="Les événements" subtitle="Conférences, ateliers et sorties de l'asso" />
      <FlatList
        data={sortedEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.addButton}>
            <PillButton title="+ Ajouter un événement" onPress={() => navigation.navigate('EventForm', {})} />
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun événement pour l'instant. Ajoute le premier !</Text>
        }
        renderItem={({ item, index }) => (
          <EventCard
            event={item}
            index={index}
            onPress={() => navigation.navigate('EventDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.mint },
  list: { padding: 24 },
  addButton: { marginBottom: 24 },
  empty: { fontFamily: fonts.body, fontSize: 16, color: colors.muted, textAlign: 'center' },
});
