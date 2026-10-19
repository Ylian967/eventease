import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

// Clés utilisées dans AsyncStorage
const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Tous les comptes créés sur le téléphone
export async function getUsers(): Promise<User[]> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveUsers(users: User[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Le membre connecté, pour rester connecté après fermeture de l'app
export async function getCurrentUser(): Promise<User | null> {
  const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return json ? JSON.parse(json) : null;
}

export async function saveCurrentUser(user: User) {
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export async function removeCurrentUser() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}
