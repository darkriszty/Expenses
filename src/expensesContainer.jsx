import React from "react";
import ExpensesTable from "./ExpensesTable"

export default class ExppensesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expensesData : [] };
	}
	loadExpensesFromServer() {
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
	}

	handleAddExpense(newExpenseData) {
		var currentData = this.state.expensesData;
        newExpenseData.id = Date.now();
        var newExpenses = currentData.concat([newExpenseData]);
        this.setState({expensesData: newExpenses});
	}
	handleUpdateExpense(updatedExpenseData) {

	}

	componentDidMount() {
		this.loadExpensesFromServer();
	}

	render() {
		return (
			<div className="expensesContainer">
				<h1>Expenses</h1>
				<ExpensesTable
					expensesRows={this.state.expensesData}
					onExpenseAdded={this.handleAddExpense.bind(this)}
					onExpenseUpdated={this.handleUpdateExpense.bind(this)} />
			</div>
		);
	}
}
