import React, {
	Component
} from 'react';
import superagent from 'superagent';

import AnnotationMessage from './AnnotationMessage';
import styles from '../css/viewer.css';

class AnnotationRightToolsMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: null
		}
		this.getSuccess = this.getSuccess.bind(this);
		this.getError = this.getError.bind(this);
		this.getNoAnnotation = this.getNoAnnotation.bind(this);
	}

	handleSaveButtonClick() {
		var annotations = this.props.annotations,
			annotationDivs = this.props.annotationDivs;

		if (annotations.length > 0) {
			annotations = annotations.map((annotation) => {
				return Object.assign({},{
					...annotation,
					text: annotationDivs[annotation.textId].text
				})
			})

			var result = new Promise((resolve, reject) => {
						superagent['post'](this.props.action)
							.send({annotations})
							.set('Accept', 'application/json')
							.end((err, res) => 
								err ? reject(res.body || err) : resolve(res.body)
							)

			})
			 result.then((result) => {this.getSuccess(result)}, 
			 		(error) => {this.getError(error)})
		} else {
			this.getNoAnnotation();
		}

	}

	getSuccess(result) {
		console.log(result)
		this.setState({
			message: <AnnotationMessage message={result} />
		})
		this.timer = setTimeout(
			() => this.setState({
				message: null
			}), 2000
		)
	}

	getError(error) {
		console.log(error)
		this.setState({
			message: <AnnotationMessage message={error.toString()} />
		})
		this.timer = setTimeout(
			() => this.setState({
				message: null
			}), 2000
		)
	}

	getNoAnnotation() {
		this.setState({
			message: <AnnotationMessage message="没有注解，无需保存" />
		})
		this.timer = setTimeout(
			() => this.setState({
				message: null
			}), 2000
		)
	}

	render() {

		const divStyles = {
			zIndex: 20,
			position: 'fixed',
			background: 'transparent',
			left: this.props.left,
			top: this.props.top,
			fontSize: '10px'
		}

		return (
			<div style={divStyles}>
				<button	className={styles.button + ' ' + styles.gray}
						onClick={this.handleSaveButtonClick.bind(this)}>保存</button>
				{ this.state.message == null ? "" : this.state.message}
			</div>
		)
	}
}

module.exports = AnnotationRightToolsMenu;