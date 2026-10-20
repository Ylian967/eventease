import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getEvents, saveEvents } from '../storage/eventStorage';
import { EventItem } from '../types';

type EventContextType = {
  events: EventItem[];
  addEvent: (title: string, description: string, date: string) => void;
  updateEvent: (id: string, title: string, description: string, date: string) => void;
  deleteEvent: (id: string) => void;
  toggleParticipation: (id: string, email: string) => void;
};

const EventContext = createContext<EventContextType | null>(null);

// Garde la liste des événements en mémoire et la recopie dans AsyncStorage à chaque changement
export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventItem[]>([]);

  // Au démarrage, on recharge les événements enregistrés
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  // Met à jour l'écran et le stockage en même temps
  function update(newEvents: EventItem[]) {
    setEvents(newEvents);
    saveEvents(newEvents);
  }

  function addEvent(title: string, description: string, date: string) {
    const newEvent: EventItem = {
      id: Date.now().toString(),
      title,
      description,
      date,
      participants: [],
    };
    update([...events, newEvent]);
  }

  function updateEvent(id: string, title: string, description: string, date: string) {
    update(
      events.map((event) => (event.id === id ? { ...event, title, description, date } : event))
    );
  }

  function deleteEvent(id: string) {
    update(events.filter((event) => event.id !== id));
  }

  // Ajoute le membre aux participants, ou le retire s'il y était déjà
  function toggleParticipation(id: string, email: string) {
    update(
      events.map((event) => {
        if (event.id !== id) {
          return event;
        }
        const participants = event.participants.includes(email)
          ? event.participants.filter((participant) => participant !== email)
          : [...event.participants, email];
        return { ...event, participants };
      })
    );
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, toggleParticipation }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents doit être utilisé dans EventProvider');
  }
  return context;
}
