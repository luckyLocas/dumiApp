function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Map, Marker } from '@pansy/react-amap';
import { Modal } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { MapUtil } from "../util";
import LnglatInput from "../lnglatInput";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var DefaultLnglat = {
  lng: 116.4,
  lat: 39.9
};

var isChange = function isChange(srcPoint, distPoint) {
  console.log(srcPoint, distPoint);

  if (srcPoint && distPoint) {
    return srcPoint.lng !== distPoint.lng && srcPoint.lat !== distPoint.lat;
  }

  return srcPoint !== distPoint;
};

var MapLnglatInput = function MapLnglatInput(_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      value = _ref.value,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      onChange = _ref.onChange,
      trigger = _ref.trigger,
      center = _ref.center,
      zoom = _ref.zoom,
      extra = _ref.extra;
  var disabledRef = useRef(false);

  var _useState = useState(DefaultLnglat),
      _useState2 = _slicedToArray(_useState, 2),
      centerPoint = _useState2[0],
      setCenterPoint = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      markerPoint = _useState4[0],
      setMarkerPoint = _useState4[1]; // 缓存上一次坐标点 用于判断是否更新点


  var markerPointRef = useRef(); // 计算中心点 只执行一次

  var oneceCenterRef = useRef(false);
  var changeCenter = useCallback(function (centerPoint) {
    var _MapUtil$wgs84togcj = MapUtil.wgs84togcj02(centerPoint.lng, centerPoint.lat),
        _MapUtil$wgs84togcj2 = _slicedToArray(_MapUtil$wgs84togcj, 2),
        lng = _MapUtil$wgs84togcj2[0],
        lat = _MapUtil$wgs84togcj2[1];

    setTimeout(function () {
      setCenterPoint({
        lng: lng,
        lat: lat
      });
    }, 0);
  }, []); // 计算中心点

  var handleOneceCenter = useCallback(function (point) {
    if (!oneceCenterRef.current && !centerPoint) {
      if (point) {
        oneceCenterRef.current = true;
        changeCenter(point);
      }
    }
  }, [setCenterPoint, changeCenter]);
  useEffect(function () {
    if (value) {
      if (isChange(value, markerPointRef.current)) {
        markerPointRef.current = value;
        setMarkerPoint(value);
      }

      handleOneceCenter(value);
    }
  }, [value, handleOneceCenter]);
  useEffect(function () {
    if (center) {
      changeCenter(center);
    }
  }, [center, changeCenter]);
  useEffect(function () {
    disabledRef.current = disabled;
  }, [disabled]);
  var handleMapClick = useCallback(function (e) {
    if (!disabledRef.current) {
      var lng = e.lnglat.getLng();
      var lat = e.lnglat.getLat();

      var _MapUtil$gcj02towgs = MapUtil.gcj02towgs84(lng, lat);

      var _MapUtil$gcj02towgs2 = _slicedToArray(_MapUtil$gcj02towgs, 2);

      lng = _MapUtil$gcj02towgs2[0];
      lat = _MapUtil$gcj02towgs2[1];
      setMarkerPoint({
        lng: lng,
        lat: lat
      });
    }
  }, []); // const mapEvents: MapProps['events'] = {
  //   click: handleMapClick,
  // };
  // 处理经纬度变化

  var handleLngLatChange = useCallback(function (lnglat) {
    setMarkerPoint(lnglat);

    if (lnglat) {
      changeCenter(lnglat);
    }
  }, []);
  useEffect(function () {
    if (markerPoint != markerPointRef.current) {
      onChange && onChange(markerPoint);
    }
  }, [markerPoint, onChange]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        height: height,
        position: 'relative'
      },
      children: [/*#__PURE__*/_jsxs(Map, {
        version: "2.0",
        center: centerPoint,
        mapKey: "447364382485b3b28b11a0f446b11918",
        zoom: zoom,
        events: {
          click: handleMapClick
        },
        children: [extra, /*#__PURE__*/_jsx(Marker, {
          position: markerPoint !== null && markerPoint !== void 0 && markerPoint.lng && markerPoint.lat ? MapUtil.wgs84togcj02(markerPoint.lng, markerPoint.lat) : undefined
        })]
      }), /*#__PURE__*/_jsx("span", {
        style: {
          position: 'absolute',
          right: 0,
          top: 0
        },
        children: trigger ? /*#__PURE__*/_jsx(LookUp, {
          zoom: zoom,
          onchange: handleLngLatChange,
          value: markerPoint,
          disabled: disabled,
          center: center,
          extra: extra,
          trigger: trigger
        }) : null
      })]
    }), /*#__PURE__*/_jsx(LnglatInput, {
      value: markerPoint,
      disabled: disabled,
      onChange: handleLngLatChange
    })]
  });
};

export default /*#__PURE__*/memo(MapLnglatInput);

var LookUp = function LookUp(_ref2) {
  var trigger = _ref2.trigger,
      value = _ref2.value,
      onchange = _ref2.onchange,
      disabled = _ref2.disabled,
      extra = _ref2.extra,
      center = _ref2.center,
      zoom = _ref2.zoom;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      visible = _useState6[0],
      setVisible = _useState6[1];

  var pointRef = useRef();
  useEffect(function () {
    pointRef.current = value;
  }, [value]);
  var onOk = useCallback(function () {
    if (value !== pointRef.current) {
      onchange(pointRef.current);
    }

    setVisible(false);
  }, [value]);
  var handleChange = useCallback(function (value) {
    pointRef.current = value;
  }, []);
  var onShow = useCallback(function () {
    setVisible(true);
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("span", {
      role: "presentation",
      onClick: onShow,
      children: trigger
    }), /*#__PURE__*/_jsx(Modal, {
      title: "\u67E5\u770B",
      bodyStyle: {
        height: '70vh'
      },
      visible: visible,
      maskClosable: false,
      destroyOnClose: true,
      onOk: onOk,
      onCancel: function onCancel() {
        return setVisible(false);
      },
      width: "70vw",
      children: /*#__PURE__*/_jsx(MapLnglatInput, {
        onChange: handleChange,
        value: value,
        extra: extra,
        center: center,
        disabled: disabled,
        zoom: zoom,
        height: "calc(100% - 40px)"
      })
    })]
  });
};