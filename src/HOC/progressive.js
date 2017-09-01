import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  ${({ loading }) => (loading ? `opacity: 0.5` : '')};
`;

const Progress = Platform.select({
  android: styled.ProgressBarAndroid.attrs({ styleAttr: 'Large' })``,
  ios: styled.ProgressViewIOS``,
});

export default BaseComponent => ({ loading = false, ...otherProps }) => {
  const c = <BaseComponent {...otherProps} />;
  return loading ? (
    <Wrapper loading={loading}>
      {c}
      <Progress />
    </Wrapper>
  ) : (
    c
  );
};
