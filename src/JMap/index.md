---
title: JMap 位置选择
---

# JMap

<code src="./demos/mapLnglatInput.tsx" title='选择位置点'></code>
<code src="./demos/mapLngLatAreaInput.tsx" title='选择矩形区域'></code>
<code src="./demos/mapPolygonInput.tsx" title='选择多边形区域'></code>

<!-- ```jsx
import React from 'react';
import { Button } from 'antd';
import { MapLnglatInput } from 'jad-quick';

export default () => {
  return <MapLnglatInput height={200} trigger={<Button>查看</Button>} />
};
``` -->

### API

| 参数       | 说明               | 类型                                  | 默认值 |
| ---------- | ------------------ | ------------------------------------- | ------ |
| disabled   | 禁用状态           | boolean                               | false  |
| value      | 经纬度值           | Lnglat[]                              | []     |
| onChange   | 值改变触发的事件   | (value?: Lnglat[]) => void            | -      |
| height     | 容器高度           | number                                | 200 |
| trigger    | 触发查看按钮       | React.ReactNode                       | -      |
| center     | 中心点位置         | Lnglat                                | -      |
| showLnglat | 是否显示经纬度信息 | boolean                               | true   |
| listRender | -                  | React.ComponentType<{data: Lnglat[]}> | -      |
| extra      | 拓展信息           | React.ReactNode                       | -      |
