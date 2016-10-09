import React, {Component} from 'react';

import * as utils from './ui_utils';

import TextLayerBuilder from './TextLayerBuilder'
import PageContainer from './PdfPageView'

import styles from './viewer.css'

import './PDFJS/pdf'

class PdfViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport : null,
            textLayers: []
        }
    }

    componentDidMount() {

        setTextContent = setTextContent.bind(this);
        setViewport = setViewport.bind(this);
        getScale = getScale.bind(this);

        var key = 0;

        function setTextContent(textContent, pdfPage) {
            const TextLayerRender = <PageContainer key={key++} keyId={key} textContent={textContent} viewport={this.state.viewport} enhanceTextSelection={false} pdfPage={pdfPage}/>;
            var tempTextLayer = this.state.textLayers.concat(TextLayerRender);
            this.setState({textLayers : tempTextLayer})
        }
        
        function setViewport(viewport) {
            this.setState({viewport})
        }

        function getScale() {
            return this.props.scale;
        }

        PDFJS.getDocument(this.props.url).then(function(pdf) {
            var pagesCount = pdf.numPages;
            for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
                pdf.getPage(pageNum).then(function (pdfPage) {
                    var scale = getScale();
                    setViewport(pdfPage.getViewport(scale * utils.CSS_UNITS))
                    pdfPage.getTextContent({
                        normalizeWhitespace: true,
                    }).then(function textContentResolved(textContent) {
                        setTextContent(textContent, pdfPage);
                    })
                })
            }
        });
    }

    render() {
        return (
            <div id={styles.viewer} className={styles.pdfViewer}>
                {this.state.textLayers.map((e) => e)}
            </div>
        )
    }
}

module.exports = PdfViewer;