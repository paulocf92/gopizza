import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');

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

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

      <InputPrice size="P" />
      <InputPrice size="M" />
      <InputPrice size="G" />
    </Container>
  );
}
