import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { AuthProvider } from '@hooks/auth';
import theme from './src/theme';

import { GestureHandler } from '@components/GestureHandler';

import { Routes } from './src/routes';
import { Order } from '@screens/Order';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <GestureHandler>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <AuthProvider>
          <Order />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandler>
  );
}
