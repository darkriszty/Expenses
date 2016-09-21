var React = require('react');
var moment = require('moment');

var DISPLAY_FORMAT = "DD.MM.YYYY";
var EDIT_FORMAT = "YYYY-MM-DD";

var ExpenseRow = React.createClass({
	getInitialState: function() {
		return this.getDefaultState();
	},
	getDefaultState: function() {
		return {
			isEditing: this.props.isEditing,
			expenseData: {
				date: moment(this.props.date, DISPLAY_FORMAT),
				amount: this.props.amount,
				description: this.props.description,
				category: this.props.category
			},
			editedExpenseData: {
				date: moment(this.props.date, DISPLAY_FORMAT),
				amount: this.props.amount,
				description: this.props.description,
				category: this.props.category
			}
		};
	},
	handleDateChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.date = moment(val, EDIT_FORMAT);
			return s;
		});
	},
	handleAmountChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.amount = val;
			return s;
		});
	},
	handleDescriptionChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.description = val;
			return s;
		});
	},
	handleCategoryChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.editedExpenseData.category = val;
			return s;
		});
	},
	handleEditModeChange: function(e) {
		e.preventDefault();
		var description = this.state.editedExpenseData.description.trim();
		var category = this.state.editedExpenseData.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}

		this.setState(s => {
			s.isEditing = !s.isEditing;
			s.expenseData.date = s.editedExpenseData.date;
			s.expenseData.amount = s.editedExpenseData.amount;
			s.expenseData.description = s.editedExpenseData.description;
			s.expenseData.category = s.editedExpenseData.category;
			return s;
		});

		this.props.onExpenseUpdated(this.state.expenseData);
	},
	handleCancel: function(e) {
		e.preventDefault();
		this.setState(s => {
			s.isEditing = false;
			s.editedExpenseData.date = s.expenseData.date;
			s.editedExpenseData.amount = s.expenseData.amount;
			s.editedExpenseData.description = s.expenseData.description;
			s.editedExpenseData.category = s.expenseData.category;
			return s;
		});
	},
	handleInputKeyDown: function(e) {
		if (e.keyCode === 13)
			this.handleEditModeChange(e);
	},
	render: function() {
		var formattedDate = "";
		if (this.state.isEditing) {
			formattedDate = this.state.expenseData.date.format(EDIT_FORMAT).toString();
			return (
				<tr>
					<td><input type="date" value={formattedDate} onChange={this.handleDateChange} onKeyDown={this.handleInputKeyDown} /></td>
					<td><input type="number" min="0" step="any" placeholder="amount" value={this.state.editedExpenseData.amount} onChange={this.handleAmountChange} onKeyDown={this.handleInputKeyDown} /></td>
					<td><input type="text" placeholder="description" value={this.state.editedExpenseData.description} onChange={this.handleDescriptionChange} onKeyDown={this.handleInputKeyDown} /></td>
					<td>
						<input type="text" placeholder="category" value={this.state.editedExpenseData.category} onChange={this.handleCategoryChange} onKeyDown={this.handleInputKeyDown} />
						<input type="submit" value="Update" onClick={this.handleEditModeChange} />
						<input type="submit" value="Cancel" onClick={this.handleCancel} />
					</td>
				</tr>
			);
		}

		formattedDate = this.state.expenseData.date.format(DISPLAY_FORMAT);
		return (
			<tr onClick={this.handleEditModeChange}>
				<td>{formattedDate}</td>
				<td>{this.state.expenseData.amount}</td>
				<td>{this.state.expenseData.description}</td>
				<td>{this.state.expenseData.category}</td>
			</tr>
		);
	}
});

module.exports = ExpenseRow;
