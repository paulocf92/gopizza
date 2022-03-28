import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

import happyEmoji from '@assets/images/happy.png';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  Title,
  MenuHeader,
  MenuItemsNumber,
  ProductList,
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível realizar a consulta.'),
      );
  }

  useEffect(() => {
    fetchPizzas('');
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin.</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <ProductList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
      />
    </Container>
  );
}
