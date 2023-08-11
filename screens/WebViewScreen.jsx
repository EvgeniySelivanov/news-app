import React from 'react';
import { WebView } from 'react-native-webview';
const WebViewScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://zorbleizzle.com' }} // Замените на нужный URL
      style={{ flex: 1 }} 
      javaScriptEnabled={true} // Разрешить выполнение JavaScript
      sharedCookiesEnabled={true} // (только для iOS) Разрешить совместное использование куков с Safari
    />
  );
}
export default WebViewScreen;
 
