import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

// Écran temporaire, rempli dans les prochaines étapes
export default function EventDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mint },
  title: { fontFamily: fonts.display, fontSize: 32, color: colors.ink, textTransform: 'uppercase' },
});
