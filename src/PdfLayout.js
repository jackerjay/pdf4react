import React, {Component} from 'react';

import PDF from './PDFWrapper'

require('../../../../../../PDFJS/build/pdf');
require('../../../../../../PDFJS/web/compatibility')

class PdfLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 2,
            pages: 0,
            file: '../pdf/test.pdf'
        };
    }
    
    render() {

        return (
            <div>
                <PDF url={this.state.file} />
            </div>
        )
    }
}

module.exports = PdfLayout;