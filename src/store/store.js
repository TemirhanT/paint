"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _colorReducer = _interopRequireDefault(require("./reducers/colorReducer"));
var _zoomReducer = _interopRequireDefault(require("./reducers/zoomReducer"));
var _canvasReducer = _interopRequireDefault(require("./reducers/canvasReducer"));
var _figureReducer = _interopRequireDefault(require("./reducers/figureReducer"));
var _memoryReducer = _interopRequireDefault(require("./reducers/memoryReducer"));
var _brushReducer = _interopRequireDefault(require("./reducers/brushReducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var rootReducer = (0, _toolkit.combineReducers)({
  canvasReducer: _canvasReducer.default,
  colorReducer: _colorReducer.default,
  brushReducer: _brushReducer.default,
  zoomReducer: _zoomReducer.default,
  figureReducer: _figureReducer.default,
  memoryReducer: _memoryReducer.default
});
var store = (0, _toolkit.configureStore)({
  reducer: rootReducer,
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});
exports.store = store;