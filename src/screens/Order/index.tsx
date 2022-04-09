import React, { useState } from 'react';
import { Platform } from 'react-native';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

import { RadioButton } from '@components/RadioButton';

import { Container, Header, ButtonBack, Photo, Sizes } from './styles';

export function Order() {
  const [size, setSize] = useState('p');

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} />
      </Header>
      <Photo source={{ uri: 'https://github.com/paulocf92.png' }} />

      <Sizes>
        {PIZZA_TYPES.map(item => (
          <RadioButton
            key={item.id}
            title={item.name}
            onPress={() => setSize(item.id)}
            selected={size === item.id}
          />
        ))}
      </Sizes>
    </Container>
  );
}
