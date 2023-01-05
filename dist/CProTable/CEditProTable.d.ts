/// <reference types="react" />
import type { ParamsType } from '@ant-design/pro-provider';
import { EditableProTableProps } from '@ant-design/pro-table/lib/components/EditableTable';
declare function CEditProTable<T, U extends ParamsType = ParamsType>(props: EditableProTableProps<T, U> & {
    vitrual?: boolean;
}): JSX.Element;
export default CEditProTable;
