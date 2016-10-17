import React, {
	Component
} from 'react';

class ContextMenuSubMenu extends Component {

	handleAddClick() {
		console.log("click")
	}

	render() {
		return (
			<div>
				<ul>
					<li onClick={this.handleAddClick.bind(this)}>添加批注</li>
				</ul>
			</div>
		)
	}
}

module.exports = ContextMenuSubMenu;