import { CloseOutlined } from '@ant-design/icons';
import { Map, Marker, Polygon } from '@pansy/react-amap';
import { Col, Modal, Row } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { CSSProperties } from 'react';

import { Lnglat } from '../lnglat';
import { MapUtil } from '../util';
const DefaultLnglat = {
  lng: 116.4,
  lat: 39.9,
};
const CloseStyle: CSSProperties = {
  position: 'absolute',
  top: '-6px',
  right: '-8px',
  width: '15px',
  height: '15px',
  fontSize: '12px',
  background: 'rgba(0,0,0,0.12)',
  borderRadius: '50%',
  color: '#000000',
  textAlign: 'center',
  lineHeight: '15px',
  boxShadow: '-1px 1px 1px rgba(0, 10, 10, .2)',
};
const isChange = (src: Lnglat[], dist?: Lnglat[]): boolean => {
  if (src && dist) {
    if (src.length !== dist.length) {
      return true;
    } else {
      return (
        src.findIndex(
          (el, index) => JSON.stringify(el) !== JSON.stringify(dist[index]),
        ) > -1
      );
    }
  }
  return src !== dist;
};
type MapPolygonInputProps = {
  disabled?: boolean;
  value?: Lnglat[];
  onChange?: (value?: Lnglat[]) => void;
  // 容器高度
  height?: number | string;
  // 触发查看按钮
  trigger?: React.ReactNode;
  center?: Lnglat;
  /** 显示经纬度 */
  showLnglat?: boolean;
  listRender?: React.ComponentType<{
    data: Lnglat[];
  }>;
  extra?: React.ReactNode;
} & Partial<React.ComponentProps<typeof Map>>;
const MapPolygonInput: React.FC<MapPolygonInputProps> = ({
  disabled = false,
  value,
  height = 200,
  onChange,
  trigger,
  center,
  showLnglat = true,
  listRender,
  extra,
  events,
  ...otherProps
}) => {
  const disabledRef = useRef(false);
  const [centerPoint, setCenterPoint] = useState<Lnglat>(DefaultLnglat);
  const [markerPoints, setMarkerPoints] = useState<Lnglat[]>([]);
  const markerPointsRef = useRef<Lnglat[] | undefined>([]);
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
  const handleOneceCenter = useCallback((point: Lnglat) => {
    if (!oneceCenterRef.current && !centerPoint) {
      if (point) {
        oneceCenterRef.current = true;
        changeCenter(point);
      }
    }
  }, []);
  useEffect(() => {
    if (value && value.length) {
      if (isChange(value, markerPointsRef.current)) {
        markerPointsRef.current = value;
        setMarkerPoints(value);
        handleOneceCenter(value[0]);
      }
    }
  }, [value]);
  useEffect(() => {
    if (center) {
      changeCenter(center);
    }
  }, [center]);
  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);
  const handleMapClick = useCallback((e: { lnglat: AMap.LngLat }) => {
    if (!disabledRef.current) {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
      setMarkerPoints((pre) => [...pre, { lng, lat }]);
    }
  }, []);
  useEffect(() => {
    // if (isChange(markerPoints, markerPointsRef.current)) {
    onChange && onChange(markerPoints);
    // }
  }, [markerPoints]);
  // 处理经纬度变化
  const handleLngLatChange = useCallback((lnglats?: Lnglat[]) => {
    lnglats ? setMarkerPoints(lnglats) : setMarkerPoints([]);
    if (lnglats && lnglats.length) {
      changeCenter(lnglats[0]);
    }
  }, []);
  const handleDragend = useCallback(
    (lnglat: Lnglat, e: { lnglat: AMap.LngLat }) => {
      let lng = e.lnglat.getLng();
      let lat = e.lnglat.getLat();
      [lng, lat] = MapUtil.gcj02towgs84(lng, lat);
      setMarkerPoints((pre) =>
        pre.map((el) =>
          lnglat.lat === el.lat && lnglat.lng === el.lng ? { lng, lat } : el,
        ),
      );
    },
    [],
  );
  // 处理删除节点
  const handleDelete = useCallback((i: number) => {
    setMarkerPoints((pre) => pre.filter((_el, index) => i !== index));
  }, []);

  const labelList = useMemo(() => {
    if (listRender) {
      const List = listRender;
      return <List data={markerPoints} />;
    }
    return (
      <Row>
        {markerPoints.map((el, index) => (
          <Col
            key={el.lng + '-' + el.lat}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            xl={{ span: 8 }}
          >
            <Row style={{ marginTop: '8px' }} gutter={[16, 16]}>
              <Col span={12}>
                <span
                  style={{
                    color: '#1890ff',
                    marginRight: '4px',
                  }}
                >
                  ({index + 1})
                </span>
                经度L: {el.lng}
              </Col>
              <Col span={12}>纬度B: {el.lat}</Col>
            </Row>
          </Col>
        ))}
      </Row>
    );
  }, [markerPoints, listRender]);
  return (
    <>
      <div style={{ height: height, position: 'relative' }}>
        <Map
          version="2.0"
          mapKey="447364382485b3b28b11a0f446b11918"
          center={centerPoint}
          zoom={11}
          {...otherProps}
          events={{
            ...events,
            click: handleMapClick,
          }}
        >
          {extra}
          {markerPoints.map((el, index) => (
            <Marker
              draggable={!disabled}
              events={{
                dragend: (e) => handleDragend(el, e),
              }}
              render={() => (
                <div
                  style={{
                    position: 'relative',
                    width: '25px',
                    height: '34px',
                  }}
                >
                  <img
                    width="100%"
                    height="100%"
                    alt=""
                    src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      color: '#fff',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {index + 1}
                  </span>
                  {disabled ? null : (
                    <div
                      role="presentation"
                      onClick={() => handleDelete(index)}
                      style={CloseStyle}
                    >
                      <CloseOutlined />
                    </div>
                  )}
                </div>
              )}
              key={el.lat + '-' + el.lng}
              position={MapUtil.wgs84togcj02(el.lng, el.lat)}
            />
          ))}
          <Polygon
            style={{
              fillColor: 'rgba(51, 173, 255, 0.22)',
              strokeColor: 'rgba(51, 173, 255, 0.3)',
              fillOpacity: 0.22,
            }}
            path={markerPoints.map((el) =>
              MapUtil.wgs84togcj02(el.lng, el.lat),
            )}
          />
        </Map>
        <span style={{ position: 'absolute', right: 0, top: 0 }}>
          {trigger ? (
            <LookUp
              onchange={handleLngLatChange}
              value={markerPoints}
              disabled={disabled}
              trigger={trigger}
              center={center}
              extra={extra}
            />
          ) : null}
        </span>
      </div>
      {showLnglat ? labelList : null}
    </>
  );
};

export default memo(MapPolygonInput);
type LookUpProps = {
  trigger?: React.ReactNode;
  value?: Lnglat[];
  onchange: (value?: Lnglat[]) => void;
  disabled: boolean;
  center?: Lnglat;
  extra?: React.ReactNode;
};
const LookUp: React.FC<LookUpProps> = ({
  trigger,
  value,
  onchange,
  disabled,
  center,
  extra,
}) => {
  const [visible, setVisible] = useState(false);
  const proMapRef = useRef<AMap.Map>();
  const pointRef = useRef<Lnglat[] | undefined>();
  useEffect(() => {
    pointRef.current = value;
  }, [value]);
  const onOk = useCallback(() => {
    if (value !== pointRef.current) {
      onchange(pointRef.current);
    }
    setVisible(false);
  }, [value]);
  const handleChange = useCallback((value?: Lnglat[]) => {
    pointRef.current = value;
  }, []);
  const onShow = useCallback(() => {
    setVisible(true);
    setTimeout(() => {
      proMapRef.current?.setFitView();
    }, 100);
  }, []);
  return (
    <>
      <span role="presentation" onClick={onShow}>
        {trigger}
      </span>
      <Modal
        title="查看"
        bodyStyle={{ height: '76vh' }}
        visible={visible}
        maskClosable={false}
        destroyOnClose
        onOk={onOk}
        onCancel={() => setVisible(false)}
        width="80vw"
      >
        <MapPolygonInput
          events={{
            created: (proMap) => {
              proMapRef.current = proMap;
            },
          }}
          onChange={handleChange}
          value={value}
          extra={extra}
          center={center}
          showLnglat={false}
          disabled={disabled}
          height="100%"
        />
      </Modal>
    </>
  );
};
