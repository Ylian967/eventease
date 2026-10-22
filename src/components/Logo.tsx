import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';

// Le logotype « eventease. » à empattements, avec son point vert
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <Text style={[styles.logo, { fontSize: size }]} accessibilityRole="header">
      eventease<Text style={styles.dot}>.</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: { fontFamily: fonts.logo, color: colors.headerText, letterSpacing: -0.5 },
  dot: { color: colors.highlight },
});
