import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventItem } from '../types';

const EVENTS_KEY = 'events';

// Lit la liste des événements enregistrée sur le téléphone
export async function getEvents(): Promise<EventItem[]> {
  const json = await AsyncStorage.getItem(EVENTS_KEY);
  return json ? JSON.parse(json) : [];
}

// Remplace la liste enregistrée par la nouvelle
export async function saveEvents(events: EventItem[]) {
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
