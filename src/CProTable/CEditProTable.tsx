/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ParamsType } from '@ant-design/pro-provider';
import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import { EditableProTableProps } from '@ant-design/pro-table/lib/components/EditableTable';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Resizable } from 'react-resizable';
import { useVT } from 'virtualizedtableforantd4';

import CProProvider from '../cProProvider';
import { Wrapper } from './style';
const ResizableTitle = (props: { onResize: any; width: any }) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          role="presentation"
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
const MyComponents = {
  header: {
    cell: ResizableTitle,
  },
};
function CEditProTable<T, U extends ParamsType = ParamsType>(
  props: EditableProTableProps<T, U> & { vitrual?: boolean },
): JSX.Element {
  const [customColumn, setCustomColumn] = useState<ProColumns<T>[]>([]); //配合hooks/useState
  const [size, setSize] = useState<SizeType>('small');
  const { columns, onSizeChange, vitrual, scroll } = props;
  const [vt] = useVT(
    () => ({
      id: Math.random(),
      top: 0,
      scroll: { y: (scroll?.y as number) || 500 },
    }),
    [scroll],
  );
  const localComponents = useMemo(() => {
    if (vitrual) {
      return { ...vt, ...MyComponents };
    }
    return MyComponents;
  }, [vitrual]);
  const handleResize =
    (index: number) =>
    (_e: any, { size }: any) => {
      setCustomColumn((columns) => {
        return columns.map((el, i) => {
          return i === index ? { ...el, width: size.width } : el;
        });
        // const nextColumns = [...columns];
        // nextColumns[index] = {
        //   ...nextColumns[index],
        //   width: size.width,
        // };
        // return nextColumns;
      });
    };
  useEffect(() => {
    if (columns) {
      setCustomColumn(
        columns.map((col: any, index: number) => ({
          ...col,
          onHeaderCell: (column: ProColumns<T>) => ({
            width: column.width,
            onResize: handleResize(index),
          }),
        })),
      );
    }
  }, [columns]);
  // table size 发生改变 默认是 small
  const onSizeChanged = useCallback(
    (size: any) => {
      setSize(size);
      onSizeChange && onSizeChange(size);
    },
    [onSizeChange],
  );
  return (
    <Wrapper>
      <CProProvider>
        <EditableProTable<T, U>
          size={size}
          onSizeChange={onSizeChanged}
          {...props}
          components={localComponents}
          columns={customColumn}
        />
      </CProProvider>
    </Wrapper>
  );
}

export default CEditProTable;
