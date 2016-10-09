import React from 'react';
import {render} from 'react-dom';
import PDF from './src';

render(
    <PDF url="./test.pdf" />,
    document.getElementById('root')
)
