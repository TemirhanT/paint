"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _Canvas = _interopRequireDefault(require("../Canvas"));
var _CancelRetrieveTutorial = _interopRequireDefault(require("./ToolbarTutorial/CancelRetrieveTutorial"));
var _ColorTutorial = _interopRequireDefault(require("./ToolbarTutorial/ColorTutorial"));
var _FiguresTutorial = _interopRequireDefault(require("./ToolbarTutorial/FiguresTutorial"));
var _LinewidthTutorial = _interopRequireDefault(require("./ToolbarTutorial/LinewidthTutorial"));
var _ZoomTutorial = _interopRequireDefault(require("./ToolbarTutorial/ZoomTutorial"));
var _IsPanningMobileTutorial = _interopRequireDefault(require("./ToolbarTutorial/IsPanningMobileTutorial"));
var _reactDeviceDetect = require("react-device-detect");
var _CanvasTutorial = _interopRequireDefault(require("./ToolbarTutorial/CanvasTutorial"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Tutorial = /*#__PURE__*/(0, _react.memo)(function () {
  var _ref = _react.useState < boolean > false,
    _ref2 = _slicedToArray(_ref, 2),
    isAllWatched = _ref2[0],
    setIsAllWatched = _ref2[1];
  var _ref3 = _react.useState < number > 0,
    _ref4 = _slicedToArray(_ref3, 2),
    whatAct = _ref4[0],
    setWhatAct = _ref4[1];
  var watchAgain = function watchAgain() {
    setIsAllWatched(false);
    setWhatAct(-1);
  };
  (0, _react.useEffect)(function () {
    var bool = localStorage.getItem('isAllWatched');
    if (bool) {
      setIsAllWatched(/true/.test(bool));
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (whatAct == 11) {
      setIsAllWatched(true);
    }
  }, [whatAct]);
  (0, _react.useEffect)(function () {
    function func() {
      if (whatAct < 12) {
        setWhatAct(function (prev) {
          return prev + 1;
        });
      }
    }
    window.addEventListener('click', func);
    return function () {
      window.removeEventListener('click', func);
    };
  }, []);
  (0, _react.useEffect)(function () {
    function func() {
      if (whatAct < 12) {
        setWhatAct(function (prev) {
          return prev + 1;
        });
      }
    }
    window.addEventListener('keydown', func);
    return function () {
      window.removeEventListener('keydown', func);
    };
  }, []);
  (0, _react.useEffect)(function () {
    localStorage.setItem('isAllWatched', "".concat(isAllWatched));
  }, [isAllWatched]);

  //чтобы выделить компоненты на фоне всей остальной страницы я покрасил задний фон 
  //однако для указывания на компоненты тулбара и канваса нужно было вернуть как то цвет над этими компонентами
  //для этого я помещаю новые компненты поверх неюзабельных
  //после прохождения обучения они пропадают так что на работоспособность это никак не влияет

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tutorial-container",
    style: isAllWatched ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "start",
    style: whatAct !== 0 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u042D\u0442\u043E \u043A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u0430 \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0432\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F. \u0414\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043B\u044E\u0431\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443\u044E."), /*#__PURE__*/React.createElement("div", {
    className: "action-1",
    style: whatAct !== 1 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441\u043E\u0441\u0442\u043E\u0438\u0442 \u0438\u0437 \u0434\u0432\u0443\u0445 \u0431\u043B\u043E\u043A\u043E\u0432."), /*#__PURE__*/React.createElement("div", {
    className: "action-2-container",
    style: whatAct !== 2 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-2"
  }, "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_CancelRetrieveTutorial.default, null), /*#__PURE__*/React.createElement(_LinewidthTutorial.default, null), /*#__PURE__*/React.createElement(_ColorTutorial.default, null), /*#__PURE__*/React.createElement(_FiguresTutorial.default, null), /*#__PURE__*/React.createElement(_ZoomTutorial.default, null), /*#__PURE__*/React.createElement(_IsPanningMobileTutorial.default, null))), /*#__PURE__*/React.createElement("div", {
    className: "action-3-container",
    style: whatAct !== 3 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-3"
  }, "\u0418 \u0445\u043E\u043B\u0441\u0442."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar",
    style: {
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement(_CancelRetrieveTutorial.default, null), /*#__PURE__*/React.createElement(_LinewidthTutorial.default, null), /*#__PURE__*/React.createElement(_ColorTutorial.default, null), /*#__PURE__*/React.createElement(_FiguresTutorial.default, null), /*#__PURE__*/React.createElement(_ZoomTutorial.default, null), /*#__PURE__*/React.createElement(_IsPanningMobileTutorial.default, null)), /*#__PURE__*/React.createElement("div", {
    className: "space"
  }), /*#__PURE__*/React.createElement(_CanvasTutorial.default, null)), /*#__PURE__*/React.createElement("div", {
    className: "action-4-container",
    style: whatAct !== 4 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-4"
  }, "\u0421\u0440\u0435\u0434\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0435\u0441\u0442\u044C \u043E\u0442\u043C\u0435\u043D\u0430 \u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_CancelRetrieveTutorial.default, null))), /*#__PURE__*/React.createElement("div", {
    className: "action-5-container",
    style: whatAct !== 5 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-5"
  }, "\u0412\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u0437\u0443\u043C\u043E\u043C \u043D\u0430 \u0445\u043E\u043B\u0441\u0442\u0435 \u0438 \u043D\u044B\u043D\u0435\u0448\u043D\u0435\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0437\u0443\u043C\u0430."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_ZoomTutorial.default, null))), /*#__PURE__*/React.createElement("div", {
    className: "action-6-container",
    style: whatAct !== 6 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-6"
  }, "\u0412\u044B\u0431\u043E\u0440 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043A\u0438\u0441\u0442\u0438."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_LinewidthTutorial.default, null))), /*#__PURE__*/React.createElement("div", {
    className: "action-7-container",
    style: whatAct !== 7 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-7"
  }, "\u0412\u044B\u0431\u043E\u0440 \u0446\u0432\u0435\u0442\u0430. \u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0443\u0436\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0446\u0432\u0435\u0442\u043E\u0432, \u043D\u043E \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u043D\u0443\u044E \u043F\u0430\u043B\u0438\u0442\u0440\u0443, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0440\u0430\u0437\u043D\u043E\u0446\u0432\u0435\u0442\u043D\u044B\u0439 \u043A\u0440\u0443\u0433 \u0441\u043F\u0440\u0430\u0432\u0430."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_ColorTutorial.default, null))), /*#__PURE__*/React.createElement("div", {
    className: "action-8-container",
    style: whatAct !== 8 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-8"
  }, "\u0418 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u0433\u0443\u0440 \u0434\u043B\u044F \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F. \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0441\u0442\u043E\u0438\u0442 \u043F\u0435\u0440\u0432\u0430\u044F \u0444\u0438\u0433\u0443\u0440\u0430 - \u043B\u0438\u043D\u0438\u044F, \u0442\u043E \u0435\u0441\u0442\u044C \u043E\u0431\u044B\u0447\u043D\u043E\u0435 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435. \u0412\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0436\u0430\u0442\u044C \u043D\u0430 \u0442\u0440\u0438 \u043A\u0443\u0431\u0438\u043A\u0430 \u0441\u043F\u0440\u0430\u0432\u0430 \u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0432\u0430\u043C \u0440\u0438\u0441\u0443\u0435\u043C\u0443\u044E \u0444\u0438\u0433\u0443\u0440\u0443 \u0438\u043B\u0438 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u043E\u043D\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0431\u0432\u043E\u0434\u0438\u043B\u0430\u0441\u044C."), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_FiguresTutorial.default, null))), /*#__PURE__*/React.createElement(_reactDeviceDetect.BrowserView, null, /*#__PURE__*/React.createElement("div", {
    className: "action-9",
    style: whatAct !== 9 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, "\u0423 \u0445\u043E\u043B\u0441\u0442\u0430 \u0435\u0441\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u043D\u0430 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u0430\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u044F - \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0445\u043E\u043B\u0441\u0442\u0443. \u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u0443\u0436\u043D\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u0443\u043C\u0430, \u0432\u0435\u0434\u044C \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u0442 \u043B\u0438\u0448\u044C \u0432 \u0446\u0435\u043D\u0442\u0440 \u0432\u0430\u0448\u0435\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430. \u0414\u043B\u044F \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0437\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 Alt \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u041B\u041A\u041C. \u0415\u0441\u043B\u0438 \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 Mac, \u0442\u043E, \u0432\u043C\u0435\u0441\u0442\u043E Alt, \u0437\u0430\u0436\u0438\u043C\u0430\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 Option.")), /*#__PURE__*/React.createElement(_reactDeviceDetect.MobileView, null, /*#__PURE__*/React.createElement("div", {
    className: "action-9-container-mobile",
    style: whatAct !== 9 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-9-mobile"
  }, "\u0423 \u0445\u043E\u043B\u0441\u0442\u0430 \u0435\u0441\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u043D\u0430 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u0430\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u044F - \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0445\u043E\u043B\u0441\u0442\u0443. \u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u0443\u0436\u043D\u043E \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u0443\u043C\u0430, \u0432\u0435\u0434\u044C \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u0442 \u043B\u0438\u0448\u044C \u0432 \u0446\u0435\u043D\u0442\u0440 \u0432\u0430\u0448\u0435\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430. \u0414\u043B\u044F \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0441 \u0440\u0435\u0436\u0438\u043C\u0430 \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0440\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0441\u043F\u0440\u0430\u0432\u0430 \u0441\u043D\u0438\u0437\u0443 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432."), /*#__PURE__*/React.createElement("div", {
    className: "wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement(_IsPanningMobileTutorial.default, null))))), /*#__PURE__*/React.createElement("div", {
    className: "end-container",
    style: whatAct !== 10 ? {
      display: 'none'
    } : {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "end"
  }, "\u041D\u0430 \u044D\u0442\u043E\u043C \u0432\u0441\u0435! \u0415\u0441\u043B\u0438 \u0432\u044B \u0447\u0442\u043E \u0442\u043E \u0437\u0430\u0431\u044B\u043B\u0438, \u0442\u043E \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0436\u0430\u0442\u044C \u043D\u0430 \u0437\u043D\u0430\u043A \u0432\u043E\u043F\u0440\u043E\u0441\u0430 \u0432 \u043F\u0440\u0430\u0432\u043E\u043C \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0443\u0433\u043B\u0443 \u0438 \u0441\u043D\u043E\u0432\u0430 \u043F\u0440\u043E\u0439\u0442\u0438 \u044D\u0442\u043E \u043C\u0438\u043D\u0438-\u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435. \u0412\u0435\u0441\u0435\u043B\u0438\u0442\u0435\u0441\u044C!"), /*#__PURE__*/React.createElement("img", {
    src: "./Assets/question.png",
    className: "tutorial"
  }))), /*#__PURE__*/React.createElement("img", {
    src: "./Assets/question.png",
    className: "tutorial",
    onClick: function onClick() {
      return watchAgain();
    }
  }));
});
var _default = Tutorial;
exports.default = _default;