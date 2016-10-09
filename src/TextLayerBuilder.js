import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import styles from './viewer.css';
require('./PDFJS/pdf')

class TextLayerBuilder extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            textDivs: [],
            children: null
        }
        this.showContextMenu = this.showContextMenu.bind(this)
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

    showContextMenu(e) {
        e.preventDefault();
    }

    componentDidUpdate() {
    }

    
    render() {

        const divStyle = {
            width: Math.floor(this.props.viewport.width),
            height: Math.floor(this.props.viewport.height)
        }

        return (
            <div key={this.props.key} className={styles.textLayer} style={divStyle} ref={(c) => this.textLayer = c}>
            </div>
        )
    }
}

module.exports = TextLayerBuilder;