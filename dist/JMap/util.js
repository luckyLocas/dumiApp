function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import gcoord from 'gcoord';
import { toFixed } from "../../utils/customMath";
export var MapUtil = /*#__PURE__*/function () {
  function MapUtil() {
    _classCallCheck(this, MapUtil);
  }

  _createClass(MapUtil, null, [{
    key: "wgs84togcj02",
    value:
    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    function wgs84togcj02(lng, lat) {
      var _gcoord$transform = gcoord.transform([lng, lat], gcoord.WGS84, gcoord.GCJ02),
          _gcoord$transform2 = _slicedToArray(_gcoord$transform, 2),
          parseLng = _gcoord$transform2[0],
          parseLat = _gcoord$transform2[1];

      return [toFixed(parseLng, 8), toFixed(parseLat, 8)];
    }
    /**
     * GCJ02 转换为 WGS84
     * @param lng
     * @param lat
     * @returns {*[]}
     */

  }, {
    key: "gcj02towgs84",
    value: function gcj02towgs84(lng, lat) {
      var _gcoord$transform3 = gcoord.transform([lng, lat], gcoord.GCJ02, gcoord.WGS84),
          _gcoord$transform4 = _slicedToArray(_gcoord$transform3, 2),
          parseLng = _gcoord$transform4[0],
          parseLat = _gcoord$transform4[1];

      return [toFixed(parseLng, 8), toFixed(parseLat, 8)];
    }
  }]);

  return MapUtil;
}();