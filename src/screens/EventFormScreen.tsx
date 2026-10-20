import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import Input from '../components/Input';
import PillButton from '../components/PillButton';
import { useEvents } from '../context/EventContext';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'EventForm'>;

// Un seul formulaire pour l'ajout et la modification
export default function EventFormScreen({ route, navigation }: Props) {
  const { events, addEvent, updateEvent } = useEvents();
  const id = route.params?.id;
  // En modification, on pré-remplit les champs avec l'événement existant
  const existing = events.find((event) => event.id === id);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [date, setDate] = useState(existing?.date ?? '');
  const [error, setError] = useState('');

  function handleSave() {
    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }
    // Format attendu : AAAA-MM-JJ, par exemple 2026-10-24
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setError('La date doit être au format AAAA-MM-JJ');
      return;
    }

    if (id) {
      updateEvent(id, title.trim(), description.trim(), date);
    } else {
      addEvent(title.trim(), description.trim(), date);
    }
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{id ? 'Modifier' : 'Nouvel événement'}</Text>

        <Input label="Titre" value={title} onChangeText={setTitle} placeholder="Atelier couture" />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Ce qu'on va faire, où, avec qui…"
          multiline
        />
        <Input label="Date" value={date} onChangeText={setDate} placeholder="2026-10-24" />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PillButton title="Enregistrer" onPress={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.mint },
  content: { padding: 24 },
  title: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 44,
    color: colors.navy,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  error: { fontFamily: fonts.bodyBold, color: colors.danger, marginBottom: 16 },
});
