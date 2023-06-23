"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _store = require("../../store/store");
var _reactColor = require("react-color");
var _colorReducer = require("../../store/reducers/colorReducer");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// изменение цвета

var Color = function Color() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    colorPickerDisplay = _useState2[0],
    setColorPickerDisplay = _useState2[1];
  var color = (0, _reactRedux.useSelector)(function (state) {
    return state.colorReducer.color;
  });
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    var func = function func(e) {
      var recursion = function recursion(htmlElement) {
        if (htmlElement == document.querySelector('.color-picker')) {
          setColorPickerDisplay(true);
          return;
        }
        if (htmlElement == document.querySelector('body')) {
          setColorPickerDisplay(false);
          return;
        }
        setColorPickerDisplay(false);
        recursion(htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.parentElement);
      };
      recursion(e.target);
      if (e.target == document.querySelector('.color-wrapper img')) {
        setColorPickerDisplay(true);
      }
    };
    window.addEventListener('click', func);
    return function () {
      window.removeEventListener('click', func);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "color-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "current-color",
    style: {
      backgroundColor: color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "all-color"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'black'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('black'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'white'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('white'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'grey'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('grey'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'brown'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('brown'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'green'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('green'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'yellow'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('yellow'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'red'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('red'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'orange'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('orange'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'cyan'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('cyan'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'purple'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('purple'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'pink'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('pink'));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "one-color",
    style: {
      backgroundColor: 'blue'
    },
    onClick: function onClick() {
      return dispatch((0, _colorReducer.changeColor)('blue'));
    }
  })), /*#__PURE__*/React.createElement("img", {
    src: "/Assets/colorWheel.png",
    width: 60,
    height: 60,
    style: {
      objectFit: 'fill',
      marginLeft: 20
    },
    onClick: function onClick() {
      return setColorPickerDisplay(!colorPickerDisplay);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "\u0426\u0432\u0435\u0442\u0430")), /*#__PURE__*/React.createElement("div", {
    className: "color-picker",
    style: colorPickerDisplay ? {
      display: 'flex'
    } : {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement(_reactColor.SketchPicker, {
    width: "100%",
    color: color,
    onChange: function onChange(newColor) {
      return dispatch((0, _colorReducer.changeColor)(newColor.hex));
    }
  })));
};
var _default = Color;
exports.default = _default;