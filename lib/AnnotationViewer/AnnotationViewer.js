'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AnnotationText = require('./AnnotationText');

var _AnnotationText2 = _interopRequireDefault(_AnnotationText);

var _AnnotationLeftToolsMenu = require('./AnnotationLeftToolsMenu');

var _AnnotationLeftToolsMenu2 = _interopRequireDefault(_AnnotationLeftToolsMenu);

var _AnnotationRightToolsMenu = require('./AnnotationRightToolsMenu');

var _AnnotationRightToolsMenu2 = _interopRequireDefault(_AnnotationRightToolsMenu);

var _fontFace = require('../css/font-face.css');

var _fontFace2 = _interopRequireDefault(_fontFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationViewer = function (_Component) {
	_inherits(AnnotationViewer, _Component);

	function AnnotationViewer(props) {
		_classCallCheck(this, AnnotationViewer);

		var _this = _possibleConstructorReturn(this, (AnnotationViewer.__proto__ || Object.getPrototypeOf(AnnotationViewer)).call(this, props));

		_this.state = {
			startX: null,
			startY: null,
			ctx: null,
			interfaceCtx: null,
			linesCtx: null,
			mouseDown: false,
			clearRect: null,
			textDivs: [],
			annotations: [],
			annotationDivs: {},
			textId: 0,
			color: 'rgba(0, 128, 0, 0.5)',
			offsetLeft: null,
			offsetTop: null
		};
		return _this;
	}

	_createClass(AnnotationViewer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var canvas = _reactDom2.default.findDOMNode(this.canvas),
			    annotationInterfaceCanvas = _reactDom2.default.findDOMNode(this.interfaceCanvas),
			    annotationLineCanvas = _reactDom2.default.findDOMNode(this.annotationLineCanvas),
			    height = this.props.viewport.height * this.props.pagesCount + (this.props.pagesCount - 1) * 9;

			canvas.height = Math.floor(height);
			canvas.width = Math.floor(this.props.viewport.width);
			annotationInterfaceCanvas.height = canvas.height;
			annotationInterfaceCanvas.width = canvas.width;
			annotationLineCanvas.height = Math.floor(height);
			annotationLineCanvas.width = Math.floor(this.props.viewport.width) + this.props.lineTextWidth;
			var ctx = canvas.getContext("2d");
			var linesCtx = annotationLineCanvas.getContext("2d");
			var interfaceCanvas = annotationInterfaceCanvas.getContext("2d");
			this.setState({
				ctx: ctx,
				linesCtx: linesCtx,
				interfaceCanvas: interfaceCanvas,
				offsetLeft: canvas.width + 20,
				offsetTop: canvas.offsetTop + 10
			});

			if (this.props.action === undefined) {
				console.error("You must set the props 'action' when use annotation!");
			}
		}
	}, {
		key: 'handleOnMouseDown',
		value: function handleOnMouseDown(e) {
			e.preventDefault();
			this.setState({
				startX: e.pageX - this.canvas.offsetLeft,
				startY: e.pageY - 9 - this.canvas.offsetTop,
				mouseDown: true
			});
		}
	}, {
		key: 'handleOnMouseUp',
		value: function handleOnMouseUp(e) {
			var endX = e.pageX - this.canvas.offsetLeft,
			    endY = e.pageY - 9 - this.canvas.offsetTop;

			if (this.state.startX != endX && this.state.startY != endY && this.state.mouseDown) {
				this.state.interfaceCanvas.beginPath();
				this.state.interfaceCanvas.clearRect(0, 0, this.interfaceCanvas.width, this.interfaceCanvas.height);
				this.state.interfaceCanvas.closePath();

				this.state.ctx.beginPath();
				this.state.ctx.fillStyle = this.state.color;
				this.state.ctx.fillRect(this.state.startX, this.state.startY, endX - this.state.startX, endY - this.state.startY);
				this.state.ctx.closePath();
				this.handleDrawLineToText(this.state.startX, this.state.startY, endX, endY);

				this.setState({
					annotations: this.state.annotations.concat({
						type: 'rect',
						location: {
							startX: this.state.startX,
							startY: this.state.startY,
							endX: endX,
							endY: endY
						},
						textId: this.state.textId,
						color: this.state.color
					}),
					mouseDown: false,
					textId: this.state.textId + 1,
					clearRect: null
				});
			}
		}
	}, {
		key: 'handleOnMouseDownMove',
		value: function handleOnMouseDownMove(e) {
			if (this.state.mouseDown) {
				var endX = e.pageX - this.canvas.offsetLeft - this.state.startX,
				    endY = e.pageY - this.canvas.offsetTop - 9 - this.state.startY;
				this.state.interfaceCanvas.beginPath();
				if (this.state.clearRect != null) {
					this.state.interfaceCanvas.clearRect(this.state.clearRect[0], this.state.clearRect[1], this.state.clearRect[2], this.state.clearRect[3]);
					this.setState({
						clearRect: [this.state.startX, this.state.startY, endX, endY]
					});
				} else {
					this.setState({
						clearRect: [this.state.startX, this.state.startY, endX, endY]
					});
				}
				this.state.interfaceCanvas.fillStyle = this.state.color;
				this.state.interfaceCanvas.fillRect(this.state.startX, this.state.startY, endX, endY);
				this.state.interfaceCanvas.closePath();
			}
		}
	}, {
		key: 'handleAnnotationDivTextChange',
		value: function handleAnnotationDivTextChange(text, id) {
			this.setState({
				annotationDivs: Object.assign(_extends({}, this.state.annotationDivs, _defineProperty({}, id, {
					left: this.state.annotationDivs[id].left,
					top: this.state.annotationDivs[id].top,
					lineStartX: this.state.annotationDivs[id].lineStartX,
					text: text
				})))
			});
		}
	}, {
		key: 'handleDrawLineToText',
		value: function handleDrawLineToText(startX, startY, endX, endY) {
			var textDivStyle = {},
			    offsetLeft = this.annotationLineCanvas.offsetLeft,
			    lineStartX = startX > endX ? startX : endX;
			textDivStyle.left = this.annotationLineCanvas.width - (this.state.textId % 2 == 0 ? 0 : this.props.decWidth);
			textDivStyle.top = endY - (endY - startY) / 2;

			this.state.linesCtx.beginPath();
			this.state.linesCtx.moveTo(lineStartX, endY - (endY - startY) / 2);
			this.state.linesCtx.lineTo(textDivStyle.left, textDivStyle.top);
			this.state.linesCtx.strokeStyle = this.state.color;
			this.state.linesCtx.stroke();
			this.state.linesCtx.closePath();

			this.setState({
				textDivs: this.state.textDivs.concat(_react2.default.createElement(_AnnotationText2.default, { key: this.state.textId,
					id: this.state.textId,
					left: textDivStyle.left,
					top: textDivStyle.top,
					offsetLeft: offsetLeft,
					color: this.state.color,
					onCloseTextDiv: this.handleOnCloseTextDiv.bind(this),
					onChange: this.handleAnnotationDivTextChange.bind(this) })),
				annotationDivs: Object.assign({}, _extends({}, this.state.annotationDivs, _defineProperty({}, this.state.textId, {
					left: textDivStyle.left,
					top: textDivStyle.top,
					lineStartX: lineStartX
				})))
			});
		}
	}, {
		key: 'handleDeleLineToText',
		value: function handleDeleLineToText(id) {
			var deleLine = this.state.annotationDivs[id];
			this.state.linesCtx.beginPath();
			this.state.linesCtx.clearRect(deleLine.lineStartX, deleLine.top - this.state.linesCtx.lineWidth, deleLine.left, this.state.linesCtx.lineWidth * 2);
			this.state.linesCtx.closePath();
		}
	}, {
		key: 'handleOnContextMenu',
		value: function handleOnContextMenu(e) {
			e.preventDefault();
			if (this.state.mouseDown) {
				var endX = e.pageX - this.canvas.offsetLeft - this.state.startX,
				    endY = e.pageY - this.canvas.offsetTop - 9 - this.state.startY;
				if (this.state.clearRect != null) {
					this.state.ctx.beginPath();
					this.state.ctx.clearRect(this.state.clearRect[0], this.state.clearRect[1], this.state.clearRect[2], this.state.clearRect[3]);
					this.state.ctx.closePath();
					this.setState({
						clearRect: [this.state.startX, this.state.startY, endX, endY]
					});
				} else {
					this.setState({
						clearRect: [this.state.startX, this.state.startY, endX, endY]
					});
				}
			}
			this.setState({
				mouseDown: false
			});
		}
	}, {
		key: 'handleOnCloseTextDiv',
		value: function handleOnCloseTextDiv(id) {

			var textDivsTemp = this.state.textDivs.filter(function (e) {
				return e.key != id;
			}),
			    annotationsTemp = this.state.annotations.filter(function (e) {
				return e.textId != id;
			});
			var filterAnnotation = this.state.annotations.filter(function (e) {
				return e.textId == id;
			})[0];
			this.state.ctx.beginPath();
			this.state.ctx.clearRect(filterAnnotation.location.startX, filterAnnotation.location.startY, filterAnnotation.location.endX - filterAnnotation.location.startX, filterAnnotation.location.endY - filterAnnotation.location.startY);
			this.state.ctx.closePath();
			this.handleDeleLineToText(id);

			this.setState({
				textDivs: textDivsTemp,
				annotations: annotationsTemp,
				clearRect: null
			});
		}
	}, {
		key: 'handleOnColorChanged',
		value: function handleOnColorChanged(color) {
			this.setState({
				color: color
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var annotationCanvasStyle = {
				position: 'absolute',
				zIndex: 10,
				opacity: this.props.opacity,
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
				opacity: this.props.opacity,
				margin: '1px auto -8px auto',
				borderLeft: '0px',
				borderRight: '0px',
				borderTop: '9px',
				borderStyle: 'solid',
				borderColor: 'transparent'
			};

			var annotationsInterfaceCanvas = {
				position: 'absolute',
				zIndex: 15,
				opacity: this.props.opacity,
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
				_react2.default.createElement(_AnnotationLeftToolsMenu2.default, { colorChangeCallback: this.handleOnColorChanged.bind(this) }),
				_react2.default.createElement(_AnnotationRightToolsMenu2.default, { left: this.state.offsetLeft,
					top: this.state.offsetTop,
					annotationDivs: this.state.annotationDivs,
					textDivs: this.state.textDivs,
					annotations: this.state.annotations,
					action: this.props.action
				}),
				_react2.default.createElement('canvas', { ref: function ref(c) {
						return _this2.canvas = c;
					},
					style: annotationCanvasStyle
				}),
				_react2.default.createElement('canvas', { ref: function ref(c) {
						return _this2.interfaceCanvas = c;
					},
					style: annotationCanvasStyle,
					onMouseDown: this.handleOnMouseDown.bind(this),
					onMouseUp: this.handleOnMouseUp.bind(this),
					onMouseMove: this.handleOnMouseDownMove.bind(this),
					onContextMenu: this.handleOnContextMenu.bind(this)
				}),
				_react2.default.createElement('canvas', { ref: function ref(c) {
						return _this2.annotationLineCanvas = c;
					},
					style: annotationLineCanvasStyle
				}),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative' } },
					this.state.textDivs.map(function (e) {
						return e;
					})
				)
			);
		}
	}]);

	return AnnotationViewer;
}(_react.Component);

AnnotationViewer.defaultProps = {
	decWidth: 250
};

module.exports = AnnotationViewer;
//# sourceMappingURL=AnnotationViewer.js.map