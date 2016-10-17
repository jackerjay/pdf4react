import React from 'react';
import {
	render
} from 'react-dom';
import PDF from './src';

render(
	<PDF url="./test.pdf" scale={0.9}/>,
	document.getElementById('root')
)