import { ActionType } from '@ant-design/pro-table';
import { CProTable } from 'jad-quick';
import React, { useRef } from 'react';

const Index: React.FC<unknown> = () => {
  const ref = useRef<ActionType>();

  const columns = [
    {
      title: '运单数量',
      dataIndex: 'billNumber',
    },
    {
      title: '实际数量',
      dataIndex: 'actualNumber',
    },
    {
      title: '运单重量（吨）',
      dataIndex: 'billWeight',
    },
    {
      title: '实际重量（吨）',
      dataIndex: 'actualWeight',
    },
    {
      title: '数量偏差',
      dataIndex: 'deviationNum',
    },
    {
      title: '重量偏差（吨）',
      dataIndex: 'billDeviation',
    },
    {
      title: '偏差率（%）',
      dataIndex: 'deviation',
    },
  ];
  return (
    <CProTable
      columns={columns}
      actionRef={ref}
      rowKey="id"
      scroll={{ y: 500 }}
      request={async (params: {
        keyword: string;
        current?: number;
        pageSize?: number;
      }) => {
        const { keyword, current = 1, pageSize = 20 } = params;
        return { data: [], total: 0 };
      }}
    />
  );
};

export default Index;
