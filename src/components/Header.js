import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';

export default function Header({ title }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { backgroundColor: theme.primary, paddingTop: insets.top + 12 }]}>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.onPrimary }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { paddingHorizontal: 16, paddingBottom: 14 },
  title: { fontSize: 22, fontWeight: '700' },
});
