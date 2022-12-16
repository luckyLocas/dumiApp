---
  title: Button
---

```jsx
import JButton from './index.tsx';

export default () => {
  return <>
    <JButton type='link'>link 按钮</JButton>
    <JButton type='link' inline>inline 按钮</JButton>
    <JButton type='primary'>primary 按钮</JButton>
  </>
};
```