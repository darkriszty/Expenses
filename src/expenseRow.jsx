var React = require('react');

var ExpenseRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.date}</td>
				<td>{this.props.amount}</td>
				<td>{this.props.description}</td>
				<td>{this.props.category}</td>
			</tr>
		);
	}
});

module.exports = ExpenseRow;
