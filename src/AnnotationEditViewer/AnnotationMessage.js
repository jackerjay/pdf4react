import React, {Component} from 'react';

import styles from '../css/viewer.css';

class AnnotationMessage extends Component {

	render() {
		const divStyle = {
			left: (window.innerWidth / 2 - 50),
			top: 10
		}

		return (
			<div style={divStyle} className={styles.message}>
				{this.props.message}
			</div>
		)
	}
}

module.exports = AnnotationMessage;