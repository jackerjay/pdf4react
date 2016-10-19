'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _viewer = require('./css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./PDFJS/pdf');

var TextLayerBuilder = function (_Component) {
    _inherits(TextLayerBuilder, _Component);

    function TextLayerBuilder(props) {
        _classCallCheck(this, TextLayerBuilder);

        var _this = _possibleConstructorReturn(this, (TextLayerBuilder.__proto__ || Object.getPrototypeOf(TextLayerBuilder)).call(this, props));

        _this.state = {
            textDivs: [],
            children: null
        };
        return _this;
    }

    _createClass(TextLayerBuilder, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var textLayer = _reactDom2.default.findDOMNode(this.textLayer);

            appendTextChild = appendTextChild.bind(this);

            function appendTextChild(textLayerFrag) {
                textLayer.appendChild(textLayerFrag);
            }

            if (this.props.textContent != null) {
                var textLayerFrag = document.createDocumentFragment();
                var textLayerRenderTask = PDFJS.renderTextLayer({
                    textContent: this.props.textContent,
                    container: textLayerFrag,
                    viewport: this.props.viewport,
                    textDivs: this.state.textDivs,
                    timeout: 200,
                    enhanceTextSelection: this.props.enhanceTextSelection
                });
                textLayerRenderTask.promise.then(function () {
                    appendTextChild(textLayerFrag);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var divStyle = {
                width: Math.floor(this.props.viewport.width),
                height: Math.floor(this.props.viewport.height)
            };

            return _react2.default.createElement('div', _defineProperty({
                onMouseUp: this.props.onMouseUp,
                onMouseDown: this.props.onMouseDown,
                onClick: this.props.onClick,
                onContextMenu: this.props.onContextMenu,
                key: this.props.key,
                className: _viewer2.default.textLayer,
                style: divStyle,
                ref: function ref(c) {
                    return _this2.textLayer = c;
                }
            }, 'onContextMenu', this.props.onContextMenu));
        }
    }]);

    return TextLayerBuilder;
}(_react.Component);

module.exports = TextLayerBuilder;
//# sourceMappingURL=TextLayerBuilder.js.map