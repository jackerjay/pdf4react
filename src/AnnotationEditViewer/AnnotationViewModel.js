import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

import AnnotationText from './AnnotationText';

class AnnotationViewModel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ctx: null,
			linesCtx: null,
			annotationDivs: [],
			textDivs: []
		}

		this.handleGetDivs = this.handleGetDivs.bind(this);
		this.handleDrawAnnotation = this.handleDrawAnnotation.bind(this);
	}

	componentDidMount() {

		this.props.action === undefined ? console.error("You must set the props 'action' when use view model!") : "";

		var canvas = ReactDOM.findDOMNode(this.canvas),
			annotationLineCanvas = ReactDOM.findDOMNode(this.annotationLineCanvas),
			height = Math.floor(this.props.viewport.height * this.props.pagesCount + (this.props.pagesCount - 1) * 9),
			width = Math.floor(this.props.viewport.width),
			annotationDivs = null;

		canvas.height = height;
		canvas.width = width;

		annotationLineCanvas.height = height;
		annotationLineCanvas.width = width + this.props.lineTextWidth;

		var ctx = canvas.getContext("2d"),
			linesCtx = annotationLineCanvas.getContext("2d");

		this.setState({
			ctx,
			linesCtx
		})

		var result = new Promise((resolve, reject) => {
			superagent.get(this.props.action)
					  .end((err, res) => err ? reject(res.body || err) : resolve(res.body))
		})
		result.then((res) => this.handleGetDivs(res), (err) => console.log(err));
	}

	handleGetDivs(res) {
		this.setState({
			annotationDivs: res.annotations
		})
		this.state.annotationDivs.map((annotation) => 
				this.handleDrawAnnotation(annotation))
	}

	handleDrawAnnotation(annotation) {
		var width = annotation.location.endX - annotation.location.startX,
			height = annotation.location.endY - annotation.location.startY;

		this.state.ctx.beginPath();
		this.state.ctx.fillStyle = annotation.color;
		this.state.ctx.fillRect(annotation.location.startX, annotation.location.startY,
								  width, height);
		this.state.ctx.closePath();

		var left = this.annotationLineCanvas.width - (annotation.textId % 2 == 0 ? 0 : this.props.decWidth),
			top = annotation.location.endY - (annotation.location.endY - annotation.location.startY) / 2,
			offsetLeft = this.annotationLineCanvas.offsetLeft;

		this.state.linesCtx.beginPath();
		this.state.linesCtx.moveTo(annotation.location.endX, 
			annotation.location.endY - (annotation.location.endY - annotation.location.startY) / 2);
		this.state.linesCtx.strokeStyle = annotation.color;
		this.state.linesCtx.lineTo(left, top);
		this.state.linesCtx.stroke();
		this.state.linesCtx.closePath();

		this.setState({
			textDivs: this.state.textDivs.concat(
				<AnnotationText key={annotation.textId} 
					id={annotation.textId}
					top={top + this.state.ctx.canvas.offsetTop}
					left={left}
					offsetLeft={offsetLeft}
					color={annotation.color}
					text={annotation.text}
				/>
			)
		})
	}

	render() {

		const canvasStyle = {
			position: 'absolute',
			zIndex: 10,
			opacity: 0.5,
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
			opacity: 0.5,
			margin: '1px auto -8px auto',
			borderLeft: '0px',
			borderRight: '0px',
			borderTop: '9px',
			borderStyle: 'solid',
			borderColor: 'transparent',
		}

		return (
			<div>
				<canvas ref={(e) => this.canvas = e} 
						style={canvasStyle}/>
				<canvas ref={(e) => this.annotationLineCanvas = e}
						style={annotationLineCanvasStyle}/>
				{this.state.textDivs.map((div) => div)}
			</div>
		)
	}
}

module.exports = AnnotationViewModel;