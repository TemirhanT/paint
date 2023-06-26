"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _store = require("../../store/store");
var _figureReducer = require("../../store/reducers/figureReducer");
var _Circle = require("../../DrawFunctions/Circle");
var _Line = require("../../DrawFunctions/Line");
var _Rectangle = require("../../DrawFunctions/Rectangle");
var _Triangle = require("../../DrawFunctions/Triangle");
var _memoryReducer = require("../../store/reducers/memoryReducer");
var _Redraw = require("../../DrawFunctions/Redraw");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// выбор фигуры для рисования

var Figures = /*#__PURE__*/(0, _react.memo)(function () {
  // ПЕРЕМЕННЫЕ
  // 
  // 
  // 
  // 
  // 
  // 
  var figuresStrokePng = "/Assets/figuresStroke.png";
  var figuresFillPng = "/Assets/figuresFill.png";
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isFiguresDroppedDown = _useState2[0],
    setIsFiguresDroppedDown = _useState2[1];
  var _useState3 = (0, _react.useState)(figuresStrokePng),
    _useState4 = _slicedToArray(_useState3, 2),
    imgSrc = _useState4[0],
    setImgSrc = _useState4[1];
  var canvasCtx = (0, _reactRedux.useSelector)(function (state) {
    return state.canvasReducer.canvasCtx;
  });
  var isAltKeyDown = (0, _reactRedux.useSelector)(function (state) {
    return state.canvasReducer.isAltKeyDownReducer;
  });
  var figureState = (0, _reactRedux.useSelector)(function (state) {
    return state.figureReducer;
  });
  var cash = (0, _reactRedux.useSelector)(function (state) {
    return state.memoryReducer.cash;
  });
  var step = (0, _reactRedux.useSelector)(function (state) {
    return state.memoryReducer.step;
  });
  var dispatch = (0, _reactRedux.useDispatch)();

  // комбинация отрисовки и перерисовки
  var lineFigure = function lineFigure(x, y, linewidth, color, scale) {
    if (!isAltKeyDown) {
      dispatch((0, _memoryReducer.pushCash)(['line', x, y, linewidth, color, scale]));
    }
    (0, _Line.drawLine)(x, y, linewidth, color, scale, canvasCtx);
  };
  var rectangleFigure = function rectangleFigure(x, y, linewidth, color, scale, startX, startY, isFill) {
    (0, _Redraw.redraw)(canvasCtx, cash.slice(0, cash.length + step)); //тут и дальше используется слайс, потому что сам кэш изменяется только после pushCash события
    // а оно происходит только при mouseLeaveAndUp и получается в функции рисования прокидывается старая версия кеша
    // из за этого пока пользователь удерживает мышку рисуя фигуру(все кроме линии), он будет видеть уже удаленные моменты
    // если хотите посмотреть, можете вместо кэш.слайс вставить просто кэш
    (0, _Rectangle.drawRectangle)(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill);
  };
  var triangleFigure = function triangleFigure(x, y, linewidth, color, scale, startX, startY, isFill) {
    (0, _Redraw.redraw)(canvasCtx, cash.slice(0, cash.length + step));
    (0, _Triangle.drawTriangle)(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill);
  };
  var circleFigure = function circleFigure(x, y, linewidth, color, scale, startX, startY, isFill) {
    (0, _Redraw.redraw)(canvasCtx, cash.slice(0, cash.length + step));
    (0, _Circle.drawCircle)(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill);
  };

  // ПЕРЕНАЗНАЧЕНИЕ ФУНКЦИИ РИСОВАНИЯ ДЛЯ ОБНОВЛЕНИЯ ПЕРЕМЕННЫХ И ПЕРЕРИСОВКА ПРИ ИЗМЕНЕНИИ РАЗМЕРОВ ОКНА
  // 
  // 
  // 
  // 
  // 
  // 
  (0, _react.useEffect)(function () {
    dispatch((0, _figureReducer.setFigureDraw)(lineFigure));
  }, [canvasCtx]);
  (0, _react.useEffect)(function () {
    if (figureState.figureType == 'line') {
      dispatch((0, _figureReducer.setFigureDraw)(lineFigure));
    }
    if (figureState.figureType == 'rectangle') {
      dispatch((0, _figureReducer.setFigureDraw)(rectangleFigure));
    }
    if (figureState.figureType == 'triangle') {
      dispatch((0, _figureReducer.setFigureDraw)(triangleFigure));
    }
    if (figureState.figureType == 'circle') {
      dispatch((0, _figureReducer.setFigureDraw)(circleFigure));
    }
  }, [cash, step, isAltKeyDown]);
  (0, _react.useEffect)(function () {
    var func = function func() {
      if (cash && canvasCtx) {
        (0, _Redraw.redraw)(canvasCtx, cash);
      }
    };
    window.addEventListener('resize', func);
    return function () {
      window.removeEventListener('resize', func);
    };
  }, [cash]);
  (0, _react.useEffect)(function () {
    var func = function func(e) {
      if (e.target != document.querySelector('.fill-selector .title') && e.target != document.querySelectorAll('.fill-selector .title img')[0] && e.target != document.querySelectorAll('.fill-selector .title img')[1]) {
        setIsFiguresDroppedDown(false);
        console.log(e.target);
      }
    };
    window.addEventListener('click', func);
    return function () {
      window.removeEventListener('click', func);
    };
  }, []);

  // ФУНКЦИИ ВЫБОРА ТИПА РИСОВАНИЯ    
  // 
  // 
  // 
  // 
  // 
  // 
  var chooseLine = function chooseLine() {
    dispatch((0, _figureReducer.setFigureDraw)(lineFigure));
    dispatch((0, _figureReducer.setFigureType)('line'));
  };
  var chooseRectangle = function chooseRectangle() {
    dispatch((0, _figureReducer.setFigureDraw)(rectangleFigure));
    dispatch((0, _figureReducer.setFigureType)('rectangle'));
  };
  var chooseTriangle = function chooseTriangle() {
    dispatch((0, _figureReducer.setFigureDraw)(triangleFigure));
    dispatch((0, _figureReducer.setFigureType)('triangle'));
  };
  var chooseCircle = function chooseCircle() {
    dispatch((0, _figureReducer.setFigureDraw)(circleFigure));
    dispatch((0, _figureReducer.setFigureType)('circle'));
  };
  var chooseOption = function chooseOption(bool, png) {
    setImgSrc(png);
    dispatch((0, _figureReducer.setIsFill)(bool));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "figures-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "figures"
  }, /*#__PURE__*/React.createElement("button", {
    className: "figure",
    onClick: function onClick() {
      return chooseLine();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/curved-line.png"
  })), /*#__PURE__*/React.createElement("button", {
    className: "figure",
    onClick: function onClick() {
      return chooseTriangle();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/triangle.png"
  })), /*#__PURE__*/React.createElement("button", {
    className: "figure",
    onClick: function onClick() {
      return chooseRectangle();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/square.png"
  })), /*#__PURE__*/React.createElement("button", {
    className: "figure",
    onClick: function onClick() {
      return chooseCircle();
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/circle.png"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fill-selector"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title",
    onClick: function onClick() {
      setIsFiguresDroppedDown(!isFiguresDroppedDown);
      console.log('24');
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: imgSrc,
    width: 24,
    height: 24
  }), /*#__PURE__*/React.createElement("img", {
    src: "/Assets/arrowDown.png",
    alt: "arrow down",
    width: 16,
    height: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "options",
    style: isFiguresDroppedDown ? {
      display: "flex"
    } : {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(false, figuresStrokePng);
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/figuresStroke.png",
    width: 24,
    height: 24
  }), /*#__PURE__*/React.createElement("div", null, "\u041E\u0431\u0432\u043E\u0434\u0438\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "option",
    onClick: function onClick() {
      return chooseOption(true, figuresFillPng);
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/Assets/figuresFill.png",
    width: 24,
    height: 24
  }), /*#__PURE__*/React.createElement("div", null, "\u0417\u0430\u043F\u043E\u043B\u043D\u044F\u0442\u044C")))), /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "\u0424\u0438\u0433\u0443\u0440\u044B"));
});
var _default = Figures;
exports.default = _default;