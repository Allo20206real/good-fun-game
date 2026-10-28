import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { type ComponentType, type Ref, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Linking, StyleSheet, View } from 'react-native';
import mobileAds, { AdEventType, BannerAd, BannerAdSize, MaxAdContentRating, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent, type WebViewProps } from 'react-native-webview';

import { BANNER_ID, REWARDED_ID } from './ads';
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

// Many players are kids, so ads are family-safe and never personalised
const adsReady = mobileAds()
  .setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.G, tagForChildDirectedTreatment: true, tagForUnderAgeOfConsent: true })
  .then(() => mobileAds().initialize())
  .catch(() => {});
const AD_REQUEST = { requestNonPersonalizedAdsOnly: true };

export default function App() {
  const web = useRef<WebViewHandle>(null);
  const [banner, setBanner] = useState(false);
  const rewardBusy = useRef(false);

  // A video ad the player chose to watch for coins. The game hears back through window.bdAdResult(earned).
  const showRewarded = useCallback(() => {
    if (rewardBusy.current) return;
    rewardBusy.current = true;
    let earned = false;
    const reply = (ok: boolean) => {
      rewardBusy.current = false;
      unsubs.forEach(u => u());
      web.current?.injectJavaScript(`window.bdAdResult && window.bdAdResult(${ok}); true;`);
    };
    const ad = RewardedAd.createForAdRequest(REWARDED_ID, AD_REQUEST);
    const unsubs = [
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => { ad.show().catch(() => reply(false)); }),
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { earned = true; }),
      ad.addAdEventListener(AdEventType.CLOSED, () => reply(earned)),
      ad.addAdEventListener(AdEventType.ERROR, () => reply(false)),
    ];
    adsReady.then(() => ad.load());
  }, []);

  // Messages the game sends through window.ReactNativeWebView.postMessage
  const onGameMessage = useCallback((e: WebViewMessageEvent) => {
    let msg: { type?: string; kind?: string; on?: boolean };
    try { msg = JSON.parse(e.nativeEvent.data); } catch { return; }
    if (msg.type === 'haptic' && msg.kind && HAPTICS[msg.kind]) HAPTICS[msg.kind]().catch(() => {});
    if (msg.type === 'awake') {
      if (msg.on) activateKeepAwakeAsync('match').catch(() => {});
      else deactivateKeepAwake('match').catch(() => {});
    }
    if (msg.type === 'banner') setBanner(!!msg.on);   // only in the menus, never during a match
    if (msg.type === 'rewardedAd') showRewarded();
    if (msg.type === 'exit') BackHandler.exitApp();
  }, [showRewarded]);

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
        {banner && (
          <View style={styles.banner}>
            <BannerAd unitId={BANNER_ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={AD_REQUEST} />
          </View>
        )}
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
  banner: {
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
