import { Col, InputNumber, Row } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Lnglat } from '../lnglat';

type LnglatInputProps = {
  value?: Lnglat;
  onChange?: (value?: Lnglat) => void;
  disabled?: boolean;
};
const LnglatInput: React.FC<LnglatInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [lnglat, setLnglat] = useState<{
    lng: number | undefined;
    lat: number | undefined;
  }>({
    lng: undefined,
    lat: undefined,
  });
  const lnglatRef = useRef<{
    lng: number | undefined;
    lat: number | undefined;
  }>({
    lng: undefined,
    lat: undefined,
  });
  useEffect(() => {
    if (value) {
      if (
        value.lat !== lnglatRef.current.lat ||
        value.lng !== lnglatRef.current.lng
      ) {
        lnglatRef.current = value;
        setLnglat(value);
      }
    }
  }, [value]);

  const onLngChange = useCallback(
    (lng: number) => {
      if (lnglatRef.current.lng !== lng) {
        setLnglat(pre => ({ ...pre, lng }));
      }
    },
    [onChange],
  );
  const onLatChange = useCallback((lat: number) => {
    if (lnglatRef.current.lat !== lat) {
      setLnglat(pre => ({ ...pre, lat }));
    }
  }, []);
  useEffect(() => {
    if (lnglat.lng && lnglat.lat) {
      onChange && onChange({ lng: lnglat.lng, lat: lnglat.lat });
    } else {
      onChange && onChange();
    }
  }, [lnglat]);
  return (
    <Row style={{ marginTop: 12 }}>
      <Col span={12}>
        <Row align="middle" gutter={16} wrap={false}>
          <Col flex="80px" style={{ textAlign: 'right' }}>
            经度L:
          </Col>
          <Col flex="auto">
            <InputNumber
              min={-180}
              max={180}
              value={lnglat?.lng}
              precision={8}
              onChange={onLngChange}
              style={{ width: '100%' }}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row align="middle" gutter={16} wrap={false}>
          <Col flex="80px" style={{ textAlign: 'right' }}>
            纬度B:
          </Col>
          <Col flex="auto">
            <InputNumber
              min={-90}
              max={90}
              precision={8}
              value={lnglat?.lat}
              onChange={onLatChange}
              style={{ width: '100%' }}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default memo(LnglatInput);
