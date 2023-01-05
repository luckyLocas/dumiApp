/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ParamsType } from '@ant-design/pro-provider';
import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-table';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Resizable } from 'react-resizable';
import { useVT } from 'virtualizedtableforantd4';

import CProProvider from '../cProProvider';
import { Wrapper } from './style';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function CProTable<T, U extends ParamsType = ParamsType, ValueType = 'text'>(
  props: ProTableProps<T, U, ValueType> & { vitrual?: boolean },
) {
  const [customColumn, setCustomColumn] = useState<ProColumns<T, ValueType>[]>(
    [],
  ); //配合hooks/useState
  const id = useMemo(() => Math.random() + Math.random(), []);
  const [size, setSize] = useState<SizeType>('small');
  const [scrollHeight, setScrollHeight] = useState(0);
  const [localScroll, setLocalScroll] = useState<
    | {
        x?: number | string | true;
        y?: number | string;
      }
    | undefined
  >({});
  const { columns, onSizeChange, scroll, vitrual = false, options } = props;

  const [vt] = useVT(
    () => ({
      id: id,
      top: 0,
      scroll: { y: (localScroll?.y as number) || 500 },
    }),
    [localScroll, id],
  );
  const localComponents = useMemo(() => {
    if (vitrual) {
      return { ...vt, ...MyComponents };
    }
    return MyComponents;
  }, [vitrual]);
  const localOption = useMemo(() => {
    if (typeof options === 'boolean') {
      return options;
    } else if (options) {
      return { ...options, fullScreen: true };
    } else {
      return {
        fullScreen: true,
      };
    }
  }, [options]);
  const handleResize = useCallback(
    (index: number) =>
      (_e: any, { size }: any) => {
        setCustomColumn((columns) => {
          return columns.map((el, i) => {
            return i === index ? { ...el, width: size.width } : el;
          });
        });
      },
    [setCustomColumn],
  );
  useEffect(() => {
    if (columns) {
      setCustomColumn(
        columns.map((col: any, index: number) => {
          if (col.valueType === 'index') {
            return {
              ...col,
              render: (_i, _item, index) => index + 1,
              onHeaderCell: (column: ProColumns<T, ValueType>) => ({
                width: column.width,
                onResize: handleResize(index),
              }),
            };
          }
          return {
            ...col,
            onHeaderCell: (column: ProColumns<T, ValueType>) => ({
              width: column.width,
              onResize: handleResize(index),
            }),
          };
        }),
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
  const { pagination, request, actionRef } = props;
  // 改变分页模式
  const localPagination = useMemo(() => {
    if (pagination) {
      return {
        pageSizeOptions: ['20', '50', '100', '500', '1000'],
        ...pagination,
      };
    }
    if (typeof pagination === 'boolean') {
      return pagination;
    } else {
      return {
        pageSizeOptions: ['20', '50', '100', '500', '1000'],
      };
    }
    return pagination;
  }, [pagination]);
  // 处理删除最后一页数据没有自动翻页
  const localRequest: any = useMemo(() => {
    if (request) {
      return async (
        params: U & {
          pageSize?: number | undefined;
          current?: number | undefined;
          keyword?: string | undefined;
        },
        sort: Record<string, SortOrder>,
        filter: Record<string, React.ReactText[]>,
      ) => {
        const { pageSize = 20, current = 1 } = params;
        const rp = await request(params, sort, filter);
        if (actionRef) {
          const localActionRef = actionRef as React.MutableRefObject<
            ActionType | undefined
          >;
          localActionRef.current?.clearSelected?.();
          if (rp.data && rp.data.length === 0) {
            const nowPage = Math.ceil((rp.total || 0) / pageSize);
            if (nowPage > 0 && nowPage < current) {
              setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                localActionRef.current?.setPageInfo!({ current: nowPage });
              }, 0);
            }
          }
        }
        return rp;
      };
    }
    return undefined;
  }, [request]);
  // useEffect(() => {
  //   if(actionRef) {
  //     actionRef = localActionRef;
  //   }
  // }, [actionRef])
  useEffect(() => {
    const fullscreenchange = () => {
      const fullscreenElement = document.fullscreenElement;
      if (fullscreenElement) {
        console.log('全屏');
        setScrollHeight(document.body.clientHeight - 100);
      } else {
        setScrollHeight(0);
      }
    };
    document.addEventListener('fullscreenchange', fullscreenchange);
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchange);
    };
  }, []);
  // useEffect(() => {
  //   if (scroll) {
  //     setLocalScroll(scroll);
  //   }
  // }, [scroll]);
  useEffect(() => {
    console.log('scrollHeight', scrollHeight);
    scrollHeight > 0
      ? setLocalScroll((pre) => ({ ...pre, y: scrollHeight }))
      : setLocalScroll(scroll);
  }, [scrollHeight, scroll]);
  return (
    <Wrapper>
      <CProProvider>
        <ProTable<T, U, ValueType>
          size={size}
          onSizeChange={onSizeChanged}
          {...props}
          scroll={localScroll}
          options={localOption}
          components={localComponents}
          columns={customColumn}
          pagination={localPagination}
          request={localRequest}
        />
      </CProProvider>
    </Wrapper>
  );
}

export default CProTable;
