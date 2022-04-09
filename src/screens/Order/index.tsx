import React from 'react';
import { Platform } from 'react-native';

import { RadioButton } from '@components/RadioButton';

import { Container, Header, BackButton, Photo, Sizes } from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <Photo source={{ uri: 'https://github.com/paulocf92.png' }} />

      <Sizes>
        <RadioButton title="Pequeno" selected={false} />
      </Sizes>
    </Container>
  );
}
