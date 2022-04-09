import React from 'react';
import { Platform } from 'react-native';

import { Container, Header, BackButton, Photo } from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <Photo source={{ uri: 'https://github.com/paulocf92.png' }} />
    </Container>
  );
}
