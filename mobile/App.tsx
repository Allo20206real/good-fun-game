import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { type ComponentType, type Ref, useEffect, useRef } from 'react';
import { BackHandler, Linking, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent, type WebViewProps } from 'react-native-webview';

import gameHtml from './gameHtml';

const BASE_URL = 'https://bounce-duel.local/';

type WebViewHandle = { injectJavaScript: (script: string) => void };
// The library types WebView as a plain function component, but it does take a ref with injectJavaScript
const GameView = WebView as unknown as ComponentType<WebViewProps & { ref?: Ref<WebViewHandle> }>;

const HAPTICS: Record<string, () => Promise<void>> = {
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  selection: () => Haptics.selectionAsync(),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

// Messages the game sends through window.ReactNativeWebView.postMessage
function onGameMessage(e: WebViewMessageEvent) {
  let msg: { type?: string; kind?: string; on?: boolean };
  try { msg = JSON.parse(e.nativeEvent.data); } catch { return; }
  if (msg.type === 'haptic' && msg.kind && HAPTICS[msg.kind]) HAPTICS[msg.kind]().catch(() => {});
  if (msg.type === 'awake') {
    if (msg.on) activateKeepAwakeAsync('match').catch(() => {});
    else deactivateKeepAwake('match').catch(() => {});
  }
  if (msg.type === 'exit') BackHandler.exitApp();
}

export default function App() {
  const web = useRef<WebViewHandle>(null);

  // Android back button steps back inside the game instead of closing the app
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      web.current?.injectJavaScript('window.bdBack && window.bdBack(); true;');
      return true;
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GameView
          ref={web}
          style={styles.container}
          containerStyle={styles.container}
          originWhitelist={['*']}
          // A base URL gives the page its own origin, so the saved login persists
          source={{ html: gameHtml, baseUrl: BASE_URL }}
          onMessage={onGameMessage}
          domStorageEnabled
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          textZoom={100}
          setBuiltInZoomControls={false}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          keyboardDisplayRequiresUserAction={false}
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
