import React, { memo, useCallback } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useTheme } from '../theme';
import { timeAgo } from '../utils/format';

function ArticleCard({ article }) {
  const theme = useTheme();
  const { title, description, imageUrl, source, publishedAt, url } = article;

  const open = useCallback(() => {
    Linking.openURL(url).catch(() => Alert.alert('Unable to open link', url));
  }, [url]);

  const meta = [source, timeAgo(publishedAt)].filter(Boolean).join(' · ');

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={title}
      onPress={open}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={4}>
          {title}
        </Text>
        <Image
          source={imageUrl ? { uri: imageUrl } : null}
          style={[styles.image, { backgroundColor: theme.placeholder }]}
          contentFit="cover"
          transition={150}
          recyclingKey={url}
          cachePolicy="memory-disk"
        />
      </View>
      {description ? (
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={3}>
          {description}
        </Text>
      ) : null}
      {meta ? <Text style={[styles.meta, { color: theme.muted }]}>{meta}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: { flexDirection: 'row', gap: 12 },
  title: { flex: 1, fontSize: 17, fontWeight: '600', lineHeight: 22 },
  image: { width: 96, height: 96, borderRadius: 8 },
  description: { marginTop: 10, fontSize: 14, lineHeight: 20 },
  meta: { marginTop: 8, fontSize: 12 },
});

export default memo(ArticleCard);
