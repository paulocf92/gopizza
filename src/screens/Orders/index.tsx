import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard, OrderProps } from '@components/OrderCard';

import { Container, Header, Title, OrderList } from './styles';

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => unsubscribe();
  }, [user?.id]);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <OrderList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ index, item }) => (
          <OrderCard index={index} data={item} />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
