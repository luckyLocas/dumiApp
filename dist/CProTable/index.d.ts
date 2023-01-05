/// <reference types="react" />
import type { ParamsType } from '@ant-design/pro-provider';
import { ProTableProps } from '@ant-design/pro-table';
declare function CProTable<T, U extends ParamsType = ParamsType, ValueType = 'text'>(props: ProTableProps<T, U, ValueType> & {
    vitrual?: boolean;
}): JSX.Element;
export default CProTable;
