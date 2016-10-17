import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';

import AnnotationText from './AnnotationText';

import FontFace from '../css/font-face.css'

class AnnotationViewer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startX: null,
			startY: null,
			ctx: null,
			linesCtx: null,
			mouseDown: false,
			clearRect: null,
			textDivs: [],
			annotations: [],
			annotationDivs: {},
			textId: 0
		}
	}

	componentDidMount() {
		var canvas = ReactDOM.findDOMNode(this.canvas),
			annotationLineCanvas = ReactDOM.findDOMNode(this.annotationLineCanvas),
			height = this.props.viewport.height * this.props.pagesCount +
			(this.props.pagesCount - 1) * 9;

		canvas.height = Math.floor(height);
		canvas.width = Math.floor(this.props.viewport.width);
		annotationLineCanvas.height = Math.floor(height);
		annotationLineCanvas.width = Math.floor(this.props.viewport.width) + this.props.lineTextWidth;
		var ctx = canvas.getContext("2d");
		var linesCtx = annotationLineCanvas.getContext("2d");
		this.setState({
			ctx,
			linesCtx
		});
	}

	handleOnMouseDown(e) {
		e.preventDefault();
		this.setState({
			startX: e.pageX - this.canvas.offsetLeft,
			startY: e.pageY - 9 - this.canvas.offsetTop,
			mouseDown: true
		})
	}

	handleOnMouseUp(e) {
		var endX = e.pageX - this.canvas.offsetLeft,
			endY = e.pageY - 9 - this.canvas.offsetTop;

		if (this.state.startX != endX && this.state.startY != endY && this.state.mouseDown) {
			this.state.ctx.rect(this.state.startX, this.state.startY,
				endX - this.state.startX, endY - this.state.startY);
			this.state.ctx.fillStyle = this.props.color;
			this.state.ctx.fill();
			this.handleDrawLineToText(this.state.startX, this.state.startY,
				endX, endY);

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
					color: this.props.color
				}),
				mouseDown: false,
				textId: this.state.textId + 1
			})
		}
	}

	handleOnMouseDownMove(e) {
		if (this.state.mouseDown) {
			var endX = e.pageX - this.canvas.offsetLeft - this.state.startX,
				endY = e.pageY - this.canvas.offsetTop - 9 - this.state.startY;
			if (this.state.clearRect != null) {
				this.state.ctx.clearRect(this.state.clearRect[0], this.state.clearRect[1],
					this.state.clearRect[2], this.state.clearRect[3])
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			} else {
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			}
			this.state.ctx.fillRect(this.state.startX, this.state.startY,
				endX, endY);
			this.state.ctx.fillStyle = this.props.color;
			this.state.ctx.fill();
		}
	}

	handleDrawLineToText(startX, startY, endX, endY) {
		var textDivStyle = {},
			offsetLeft = this.annotationLineCanvas.offsetLeft,
			lineStartX = startX > endX ? startX : endX;
		textDivStyle.left = this.annotationLineCanvas.width - (this.state.textId % 2 == 0 ? 0 : this.props.decWidth);
		textDivStyle.top = endY - (endY - startY) / 2;

		this.state.linesCtx.beginPath();
		this.state.linesCtx.moveTo(lineStartX, endY - (endY - startY) / 2);
		this.state.linesCtx.lineTo(textDivStyle.left, textDivStyle.top);
		this.state.linesCtx.strokeStyle = this.props.color;
		this.state.linesCtx.stroke();
		this.setState({
			textDivs: this.state.textDivs.concat(<AnnotationText key={this.state.textId} left={textDivStyle.left} top={textDivStyle.top} offsetLeft={offsetLeft}/>),
			annotationDivs: Object.assign({}, {
				...this.state.annotationDivs,
				[this.state.textId]: {
					left: textDivStyle.left,
					top: textDivStyle.top
				}
			})
		})
	}

	handleOnContextMenu(e) {
		e.preventDefault();
		this.setState({
			mouseDown: false
		})
	}

	componentDidUpdate() {}

	render() {

		const annotationCanvasStyle = {
			position: 'absolute',
			zIndex: 10,
			opacity: this.props.opacity,
			margin: '1px auto -8px auto',
			borderLeft: '0px',
			borderRight: '0px',
			borderTop: '9px',
			borderStyle: 'solid',
			borderColor: 'transparent'
		}

		const annotationLineCanvasStyle = {
			position: 'absolute',
			zIndex: 5,
			opacity: this.props.opacity,
			margin: '1px auto -8px auto',
			borderLeft: '0px',
			borderRight: '0px',
			borderTop: '9px',
			borderStyle: 'solid',
			borderColor: 'transparent',
		}

		const annotationToolsBarStyle = {
			width: 50,
			height: 50,
			zIndex: 20,
			top: 60,
			position: 'fixed'
		}

		return (
			<div>
				<div style={annotationToolsBarStyle}>
					<span style={{display: 'block', cursor: 'pointer'}}>
						<i className={FontFace.iconfont}>&#xe600;</i>
						<span style={{display: 'block'}}>颜色</span>
					</span>					
				</div>

				<canvas ref={(c) => this.canvas = c}
						style={annotationCanvasStyle}
						onMouseDown={this.handleOnMouseDown.bind(this)}
						onMouseUp={this.handleOnMouseUp.bind(this)}
						onMouseMove={this.handleOnMouseDownMove.bind(this)}
						onContextMenu={this.handleOnContextMenu.bind(this)}
				/>

				<canvas ref={(c) => this.annotationLineCanvas = c} 
						style={annotationLineCanvasStyle}
						/>

				<div style={{position:'relative'}}>
					{this.state.textDivs.map((e) => e)}
				</div>
			</div>
		)
	}
}

AnnotationViewer.defaultProps = {
	decWidth: 250,
	color: 'green'
}

module.exports = AnnotationViewer;