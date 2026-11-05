// AdMob ad unit IDs. Paste the real ones from the AdMob account here; while they're empty the app shows
// Google's test ads, which earn nothing. (The app IDs go in app.json under the react-native-google-mobile-ads plugin.)
import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

const REAL = {
  android: { banner: '', rewarded: '' },
  ios: { banner: '', rewarded: '' },
};

const ids = Platform.OS === 'ios' ? REAL.ios : REAL.android;
export const BANNER_ID = ids.banner || TestIds.ADAPTIVE_BANNER;
export const REWARDED_ID = ids.rewarded || TestIds.REWARDED;
