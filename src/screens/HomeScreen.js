import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import StateMessage from '../components/StateMessage';
import { fetchArticles, MissingApiKeyError } from '../services/newsApi';
import { useTheme } from '../theme';

const keyExtractor = (item) => item.id;
const renderItem = ({ item }) => <ArticleCard article={item} />;

export default function HomeScreen() {
  const theme = useTheme();
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const controllerRef = useRef(null);

  const load = useCallback(async ({ isRefresh = false } = {}) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    if (isRefresh) setRefreshing(true);
    else setStatus('loading');

    try {
      const data = await fetchArticles({ signal: controller.signal });
      setArticles(data);
      setError(null);
      setStatus('ready');
    } catch (e) {
      if (e.name === 'AbortError') return;
      setError(e);
      setStatus('error');
    } finally {
      if (!controller.signal.aborted) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  const onRefresh = useCallback(() => load({ isRefresh: true }), [load]);
  const retry = useCallback(() => load(), [load]);

  let body;
  if (status === 'loading') {
    body = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  } else if (status === 'error' && articles.length === 0) {
    body =
      error instanceof MissingApiKeyError ? (
        <StateMessage
          title="NewsAPI key missing"
          message="Copy .env.example to .env, add your key as EXPO_PUBLIC_NEWS_API_KEY, then restart Expo with: npx expo start -c"
        />
      ) : (
        <StateMessage
          title="Couldn't load news"
          message={error?.message}
          actionLabel="Try again"
          onAction={retry}
        />
      );
  } else {
    body = (
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<StateMessage title="No articles found" />}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Crypto News" />
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingBottom: 24, flexGrow: 1 },
});
