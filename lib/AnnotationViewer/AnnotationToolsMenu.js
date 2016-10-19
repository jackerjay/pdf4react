'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fontFace = require('../css/font-face.css');

var _fontFace2 = _interopRequireDefault(_fontFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationToolsMenu = function (_Component) {
	_inherits(AnnotationToolsMenu, _Component);

	function AnnotationToolsMenu(props) {
		_classCallCheck(this, AnnotationToolsMenu);

		var _this = _possibleConstructorReturn(this, (AnnotationToolsMenu.__proto__ || Object.getPrototypeOf(AnnotationToolsMenu)).call(this, props));

		_this.state = {
			color: 'rgba(0, 128, 0, 0.5)',
			colors: ['rgba(0, 128, 0, 0.5)', 'rgba(255,0,0,0.5)', 'rgba(242, 159, 63, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(0, 170, 255, 0.5)'],
			colorSelectDiv: [],
			colorSelectDivVisible: false
		};
		return _this;
	}

	_createClass(AnnotationToolsMenu, [{
		key: 'handleOnColorClick',
		value: function handleOnColorClick() {
			if (!this.state.colorSelectDivVisible) {
				var tempColorSelectDiv = [];
				for (var i = 0; i < this.state.colors.length; i++) {
					var colorStyle = {
						border: '1px solid #fff',
						display: 'block',
						margin: '5px auto 0 auto',
						height: '15px',
						width: '25px',
						background: this.state.colors[i]
					};
					tempColorSelectDiv = tempColorSelectDiv.concat(_react2.default.createElement('span', { key: i,
						onClick: this.handleOnSelectColor.bind(this),
						style: colorStyle }));
				}
				this.setState({
					colorSelectDiv: tempColorSelectDiv,
					colorSelectDivVisible: true
				});
			} else {
				this.setState({
					colorSelectDivVisible: false
				});
			}
		}
	}, {
		key: 'handleOnSelectColor',
		value: function handleOnSelectColor(e) {
			var color = e.currentTarget.style.background;
			this.props.colorChangeCallback(color);
			this.setState({
				color: color
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var annotationToolsBarStyle = {
				width: 50,
				height: 50,
				zIndex: 20,
				top: 60,
				position: 'fixed'
			};

			var colorSelectStyle = {
				position: 'absolute',
				left: '50px',
				top: '2px',
				background: '#DCDCDC',
				width: '40px',
				height: '120px',
				borderRadius: '2px',
				visibility: this.state.colorSelectDivVisible ? 'visible' : 'hidden'
			};

			return _react2.default.createElement(
				'div',
				{ style: annotationToolsBarStyle },
				_react2.default.createElement(
					'span',
					{ style: { display: 'block', cursor: 'pointer' },
						onClick: this.handleOnColorClick.bind(this) },
					_react2.default.createElement(
						'i',
						{ className: _fontFace2.default.iconfont + ' ' + _fontFace2.default.colorSelectIcon, style: { color: this.state.color } },
						'\uE600'
					),
					_react2.default.createElement(
						'span',
						{ style: { display: 'block' } },
						'\u989C\u8272'
					),
					_react2.default.createElement(
						'span',
						{ style: colorSelectStyle },
						this.state.colorSelectDiv.map(function (e) {
							return e;
						})
					)
				)
			);
		}
	}]);

	return AnnotationToolsMenu;
}(_react.Component);

module.exports = AnnotationToolsMenu;
//# sourceMappingURL=AnnotationToolsMenu.js.map