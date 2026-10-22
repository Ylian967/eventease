import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarTheme } from '../calendarConfig';
import EventCard from '../components/EventCard';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { colors, fonts, radius } from '../theme';
import { RootStackParamList } from '../types';
import { formatDate, todayString } from '../utils/date';

// Bonus : les événements affichés sur un calendrier
export default function CalendarScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState(todayString());

  // Un point vert sous chaque jour qui a au moins un événement
  const markedDates: Record<string, object> = {};
  events.forEach((event) => {
    markedDates[event.date] = { marked: true };
  });
  // Le jour choisi est entouré en bleu nuit
  markedDates[selectedDate] = { ...markedDates[selectedDate], selected: true };

  const dayEvents = events.filter((event) => event.date === selectedDate);

  return (
    <ScrollView style={styles.screen}>
      <PageHeader title="Calendrier" subtitle="Touche un jour pour voir ses événements" />

      <View style={styles.content}>
        <View style={styles.calendar}>
          <Calendar
            current={selectedDate}
            markedDates={markedDates}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            firstDay={1}
            theme={calendarTheme}
          />
        </View>

        <Text style={styles.dayTitle}>{formatDate(selectedDate)}</Text>
        {dayEvents.length === 0 ? (
          <Text style={styles.empty}>Aucun événement ce jour-là.</Text>
        ) : (
          dayEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              isParticipating={!!user && event.participants.includes(user.email)}
              onPress={() => navigation.navigate('EventDetail', { id: event.id })}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24 },
  calendar: { borderRadius: radius.card, overflow: 'hidden', marginBottom: 24 },
  dayTitle: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.title,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  empty: { fontFamily: fonts.body, fontSize: 16, color: colors.muted },
});
