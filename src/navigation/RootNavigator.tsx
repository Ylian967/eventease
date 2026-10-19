import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventFormScreen from '../screens/EventFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

// La pile principale : connexion, onglets, puis détail et formulaire par-dessus
export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: colors.textInv,
        headerTitleStyle: { fontFamily: fonts.display },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'DÉTAIL' }} />
      <Stack.Screen name="EventForm" component={EventFormScreen} options={{ title: 'ÉVÉNEMENT' }} />
    </Stack.Navigator>
  );
}
