import { Button } from 'antd';
import React, { CSSProperties, useMemo } from 'react';
const DefaultStyle: CSSProperties = {
  display: 'inline',
  padding: 0,
  margin: 0,
  lineHeight: 'normal',
  height: 'auto',
  overflowWrap: 'break-word',
  whiteSpace: 'break-spaces',
};

export type JButtonProps = React.ComponentProps<typeof Button> & {
  inline?: boolean;
};
/**
 *  自定义按钮 在antd按钮的基础上 增加display:'inline' 属性
 * @param {*} props
 * @return {*}
 */
const JButton: React.FC<JButtonProps> = (props) => {
  const { style, inline, ...otherProps } = props;
  const localStyle = useMemo(() => {
    if (inline) {
      return style ? { ...style, ...DefaultStyle } : DefaultStyle;
    }
    return style || {};
  }, [style, inline]);
  return <Button {...otherProps} style={localStyle} />;
};

export default JButton;
