var React = require('react');
var ExpensesTable = require('./expensesTable');

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

	handleAddExpense: function(newExpenseData) {
		var currentData = this.state.expensesData;
        newExpenseData.id = Date.now();
        var newExpenses = currentData.concat([newExpenseData]);
        this.setState({expensesData: newExpenses});
	},
	handleUpdateExpense: function(updatedExpenseData) {

	},

	componentDidMount: function() {
		this.loadExpensesFromServer();
	},

	render: function() {
		return (
			<div className="expensesContainer">
				<h1>Expenses</h1>
				<ExpensesTable
					expensesRows={this.state.expensesData}
					onExpenseAdded={this.handleAddExpense}
					onExpenseUpdated={this.handleUpdateExpense} />
			</div>
		);
	}
});

module.exports = ExpensesContainer;
