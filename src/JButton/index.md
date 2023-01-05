---
title: JButton 按钮
---

# JButton 按钮

<code src="./demos/index.tsx" title='使用示例'></code>

<!-- ```jsx
import React from 'react';
import { JButton } from 'jad-quick';

export default () => {
  return <>
    <JButton type='link'>link 按钮</JButton>
    <JButton type='link' inline>inline 按钮</JButton>
  </>
};
``` -->

### API

使用方法参考 antd Button，只是拓展了 inline 属性样式

| 参数   | 说明                   | 类型                                                              | 默认值    |
| ------ | ---------------------- | ----------------------------------------------------------------- | --------- |
| shape  | 按钮形状               | `circle` \| `round`                                               | `round`   |
| type   | 按钮类型               | `primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default` | `default` |
| inline | 内联样式，去除左右间隔 | boolean                                                           | -         |
