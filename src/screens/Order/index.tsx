import React from 'react';
import { Platform } from 'react-native';

import { Container, Header, BackButton } from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
    </Container>
  );
}
