import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';

class AnnotationText extends Component {

	componentDidMount() {

	}

	handleDivOnDrag() {
		console.log("draging")
	}

	render() {

		const styles = {
			div: {
				position: 'absolute',
				left: this.props.left,
				top: this.props.top,
				zIndex: 15,
				borderRadius: '3px 3px 0 0'
			},
			h1: {
				fontSize: '10px',
				backgroundColor: 'green',
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
		}

		return (
			<div style={styles.div} 
				 onDrag={this.handleDivOnDrag}
				 draggable={true}
				>
				<h1 style={styles.h1}>评语</h1>
				<textarea rows={this.props.rows} 
					      cols={this.props.cols}/>
			    <span style={styles.closeSpan}>X</span>
			</div>
		)
	}
}

AnnotationText.defaultProps = {
	rows: 3,
	cols: 20
}

module.exports = AnnotationText;