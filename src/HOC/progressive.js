import React from 'react';
import styled from 'styled-components/native';

import { theme } from 'styles/theme';

const Wrapper = styled.View`
  ${({ loading }) => (loading ? `opacity: 0.5` : '')};
`;

const Progress = styled.ActivityIndicator.attrs({
  animating: true,
  size: 125,
  color: theme.bg,
})`
  position: relative;
  height: 100%;
`;

export default BaseComponent => ({ loading = false, ...otherProps }) => {
  const c = React.isValidElement(BaseComponent) ? (
    BaseComponent
  ) : (
    <BaseComponent {...otherProps} />
  );
  return loading ? (
    <Wrapper loading={loading}>
      {c}
      <Progress />
    </Wrapper>
  ) : (
    c
  );
};
