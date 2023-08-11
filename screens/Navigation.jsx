import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { HomeScreen } from './HomeScreen';
import { FootballField } from './FootballField';
import WebViewScreen from './WebViewScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
      <Stack.Screen name="FootballField" component={FootballField}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};
