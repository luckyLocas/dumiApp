import { Map, Marker } from '@pansy/react-amap';
import { Modal } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Lnglat } from '../lnglat';
import { MapUtil } from '../util';
import LnglatInput from '../lnglatInput';

const DefaultLnglat = {
  lng: 116.4,
  lat: 39.9,
};

type MapLnglatInputProps = {
  disabled?: boolean;
  value?: Lnglat;
  onChange?: (value?: Lnglat) => void;
  // 容器高度
  height?: number | string;
  // 触发查看按钮
  trigger?: React.ReactNode;
  center?: Lnglat;
  extra?: React.ReactNode;
  zoom?: number;
};
const isChange = (srcPoint?: Lnglat, distPoint?: Lnglat): boolean => {
  console.log(srcPoint, distPoint);
  if (srcPoint && distPoint) {
    return srcPoint.lng !== distPoint.lng && srcPoint.lat !== distPoint.lat;
  }
  return srcPoint !== distPoint;
};
const MapLnglatInput: React.FC<MapLnglatInputProps> = ({
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
  const [centerPoint, setCenterPoint] = useState<Lnglat>(DefaultLnglat);
  const [markerPoint, setMarkerPoint] = useState<Lnglat>();
  // 缓存上一次坐标点 用于判断是否更新点
  const markerPointRef = useRef<Lnglat>();
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
    (point: Lnglat) => {
      if (!oneceCenterRef.current && !centerPoint) {
        if (point) {
          oneceCenterRef.current = true;
          changeCenter(point);
        }
      }
    },
    [setCenterPoint, changeCenter],
  );
  useEffect(() => {
    if (value) {
      if (isChange(value, markerPointRef.current)) {
        markerPointRef.current = value;
        setMarkerPoint(value);
      }
      handleOneceCenter(value);
    }
  }, [value, handleOneceCenter]);
  useEffect(() => {
    if (center) {
      changeCenter(center);
    }
  }, [center, changeCenter]);
  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);
  const handleMapClick = useCallback((e: { lnglat: any }) => {
    if (!disabledRef.current) {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
      setMarkerPoint({ lng, lat });
    }
  }, []);
  // const mapEvents: MapProps['events'] = {
  //   click: handleMapClick,
  // };
  // 处理经纬度变化
  const handleLngLatChange = useCallback((lnglat?: Lnglat) => {
    setMarkerPoint(lnglat);
    if (lnglat) {
      changeCenter(lnglat);
    }
  }, []);
  useEffect(() => {
    if (markerPoint != markerPointRef.current) {
      onChange && onChange(markerPoint);
    }
  }, [markerPoint, onChange]);
  return (
    <>
      <div style={{ height: height, position: 'relative' }}>
        <Map
          version="2.0"
          center={centerPoint}
          mapKey="447364382485b3b28b11a0f446b11918"
          zoom={zoom}
          events={{
            click: handleMapClick,
          }}
        >
          {extra}
          <Marker
            position={
              markerPoint?.lng && markerPoint.lat
                ? MapUtil.wgs84togcj02(markerPoint.lng, markerPoint.lat)
                : undefined
            }
          />
        </Map>
        <span style={{ position: 'absolute', right: 0, top: 0 }}>
          {trigger ? (
            <LookUp
              zoom={zoom}
              onchange={handleLngLatChange}
              value={markerPoint}
              disabled={disabled}
              center={center}
              extra={extra}
              trigger={trigger}
            />
          ) : null}
        </span>
      </div>
      <LnglatInput
        value={markerPoint}
        disabled={disabled}
        onChange={handleLngLatChange}
      />
    </>
  );
};

export default memo(MapLnglatInput);

type LookUpProps = {
  trigger?: React.ReactNode;
  value?: Lnglat;
  onchange: (value?: Lnglat) => void;
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
  const pointRef = useRef<Lnglat | undefined>();
  useEffect(() => {
    pointRef.current = value;
  }, [value]);
  const onOk = useCallback(() => {
    if (value !== pointRef.current) {
      onchange(pointRef.current);
    }
    setVisible(false);
  }, [value]);
  const handleChange = useCallback((value?: Lnglat) => {
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
        <MapLnglatInput
          onChange={handleChange}
          value={value}
          extra={extra}
          center={center}
          disabled={disabled}
          zoom={zoom}
          height="calc(100% - 40px)"
        />
      </Modal>
    </>
  );
};
