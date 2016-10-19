import React from 'react';
import {
	render
} from 'react-dom';
import PDF from './lib';

render(
	<PDF url="./test.pdf" 
		scale={0.9} 
		EnableAnnotation={true}
		EnableRenderTextDiv={true}/>,
	document.getElementById('root')
)