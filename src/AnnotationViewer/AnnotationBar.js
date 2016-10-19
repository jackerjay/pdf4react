import React, {
	Component
} from 'react';

import styles from '../css/viewer.css'

class AnnotationBar extends Component {

	render() {
		return (
			<div className={styles.toolbar}>
				<div id={styles.toolbarContainer}>
					<div id={styles.toolbarViewer}>

					</div>
				</div>
			</div>
		)
	}
}

module.exports = AnnotationBar;