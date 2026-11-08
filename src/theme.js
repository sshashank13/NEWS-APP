import { useColorScheme } from 'react-native';

const light = {
  background: '#f4f5f7',
  surface: '#ffffff',
  text: '#14171a',
  muted: '#6b7280',
  primary: '#1d4ed8',
  onPrimary: '#ffffff',
  border: '#e5e7eb',
  placeholder: '#e5e7eb',
};

const dark = {
  background: '#0b0d10',
  surface: '#161a1f',
  text: '#f3f4f6',
  muted: '#9ca3af',
  primary: '#1e3a8a',
  onPrimary: '#ffffff',
  border: '#262b33',
  placeholder: '#262b33',
};

export const useTheme = () => (useColorScheme() === 'dark' ? dark : light);
