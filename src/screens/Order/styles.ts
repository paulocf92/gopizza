import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';

import { ButtonBack } from '@components/ButtonBack';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;

export const BackButton = styled(ButtonBack)`
  margin-bottom: 108px;
`;
