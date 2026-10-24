import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import gameHtml from './gameHtml';

const BASE_URL = 'https://bounce-duel.local/';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          // A base URL gives the page its own origin, so the saved login persists
          source={{ html: gameHtml, baseUrl: BASE_URL }}
          domStorageEnabled
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          hideKeyboardAccessoryView
          setSupportMultipleWindows={false}
          // Open outside links (like the privacy policy) in the phone's browser
          onShouldStartLoadWithRequest={req => {
            if (req.url.startsWith(BASE_URL) || req.url === 'about:blank' || !/^https?:/.test(req.url)) return true;
            Linking.openURL(req.url);
            return false;
          }}
        />
        <StatusBar hidden />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
