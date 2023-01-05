import styled from 'styled-components';

export const Wrapper = styled.div<{ height: number | string }>`
  height: ${props =>
    typeof props.height === 'number' ? props.height + 'px' : props.height};
  position: relative;
  .marker-container {
    position: 'relative';
    width: '25px';
    height: '34px';
    .marker-tip {
      position: 'absolute';
      left: '50%';
      top: 0;
      color: '#fff';
      transform: 'translateX(-50%)';
    }
    .lntlat-tip {
      color: '#1890ff';
      margin-right: '4px';
    }
  }
`;
