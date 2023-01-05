function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ProProvider from '@ant-design/pro-provider';
import { InputNumber } from 'antd';
import React, { useContext } from 'react';
import { toFixed } from "../../utils/customMath";
/**
 * @param {*} props
 * valueType: price 保留4位小数 rate 保留两位小数  amount 保留两位小数
 * @return {*}
 */

import { jsx as _jsx } from "react/jsx-runtime";

var CProProvider = function CProProvider(props) {
  var values = useContext(ProProvider);
  return /*#__PURE__*/_jsx(ProProvider.Provider, _objectSpread(_objectSpread({}, props), {}, {
    value: _objectSpread(_objectSpread({}, values), {}, {
      valueTypeMap: {
        rate: {
          // 税率
          render: function render(text) {
            return toFixed(text, 2);
          },
          renderFormItem: function renderFormItem(_text, props) {
            return /*#__PURE__*/_jsx(InputNumber, _objectSpread({
              style: {
                width: '100%'
              },
              precision: 2,
              placeholder: "\u8BF7\u8F93\u5165"
            }, props === null || props === void 0 ? void 0 : props.fieldProps));
          }
        },
        price: {
          // 单价
          render: function render(text) {
            return toFixed(text, 4);
          },
          renderFormItem: function renderFormItem(_text, props) {
            return /*#__PURE__*/_jsx(InputNumber, _objectSpread({
              style: {
                width: '100%'
              },
              precision: 4,
              placeholder: "\u8BF7\u8F93\u5165"
            }, props === null || props === void 0 ? void 0 : props.fieldProps));
          }
        },
        amount: {
          //金额
          render: function render(text) {
            return toFixed(text, 2);
          },
          renderFormItem: function renderFormItem(_text, props) {
            return /*#__PURE__*/_jsx(InputNumber, _objectSpread({
              style: {
                width: '100%'
              },
              precision: 2,
              placeholder: "\u8BF7\u8F93\u5165"
            }, props === null || props === void 0 ? void 0 : props.fieldProps));
          }
        }
      }
    })
  }));
};

export default CProProvider;