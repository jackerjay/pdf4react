import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import TextLayerBuilder from './TextLayerBuilder';
import styles from './viewer.css';

require('./PDFJS/pdf')

const DEFAULT_SCALE = 1;
const RenderingStates = null;

class PdfPageView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var canvas = ReactDOM.findDOMNode(this.canvas);
        var context = canvas.getContext('2d', {alpha: false});
        canvas.height = Math.floor(this.props.viewport.height);
        canvas.width = Math.floor(this.props.viewport.width);
        var renderContext = {
            canvasContext: context,
            viewport: this.props.viewport,
        }
        this.props.pdfPage.render(renderContext);
    }
    
    render() {

        const divStyle = {
            width: Math.floor(this.props.viewport.width),
            height: Math.floor(this.props.viewport.height),
            boxSizing: 'content-box'
        }
        
        return (
            <div className={styles.page} id={'pageContainer' + this.props.keyId} data-page-number={this.props.keyId} ref={(c) => this.div = c} style={divStyle}>
                <div className={styles.canvasWrapper} style={divStyle} ref={(c) => this.canvasWrapper = c}>
                    <canvas ref={(c) => this.canvas = c}/>
                </div>
                <TextLayerBuilder textContent={this.props.textContent} viewport={this.props.viewport} enhanceTextSelection={this.props.enhanceTextSelection}/>
            </div>
        )
    }

}

module.exports = PdfPageView;