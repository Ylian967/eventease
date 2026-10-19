import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import PillButton from '../components/PillButton';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, radius } from '../theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.screen}>
      <PageHeader title={`Salut ${user?.name}`} subtitle={user?.email} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mon compte</Text>
          <Text style={styles.text}>Prénom : {user?.name}</Text>
          <Text style={styles.text}>Email : {user?.email}</Text>
        </View>

        <PillButton title="Se déconnecter" variant="danger" onPress={logout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.mint },
  content: { padding: 24, gap: 24 },
  card: { backgroundColor: colors.card, borderRadius: radius.card, padding: 20 },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.navy,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  text: { fontFamily: fonts.body, fontSize: 16, color: colors.ink, marginTop: 4 },
});
