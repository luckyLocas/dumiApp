var _excluded = ["disabled", "value", "height", "onChange", "trigger", "center", "showLnglat", "listRender", "extra", "events"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { CloseOutlined } from '@ant-design/icons';
import { Map, Marker, Polygon } from '@pansy/react-amap';
import { Col, Modal, Row } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { MapUtil } from "../util";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var DefaultLnglat = {
  lng: 116.4,
  lat: 39.9
};
var CloseStyle = {
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
  boxShadow: '-1px 1px 1px rgba(0, 10, 10, .2)'
};

var isChange = function isChange(src, dist) {
  if (src && dist) {
    if (src.length !== dist.length) {
      return true;
    } else {
      return src.findIndex(function (el, index) {
        return JSON.stringify(el) !== JSON.stringify(dist[index]);
      }) > -1;
    }
  }

  return src !== dist;
};

var MapPolygonInput = function MapPolygonInput(_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      value = _ref.value,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      onChange = _ref.onChange,
      trigger = _ref.trigger,
      center = _ref.center,
      _ref$showLnglat = _ref.showLnglat,
      showLnglat = _ref$showLnglat === void 0 ? true : _ref$showLnglat,
      listRender = _ref.listRender,
      extra = _ref.extra,
      events = _ref.events,
      otherProps = _objectWithoutProperties(_ref, _excluded);

  var disabledRef = useRef(false);

  var _useState = useState(DefaultLnglat),
      _useState2 = _slicedToArray(_useState, 2),
      centerPoint = _useState2[0],
      setCenterPoint = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      markerPoints = _useState4[0],
      setMarkerPoints = _useState4[1];

  var markerPointsRef = useRef([]); // 计算中心点 只执行一次

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
  }, []);
  useEffect(function () {
    if (value && value.length) {
      if (isChange(value, markerPointsRef.current)) {
        markerPointsRef.current = value;
        setMarkerPoints(value);
        handleOneceCenter(value[0]);
      }
    }
  }, [value]);
  useEffect(function () {
    if (center) {
      changeCenter(center);
    }
  }, [center]);
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
      setMarkerPoints(function (pre) {
        return [].concat(_toConsumableArray(pre), [{
          lng: lng,
          lat: lat
        }]);
      });
    }
  }, []);
  useEffect(function () {
    // if (isChange(markerPoints, markerPointsRef.current)) {
    onChange && onChange(markerPoints); // }
  }, [markerPoints]); // 处理经纬度变化

  var handleLngLatChange = useCallback(function (lnglats) {
    lnglats ? setMarkerPoints(lnglats) : setMarkerPoints([]);

    if (lnglats && lnglats.length) {
      changeCenter(lnglats[0]);
    }
  }, []);
  var handleDragend = useCallback(function (lnglat, e) {
    var lng = e.lnglat.getLng();
    var lat = e.lnglat.getLat();

    var _MapUtil$gcj02towgs3 = MapUtil.gcj02towgs84(lng, lat);

    var _MapUtil$gcj02towgs4 = _slicedToArray(_MapUtil$gcj02towgs3, 2);

    lng = _MapUtil$gcj02towgs4[0];
    lat = _MapUtil$gcj02towgs4[1];
    setMarkerPoints(function (pre) {
      return pre.map(function (el) {
        return lnglat.lat === el.lat && lnglat.lng === el.lng ? {
          lng: lng,
          lat: lat
        } : el;
      });
    });
  }, []); // 处理删除节点

  var handleDelete = useCallback(function (i) {
    setMarkerPoints(function (pre) {
      return pre.filter(function (_el, index) {
        return i !== index;
      });
    });
  }, []);
  var labelList = useMemo(function () {
    if (listRender) {
      var List = listRender;
      return /*#__PURE__*/_jsx(List, {
        data: markerPoints
      });
    }

    return /*#__PURE__*/_jsx(Row, {
      children: markerPoints.map(function (el, index) {
        return /*#__PURE__*/_jsx(Col, {
          xs: {
            span: 24
          },
          md: {
            span: 12
          },
          xl: {
            span: 8
          },
          children: /*#__PURE__*/_jsxs(Row, {
            style: {
              marginTop: '8px'
            },
            gutter: [16, 16],
            children: [/*#__PURE__*/_jsxs(Col, {
              span: 12,
              children: [/*#__PURE__*/_jsxs("span", {
                style: {
                  color: '#1890ff',
                  marginRight: '4px'
                },
                children: ["(", index + 1, ")"]
              }), "\u7ECF\u5EA6L: ", el.lng]
            }), /*#__PURE__*/_jsxs(Col, {
              span: 12,
              children: ["\u7EAC\u5EA6B: ", el.lat]
            })]
          })
        }, el.lng + '-' + el.lat);
      })
    });
  }, [markerPoints, listRender]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      style: {
        height: height,
        position: 'relative'
      },
      children: [/*#__PURE__*/_jsxs(Map, _objectSpread(_objectSpread({
        version: "2.0",
        mapKey: "447364382485b3b28b11a0f446b11918",
        center: centerPoint,
        zoom: 11
      }, otherProps), {}, {
        events: _objectSpread(_objectSpread({}, events), {}, {
          click: handleMapClick
        }),
        children: [extra, markerPoints.map(function (el, index) {
          return /*#__PURE__*/_jsx(Marker, {
            draggable: !disabled,
            events: {
              dragend: function dragend(e) {
                return handleDragend(el, e);
              }
            },
            render: function render() {
              return /*#__PURE__*/_jsxs("div", {
                style: {
                  position: 'relative',
                  width: '25px',
                  height: '34px'
                },
                children: [/*#__PURE__*/_jsx("img", {
                  width: "100%",
                  height: "100%",
                  alt: "",
                  src: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
                }), /*#__PURE__*/_jsx("span", {
                  style: {
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    color: '#fff',
                    transform: 'translateX(-50%)'
                  },
                  children: index + 1
                }), disabled ? null : /*#__PURE__*/_jsx("div", {
                  role: "presentation",
                  onClick: function onClick() {
                    return handleDelete(index);
                  },
                  style: CloseStyle,
                  children: /*#__PURE__*/_jsx(CloseOutlined, {})
                })]
              });
            },
            position: MapUtil.wgs84togcj02(el.lng, el.lat)
          }, el.lat + '-' + el.lng);
        }), /*#__PURE__*/_jsx(Polygon, {
          style: {
            fillColor: 'rgba(51, 173, 255, 0.22)',
            strokeColor: 'rgba(51, 173, 255, 0.3)',
            fillOpacity: 0.22
          },
          path: markerPoints.map(function (el) {
            return MapUtil.wgs84togcj02(el.lng, el.lat);
          })
        })]
      })), /*#__PURE__*/_jsx("span", {
        style: {
          position: 'absolute',
          right: 0,
          top: 0
        },
        children: trigger ? /*#__PURE__*/_jsx(LookUp, {
          onchange: handleLngLatChange,
          value: markerPoints,
          disabled: disabled,
          trigger: trigger,
          center: center,
          extra: extra
        }) : null
      })]
    }), showLnglat ? labelList : null]
  });
};

export default /*#__PURE__*/memo(MapPolygonInput);

var LookUp = function LookUp(_ref2) {
  var trigger = _ref2.trigger,
      value = _ref2.value,
      onchange = _ref2.onchange,
      disabled = _ref2.disabled,
      center = _ref2.center,
      extra = _ref2.extra;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      visible = _useState6[0],
      setVisible = _useState6[1];

  var proMapRef = useRef();
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
    setTimeout(function () {
      var _proMapRef$current;

      (_proMapRef$current = proMapRef.current) === null || _proMapRef$current === void 0 ? void 0 : _proMapRef$current.setFitView();
    }, 100);
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("span", {
      role: "presentation",
      onClick: onShow,
      children: trigger
    }), /*#__PURE__*/_jsx(Modal, {
      title: "\u67E5\u770B",
      bodyStyle: {
        height: '76vh'
      },
      visible: visible,
      maskClosable: false,
      destroyOnClose: true,
      onOk: onOk,
      onCancel: function onCancel() {
        return setVisible(false);
      },
      width: "80vw",
      children: /*#__PURE__*/_jsx(MapPolygonInput, {
        events: {
          created: function created(proMap) {
            proMapRef.current = proMap;
          }
        },
        onChange: handleChange,
        value: value,
        extra: extra,
        center: center,
        showLnglat: false,
        disabled: disabled,
        height: "100%"
      })
    })]
  });
};