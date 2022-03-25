import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE} />
    </Container>
  );
}