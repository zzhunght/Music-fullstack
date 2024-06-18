
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';
  if (theme === 'light') return Colors.light
  return Colors.dark
}
