'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TextLayerBuilder = require('./TextLayerBuilder');

var _TextLayerBuilder2 = _interopRequireDefault(_TextLayerBuilder);

var _viewer = require('./css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./PDFJS/pdf');

var PdfPageView = function (_Component) {
    _inherits(PdfPageView, _Component);

    function PdfPageView(props) {
        _classCallCheck(this, PdfPageView);

        var _this = _possibleConstructorReturn(this, (PdfPageView.__proto__ || Object.getPrototypeOf(PdfPageView)).call(this, props));

        _this.state = {
            contextMenuEnable: false
        };
        return _this;
    }

    _createClass(PdfPageView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var canvas = _reactDom2.default.findDOMNode(this.canvas);
            var context = canvas.getContext('2d', {
                alpha: false
            });
            canvas.height = Math.floor(this.props.viewport.height);
            canvas.width = Math.floor(this.props.viewport.width);
            var renderContext = {
                canvasContext: context,
                viewport: this.props.viewport,
                timeout: 200
            };
            this.props.pdfPage.render(renderContext);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var divStyle = {
                width: Math.floor(this.props.viewport.width),
                height: Math.floor(this.props.viewport.height),
                boxSizing: 'content-box',
                margin: 0
            };

            var annocationCanvasStyle = {
                zIndex: '10',
                opacity: 0.9,
                position: 'absolute'
            };

            return _react2.default.createElement(
                'div',
                { className: _viewer2.default.page,
                    id: 'pageContainer' + this.props.keyId,
                    'data-page-number': this.props.keyId,
                    ref: function ref(c) {
                        return _this2.div = c;
                    },
                    key: this.props.keyId,
                    style: divStyle },
                _react2.default.createElement(
                    'div',
                    {
                        className: _viewer2.default.canvasWrapper,
                        style: divStyle,
                        ref: function ref(c) {
                            return _this2.canvasWrapper = c;
                        } },
                    _react2.default.createElement('canvas', {
                        ref: function ref(c) {
                            return _this2.canvas = c;
                        } })
                ),
                this.props.EnableRenderTextDiv ? _react2.default.createElement(_TextLayerBuilder2.default, {
                    textContent: this.props.textContent,
                    viewport: this.props.viewport,
                    enhanceTextSelection: this.props.enhanceTextSelection
                }) : ""
            );
        }
    }]);

    return PdfPageView;
}(_react.Component);

module.exports = PdfPageView;
//# sourceMappingURL=PdfPageView.js.map