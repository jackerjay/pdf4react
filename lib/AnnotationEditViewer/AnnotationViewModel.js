'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _AnnotationText = require('./AnnotationText');

var _AnnotationText2 = _interopRequireDefault(_AnnotationText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationViewModel = function (_Component) {
	_inherits(AnnotationViewModel, _Component);

	function AnnotationViewModel(props) {
		_classCallCheck(this, AnnotationViewModel);

		var _this = _possibleConstructorReturn(this, (AnnotationViewModel.__proto__ || Object.getPrototypeOf(AnnotationViewModel)).call(this, props));

		_this.state = {
			ctx: null,
			linesCtx: null,
			annotationDivs: [],
			textDivs: []
		};

		_this.handleGetDivs = _this.handleGetDivs.bind(_this);
		_this.handleDrawAnnotation = _this.handleDrawAnnotation.bind(_this);
		return _this;
	}

	_createClass(AnnotationViewModel, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.props.action === undefined ? console.error("You must set the props 'action' when use view model!") : "";

			var canvas = _reactDom2.default.findDOMNode(this.canvas),
			    annotationLineCanvas = _reactDom2.default.findDOMNode(this.annotationLineCanvas),
			    height = Math.floor(this.props.viewport.height * this.props.pagesCount + (this.props.pagesCount - 1) * 9),
			    width = Math.floor(this.props.viewport.width),
			    annotationDivs = null;

			canvas.height = height;
			canvas.width = width;

			annotationLineCanvas.height = height;
			annotationLineCanvas.width = width + this.props.lineTextWidth;

			var ctx = canvas.getContext("2d"),
			    linesCtx = annotationLineCanvas.getContext("2d");

			this.setState({
				ctx: ctx,
				linesCtx: linesCtx
			});

			var result = new Promise(function (resolve, reject) {
				_superagent2.default.get(_this2.props.action).end(function (err, res) {
					return err ? reject(res.body || err) : resolve(res.body);
				});
			});
			result.then(function (res) {
				return _this2.handleGetDivs(res);
			}, function (err) {
				return console.log(err);
			});
		}
	}, {
		key: 'handleGetDivs',
		value: function handleGetDivs(res) {
			var _this3 = this;

			this.setState({
				annotationDivs: res.annotations
			});
			this.state.annotationDivs.map(function (annotation) {
				return _this3.handleDrawAnnotation(annotation);
			});
		}
	}, {
		key: 'handleDrawAnnotation',
		value: function handleDrawAnnotation(annotation) {
			var width = annotation.location.endX - annotation.location.startX,
			    height = annotation.location.endY - annotation.location.startY;

			this.state.ctx.beginPath();
			this.state.ctx.fillStyle = annotation.color;
			this.state.ctx.fillRect(annotation.location.startX, annotation.location.startY, width, height);
			this.state.ctx.closePath();

			var left = this.annotationLineCanvas.width - (annotation.textId % 2 == 0 ? 0 : this.props.decWidth),
			    top = annotation.location.endY - (annotation.location.endY - annotation.location.startY) / 2,
			    offsetLeft = this.annotationLineCanvas.offsetLeft;

			this.state.linesCtx.beginPath();
			this.state.linesCtx.moveTo(annotation.location.endX, annotation.location.endY - (annotation.location.endY - annotation.location.startY) / 2);
			this.state.linesCtx.strokeStyle = annotation.color;
			this.state.linesCtx.lineTo(left, top);
			this.state.linesCtx.stroke();
			this.state.linesCtx.closePath();

			this.setState({
				textDivs: this.state.textDivs.concat(_react2.default.createElement(_AnnotationText2.default, { key: annotation.textId,
					id: annotation.textId,
					top: top + this.state.ctx.canvas.offsetTop,
					left: left,
					offsetLeft: offsetLeft,
					color: annotation.color,
					text: annotation.text
				}))
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var canvasStyle = {
				position: 'absolute',
				zIndex: 10,
				opacity: 0.5,
				margin: '1px auto -8px auto',
				borderLeft: '0px',
				borderRight: '0px',
				borderTop: '9px',
				borderStyle: 'solid',
				borderColor: 'transparent'
			};

			var annotationLineCanvasStyle = {
				position: 'absolute',
				zIndex: 5,
				opacity: 0.5,
				margin: '1px auto -8px auto',
				borderLeft: '0px',
				borderRight: '0px',
				borderTop: '9px',
				borderStyle: 'solid',
				borderColor: 'transparent'
			};

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('canvas', { ref: function ref(e) {
						return _this4.canvas = e;
					},
					style: canvasStyle }),
				_react2.default.createElement('canvas', { ref: function ref(e) {
						return _this4.annotationLineCanvas = e;
					},
					style: annotationLineCanvasStyle }),
				this.state.textDivs.map(function (div) {
					return div;
				})
			);
		}
	}]);

	return AnnotationViewModel;
}(_react.Component);

module.exports = AnnotationViewModel;
//# sourceMappingURL=AnnotationViewModel.js.map