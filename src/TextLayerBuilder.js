import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import styles from './css/viewer.css';
require('./PDFJS/pdf')

class TextLayerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textDivs: [],
            children: null
        }
    }

    componentDidMount() {

        var textLayer = ReactDOM.findDOMNode(this.textLayer);

        appendTextChild = appendTextChild.bind(this);

        function appendTextChild(textLayerFrag) {
            textLayer.appendChild(textLayerFrag)
        }

        if (this.props.textContent != null) {
            var textLayerFrag = document.createDocumentFragment();
            var textLayerRenderTask = PDFJS.renderTextLayer({
                textContent: this.props.textContent,
                container: textLayerFrag,
                viewport: this.props.viewport,
                textDivs: this.state.textDivs,
                timeout: 200,
                enhanceTextSelection: this.props.enhanceTextSelection
            })
            textLayerRenderTask.promise.then(function() {
                appendTextChild(textLayerFrag)
            })
        }
    }

    render() {

        const divStyle = {
            width: Math.floor(this.props.viewport.width),
            height: Math.floor(this.props.viewport.height)
        }

        return (
            <div 
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
                key={this.props.key} 
                className={styles.textLayer} 
                style={divStyle}
                ref={(c) => this.textLayer = c}
                onContextMenu={this.props.onContextMenu}>
            </div>
        )
    }
}

module.exports = TextLayerBuilder;