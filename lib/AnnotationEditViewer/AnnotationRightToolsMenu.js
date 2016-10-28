'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _AnnotationMessage = require('./AnnotationMessage');

var _AnnotationMessage2 = _interopRequireDefault(_AnnotationMessage);

var _viewer = require('../css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationRightToolsMenu = function (_Component) {
	_inherits(AnnotationRightToolsMenu, _Component);

	function AnnotationRightToolsMenu(props) {
		_classCallCheck(this, AnnotationRightToolsMenu);

		var _this = _possibleConstructorReturn(this, (AnnotationRightToolsMenu.__proto__ || Object.getPrototypeOf(AnnotationRightToolsMenu)).call(this, props));

		_this.state = {
			message: null
		};
		_this.getSuccess = _this.getSuccess.bind(_this);
		_this.getError = _this.getError.bind(_this);
		_this.getNoAnnotation = _this.getNoAnnotation.bind(_this);
		return _this;
	}

	_createClass(AnnotationRightToolsMenu, [{
		key: 'handleSaveButtonClick',
		value: function handleSaveButtonClick() {
			var _this2 = this;

			var annotations = this.props.annotations,
			    annotationDivs = this.props.annotationDivs;

			if (annotations.length > 0) {
				annotations = annotations.map(function (annotation) {
					return Object.assign({}, _extends({}, annotation, {
						text: annotationDivs[annotation.textId].text
					}));
				});

				var result = new Promise(function (resolve, reject) {
					_superagent2.default['post'](_this2.props.action).send({ annotations: annotations }).set('Accept', 'application/json').end(function (err, res) {
						return err ? reject(res.body || err) : resolve(res.body);
					});
				});
				result.then(function (result) {
					_this2.getSuccess(result);
				}, function (error) {
					_this2.getError(error);
				});
			} else {
				this.getNoAnnotation();
			}
		}
	}, {
		key: 'getSuccess',
		value: function getSuccess(result) {
			var _this3 = this;

			console.log(result);
			this.setState({
				message: _react2.default.createElement(_AnnotationMessage2.default, { message: result })
			});
			this.timer = setTimeout(function () {
				return _this3.setState({
					message: null
				});
			}, 2000);
		}
	}, {
		key: 'getError',
		value: function getError(error) {
			var _this4 = this;

			console.log(error);
			this.setState({
				message: _react2.default.createElement(_AnnotationMessage2.default, { message: error.toString() })
			});
			this.timer = setTimeout(function () {
				return _this4.setState({
					message: null
				});
			}, 2000);
		}
	}, {
		key: 'getNoAnnotation',
		value: function getNoAnnotation() {
			var _this5 = this;

			this.setState({
				message: _react2.default.createElement(_AnnotationMessage2.default, { message: '\u6CA1\u6709\u6CE8\u89E3\uFF0C\u65E0\u9700\u4FDD\u5B58' })
			});
			this.timer = setTimeout(function () {
				return _this5.setState({
					message: null
				});
			}, 2000);
		}
	}, {
		key: 'render',
		value: function render() {

			var divStyles = {
				zIndex: 20,
				position: 'fixed',
				background: 'transparent',
				left: this.props.left,
				top: this.props.top,
				fontSize: '10px'
			};

			return _react2.default.createElement(
				'div',
				{ style: divStyles },
				_react2.default.createElement(
					'button',
					{ className: _viewer2.default.button + ' ' + _viewer2.default.gray,
						onClick: this.handleSaveButtonClick.bind(this) },
					'\u4FDD\u5B58'
				),
				this.state.message == null ? "" : this.state.message
			);
		}
	}]);

	return AnnotationRightToolsMenu;
}(_react.Component);

module.exports = AnnotationRightToolsMenu;
//# sourceMappingURL=AnnotationRightToolsMenu.js.map