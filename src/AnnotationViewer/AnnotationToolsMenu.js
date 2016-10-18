import React, {
	Component
} from 'react';

import FontFace from '../css/font-face.css';

class AnnotationToolsMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			color: 'rgba(0, 128, 0, 0.5)',
			colors: [
				'rgba(0, 128, 0, 0.5)',
				'rgba(255,0,0,0.5)',
				'rgba(242, 159, 63, 0.5)',
				'rgba(255, 255, 255, 0.5)',
				'rgba(0, 170, 255, 0.5)'
			],
			colorSelectDiv: [],
			colorSelectDivVisible: false
		}
	}

	handleOnColorClick() {
		if (!this.state.colorSelectDivVisible) {
			var tempColorSelectDiv = [];
			for (var i = 0; i < this.state.colors.length; i++) {
				const colorStyle = {
					border: '1px solid #fff',
					display: 'block',
					margin: '5px auto 0 auto',
					height: '15px',
					width: '25px',
					background: this.state.colors[i]
				}
				tempColorSelectDiv = tempColorSelectDiv.concat(
					<span key={i}
						  onClick={this.handleOnSelectColor.bind(this)} 
						  style={colorStyle}></span>)
			}
			this.setState({
				colorSelectDiv: tempColorSelectDiv,
				colorSelectDivVisible: true
			})
		} else {
			this.setState({
				colorSelectDivVisible: false
			})
		}
	}

	handleOnSelectColor(e) {
		var color = e.currentTarget.style.background;
		this.props.colorChangeCallback(color);
		this.setState({
			color
		})
	}

	render() {

		const annotationToolsBarStyle = {
			width: 50,
			height: 50,
			zIndex: 20,
			top: 60,
			position: 'fixed'
		}

		const colorSelectStyle = {
			position: 'absolute',
			left: '50px',
			top: '2px',
			background: '#DCDCDC',
			width: '40px',
			height: '120px',
			borderRadius: '2px',
			visibility: this.state.colorSelectDivVisible ? 'visible' : 'hidden'
		}

		return (
			<div style={annotationToolsBarStyle}>
					<span style={{display: 'block', cursor: 'pointer'}} 
						  onClick={this.handleOnColorClick.bind(this)}>
						<i className={FontFace.iconfont + ' ' + FontFace.colorSelectIcon} style={{color: this.state.color}}>&#xe600;</i>
						<span style={{display: 'block'}}>颜色</span>
						<span style={colorSelectStyle}>
							{this.state.colorSelectDiv.map((e) => e)}
						</span>
					</span>					
				</div>
		)
	}
}

module.exports = AnnotationToolsMenu;