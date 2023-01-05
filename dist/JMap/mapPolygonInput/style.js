var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
export var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: ", ";\n  position: relative;\n  .marker-container {\n    position: 'relative';\n    width: '25px';\n    height: '34px';\n    .marker-tip {\n      position: 'absolute';\n      left: '50%';\n      top: 0;\n      color: '#fff';\n      transform: 'translateX(-50%)';\n    }\n    .lntlat-tip {\n      color: '#1890ff';\n      margin-right: '4px';\n    }\n  }\n"])), function (props) {
  return typeof props.height === 'number' ? props.height + 'px' : props.height;
});