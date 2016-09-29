import React from "react";
import AddExpenseRow from "./AddExpenseRow"
import ExpenseRow from "./ExpenseRow"

export default class ExpensesTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expenseRows : [] };
	}
	createRow(id, date, amount, description, category, isEditing) {
		return (
			<ExpenseRow
				key={id}
				rowId={id}
				date={date}
				amount={amount}
				description={description}
				category={category}
				isEditing={isEditing}
				onExpenseUpdated={this.handleRowUpdated.bind(this)} />
		);
	}

	handleRowUpdated(updatedExpenseData) {
		this.props.onExpenseUpdated(updatedExpenseData);
	}

	handleExpenseAdded(addedExpenseData) {
		this.props.onExpenseAdded(addedExpenseData);
	}

	render() {
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
					<AddExpenseRow onExpenseAdded={this.handleExpenseAdded.bind(this)} />
				</tbody>
			</table>
		);
	}
}
