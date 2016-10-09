import React, {Component} from 'react';

import PdfViewer from './PdfViewer'
import styles from './viewer.css'

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
                        <PdfViewer url={this.props.url} scale={this.props.scale}/>
                    </div>
                </div>
            </div>
        )
    }
}

PDFWrapper.defaultProps = {page: 1, scale: 1.0}

module.exports = PDFWrapper;