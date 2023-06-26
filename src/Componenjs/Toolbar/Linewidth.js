"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _brushReducer = require("../../store/reducers/brushReducer");
var _store = require("../../store/store");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// выбор толщины кисти

var Linewidth = /*#__PURE__*/(0, _react.memo)(function () {
  var dispatch = (0, _reactRedux.useDispatch)();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDroppedDown = _useState2[0],
    setIsDroppedDown = _useState2[1];
  var chooseOption = function chooseOption(number) {
    dispatch((0, _brushReducer.changeBrush)(number));
  };
  (0, _react.useEffect)(function () {
    var func = function func(e) {
      if (e.target != document.querySelector('.linewidth-container .title') && e.target != document.querySelectorAll('.linewidth-container .title img')[0] && e.target != document.querySelectorAll('.linewidth-container .title img')[1]) {
        setIsDroppedDown(false);
      }
    };
    window.addEventListener('click', func);
    return function () {
      window.removeEventListener('click', func);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "linewidth-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "linewidth-selector"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title",
    onClick: function onClick() {
      return setIsDroppedDown(!isDroppedDown);
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/brush.png",
    width: 35,
    height: 35
  }), /*#__PURE__*/React.createElement("img", {
    src: "/Assets/arrowDown.png",
    alt: "arrow down",
    width: 16,
    height: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "options",
    style: isDroppedDown ? {
      display: "flex"
    } : {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(4);
    }
  }, "4px"), /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(6);
    }
  }, "6px"), /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(8);
    }
  }, "8px"), /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(10);
    }
  }, "10px"))), /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "\u0422\u043E\u043B\u0449\u0438\u043D\u0430 \u043A\u0438\u0441\u0442\u0438"));
});
var _default = Linewidth;
exports.default = _default;