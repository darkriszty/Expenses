var React = require('react');
var ExpenseRow = require('./ExpenseRow');

var ExpensesTable = React.createClass({
	render: function() {
		var expenseRows = this.props.expensesData.map(function (expense) {
			return (
				<ExpenseRow
					key={expense.id}
					date={expense.date}
					amount={expense.amount}
					description={expense.description}
					category={expense.category} />
			);
		});
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
				</tbody>
			</table>
		);
	}
});

module.exports = ExpensesTable;
