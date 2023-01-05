import ProProvider from '@ant-design/pro-provider';
import { ValueType } from '@rc-component/mini-decimal';
import { InputNumber, InputNumberProps } from 'antd';
import React, { useContext } from 'react';
import { toFixed } from 'utils/customMath';

/**
 * @param {*} props
 * valueType: price 保留4位小数 rate 保留两位小数  amount 保留两位小数
 * @return {*}
 */
const CProProvider: React.FC<any> = (props) => {
  const values: any = useContext(ProProvider);
  return (
    <ProProvider.Provider
      {...props}
      value={{
        ...values,
        valueTypeMap: {
          rate: {
            // 税率
            render: (text: number) => toFixed(text, 2),
            renderFormItem: (
              _text: any,
              props: {
                fieldProps: JSX.IntrinsicAttributes &
                  InputNumberProps<ValueType> & {
                    children?: React.ReactNode;
                  } & { ref?: React.Ref<HTMLInputElement> | undefined };
              },
            ) => (
              <InputNumber
                style={{ width: '100%' }}
                precision={2}
                placeholder="请输入"
                {...props?.fieldProps}
              />
            ),
          },
          price: {
            // 单价
            render: (text: any) => toFixed(text, 4),
            renderFormItem: (
              _text: any,
              props: {
                fieldProps: JSX.IntrinsicAttributes &
                  InputNumberProps<ValueType> & {
                    children?: React.ReactNode;
                  } & { ref?: React.Ref<HTMLInputElement> | undefined };
              },
            ) => (
              <InputNumber
                style={{ width: '100%' }}
                precision={4}
                placeholder="请输入"
                {...props?.fieldProps}
              />
            ),
          },
          amount: {
            //金额
            render: (text: any) => toFixed(text, 2),
            renderFormItem: (
              _text: any,
              props: {
                fieldProps: JSX.IntrinsicAttributes &
                  InputNumberProps<ValueType> & {
                    children?: React.ReactNode;
                  } & { ref?: React.Ref<HTMLInputElement> | undefined };
              },
            ) => (
              <InputNumber
                style={{ width: '100%' }}
                precision={2}
                placeholder="请输入"
                {...props?.fieldProps}
              />
            ),
          },
        },
      }}
    ></ProProvider.Provider>
  );
};
export default CProProvider;
