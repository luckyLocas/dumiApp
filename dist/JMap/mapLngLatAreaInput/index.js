function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Map, Marker, Rectangle } from '@pansy/react-amap';
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

var MapLnglatInputArea = function MapLnglatInputArea(_ref) {
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
  var pointRef = useRef({
    westnorth: undefined,
    eastsouth: undefined
  });

  var _useState = useState(DefaultLnglat),
      _useState2 = _slicedToArray(_useState, 2),
      centerPoint = _useState2[0],
      setCenterPoint = _useState2[1];

  var _useState3 = useState(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      westnorth = _useState4[0],
      setWestnorth = _useState4[1];

  var _useState5 = useState(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      eastsouth = _useState6[0],
      setEastsouth = _useState6[1]; // 计算中心点 只执行一次


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

  var handleOneceCenter = useCallback(function (westnorth, eastsouth) {
    if (!oneceCenterRef.current && !centerPoint) {
      if (westnorth && eastsouth) {
        oneceCenterRef.current = true;
        var lng = (westnorth.lng + eastsouth.lng) / 2;
        var lat = (westnorth.lat + eastsouth.lat) / 2;
        changeCenter({
          lng: lng,
          lat: lat
        });
      } else if (westnorth) {
        oneceCenterRef.current = true;
        changeCenter(westnorth);
      } else if (eastsouth) {
        oneceCenterRef.current = true;
        changeCenter(eastsouth);
      }
    }
  }, [changeCenter]);
  useEffect(function () {
    center && changeCenter(center);
  }, [center, changeCenter]);
  useEffect(function () {
    if (value) {
      value.westnorth && setWestnorth(value.westnorth);
      value.eastsouth && setEastsouth(value.eastsouth);
      handleOneceCenter(value.westnorth, value.eastsouth);
      pointRef.current = value;
    }
  }, [value, handleOneceCenter]);
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
      console.log(pointRef.current, 'xxx');
      var _pointRef$current = pointRef.current,
          _eastsouth = _pointRef$current.eastsouth,
          _westnorth = _pointRef$current.westnorth;

      if (_eastsouth && _westnorth) {
        setWestnorth({
          lng: lng,
          lat: lat
        });
        setEastsouth(undefined);
        pointRef.current.eastsouth = undefined;
        pointRef.current.westnorth = {
          lng: lng,
          lat: lat
        };
      } else if (_westnorth) {
        setEastsouth({
          lng: lng,
          lat: lat
        });
        pointRef.current.eastsouth = {
          lng: lng,
          lat: lat
        };
      } else {
        setWestnorth({
          lng: lng,
          lat: lat
        });
        pointRef.current.westnorth = {
          lng: lng,
          lat: lat
        };
      }
    }
  }, []); // 处理经纬度变化

  var handleNorthLngLatChange = useCallback(function (lnglat) {
    setWestnorth(lnglat);
    pointRef.current.westnorth = lnglat;
  }, []);
  var handleSouthLngLatChange = useCallback(function (lnglat) {
    setEastsouth(lnglat);
    pointRef.current.eastsouth = lnglat;
  }, []);
  useEffect(function () {
    //if (westnorth && eastsouth) {
    onChange && onChange({
      westnorth: westnorth,
      eastsouth: eastsouth
    }); // } else {
    //   oneceCenterRef.current && onChange && onChange();
    // }
  }, [westnorth, eastsouth]);
  var handleChange = useCallback(function (value) {
    if (value) {
      value.westnorth && setWestnorth(value.westnorth);
      value.eastsouth && setEastsouth(value.eastsouth);
      pointRef.current = value;
    }
  }, []); // 拖动经纬度 变化

  var handlewestnorthDragend = useCallback(function (e) {
    var lng = e.lnglat.getLng();
    var lat = e.lnglat.getLat();

    var _MapUtil$gcj02towgs3 = MapUtil.gcj02towgs84(lng, lat);

    var _MapUtil$gcj02towgs4 = _slicedToArray(_MapUtil$gcj02towgs3, 2);

    lng = _MapUtil$gcj02towgs4[0];
    lat = _MapUtil$gcj02towgs4[1];
    setWestnorth({
      lng: lng,
      lat: lat
    });
    pointRef.current.westnorth = {
      lng: lng,
      lat: lat
    };
  }, []);
  var handleeastsouthDragend = useCallback(function (e) {
    var lng = e.lnglat.getLng();
    var lat = e.lnglat.getLat();

    var _MapUtil$gcj02towgs5 = MapUtil.gcj02towgs84(lng, lat);

    var _MapUtil$gcj02towgs6 = _slicedToArray(_MapUtil$gcj02towgs5, 2);

    lng = _MapUtil$gcj02towgs6[0];
    lat = _MapUtil$gcj02towgs6[1];
    setEastsouth({
      lng: lng,
      lat: lat
    });
    pointRef.current.eastsouth = {
      lng: lng,
      lat: lat
    };
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        height: height,
        position: 'relative'
      },
      children: [/*#__PURE__*/_jsxs(Map, {
        version: "2.0",
        mapKey: "447364382485b3b28b11a0f446b11918",
        center: centerPoint,
        zoom: zoom,
        events: {
          click: handleMapClick
        },
        children: [extra, westnorth ? /*#__PURE__*/_jsx(Marker, {
          draggable: !disabled,
          events: {
            dragend: handlewestnorthDragend
          },
          position: MapUtil.wgs84togcj02(westnorth.lng, westnorth.lat)
        }) : null, eastsouth ? /*#__PURE__*/_jsx(Marker, {
          draggable: !disabled,
          events: {
            dragend: handleeastsouthDragend
          },
          position: MapUtil.wgs84togcj02(eastsouth.lng, eastsouth.lat)
        }) : null, westnorth && eastsouth ? /*#__PURE__*/_jsx(Rectangle, {
          bounds: [MapUtil.wgs84togcj02(westnorth.lng, westnorth.lat), MapUtil.wgs84togcj02(eastsouth.lng, eastsouth.lat)],
          visible: true,
          style: {
            strokeColor: '#1ea7fd',
            fillColor: '#1ea7fd',
            fillOpacity: 0.22,
            strokeWeight: 1
          }
        }) : null]
      }), /*#__PURE__*/_jsx("span", {
        style: {
          position: 'absolute',
          right: 0,
          top: 0
        },
        children: trigger ? /*#__PURE__*/_jsx(LookUp, {
          onchange: handleChange,
          value: {
            eastsouth: eastsouth,
            westnorth: westnorth
          },
          zoom: zoom,
          center: center,
          extra: extra,
          disabled: disabled,
          trigger: trigger
        }) : null
      })]
    }), /*#__PURE__*/_jsx(LnglatInput, {
      value: westnorth,
      disabled: disabled,
      onChange: handleNorthLngLatChange
    }), /*#__PURE__*/_jsx(LnglatInput, {
      value: eastsouth,
      disabled: disabled,
      onChange: handleSouthLngLatChange
    })]
  });
};

export default /*#__PURE__*/memo(MapLnglatInputArea);

var LookUp = function LookUp(_ref2) {
  var trigger = _ref2.trigger,
      value = _ref2.value,
      onchange = _ref2.onchange,
      disabled = _ref2.disabled,
      extra = _ref2.extra,
      center = _ref2.center,
      zoom = _ref2.zoom;

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      visible = _useState8[0],
      setVisible = _useState8[1];

  var pointRef = useRef({
    westnorth: undefined,
    eastsouth: undefined
  });
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
      children: /*#__PURE__*/_jsx(MapLnglatInputArea, {
        onChange: handleChange,
        value: value,
        center: center,
        extra: extra,
        disabled: disabled,
        height: "calc(100% - 40px)",
        zoom: zoom
      })
    })]
  });
};