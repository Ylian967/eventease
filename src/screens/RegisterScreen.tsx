import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import Logo from '../components/Logo';
import PaintedTitle from '../components/PaintedTitle';
import PillButton from '../components/PillButton';
import { useAuth } from '../context/AuthContext';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleRegister() {
    const message = await register(name, email, password);
    if (message) {
      setError(message);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Logo />
          <PaintedTitle text={"Rejoins\nl'asso"} style={styles.title} />
          <Text style={styles.subtitle}>Crée ton compte membre ou bénévole.</Text>

          <Input label="Prénom" dark value={name} onChangeText={setName} placeholder="Camille" />
          <Input
            label="Email"
            dark
            value={email}
            onChangeText={setEmail}
            placeholder="prenom@mail.fr"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Mot de passe"
            dark
            value={password}
            onChangeText={setPassword}
            placeholder="6 caractères minimum"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PillButton title="Créer mon compte" onPress={handleRegister} />

          <Pressable onPress={() => navigation.goBack()} style={styles.link}>
            <Text style={styles.linkText}>
              Déjà inscrit ? <Text style={styles.linkStrong}>Se connecter</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.header },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: {
    fontFamily: fonts.display,
    fontSize: 56,
    lineHeight: 56,
    color: colors.headerText,
    textTransform: 'uppercase',
    marginTop: 32,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.headerMuted,
    marginTop: 8,
    marginBottom: 32,
  },
  error: { fontFamily: fonts.bodyBold, color: colors.dangerLight, marginBottom: 16 },
  link: { minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  linkText: { fontFamily: fonts.body, color: colors.headerMuted, fontSize: 14 },
  linkStrong: { fontFamily: fonts.bodyBold, color: colors.highlight },
});
