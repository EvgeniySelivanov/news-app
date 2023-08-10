import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { HomeScreen } from './HomeScreen';
import { FullPostScreen } from './FullPostScreen';
import { FootballField } from './FootballField';

import WebViewScreen from './WebViewScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title:'Main'}}/>
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{title:'Web'}}/>
      <Stack.Screen name="FootballField" component={FootballField} options={{title:'FootballField'}}/>
      <Stack.Screen name="FullPost" component={FullPostScreen} options={{title:'Human'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};
