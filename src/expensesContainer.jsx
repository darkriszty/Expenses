var React = require('react');
var ExpensesTable = require('./expensesTable');
var ExpensesForm = require('./expensesForm');

var ExpensesContainer = React.createClass({
	loadExpensesFromServer: function() {
		$.ajax({
			url: this.props.expensesDataUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({expensesData: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.expensesDataUrl, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {expensesData: []};
	},

	handleExpenseAdded: function(expense) {
		expense.id = Date.now();
		var newExpenses = this.state.expensesData.concat([expense]);
		this.setState({ expensesData: newExpenses });
	},

	componentDidMount: function() {
		this.loadExpensesFromServer();
	},

	render: function() {
		return (
			<div className="expensesContainer">
				<h1>Expenses</h1>
				<ExpensesTable expensesData={this.state.expensesData} />
				<ExpensesForm onExpenseAdded={this.handleExpenseAdded} />
			</div>
		);
	}
});

module.exports = ExpensesContainer;
