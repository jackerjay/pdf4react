import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';

import AnnotationText from './AnnotationText';
import AnnotationToolsMenu from './AnnotationToolsMenu';

import FontFace from '../css/font-face.css';

class AnnotationViewer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startX: null,
			startY: null,
			ctx: null,
			interfaceCtx: null,
			linesCtx: null,
			mouseDown: false,
			clearRect: null,
			textDivs: [],
			annotations: [],
			annotationDivs: {},
			textId: 0,
			color: 'rgba(0, 128, 0, 0.5)'
		}
	}

	componentDidMount() {
		var canvas = ReactDOM.findDOMNode(this.canvas),
			annotationInterfaceCanvas = ReactDOM.findDOMNode(this.interfaceCanvas),
			annotationLineCanvas = ReactDOM.findDOMNode(this.annotationLineCanvas),
			height = this.props.viewport.height * this.props.pagesCount +
			(this.props.pagesCount - 1) * 9;

		canvas.height = Math.floor(height);
		canvas.width = Math.floor(this.props.viewport.width);
		annotationInterfaceCanvas.height = canvas.height;
		annotationInterfaceCanvas.width = canvas.width;
		annotationLineCanvas.height = Math.floor(height);
		annotationLineCanvas.width = Math.floor(this.props.viewport.width) + this.props.lineTextWidth;
		var ctx = canvas.getContext("2d");
		var linesCtx = annotationLineCanvas.getContext("2d");
		var interfaceCanvas = annotationInterfaceCanvas.getContext("2d");
		this.setState({
			ctx,
			linesCtx,
			interfaceCanvas
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
			this.state.interfaceCanvas.beginPath();
			this.state.interfaceCanvas.clearRect(0, 0, this.interfaceCanvas.width, this.interfaceCanvas.height);
			this.state.interfaceCanvas.closePath();

			this.state.ctx.beginPath();
			this.state.ctx.fillStyle = this.state.color;
			this.state.ctx.fillRect(this.state.startX, this.state.startY,
				endX - this.state.startX, endY - this.state.startY);
			this.state.ctx.closePath();
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
					color: this.state.color
				}),
				mouseDown: false,
				textId: this.state.textId + 1,
				clearRect: null
			})
		}
	}

	handleOnMouseDownMove(e) {
		if (this.state.mouseDown) {
			var endX = e.pageX - this.canvas.offsetLeft - this.state.startX,
				endY = e.pageY - this.canvas.offsetTop - 9 - this.state.startY;
			this.state.interfaceCanvas.beginPath();
			if (this.state.clearRect != null) {
				this.state.interfaceCanvas.clearRect(this.state.clearRect[0], this.state.clearRect[1],
					this.state.clearRect[2], this.state.clearRect[3])
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			} else {
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			}
			this.state.interfaceCanvas.fillStyle = this.state.color;
			this.state.interfaceCanvas.fillRect(this.state.startX, this.state.startY,
				endX, endY);
			this.state.interfaceCanvas.closePath();
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
		this.state.linesCtx.strokeStyle = this.state.color;
		this.state.linesCtx.stroke();
		this.state.linesCtx.closePath();

		this.setState({
			textDivs: this.state.textDivs.concat(
				<AnnotationText key={this.state.textId} 
					id={this.state.textId}
					left={textDivStyle.left} 
					top={textDivStyle.top} 
					offsetLeft={offsetLeft}
					color={this.state.color}
					onCloseTextDiv={this.handleOnCloseTextDiv.bind(this)}/>),
			annotationDivs: Object.assign({}, {
				...this.state.annotationDivs,
				[this.state.textId]: {
					left: textDivStyle.left,
					top: textDivStyle.top,
					lineStartX: lineStartX
				}
			})
		})
	}

	handleDeleLineToText(id) {
		var deleLine = this.state.annotationDivs[id];
		this.state.linesCtx.beginPath();
		this.state.linesCtx.clearRect(deleLine.lineStartX, deleLine.top - this.state.linesCtx.lineWidth,
			deleLine.left, this.state.linesCtx.lineWidth * 2);
		this.state.linesCtx.closePath();
	}

	handleOnContextMenu(e) {
		e.preventDefault();
		if (this.state.mouseDown) {
			var endX = e.pageX - this.canvas.offsetLeft - this.state.startX,
				endY = e.pageY - this.canvas.offsetTop - 9 - this.state.startY;
			if (this.state.clearRect != null) {
				this.state.ctx.beginPath();
				this.state.ctx.clearRect(this.state.clearRect[0], this.state.clearRect[1],
					this.state.clearRect[2], this.state.clearRect[3])
				this.state.ctx.closePath();
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			} else {
				this.setState({
					clearRect: [this.state.startX, this.state.startY, endX, endY]
				})
			}
		}
		this.setState({
			mouseDown: false
		})
	}

	handleOnCloseTextDiv(id) {

		var textDivsTemp = this.state.textDivs.filter((e) => {
				return e.key != id
			}),
			annotationsTemp = this.state.annotations.filter((e) => {
				return e.textId != id
			})
		var filterAnnotation = this.state.annotations.filter((e) => {
			return e.textId == id
		})[0];
		this.state.ctx.beginPath();
		this.state.ctx.clearRect(filterAnnotation.location.startX,
			filterAnnotation.location.startY,
			filterAnnotation.location.endX - filterAnnotation.location.startX,
			filterAnnotation.location.endY - filterAnnotation.location.startY
		);
		this.state.ctx.closePath();
		this.handleDeleLineToText(id);

		this.setState({
			textDivs: textDivsTemp,
			annotations: annotationsTemp,
			clearRect: null
		})
	}

	handleOnColorChanged(color) {
		this.setState({
			color
		})
	}

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

		const annotationsInterfaceCanvas = {
			position: 'absolute',
			zIndex: 15,
			opacity: this.props.opacity,
			margin: '1px auto -8px auto',
			borderLeft: '0px',
			borderRight: '0px',
			borderTop: '9px',
			borderStyle: 'solid',
			borderColor: 'transparent'
		}

		return (
			<div>
				<AnnotationToolsMenu colorChangeCallback={this.handleOnColorChanged.bind(this)}/>

				<canvas ref={(c) => this.canvas = c}
						style={annotationCanvasStyle}
				/>

				<canvas ref={(c) => this.interfaceCanvas = c}
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
	decWidth: 250
}

module.exports = AnnotationViewer;