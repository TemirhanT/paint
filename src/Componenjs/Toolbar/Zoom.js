"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRedux = require("react-redux");
var _store = require("../../store/store");
var _zoomReducer = require("../../store/reducers/zoomReducer");
var _memoryReducer = require("../../store/reducers/memoryReducer");
var _react = require("react");
// изменения зума и переменных, связанных с зумом

var Zoom = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var zoomIn = _ref.zoomIn,
    zoomOut = _ref.zoomOut,
    centerView = _ref.centerView,
    resetTransform = _ref.resetTransform;
  var zoom = (0, _reactRedux.useSelector)(function (state) {
    return state.zoomReducer;
  });
  var cash = (0, _reactRedux.useSelector)(function (state) {
    return state.memoryReducer.cash;
  });
  var canvasCtx = (0, _reactRedux.useSelector)(function (state) {
    return state.canvasReducer.canvasCtx;
  });
  var dispatch = (0, _reactRedux.useDispatch)();
  var customZoomIn = function customZoomIn() {
    dispatch((0, _zoomReducer.myZoomIn)());
    zoomIn(zoom.step, 60);
  };
  var customZoomOut = function customZoomOut() {
    dispatch((0, _zoomReducer.myZoomOut)());
    zoomOut(zoom.step, 60);
  };
  var customReset = function customReset() {
    dispatch((0, _zoomReducer.myReset)());
    resetTransform(60);
    dispatch((0, _memoryReducer.clearCash)());
    canvasCtx.fillStyle = 'white';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "zoom"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/zoom-in.png",
    onClick: function onClick() {
      return customZoomIn();
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "/Assets/zoom-out.png",
    onClick: function onClick() {
      return customZoomOut();
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "/Assets/reset.png",
    onClick: function onClick() {
      return customReset();
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u0417\u0443\u043C: ", zoom.currentScale), /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "\u041F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u0438\u0435/\u041E\u0442\u0434\u0430\u043B\u0435\u043D\u0438\u0435/\u0421\u0431\u0440\u043E\u0441"));
});
var _default = Zoom;
exports.default = _default;