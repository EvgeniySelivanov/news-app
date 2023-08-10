import React from 'react';
import { WebView } from 'react-native-webview';
const WebViewScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://www.facebook.com' }} // Замените на нужный URL
      style={{ flex: 1 }} // Обязательно укажите, чтобы WebView занимал весь экран
    />
  );
}
export default WebViewScreen;
 
