import React, {
    Component
} from 'react';

import PdfViewer from './PdfViewer'
import styles from './css/viewer.css'

require('./PDFJS/pdf');

class PDFWrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const styles = {
            width: '100%',
            height: '100%'
        }
        return (
            <div id={styles.outerContainer}>
                <div id={styles.mainContainer}>
                    <div ref={(c) => this.div = c} id={styles.viewerContainer}>
                        <PdfViewer url={this.props.url} 
                                scale={this.props.scale} 
                                EnableAnnotation={this.props.EnableAnnotation}
                                EnableRenderTextDiv={this.props.EnableRenderTextDiv}
                                AnnotationLineWidth={this.props.AnnotationLineWidth}
                                AnnotationViewerOpacity={this.props.AnnotationViewerOpacity}/>
                    </div>
                </div>
            </div>
        )
    }
}

PDFWrapper.propTypes = {
    scale: React.PropTypes.number,
    AnnotationViewerOpacity: React.PropTypes.number,
    AnnotationLineWidth: React.PropTypes.number,
    EnableAnnotation: React.PropTypes.bool,
    EnableRenderTextDiv: React.PropTypes.bool
}

PDFWrapper.defaultProps = {
    scale: 1.0,
    AnnotationViewerOpacity: 0.4,
    AnnotationLineWidth: 400,
    EnableAnnotation: false,
    EnableRenderTextDiv: false
}

module.exports = PDFWrapper;