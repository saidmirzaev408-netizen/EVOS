import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

/**
 * Automatically detects the PC's local Wi-Fi IP from Expo Go
 * and connects to the Vite dev server on port 3000.
 */
function getDefaultWebUrl() {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.manifest?.debuggerHost ||
    '';

  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return `http://${ip}:3000`;
    }
  }
  return 'http://192.168.1.100:3000';
}

function IstiqlolApp() {
  const webViewRef = useRef(null);
  const [url, setUrl] = useState(getDefaultWebUrl);
  const [inputUrl, setInputUrl] = useState(getDefaultWebUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Android hardware Back button support
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [canGoBack]);

  const handleConnect = () => {
    const trimmed = inputUrl.trim();
    if (!trimmed) return;
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
    setHasError(false);
    setLoading(true);
    setUrl(formatted);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" backgroundColor="#18090E" />

      {hasError ? (
        <View style={styles.errorBox}>
          <Text style={styles.brand}>ISTIQLOL</Text>
          <Text style={styles.errorTitle}>Serverga ulanib bo'lmadi</Text>
          <Text style={styles.errorDesc}>
            Kompyuterda asosiy sayt ishlab turganiga (`npm run dev`) va telefon bilan kompyuter bir xil Wi-Fi tarmog'ida ekanligiga ishonch hosil qiling.
          </Text>

          <Text style={styles.label}>Sayt manzili (URL):</Text>
          <TextInput
            value={inputUrl}
            onChangeText={setInputUrl}
            placeholder="http://192.168.1.10:3000"
            placeholderTextColor="#8B5D6B"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <TouchableOpacity style={styles.retryBtn} onPress={handleConnect} activeOpacity={0.85}>
            <Text style={styles.retryText}>Qayta ulanish ↻</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.webWrap}>
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={styles.web}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            pullToRefreshEnabled
            startInLoadingState
            onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
          />

          {loading && (
            <View style={styles.loaderOverlay} pointerEvents="none">
              <Text style={styles.brand}>ISTIQLOL</Text>
              <ActivityIndicator size="large" color="#F3BE53" style={{ marginTop: 14 }} />
              <Text style={styles.loadingText}>Yuklanmoqda...</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <IstiqlolApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18090E',
  },
  webWrap: {
    flex: 1,
  },
  web: {
    flex: 1,
    backgroundColor: '#18090E',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#18090E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 3,
    color: '#F3BE53',
  },
  loadingText: {
    marginTop: 10,
    color: '#E5BAC5',
    fontSize: 13,
    fontWeight: '600',
  },
  errorBox: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  errorDesc: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#D5A7B4',
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 22,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#F3BE53',
  },
  input: {
    width: '100%',
    backgroundColor: '#260D16',
    borderColor: '#521727',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  retryBtn: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#BA1D3D',
    borderColor: '#F3BE53',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

