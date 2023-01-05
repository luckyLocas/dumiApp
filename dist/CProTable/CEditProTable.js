var _excluded = ["onResize", "width"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditableProTable } from '@ant-design/pro-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Resizable } from 'react-resizable';
import { useVT } from 'virtualizedtableforantd4';
import CProProvider from "../cProProvider";
import { Wrapper } from "./style";
import { jsx as _jsx } from "react/jsx-runtime";

var ResizableTitle = function ResizableTitle(props) {
  var onResize = props.onResize,
      width = props.width,
      restProps = _objectWithoutProperties(props, _excluded);

  if (!width) {
    return /*#__PURE__*/_jsx("th", _objectSpread({}, restProps));
  }

  return /*#__PURE__*/_jsx(Resizable, {
    width: width,
    height: 0,
    handle: /*#__PURE__*/_jsx("span", {
      role: "presentation",
      className: "react-resizable-handle",
      onClick: function onClick(e) {
        e.stopPropagation();
      }
    }),
    onResize: onResize,
    draggableOpts: {
      enableUserSelectHack: false
    },
    children: /*#__PURE__*/_jsx("th", _objectSpread({}, restProps))
  });
};

var MyComponents = {
  header: {
    cell: ResizableTitle
  }
};

function CEditProTable(props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      customColumn = _useState2[0],
      setCustomColumn = _useState2[1]; //配合hooks/useState


  var _useState3 = useState('small'),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var columns = props.columns,
      onSizeChange = props.onSizeChange,
      vitrual = props.vitrual,
      scroll = props.scroll;

  var _useVT = useVT(function () {
    return {
      id: Math.random(),
      top: 0,
      scroll: {
        y: (scroll === null || scroll === void 0 ? void 0 : scroll.y) || 500
      }
    };
  }, [scroll]),
      _useVT2 = _slicedToArray(_useVT, 1),
      vt = _useVT2[0];

  var localComponents = useMemo(function () {
    if (vitrual) {
      return _objectSpread(_objectSpread({}, vt), MyComponents);
    }

    return MyComponents;
  }, [vitrual]);

  var handleResize = function handleResize(index) {
    return function (_e, _ref) {
      var size = _ref.size;
      setCustomColumn(function (columns) {
        return columns.map(function (el, i) {
          return i === index ? _objectSpread(_objectSpread({}, el), {}, {
            width: size.width
          }) : el;
        }); // const nextColumns = [...columns];
        // nextColumns[index] = {
        //   ...nextColumns[index],
        //   width: size.width,
        // };
        // return nextColumns;
      });
    };
  };

  useEffect(function () {
    if (columns) {
      setCustomColumn(columns.map(function (col, index) {
        return _objectSpread(_objectSpread({}, col), {}, {
          onHeaderCell: function onHeaderCell(column) {
            return {
              width: column.width,
              onResize: handleResize(index)
            };
          }
        });
      }));
    }
  }, [columns]); // table size 发生改变 默认是 small

  var onSizeChanged = useCallback(function (size) {
    setSize(size);
    onSizeChange && onSizeChange(size);
  }, [onSizeChange]);
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsx(CProProvider, {
      children: /*#__PURE__*/_jsx(EditableProTable, _objectSpread(_objectSpread({
        size: size,
        onSizeChange: onSizeChanged
      }, props), {}, {
        components: localComponents,
        columns: customColumn
      }))
    })
  });
}

export default CEditProTable;