import React from 'react';
import { Lnglat } from '../lnglat';
declare type AreaLngLat = {
    westnorth: Lnglat | undefined;
    eastsouth?: Lnglat | undefined;
};
declare type MapLnglatInputAreaProps = {
    disabled?: boolean;
    value?: AreaLngLat | null;
    onChange?: (value?: AreaLngLat) => void;
    height?: number | string;
    trigger?: React.ReactNode;
    center?: Lnglat;
    extra?: React.ReactNode;
    zoom?: number;
};
declare const _default: React.NamedExoticComponent<MapLnglatInputAreaProps>;
export default _default;
