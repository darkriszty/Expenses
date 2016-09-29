import React from "react";
import Moment from "moment";

const DISPLAY_FORMAT = "DD.MM.YYYY";
const EDIT_FORMAT = "YYYY-MM-DD";

export default class ExpenseRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: props.isEditing,
			editingCellId: null,
			expenseData: {
				date: Moment(props.date, DISPLAY_FORMAT),
				amount: props.amount,
				description: props.description,
				category: props.category
			},
			editedExpenseData: {
				date: Moment(props.date, DISPLAY_FORMAT),
				amount: props.amount,
				description: props.description,
				category: props.category
			}
		};
	}
	handleDateChange(e) {
		let val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.date = Moment(val, EDIT_FORMAT);
			return s;
		});
	}
	handleAmountChange(e) {
		let val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.amount = val;
			return s;
		});
	}
	handleDescriptionChange(e) {
		let val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.description = val;
			return s;
		});
	}
	handleCategoryChange(e) {
		let val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.category = val;
			return s;
		});
	}
	handleEditModeChange(e) {
		let description = this.state.editedExpenseData.description.trim();
		let category = this.state.editedExpenseData.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}

		var id = e.target.id;

		this.setState(s => {
			console.log(id);
			s.isEditing = !s.isEditing;
			s.editingCellId = id,
			s.expenseData.date = s.editedExpenseData.date;
			s.expenseData.amount = s.editedExpenseData.amount;
			s.expenseData.description = s.editedExpenseData.description;
			s.expenseData.category = s.editedExpenseData.category;
			return s;
		});

		this.props.onExpenseUpdated(this.state.expenseData);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.isEditing)
			document.getElementById(this.state.editingCellId).querySelector("input:first-of-type").focus();
	}
	handleCancel(e) {
		e.preventDefault();
		this.setState(s => {
			s.isEditing = false;
			s.editedExpenseData.date = s.expenseData.date;
			s.editedExpenseData.amount = s.expenseData.amount;
			s.editedExpenseData.description = s.expenseData.description;
			s.editedExpenseData.category = s.expenseData.category;
			return s;
		});
	}
	handleInputKeyDown(e) {
		if (e.keyCode === 13)
			this.handleEditModeChange(e);
		else if (e.keyCode === 27)
			this.handleCancel(e);
	}
	getCellId(name) {
		return name + "-" + this.props.rowId;
	}
	render() {
		let formattedDate = "",
			dateId = this.getCellId("date"),
			amountId = this.getCellId("amount"),
			descriptionId = this.getCellId("description"),
			categoryId = this.getCellId("category");

		if (this.state.isEditing) {
			formattedDate = this.state.expenseData.date.format(EDIT_FORMAT).toString();
			return (
				<tr>
					<td id={dateId}><input type="date" value={formattedDate} onChange={this.handleDateChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
					<td id={amountId}><input type="number" min="0" step="any" placeholder="amount" value={this.state.editedExpenseData.amount} onChange={this.handleAmountChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
					<td id={descriptionId}><input type="text" placeholder="description" value={this.state.editedExpenseData.description} onChange={this.handleDescriptionChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
					<td id={categoryId}>
						<input type="text" placeholder="category" value={this.state.editedExpenseData.category} onChange={this.handleCategoryChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} />
						<input type="submit" value="Update" onClick={this.handleEditModeChange.bind(this)} />
						<input type="submit" value="Cancel" onClick={this.handleCancel.bind(this)} />
					</td>
				</tr>
			);
		}

		formattedDate = this.state.expenseData.date.format(DISPLAY_FORMAT);
		return (
			<tr>
				<td id={dateId} onClick={this.handleEditModeChange.bind(this)}>{formattedDate}</td>
				<td id={amountId} onClick={this.handleEditModeChange.bind(this)}>{this.state.expenseData.amount}</td>
				<td id={descriptionId} onClick={this.handleEditModeChange.bind(this)}>{this.state.expenseData.description}</td>
				<td id={categoryId} onClick={this.handleEditModeChange.bind(this)}>{this.state.expenseData.category}</td>
			</tr>
		);
	}
}
