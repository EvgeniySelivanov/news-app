import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler, SafeAreaView, StyleSheet ,View,Text} from 'react-native';

const WebViewScreen = () => {
  const webViewRef = useRef(null);

  const handleBackButton = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Вернуть true, чтобы предотвратить выход из приложения
    }
    return false; // Вернуть false, чтобы дать приложению обработать нажатие
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, styles.shortContent]}>
      </View>
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://zorbleizzle.com' }} // Замените на нужный URL
      style={{ flex: 1 }}
      javaScriptEnabled={true} // Разрешить выполнение JavaScript
      sharedCookiesEnabled={true} // (только для iOS) Разрешить совместное использование куков с Safari
    />
     <View style={[styles.bottomContent, styles.shortContent]}>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  shortContent: {
    height: 27, // Размер safeZone in px;
  },
  bottomContent: {
    backgroundColor: 'lightblue',
  },
});
export default WebViewScreen;
