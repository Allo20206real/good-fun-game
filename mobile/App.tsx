import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import gameHtml from './gameHtml';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.container}
          originWhitelist={['*']}
          // A base URL gives the page its own origin, so accounts saved in localStorage persist
          source={{ html: gameHtml, baseUrl: 'https://bounce-duel.local/' }}
          domStorageEnabled
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          hideKeyboardAccessoryView
          setSupportMultipleWindows={false}
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
