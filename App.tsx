/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeNavigation from './src/navigation/HomeNavigation';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* <ChatScreen/> */}
      <NavigationContainer>
          <HomeNavigation/>
      </NavigationContainer>
      {/* <HomeScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
export default App;
