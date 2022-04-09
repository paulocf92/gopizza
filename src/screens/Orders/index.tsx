import React from 'react';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard } from '@components/OrderCard';

import { Container, Header, Title, OrderList } from './styles';

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <OrderList
        data={['1', '2', '3']}
        keyExtractor={item => item}
        renderItem={({ index }) => <OrderCard index={index} />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
