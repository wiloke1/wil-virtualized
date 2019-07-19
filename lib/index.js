"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Sizer = _interopRequireDefault(require("./Sizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WilVirtualized =
/*#__PURE__*/
function (_Component) {
  _inherits(WilVirtualized, _Component);

  function WilVirtualized() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WilVirtualized);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WilVirtualized)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      ready: false,
      data: [],
      start: 0,
      end: 0,
      measures: [],
      prevMeasures: [],
      containerHeight: 0,
      containerTop: 0,
      scrollerHeight: 0,
      scrollerTop: 0,
      isEndReached: false
    });

    _defineProperty(_assertThisInitialized(_this), "$scroller", null);

    _defineProperty(_assertThisInitialized(_this), "_timeoutDebounce", null);

    _defineProperty(_assertThisInitialized(_this), "_addToQueue", null);

    _defineProperty(_assertThisInitialized(_this), "_top", 0);

    _defineProperty(_assertThisInitialized(_this), "$container", void 0);

    _defineProperty(_assertThisInitialized(_this), "_debounce", function (cb) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      clearTimeout(_this._timeoutDebounce);
      _this._timeoutDebounce = setTimeout(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cb();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), time);
    });

    _defineProperty(_assertThisInitialized(_this), "_setContainerRef", function (c) {
      _this.$container = c;
    });

    _defineProperty(_assertThisInitialized(_this), "_setData",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = _this.props.data;
              _context2.next = 3;
              return _this.setState({
                data: data
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "_setIsEndReached",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(value) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.setState({
                  isEndReached: value
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_getContainerHeightReached", function () {
      var _this$state = _this.state,
          measures = _this$state.measures,
          prevMeasures = _this$state.prevMeasures;
      return measures.reduce(function (num, item, index) {
        var min = prevMeasures.length - 1;
        var max = measures.length - 1;
        return min <= index && index <= max ? num + item.height : num;
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateContainerHeight", function () {
      var containerHeight = _this.state.containerHeight;

      var reachedHeight = _this._getContainerHeightReached();

      _this.setState({
        containerHeight: containerHeight + reachedHeight
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_setStateAfterDataMount", function () {
      _this._addToQueue = setTimeout(function () {
        var scrollTop = 0;

        var end = _this._getEndIndex(scrollTop);

        if (_this.$container) {
          var _this$$container$getB = _this.$container.getBoundingClientRect(),
              top = _this$$container$getB.top,
              height = _this$$container$getB.height;

          _this.setState({
            containerHeight: height,
            containerTop: top,
            start: 0,
            end: end,
            ready: true
          });
        }
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "_getStartIndex", function (scrollTop) {
      var _this$state2 = _this.state,
          measures = _this$state2.measures,
          scrollerTop = _this$state2.scrollerTop,
          containerTop = _this$state2.containerTop;
      return measures.reduce(function (num, item, index) {
        var _measures$index = measures[index],
            top = _measures$index.top,
            height = _measures$index.height;
        var isBefore = Math.trunc(scrollTop + scrollerTop - containerTop) >= Math.trunc(top);
        var isAfter = Math.trunc(scrollTop + scrollerTop - containerTop) <= Math.trunc(top + height);
        return isBefore && isAfter ? index : num;
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "_getEndIndex", function (scrollTop) {
      var _this$state3 = _this.state,
          measures = _this$state3.measures,
          scrollerHeight = _this$state3.scrollerHeight,
          scrollerTop = _this$state3.scrollerTop,
          containerTop = _this$state3.containerTop;
      return measures.reduce(function (num, item, index) {
        var _measures$index2 = measures[index],
            top = _measures$index2.top,
            height = _measures$index2.height;
        var fixer = 10;
        var isBefore = Math.trunc(scrollTop + scrollerHeight + scrollerTop - containerTop) >= Math.trunc(top);
        var isAfter = Math.trunc(scrollTop + scrollerHeight + scrollerTop - containerTop) <= Math.trunc(top + height + fixer);
        return isBefore && isAfter ? index : num;
      }, 0) + 1;
    });

    _defineProperty(_assertThisInitialized(_this), "_setScrollerMeasure",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var scroller, _ref5, top, height;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              scroller = _this.props.scroller;

              if (!(_this.$scroller && !!scroller)) {
                _context4.next = 10;
                break;
              }

              if (!(scroller === "window")) {
                _context4.next = 6;
                break;
              }

              _context4.next = 5;
              return _this.setState({
                scrollerHeight: window.innerHeight,
                scrollerTop: 0
              });

            case 5:
              return _context4.abrupt("return");

            case 6:
              _this.$scroller = document.querySelector(scroller);
              _ref5 = _this.$scroller ? _this.$scroller.getBoundingClientRect() : {
                top: 0,
                height: 0
              }, top = _ref5.top, height = _ref5.height;
              _context4.next = 10;
              return _this.setState({
                scrollerHeight: height,
                scrollerTop: top
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleWindowResize", function () {
      _this._debounce(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this._setScrollerMeasure();

              case 2:
                _this._updateStartIndexAndEndIndex();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "_handleMeasures", function (measure) {
      var _this$state4 = _this.state,
          measures = _this$state4.measures,
          data = _this$state4.data;

      if (measures.length < data.length) {
        _this.setState(function (_ref7) {
          var measures = _ref7.measures;
          _this._top = _this._top + measure.height;
          return {
            measures: [].concat(_toConsumableArray(measures), [{
              top: _this._top - measure.height,
              height: measure.height
            }]),
            prevMeasures: measures
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getScrollTop", function () {
      var scroller = _this.props.scroller;
      var doc = document.documentElement;
      var windowScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (scroller === "window") {
        return windowScrollTop;
      }

      return _this.$scroller ? _this.$scroller.scrollTop : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "_updateStartIndexAndEndIndex",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var scrollTop, start, end;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              scrollTop = _this._getScrollTop();
              start = _this._getStartIndex(scrollTop);
              end = _this._getEndIndex(scrollTop);

              _this.setState({
                start: start,
                end: end
              });

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleScroll", function () {
      var _this$props = _this.props,
          onEndReached = _this$props.onEndReached,
          onEndReachedThreshold = _this$props.onEndReachedThreshold;
      var _this$state5 = _this.state,
          containerHeight = _this$state5.containerHeight,
          containerTop = _this$state5.containerTop,
          scrollerHeight = _this$state5.scrollerHeight,
          scrollerTop = _this$state5.scrollerTop;

      var scrollTop = _this._getScrollTop();

      var condition = Math.trunc(scrollTop - containerTop) + onEndReachedThreshold >= Math.trunc(containerHeight - scrollerHeight - scrollerTop);

      _this._updateStartIndexAndEndIndex();

      _this._debounce(function () {
        if (condition) {
          onEndReached();
        }
      }, 50);
    });

    _defineProperty(_assertThisInitialized(_this), "_checkVisible", function (index) {
      var _this$state6 = _this.state,
          start = _this$state6.start,
          end = _this$state6.end,
          ready = _this$state6.ready;
      return ready ? start <= index && index < end : true;
    });

    _defineProperty(_assertThisInitialized(_this), "_getItemStyles", function (index) {
      var _this$state7 = _this.state,
          measures = _this$state7.measures,
          ready = _this$state7.ready;
      return ready && measures[index] ? {
        position: "absolute",
        width: "100%",
        height: measures[index].height,
        top: Math.trunc(measures[index].top)
      } : {};
    });

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (item, index) {
      var renderItem = _this.props.renderItem;
      var isEndReached = _this.state.isEndReached;

      var visible = _this._checkVisible(index);

      var style = _this._getItemStyles(index);

      return visible && _react.default.createElement(_Sizer.default, {
        key: index,
        onMeasure: _this._handleMeasures,
        style: style,
        didUpdate: isEndReached
      }, renderItem(item, index));
    });

    return _this;
  }

  _createClass(WilVirtualized, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var scroller;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                scroller = this.props.scroller;
                this.$scroller = scroller === "window" ? window : document.querySelector(scroller);
                _context7.next = 4;
                return this._setData();

              case 4:
                this._setScrollerMeasure();

                this._setStateAfterDataMount();

                if (this.$scroller) {
                  this.$scroller.addEventListener("scroll", this._handleScroll);
                  window.addEventListener("resize", this._handleWindowResize);
                }

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(prevProps, prevState) {
        var data;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                data = this.props.data;

                if (!(data.length > prevState.data.length)) {
                  _context8.next = 9;
                  break;
                }

                _context8.next = 4;
                return this._setData();

              case 4:
                _context8.next = 6;
                return this._setIsEndReached(true);

              case 6:
                this._setScrollerMeasure();

                this._updateContainerHeight();

                this._setIsEndReached(false);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function componentDidUpdate(_x2, _x3) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.$scroller) {
        this.$scroller.removeEventListener("scroll", this._handleScroll);
      }

      window.removeEventListener("resize", this._handleWindowResize);
      clearTimeout(this._addToQueue);
    }
  }, {
    key: "render",
    value: function render() {
      var containerClassName = this.props.containerClassName;
      var _this$state8 = this.state,
          data = _this$state8.data,
          containerHeight = _this$state8.containerHeight;
      return _react.default.createElement("div", {
        ref: this._setContainerRef,
        style: {
          position: "relative",
          minHeight: containerHeight
        },
        className: containerClassName
      }, data.map(this._renderItem));
    }
  }]);

  return WilVirtualized;
}(_react.Component);

exports.default = WilVirtualized;

_defineProperty(WilVirtualized, "defaultProps", {
  renderItem: function renderItem(item, index) {
    return null;
  },
  scroller: null,
  containerClassName: "",
  onEndReached: function onEndReached() {},
  onEndReachedThreshold: 50
});