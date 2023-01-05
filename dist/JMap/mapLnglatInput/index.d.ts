import React from 'react';
import { Lnglat } from '../lnglat';
declare type MapLnglatInputProps = {
    disabled?: boolean;
    value?: Lnglat;
    onChange?: (value?: Lnglat) => void;
    height?: number | string;
    trigger?: React.ReactNode;
    center?: Lnglat;
    extra?: React.ReactNode;
    zoom?: number;
};
declare const _default: React.NamedExoticComponent<MapLnglatInputProps>;
export default _default;
