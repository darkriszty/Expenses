var React = require('react');
var ExpenseRow = require('./expenseRow');
var AddExpenseRow = require('./addExpenseRow');

var ExpensesTable = React.createClass({
	createRow: function(id, date, amount, description, category, isEditing) {
		return (
			<ExpenseRow
				key={id}
				rowId={id}
				date={date}
				amount={amount}
				description={description}
				category={category}
				isEditing={isEditing}
				onExpenseUpdated={this.handleRowUpdated} />
		);
	},

	handleRowUpdated: function(updatedExpenseData) {
		this.props.onExpenseUpdated(updatedExpenseData);
	},

	handleExpenseAdded: function(addedExpenseData) {
		this.props.onExpenseAdded(addedExpenseData);
	},

	getInitialState: function() {
		return {expenseRows: []};
	},

	render: function() {
		var expenseRows = this.props.expensesRows.map(function (expense) {
			return this.createRow(
				expense.id, expense.date, expense.amount, expense.description,
				expense.category, false);
		}.bind(this));

		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						<th>Description</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{expenseRows}
					<AddExpenseRow onExpenseAdded={this.handleExpenseAdded} />
				</tbody>
			</table>
		);
	}
});

module.exports = ExpensesTable;
