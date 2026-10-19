import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  getUsers,
  removeCurrentUser,
  saveCurrentUser,
  saveUsers,
} from '../storage/userStorage';
import { User } from '../types';

// login et register renvoient un message d'erreur, ou null si tout s'est bien passé
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Authentification simplifiée : les comptes sont gardés sur le téléphone, sans serveur
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Au démarrage, on reconnecte le membre s'il ne s'était pas déconnecté
  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const users = await getUsers();
    const found = users.find(
      (member) => member.email === email.trim().toLowerCase() && member.password === password
    );
    if (!found) {
      return 'Email ou mot de passe incorrect';
    }
    await saveCurrentUser(found);
    setUser(found);
    return null;
  }

  async function register(name: string, email: string, password: string) {
    if (!name.trim() || !email.trim() || !password) {
      return 'Tous les champs sont obligatoires';
    }
    if (password.length < 6) {
      return 'Le mot de passe doit faire au moins 6 caractères';
    }
    const users = await getUsers();
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((member) => member.email === cleanEmail)) {
      return 'Un compte existe déjà avec cet email';
    }
    const newUser = { name: name.trim(), email: cleanEmail, password };
    await saveUsers([...users, newUser]);
    await saveCurrentUser(newUser);
    setUser(newUser);
    return null;
  }

  async function logout() {
    await removeCurrentUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Raccourci pour lire le contexte depuis n'importe quel écran
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
}
