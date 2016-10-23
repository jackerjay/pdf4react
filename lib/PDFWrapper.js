'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PdfViewer = require('./PdfViewer');

var _PdfViewer2 = _interopRequireDefault(_PdfViewer);

var _viewer = require('./css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./PDFJS/pdf');

var PDFWrapper = function (_Component) {
    _inherits(PDFWrapper, _Component);

    function PDFWrapper(props) {
        _classCallCheck(this, PDFWrapper);

        return _possibleConstructorReturn(this, (PDFWrapper.__proto__ || Object.getPrototypeOf(PDFWrapper)).call(this, props));
    }

    _createClass(PDFWrapper, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styles = {
                width: '100%',
                height: '100%'
            };
            return _react2.default.createElement(
                'div',
                { id: styles.outerContainer },
                _react2.default.createElement(
                    'div',
                    { id: styles.mainContainer },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(c) {
                                return _this2.div = c;
                            }, id: styles.viewerContainer },
                        _react2.default.createElement(_PdfViewer2.default, { url: this.props.url,
                            scale: this.props.scale,
                            action: this.props.action,
                            EnableAnnotation: this.props.EnableAnnotation,
                            EnableRenderTextDiv: this.props.EnableRenderTextDiv,
                            AnnotationLineWidth: this.props.AnnotationLineWidth,
                            AnnotationViewerOpacity: this.props.AnnotationViewerOpacity
                        })
                    )
                )
            );
        }
    }]);

    return PDFWrapper;
}(_react.Component);

PDFWrapper.propTypes = {
    scale: _react2.default.PropTypes.number,
    AnnotationViewerOpacity: _react2.default.PropTypes.number,
    AnnotationLineWidth: _react2.default.PropTypes.number,
    EnableAnnotation: _react2.default.PropTypes.bool,
    EnableRenderTextDiv: _react2.default.PropTypes.bool
};

PDFWrapper.defaultProps = {
    scale: 1.0,
    AnnotationViewerOpacity: 0.4,
    AnnotationLineWidth: 400,
    EnableAnnotation: false,
    EnableRenderTextDiv: false
};

module.exports = PDFWrapper;
//# sourceMappingURL=PDFWrapper.js.map