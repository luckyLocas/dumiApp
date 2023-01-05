import { Map } from '@pansy/react-amap';
import React from 'react';
import { Lnglat } from '../lnglat';
declare type MapPolygonInputProps = {
    disabled?: boolean;
    value?: Lnglat[];
    onChange?: (value?: Lnglat[]) => void;
    height?: number | string;
    trigger?: React.ReactNode;
    center?: Lnglat;
    /** 显示经纬度 */
    showLnglat?: boolean;
    listRender?: React.ComponentType<{
        data: Lnglat[];
    }>;
    extra?: React.ReactNode;
} & Partial<React.ComponentProps<typeof Map>>;
declare const _default: React.NamedExoticComponent<MapPolygonInputProps>;
export default _default;
