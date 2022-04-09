import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PIZZA_TYPES } from '@utils/pizzaTypes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { RadioButton } from '@components/RadioButton';

import {
  Container,
  ContentScroll,
  Header,
  ButtonBack,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
} from './styles';

export function Order() {
  const [size, setSize] = useState('p');

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={handleGoBack} />
        </Header>
        <Photo source={{ uri: 'https://github.com/paulocf92.png' }} />

        <Form>
          <Title>Nome da pizza</Title>
          <Label>Selecione um tamanho</Label>

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

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}
