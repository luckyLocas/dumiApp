import React from 'react';
import { JButton } from 'jad-quick';

export default () => {
  return (
    <>
      <JButton type="link">link 按钮</JButton>
      <JButton type="link" inline>
        inline 按钮
      </JButton>
    </>
  );
};
