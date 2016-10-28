'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fontFace = require('../css/font-face.css');

var _fontFace2 = _interopRequireDefault(_fontFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationText = function (_Component) {
	_inherits(AnnotationText, _Component);

	function AnnotationText() {
		_classCallCheck(this, AnnotationText);

		return _possibleConstructorReturn(this, (AnnotationText.__proto__ || Object.getPrototypeOf(AnnotationText)).apply(this, arguments));
	}

	_createClass(AnnotationText, [{
		key: 'handleTextAreaOnChange',
		value: function handleTextAreaOnChange(e) {
			this.props.onChange(e.target.value, this.props.id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var styles = {
				div: {
					position: 'absolute',
					left: this.props.left,
					top: this.props.top,
					zIndex: 15,
					borderRadius: '3px 3px 0 0'
				},
				h1: {
					fontSize: '10px',
					backgroundColor: this.props.color,
					cursor: 'move',
					borderRadius: 'inherit'
				},
				closeSpan: {
					float: 'right',
					color: '#fff',
					fontSize: '10px',
					position: 'absolute',
					top: 1,
					right: 1
				}
			};

			return _react2.default.createElement(
				'div',
				{ style: styles.div
				},
				_react2.default.createElement(
					'h1',
					{ style: styles.h1 },
					'\u8BC4\u8BED'
				),
				this.props.editModel ? _react2.default.createElement('textarea', { rows: this.props.rows,
					cols: this.props.cols,
					onChange: this.handleTextAreaOnChange.bind(this)
				}) : _react2.default.createElement('textarea', { rows: this.props.rows,
					cols: this.props.cols,
					value: this.props.text,
					disabled: true }),
				this.props.editModel ? _react2.default.createElement(
					'span',
					{ style: styles.closeSpan, onClick: function onClick() {
							return _this2.props.onCloseTextDiv(_this2.props.id);
						} },
					_react2.default.createElement(
						'i',
						{ className: _fontFace2.default.iconfont + ' ' + _fontFace2.default.annotationTextCloseIcon
						},
						'\uE601'
					)
				) : ''
			);
		}
	}]);

	return AnnotationText;
}(_react.Component);

AnnotationText.defaultProps = {
	rows: 3,
	cols: 20,
	editModel: false
};

module.exports = AnnotationText;
//# sourceMappingURL=AnnotationText.js.map