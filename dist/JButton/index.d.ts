import { Button } from 'antd';
import React from 'react';
export declare type JButtonProps = React.ComponentProps<typeof Button> & {
    inline?: boolean;
};
/**
 *  自定义按钮 在antd按钮的基础上 增加display:'inline' 属性
 * @param {*} props
 * @return {*}
 */
declare const JButton: React.FC<JButtonProps>;
export default JButton;
