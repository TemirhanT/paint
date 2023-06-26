"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _exports = require("react-redux/es/exports");
var _store = require("../store/store");
var _reactRedux = require("react-redux");
var _reactZoomPanPinch = require("react-zoom-pan-pinch");
var _Zoom = _interopRequireDefault(require("./Toolbar/Zoom"));
var _reactIntersectionObserver = require("react-intersection-observer");
var _canvasReducer = require("../store/reducers/canvasReducer");
var _figureReducer = require("../store/reducers/figureReducer");
var _memoryReducer = require("../store/reducers/memoryReducer");
var _zoomReducer = require("../store/reducers/zoomReducer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Canvas = /*#__PURE__*/(0, _react.memo)(function () {
  // ЧАСТЬ С ПЕРЕМЕННЫМИ
  // 
  // почти все значения, связанные с Y координатой имеют -270. 
  // Это место, занимаемое тулбаром и небольшим пробелом между тулбаром и канвасом
  // toolbar: 250px,   space: 20px
  // 
  // 
  // 
  // 
  // 
  // 
  var _useState = (0, _react.useState)(window.innerWidth - 20),
    _useState2 = _slicedToArray(_useState, 2),
    width = _useState2[0],
    setWidth = _useState2[1];
  var _useState3 = (0, _react.useState)(window.innerHeight - 274),
    _useState4 = _slicedToArray(_useState3, 2),
    height = _useState4[0],
    setHeight = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    startX = _useState6[0],
    setStartX = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    startY = _useState8[0],
    setStartY = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isMouseDown = _useState10[0],
    setIsMouseDown = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isAltKeyDown = _useState12[0],
    setIsAltKeyDown = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isAltKeyWasDown = _useState14[0],
    setIsAltKeyWasDown = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    isAltKeyDownBeforeMouse = _useState16[0],
    setIsAltKeyDownBeforeMouse = _useState16[1];
  var _useState17 = (0, _react.useState)(0),
    _useState18 = _slicedToArray(_useState17, 2),
    difX = _useState18[0],
    setDifX = _useState18[1];
  var _useState19 = (0, _react.useState)(0),
    _useState20 = _slicedToArray(_useState19, 2),
    difY = _useState20[0],
    setDifY = _useState20[1];
  var _useState21 = (0, _react.useState)(width / 2),
    _useState22 = _slicedToArray(_useState21, 2),
    centerX = _useState22[0],
    setCenterX = _useState22[1];
  var _useState23 = (0, _react.useState)(height / 2),
    _useState24 = _slicedToArray(_useState23, 2),
    centerY = _useState24[0],
    setCenterY = _useState24[1];

  // переменные для отслеживания краев экрана
  // в случае, если края экрана видны пользователю, значения centerX и centerY будут определенными
  var options = {
    threshold: 0
  };
  var _useInView = (0, _reactIntersectionObserver.useInView)(options),
    _useInView2 = _slicedToArray(_useInView, 3),
    topRef = _useInView2[0],
    topInView = _useInView2[1],
    topEntry = _useInView2[2];
  var _useInView3 = (0, _reactIntersectionObserver.useInView)(options),
    _useInView4 = _slicedToArray(_useInView3, 3),
    rightRef = _useInView4[0],
    rightInView = _useInView4[1],
    rightEntry = _useInView4[2];
  var _useInView5 = (0, _reactIntersectionObserver.useInView)(options),
    _useInView6 = _slicedToArray(_useInView5, 3),
    bottomRef = _useInView6[0],
    bottomInView = _useInView6[1],
    bottomEntry = _useInView6[2];
  var _useInView7 = (0, _reactIntersectionObserver.useInView)(options),
    _useInView8 = _slicedToArray(_useInView7, 3),
    leftRef = _useInView8[0],
    leftInView = _useInView8[1],
    leftEntry = _useInView8[2];
  var _useState25 = (0, _react.useState)(1),
    _useState26 = _slicedToArray(_useState25, 2),
    prevScale = _useState26[0],
    setPrevScale = _useState26[1];
  var _useState27 = (0, _react.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    delay = _useState28[0],
    setDelay = _useState28[1];
  var transformRef = (0, _react.useRef)(null);
  var canvasRef = (0, _react.useRef)(null);
  var canvasCtx = (0, _exports.useSelector)(function (state) {
    return state.canvasReducer.canvasCtx;
  });
  var figureState = (0, _exports.useSelector)(function (state) {
    return state.figureReducer;
  });
  var linewidth = (0, _exports.useSelector)(function (state) {
    return state.brushReducer.linewidth;
  });
  var color = (0, _exports.useSelector)(function (state) {
    return state.colorReducer.color;
  });
  var zoom = (0, _exports.useSelector)(function (state) {
    return state.zoomReducer;
  });
  var cash = (0, _exports.useSelector)(function (state) {
    return state.memoryReducer.cash;
  });
  var dispatch = (0, _reactRedux.useDispatch)();

  // ЧАСТЬ С USEEFFECT'АМИ
  // 
  // 
  // 
  // 
  // 
  // 
  // 
  // 
  (0, _react.useEffect)(function () {
    var _canvasRef$current;
    dispatch((0, _canvasReducer.setCanvasCtx)((_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.getContext('2d')));
  }, [canvasRef]);
  (0, _react.useEffect)(function () {
    if (canvasCtx) {
      canvasCtx.fillStyle = color;
      canvasCtx.strokeStyle = color;
      canvasCtx.lineWidth = linewidth;
    }
  }, [canvasCtx, linewidth, color]);
  (0, _react.useEffect)(function () {
    var func = function func() {
      var _transformRef$current;
      setWidth(window.innerWidth - 20);
      setCenterX((window.innerWidth - 20) / 2);
      setHeight(window.innerHeight - 274);
      setCenterY((window.innerHeight - 274) / 2);
      (_transformRef$current = transformRef.current) === null || _transformRef$current === void 0 ? void 0 : _transformRef$current.resetTransform(60);
      dispatch((0, _zoomReducer.myReset)());
    };
    window.addEventListener('resize', func);
    return function () {
      window.removeEventListener('resize', func);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var func = function func(e) {
      if (e.altKey) {
        setIsAltKeyDown(true);
        dispatch((0, _canvasReducer.setIsAltKeyDownReducer)(true));
        if (canvasRef.current) {
          canvasRef.current.style.cursor = 'grab';
        }
      }
    };
    window.addEventListener('keydown', func);
    return function () {
      window.removeEventListener('keydown', func);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var func = function func() {
      setIsAltKeyDown(false);
      dispatch((0, _canvasReducer.setIsAltKeyDownReducer)(false));
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'default';
      }
    };
    window.addEventListener('keyup', func);
    return function () {
      window.removeEventListener('keyup', func);
    };
  }, []);

  // useEffect'ы для определения касается ли поле зрения пользователя края канваса
  // значение передвинутых центров перестают учитывать difX и difY и расчитываются по другим формулам
  // useEffect'ы с дилэем и currentScale'ом в дэпсах нужны для случаев, когда пользователь уменьшает зум и задевает край экрана,во время расширения
  // а delay позволяет дать время обновится значению скейла и правильно расчитать значение центра
  (0, _react.useEffect)(function () {
    setCenterX(function (prev) {
      if (leftEntry !== null && leftEntry !== void 0 && leftEntry.isIntersecting) return width / (2 * zoom.currentScale);
      if (rightEntry !== null && rightEntry !== void 0 && rightEntry.isIntersecting) return width - width / (2 * zoom.currentScale);
      return prev + difX / zoom.currentScale;
    });
  }, [difX]);
  (0, _react.useEffect)(function () {
    setCenterY(function (prev) {
      if (topEntry !== null && topEntry !== void 0 && topEntry.isIntersecting) return height / (2 * zoom.currentScale);
      if (bottomEntry !== null && bottomEntry !== void 0 && bottomEntry.isIntersecting) return height - height / (2 * zoom.currentScale);
      return prev + difY / zoom.currentScale;
    });
  }, [difY]);
  (0, _react.useEffect)(function () {
    var timeout = setTimeout(function () {
      setDelay(!delay);
    }, 100);
    return function () {
      clearTimeout(timeout);
    };
  }, [zoom.currentScale]);
  (0, _react.useEffect)(function () {
    setCenterX(function (prev) {
      if (zoom.currentScale == 1) return width / 2;
      if (leftEntry !== null && leftEntry !== void 0 && leftEntry.isIntersecting && zoom.currentScale < prevScale) return width / (2 * zoom.currentScale);
      if (rightEntry !== null && rightEntry !== void 0 && rightEntry.isIntersecting && zoom.currentScale < prevScale) return width - width / (2 * zoom.currentScale);
      return prev;
    });
    setCenterY(function (prev) {
      if (zoom.currentScale == 1) return height / 2;
      if (topEntry !== null && topEntry !== void 0 && topEntry.isIntersecting && zoom.currentScale < prevScale) return height / (2 * zoom.currentScale);
      if (bottomEntry !== null && bottomEntry !== void 0 && bottomEntry.isIntersecting && zoom.currentScale < prevScale) return height - height / (2 * zoom.currentScale);
      return prev;
    });
    setPrevScale(zoom.currentScale);
  }, [delay]);

  // ЧАСТЬ С СОБЫТИЯМИ МЫШИ И РИСОВКОЙ
  // 
  // Рисование работает основываясь на значении центра, которое может изменяться.
  // Значение центра может меняться, если пользователь захочет передвинуть холст.
  // Эффект передвижения работает благодаря библиотеке react-zoom-pan-pinch.
  // Однако при зуме и передвижении по холсту, координаты нарисованной линии будут не совпадать с тем, куда нажимал пользователь.
  // Для этого значения координат пересчитываются с учетом отдаления мышки от centerX и centerY, а также учитывается zoom.currentScale.
  // 
  // 
  // Пример.  Вы увеличили зум в два раза и поставили точку в самую правую часть экрана. Зум происходит именно в центр экрана
  // Пусть ширина будет 1000, centerX изначально 500.
  // Так как зум = 2, то пользователь видит территорию от 250 до 750 координат, и ставя точку в самый край, ожидается, что точка будет на 750, но она отрисовывается на 1000, за пределами поля зрения пользователя.
  // Для вычисления нужных координат я нахожу разницу от непередвинутого центра экрана(width/2), делю ее на нынешнее значение зума и прибавляю к передвинотому центру экрана(centerX), то есть 500 + (1000 - 500)/2.
  // Я описал принцип работы этой формулы centerX + (e.pageX - width/2)/zoom.currentScale
  // 
  // 
  // Как уже говорил, centerX может меняться.
  // При зажатой alt, вместо рисования происходит движение по холсту и сэтится значение difX, которая отвечает за обновление centerX.
  // setDifX происходит при отпускании мыши(функция mouseUp ниже) и при выходе мыши за края экрана(функция mouseLeave ниже), а обновление centerX происходит в разделе с UseEffect'ами выше.
  // 
  // 
  // 
  // В функциях присутствует много проверок, чтобы предотвратить разные баги. Также есть pushCash, который нужен для перерисовки во время рисования фигур
  // 
  //  
  function mouseDown(e) {
    if (e.button == 2 || e.button == 1) return;
    setIsMouseDown(true);
    if (isAltKeyDown) {
      setIsAltKeyDownBeforeMouse(true);
      setStartX(e.pageX);
      setStartY(e.pageY);
      return;
    }
    canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.beginPath();
    dispatch((0, _figureReducer.setFigureStartX)(centerX + (e.pageX - width / 2) / zoom.currentScale));
    dispatch((0, _figureReducer.setFigureStartY)(centerY + (e.pageY - height / 2) / zoom.currentScale));
    draw(centerX + (e.pageX - width / 2) / zoom.currentScale, centerY + (e.pageY - height / 2) / zoom.currentScale);
  }
  function dispatchDuringMouseEvent(e) {
    if (!isAltKeyWasDown && !isAltKeyDownBeforeMouse) {
      if (figureState.figureType == 'line') {
        dispatch((0, _memoryReducer.pushCash)(null));
      } else {
        dispatch((0, _memoryReducer.pushCash)([figureState.figureType, centerX + (e.pageX - width / 2) / zoom.currentScale, centerY + (e.pageY - height / 2) / zoom.currentScale, linewidth, color, zoom.currentScale, figureState.figureStartX, figureState.figureStartY, figureState.isFill]));
        dispatch((0, _memoryReducer.pushCash)(null));
      }
    }
  }
  function mouseLeaveAndUp(e) {
    setIsMouseDown(false);
    if (isAltKeyWasDown && isAltKeyDownBeforeMouse) {
      setDifX(startX - e.pageX);
      setDifY(startY - e.pageY);
      setIsAltKeyWasDown(false);
      setIsAltKeyDownBeforeMouse(false);
      return;
    }
    if (isMouseDown) {
      draw(centerX + (e.pageX - width / 2) / zoom.currentScale, centerY + (e.pageY - height / 2) / zoom.currentScale);
      dispatchDuringMouseEvent(e);
    }
    canvasCtx.beginPath();
  }
  var mouseMove = function mouseMove(e) {
    if (!isMouseDown) return;
    if (isAltKeyDown && isAltKeyDownBeforeMouse) {
      setIsAltKeyWasDown(true);
      return;
    }
    if (isAltKeyWasDown && !isAltKeyDown && isAltKeyDownBeforeMouse) {
      setDifX(startX - e.pageX);
      setDifY(startY - e.pageY);
      setIsAltKeyWasDown(false);
      setIsAltKeyDownBeforeMouse(false);
      setIsMouseDown(false);
      canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.beginPath();
      return;
    }
    draw(centerX + (e.pageX - width / 2) / zoom.currentScale, centerY + (e.pageY - height / 2) / zoom.currentScale);
  };

  // порядок пропсов: 
  // 1.координата мыши по горизонтали 
  // 2.по вертикали 
  // 3.толщина линии фигуры 
  // 4.цвет  
  // 5.скейл 
  // 6.начальная точка фигуры по горизонтали (сэтится при mouseDown)
  // 7.по вертикали(сэтится при mouseDown)
  // 8.заполнять фигуру или рисовать только контур
  function draw(x, y) {
    if (!isMouseDown) {
      figureState.figureDraw(x, y, linewidth, color, zoom.currentScale, x - linewidth, y + linewidth, figureState.isFill);
    } else {
      figureState.figureDraw(x, y, linewidth, color, zoom.currentScale, figureState.figureStartX - linewidth, figureState.figureStartY + linewidth, figureState.isFill);
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "canvas-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_reactZoomPanPinch.TransformWrapper, {
    ref: transformRef,
    initialScale: zoom.currentScale,
    minScale: zoom.minScale,
    maxScale: zoom.maxScale,
    panning: {
      activationKeys: ["Alt"],
      velocityDisabled: true
    },
    disablePadding: true,
    wheel: {
      disabled: true
    },
    doubleClick: {
      disabled: true
    }
  }, function (utils) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Zoom.default, utils), /*#__PURE__*/_react.default.createElement(_reactZoomPanPinch.TransformComponent, null, /*#__PURE__*/_react.default.createElement("canvas", {
      ref: canvasRef,
      role: "img",
      style: {
        display: 'block'
      },
      height: height,
      width: width,
      className: "canvas",
      onMouseDown: function onMouseDown(e) {
        return mouseDown(e);
      },
      onMouseMove: function onMouseMove(e) {
        return mouseMove(e);
      },
      onMouseUp: function onMouseUp(e) {
        return mouseLeaveAndUp(e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return mouseLeaveAndUp(e);
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      ref: topRef,
      className: "observed-top"
    }), /*#__PURE__*/_react.default.createElement("div", {
      ref: rightRef,
      className: "observed-right"
    }), /*#__PURE__*/_react.default.createElement("div", {
      ref: bottomRef,
      className: "observed-bottom"
    }), /*#__PURE__*/_react.default.createElement("div", {
      ref: leftRef,
      className: "observed-left"
    })));
  }));
});
var _default = Canvas;
exports.default = _default;