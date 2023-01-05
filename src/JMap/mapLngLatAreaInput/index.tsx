import { Map, Marker, Rectangle } from '@pansy/react-amap';
import { Modal } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Lnglat } from '../lnglat';
import { MapUtil } from '../util';
import LnglatInput from '../lnglatInput';
const DefaultLnglat = {
  lng: 116.4,
  lat: 39.9,
};
type AreaLngLat = {
  // 西北
  westnorth: Lnglat | undefined;
  // 东南
  eastsouth?: Lnglat | undefined;
};
type MapLnglatInputAreaProps = {
  disabled?: boolean;
  value?: AreaLngLat | null;
  onChange?: (value?: AreaLngLat) => void;
  // 容器高度
  height?: number | string;
  // 触发查看按钮
  trigger?: React.ReactNode;
  center?: Lnglat;
  // 底图
  extra?: React.ReactNode;
  zoom?: number;
};

const MapLnglatInputArea: React.FC<MapLnglatInputAreaProps> = ({
  disabled = false,
  value,
  height = 200,
  onChange,
  trigger,
  center,
  zoom,
  extra,
}) => {
  const disabledRef = useRef(false);
  const pointRef = useRef<AreaLngLat>({
    westnorth: undefined,
    eastsouth: undefined,
  });
  const [centerPoint, setCenterPoint] = useState<Lnglat>(DefaultLnglat);
  const [westnorth, setWestnorth] = useState<Lnglat | undefined>(undefined);
  const [eastsouth, setEastsouth] = useState<Lnglat | undefined>(undefined);
  // 计算中心点 只执行一次
  const oneceCenterRef = useRef(false);

  const changeCenter = useCallback(
    (centerPoint: { lng: number; lat: number }) => {
      const [lng, lat] = MapUtil.wgs84togcj02(centerPoint.lng, centerPoint.lat);
      setTimeout(() => {
        setCenterPoint({ lng, lat });
      }, 0);
    },
    [],
  );
  // 计算中心点
  const handleOneceCenter = useCallback(
    (westnorth: any, eastsouth: any) => {
      if (!oneceCenterRef.current && !centerPoint) {
        if (westnorth && eastsouth) {
          oneceCenterRef.current = true;
          const lng = (westnorth.lng + eastsouth.lng) / 2;
          const lat = (westnorth.lat + eastsouth.lat) / 2;
          changeCenter({ lng, lat });
        } else if (westnorth) {
          oneceCenterRef.current = true;
          changeCenter(westnorth);
        } else if (eastsouth) {
          oneceCenterRef.current = true;
          changeCenter(eastsouth);
        }
      }
    },
    [changeCenter],
  );
  useEffect(() => {
    center && changeCenter(center);
  }, [center, changeCenter]);
  useEffect(() => {
    if (value) {
      value.westnorth && setWestnorth(value.westnorth);
      value.eastsouth && setEastsouth(value.eastsouth);
      handleOneceCenter(value.westnorth, value.eastsouth);
      pointRef.current = value;
    }
  }, [value, handleOneceCenter]);
  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);
  const handleMapClick = useCallback((e: { lnglat: any }) => {
    if (!disabledRef.current) {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
      console.log(pointRef.current, 'xxx');
      const { eastsouth, westnorth } = pointRef.current;
      if (eastsouth && westnorth) {
        setWestnorth({ lng, lat });
        setEastsouth(undefined);
        pointRef.current.eastsouth = undefined;
        pointRef.current.westnorth = { lng, lat };
      } else if (westnorth) {
        setEastsouth({ lng, lat });
        pointRef.current.eastsouth = { lng, lat };
      } else {
        setWestnorth({ lng, lat });
        pointRef.current.westnorth = { lng, lat };
      }
    }
  }, []);
  // 处理经纬度变化
  const handleNorthLngLatChange = useCallback((lnglat?: Lnglat) => {
    setWestnorth(lnglat);
    pointRef.current.westnorth = lnglat;
  }, []);
  const handleSouthLngLatChange = useCallback((lnglat?: Lnglat) => {
    setEastsouth(lnglat);
    pointRef.current.eastsouth = lnglat;
  }, []);
  useEffect(() => {
    //if (westnorth && eastsouth) {
    onChange && onChange({ westnorth, eastsouth });
    // } else {
    //   oneceCenterRef.current && onChange && onChange();
    // }
  }, [westnorth, eastsouth]);

  const handleChange = useCallback((value?: AreaLngLat) => {
    if (value) {
      value.westnorth && setWestnorth(value.westnorth);
      value.eastsouth && setEastsouth(value.eastsouth);
      pointRef.current = value;
    }
  }, []);
  // 拖动经纬度 变化
  const handlewestnorthDragend = useCallback((e: { lnglat: any }) => {
    let lng = e.lnglat.getLng();
    let lat = e.lnglat.getLat();
    [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
    setWestnorth({ lng, lat });
    pointRef.current.westnorth = { lng, lat };
  }, []);
  const handleeastsouthDragend = useCallback((e: { lnglat: any }) => {
    let lng = e.lnglat.getLng();
    let lat = e.lnglat.getLat();
    [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
    setEastsouth({ lng, lat });
    pointRef.current.eastsouth = { lng, lat };
  }, []);
  return (
    <>
      <div style={{ height: height, position: 'relative' }}>
        <Map
          version="2.0"
          mapKey="447364382485b3b28b11a0f446b11918"
          center={centerPoint}
          zoom={zoom}
          events={{
            click: handleMapClick,
          }}
        >
          {extra}
          {westnorth ? (
            <Marker
              draggable={!disabled}
              events={{
                dragend: handlewestnorthDragend,
              }}
              position={MapUtil.wgs84togcj02(westnorth.lng, westnorth.lat)}
            />
          ) : null}
          {eastsouth ? (
            <Marker
              draggable={!disabled}
              events={{
                dragend: handleeastsouthDragend,
              }}
              position={MapUtil.wgs84togcj02(eastsouth.lng, eastsouth.lat)}
            />
          ) : null}
          {westnorth && eastsouth ? (
            <Rectangle
              bounds={[
                MapUtil.wgs84togcj02(westnorth.lng, westnorth.lat),
                MapUtil.wgs84togcj02(eastsouth.lng, eastsouth.lat),
              ]}
              visible={true}
              style={{
                strokeColor: '#1ea7fd',
                fillColor: '#1ea7fd',
                fillOpacity: 0.22,
                strokeWeight: 1,
              }}
            />
          ) : null}
        </Map>
        <span style={{ position: 'absolute', right: 0, top: 0 }}>
          {trigger ? (
            <LookUp
              onchange={handleChange}
              value={{
                eastsouth,
                westnorth,
              }}
              zoom={zoom}
              center={center}
              extra={extra}
              disabled={disabled}
              trigger={trigger}
            />
          ) : null}
        </span>
      </div>
      <LnglatInput
        value={westnorth}
        disabled={disabled}
        onChange={handleNorthLngLatChange}
      />
      <LnglatInput
        value={eastsouth}
        disabled={disabled}
        onChange={handleSouthLngLatChange}
      />
    </>
  );
};

export default memo(MapLnglatInputArea);
type LookUpProps = {
  trigger?: React.ReactNode;
  value: AreaLngLat;
  onchange: (value?: AreaLngLat) => void;
  disabled: boolean;
  extra?: React.ReactNode;
  center?: Lnglat;
  zoom?: number;
};
const LookUp: React.FC<LookUpProps> = ({
  trigger,
  value,
  onchange,
  disabled,
  extra,
  center,
  zoom,
}) => {
  const [visible, setVisible] = useState(false);
  const pointRef = useRef<AreaLngLat | undefined>({
    westnorth: undefined,
    eastsouth: undefined,
  });
  useEffect(() => {
    pointRef.current = value;
  }, [value]);
  const onOk = useCallback(() => {
    if (value !== pointRef.current) {
      onchange(pointRef.current);
    }
    setVisible(false);
  }, [value]);
  const handleChange = useCallback((value?: AreaLngLat) => {
    pointRef.current = value;
  }, []);
  const onShow = useCallback(() => {
    setVisible(true);
  }, []);
  return (
    <>
      <span role="presentation" onClick={onShow}>
        {trigger}
      </span>
      <Modal
        title="查看"
        bodyStyle={{ height: '70vh' }}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={onOk}
        onCancel={() => setVisible(false)}
        width="70vw"
      >
        <MapLnglatInputArea
          onChange={handleChange}
          value={value}
          center={center}
          extra={extra}
          disabled={disabled}
          height="calc(100% - 40px)"
          zoom={zoom}
        />
      </Modal>
    </>
  );
};
