import React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View>
        <Text>Hello World</Text>
      </View>
    </ThemeProvider>
  );
}
