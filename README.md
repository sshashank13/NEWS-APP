# Crypto News

A cryptocurrency news app built with React Native and Expo (SDK 58). It pulls the most popular
crypto stories from the last 7 days via [NewsAPI](https://newsapi.org) and opens them in the browser.

Features: pull-to-refresh, loading / error / empty states with retry, cached images, relative
timestamps, dark mode, runs on iOS, Android and web.

## Run it

Requirements: [Node.js](https://nodejs.org) 20.19+ (LTS recommended) and npm.

```bash
npm install
cp .env.example .env        # Windows: copy .env.example .env
# edit .env and set EXPO_PUBLIC_NEWS_API_KEY (free key: https://newsapi.org/register)
npx expo start -c
```

Then:
- **Phone:** install **Expo Go**, scan the QR code shown in the terminal (same Wi-Fi as your computer).
- **Android emulator:** press `a` (needs Android Studio). **iOS simulator:** press `i` (macOS + Xcode).
- **Browser:** press `w`. Note: NewsAPI's free plan blocks browser requests from non-localhost origins,
  so use web for local testing only.

After changing `.env`, restart with `npx expo start -c` so the new value is picked up.

## Project structure

```
App.js                      root: safe-area provider + screen
index.js                    entry point (registerRootComponent)
src/config.js               API settings (key from env)
src/services/newsApi.js     fetch + normalize + dedupe articles
src/screens/HomeScreen.js   FlatList, refresh, loading/error states
src/components/             Header, ArticleCard (memoized), StateMessage
src/utils/format.js         relative-time formatter
src/theme.js                light/dark colors
```

## Security note

`EXPO_PUBLIC_*` values are bundled into the app and can be extracted. Fine for a free NewsAPI key
while learning; for a published app, route requests through your own backend and keep the key there.

## Credits & license

MIT licensed. Originally based on
[React-Native-Expo-News-App](https://github.com/imrohit007/React-Native-Expo-News-App) by
Rohit Kumar Thakur; this version was substantially modified (Expo SDK 42 → 58, rewritten UI and
data layer). Both copyright notices are kept in [LICENSE](LICENSE), as the MIT license requires.
