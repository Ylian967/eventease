import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventFormScreen from '../screens/EventFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { colors, fonts } from '../theme';
import { RootStackParamList } from '../types';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

// La pile principale : on n'affiche pas les mêmes écrans selon que le membre est connecté ou non
export default function RootNavigator() {
  const { user, loading } = useAuth();

  // On attend de savoir si un membre était déjà connecté
  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontFamily: fonts.display },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'DÉTAIL' }} />
          <Stack.Screen name="EventForm" component={EventFormScreen} options={{ title: 'ÉVÉNEMENT' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}
