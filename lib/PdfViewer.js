'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui_utils = require('./ui_utils');

var utils = _interopRequireWildcard(_ui_utils);

var _TextLayerBuilder = require('./TextLayerBuilder');

var _TextLayerBuilder2 = _interopRequireDefault(_TextLayerBuilder);

var _PdfPageView = require('./PdfPageView');

var _PdfPageView2 = _interopRequireDefault(_PdfPageView);

var _AnnotationViewer = require('./AnnotationViewer/AnnotationViewer');

var _AnnotationViewer2 = _interopRequireDefault(_AnnotationViewer);

var _AnnotationBar = require('./AnnotationViewer/AnnotationBar');

var _AnnotationBar2 = _interopRequireDefault(_AnnotationBar);

var _viewer = require('./css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

require('./PDFJS/pdf');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PdfViewer = function (_Component) {
    _inherits(PdfViewer, _Component);

    function PdfViewer(props) {
        _classCallCheck(this, PdfViewer);

        var _this = _possibleConstructorReturn(this, (PdfViewer.__proto__ || Object.getPrototypeOf(PdfViewer)).call(this, props));

        _this.state = {
            viewport: null,
            textLayers: [],
            startXpath: null,
            endXpath: null,
            selected: false,
            menuStyles: {},
            annocationDivs: [],
            pagesCount: 0,
            AnnotationViewerOpacity: _this.props.AnnotationViewerOpacity ? _this.props.AnnotationViewerOpacity : 0.4,
            AnnotationLineWidth: 400,
            EnableAnnotation: false,
            EnableRenderTextDiv: false
        };
        return _this;
    }

    _createClass(PdfViewer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var setTextContent = function setTextContent(textContent, pdfPage) {
                var TextLayerRender = _react2.default.createElement(_PdfPageView2.default, {
                    keyId: pdfPage.pageIndex,
                    key: pdfPage.pageIndex,
                    textContent: textContent,
                    viewport: this.state.viewport,
                    enhanceTextSelection: false,
                    pdfPage: pdfPage,
                    EnableRenderTextDiv: this.props.EnableRenderTextDiv
                });
                var tempTextLayer = this.state.textLayers.concat(TextLayerRender);
                this.setState({
                    textLayers: tempTextLayer
                });
            }.bind(this);

            var setViewport = function setViewport(viewport, pagesCount) {
                this.setState({
                    viewport: viewport,
                    pagesCount: pagesCount
                });
            }.bind(this);

            var getScale = function getScale() {
                return this.props.scale;
            }.bind(this);

            PDFJS.getDocument(this.props.url).then(function (pdf) {
                var pagesCount = pdf.numPages;
                for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
                    pdf.getPage(pageNum).then(function (pdfPage) {
                        var scale = getScale();
                        setViewport(pdfPage.getViewport(scale * utils.CSS_UNITS), pagesCount);
                        pdfPage.getTextContent({
                            normalizeWhitespace: true
                        }).then(function textContentResolved(textContent) {
                            setTextContent(textContent, pdfPage);
                        });
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var wrapperDivStyle = {
                border: '9px solid transparent',
                width: this.state.viewport ? this.state.viewport.width : 'auto',
                margin: this.props.EnableAnnotation ? '' : '1px auto -8px auto'
            };

            return _react2.default.createElement(
                'div',
                { id: _viewer2.default.viewer,
                    className: _viewer2.default.pdfViewer
                },
                _react2.default.createElement(
                    'div',
                    { style: wrapperDivStyle },
                    this.props.EnableAnnotation ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_AnnotationBar2.default, null),
                        this.state.pagesCount === 0 ? "" : _react2.default.createElement(_AnnotationViewer2.default, { viewport: this.state.viewport,
                            pagesCount: this.state.pagesCount,
                            lineTextWidth: this.props.AnnotationLineWidth,
                            opacity: this.props.AnnotationViewerOpacity })
                    ) : "",
                    this.state.textLayers.sort(function (a, b) {
                        return a.key - b.key;
                    }).map(function (e) {
                        return e;
                    })
                )
            );
        }
    }]);

    return PdfViewer;
}(_react.Component);

module.exports = PdfViewer;
//# sourceMappingURL=PdfViewer.js.map