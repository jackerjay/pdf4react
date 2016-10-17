import React, {
	Component
} from 'react';

import ContextMenuSubMenu from './ContextMenuSubMenu'

class ContextMenu extends Component {

	render() {
		return (
			<div style={this.props.style}>
				<ContextMenuSubMenu />
			</div>
		)
	}
}

module.exports = ContextMenu;