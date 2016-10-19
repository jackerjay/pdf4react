import React, {
    Component
} from 'react';

import * as utils from './ui_utils';

import TextLayerBuilder from './TextLayerBuilder';
import PdfPageView from './PdfPageView';
import AnnotationViewer from './AnnotationViewer/AnnotationViewer';
import AnnotationBar from './AnnotationViewer/AnnotationBar';

import styles from './css/viewer.css';

import './PDFJS/pdf';

class PdfViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: null,
            textLayers: [],
            startXpath: null,
            endXpath: null,
            selected: false,
            menuStyles: {},
            annocationDivs: [],
            pagesCount: 0,
            AnnotationViewerOpacity: this.props.AnnotationViewerOpacity ? this.props.AnnotationViewerOpacity : 0.4,
            AnnotationLineWidth: 400,
            EnableAnnotation: false,
            EnableRenderTextDiv: false
        }
    }

    componentDidMount() {

        var setTextContent = (function setTextContent(textContent, pdfPage) {
            const TextLayerRender =
                <PdfPageView 
                    keyId={pdfPage.pageIndex} 
                    key={pdfPage.pageIndex}
                    textContent={textContent} 
                    viewport={this.state.viewport} 
                    enhanceTextSelection={false}
                    pdfPage={pdfPage}
                    EnableRenderTextDiv={this.props.EnableRenderTextDiv}
            />;
            var tempTextLayer = this.state.textLayers.concat(TextLayerRender);
            this.setState({
                textLayers: tempTextLayer
            })
        }).bind(this)

        var setViewport = (function setViewport(viewport, pagesCount) {
            this.setState({
                viewport,
                pagesCount
            });
        }).bind(this)

        var getScale = (function getScale() {
            return this.props.scale;
        }).bind(this)

        PDFJS.getDocument(this.props.url).then(function(pdf) {
            var pagesCount = pdf.numPages;
            for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
                pdf.getPage(pageNum).then(function(pdfPage) {
                    var scale = getScale();
                    setViewport(pdfPage.getViewport(scale * utils.CSS_UNITS), pagesCount);
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

        const wrapperDivStyle = {
            border: '9px solid transparent',
            width: this.state.viewport ? this.state.viewport.width : 'auto',
            margin: this.props.EnableAnnotation ? '' : '1px auto -8px auto'
        }

        return (
            <div id={styles.viewer} 
                className={styles.pdfViewer}
                >
                <div style={wrapperDivStyle}>
                {
                    this.props.EnableAnnotation ?
                    <div>
                        <AnnotationBar />
                        {
                            this.state.pagesCount === 0 ? "" : 
                                <AnnotationViewer viewport={this.state.viewport} 
                                              pagesCount={this.state.pagesCount}
                                              lineTextWidth={this.props.AnnotationLineWidth}
                                              opacity = {this.props.AnnotationViewerOpacity}/>
                        }
                    </div> : ""
                 }

                {
                    this.state.textLayers.sort((a,b) => {
                        return a.key - b.key
                    }).map((e) => e)
                }
                </div>
            </div>
        )
    }
}

module.exports = PdfViewer;