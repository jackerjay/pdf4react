'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewer = require('../css/viewer.css');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnnotationBar = function (_Component) {
	_inherits(AnnotationBar, _Component);

	function AnnotationBar() {
		_classCallCheck(this, AnnotationBar);

		return _possibleConstructorReturn(this, (AnnotationBar.__proto__ || Object.getPrototypeOf(AnnotationBar)).apply(this, arguments));
	}

	_createClass(AnnotationBar, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: _viewer2.default.toolbar },
				_react2.default.createElement(
					'div',
					{ id: _viewer2.default.toolbarContainer },
					_react2.default.createElement('div', { id: _viewer2.default.toolbarViewer })
				)
			);
		}
	}]);

	return AnnotationBar;
}(_react.Component);

module.exports = AnnotationBar;
//# sourceMappingURL=AnnotationBar.js.map