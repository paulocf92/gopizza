import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useRoute } from '@react-navigation/native';

import { ProductNavigationProps } from '@src/@types/navigation';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
  DescriptionInput,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  async function handlePickerImage() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 160,
      maxHeight: 160,
    });

    const uri = result?.assets?.[0]?.uri;

    if (!result.didCancel && uri) {
      setImage(uri);
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.');
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.');
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.',
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);

    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        price_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso!'))
      .catch(() =>
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.'),
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />

          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <DescriptionInput
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
