"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _store = require("../../store/store");
var _memoryReducer = require("../../store/reducers/memoryReducer");
var _Redraw = require("../../DrawFunctions/Redraw");
var CancelRetrieve = /*#__PURE__*/(0, _react.memo)(function () {
  var canvasCtx = (0, _reactRedux.useSelector)(function (state) {
    return state.canvasReducer.canvasCtx;
  });
  var cash = (0, _reactRedux.useSelector)(function (state) {
    return state.memoryReducer.cash;
  });
  var step = (0, _reactRedux.useSelector)(function (state) {
    return state.memoryReducer.step;
  });
  var dispatch = (0, _reactRedux.useDispatch)();
  var retrieve = function retrieve() {
    for (var i = cash.length + step; i < cash.length; i++) {
      dispatch((0, _memoryReducer.stepIncr)());
      if (cash[+i] === null) break;
    }
  };
  var cancel = function cancel() {
    for (var i = cash.length - 2 + step; i >= 0; i--) {
      dispatch((0, _memoryReducer.stepDecr)());
      if (cash[+i] === null) break;
    }
  };
  var stepDraw = function stepDraw() {
    var changedCash = cash.slice(0, cash.length - 1 + step);
    (0, _Redraw.redraw)(canvasCtx, changedCash);
  };

  // изначально был вариант с stepDraw() вкладывать сразу в retrieve и cancel
  // но значение step использовалось прошлое 
  // так что тут я сделал что то вроде async await
  // то есть как только step диспачится то вызывается useEffect с обновленным значением
  (0, _react.useEffect)(function () {
    if (cash && canvasCtx) {
      stepDraw();
    }
  }, [step, canvasCtx]);
  return /*#__PURE__*/React.createElement("div", {
    className: "cancel-retrieve-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cancel-retrieve"
  }, /*#__PURE__*/React.createElement("img", {
    className: cash.length - 1 + step <= 0 ? "unactive" : '',
    src: "/Assets/cancel.png",
    onClick: function onClick() {
      return cancel();
    }
  }), /*#__PURE__*/React.createElement("img", {
    className: step == 0 ? "unactive" : '',
    src: "/Assets/retrieve.png",
    onClick: function onClick() {
      return retrieve();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "\u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C/\u0432\u0435\u0440\u043D\u0443\u0442\u044C"));
});
var _default = CancelRetrieve;
exports.default = _default;