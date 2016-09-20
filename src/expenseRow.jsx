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
				date: moment(this.props.date, EDIT_FORMAT),
				amount: this.props.amount,
				description: this.props.description,
				category: this.props.category
			}
		};
	},
	handleDateChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.expenseData.date = moment(val, "DD-MM-YYYY");
			return s;
		});
	},
	handleAmountChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.expenseData.amount = val;
			return s;
		});
	},
	handleDescriptionChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.expenseData.description = val;
			return s;
		});
	},
	handleCategoryChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.expenseData.category = val;
			return s;
		});
	},
	handleEditModeChange: function(e) {
		e.preventDefault();
		var description = this.state.expenseData.description.trim();
		var category = this.state.expenseData.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}

		this.props.onExpenseUpdated(this.state.expenseData);

		this.setState(s => {
			s.isEditing = !s.isEditing;
			return s;
		});
	},
	render: function() {
		var formattedDate = "";
		if (this.state.isEditing) {
			formattedDate = moment(this.state.expenseData.date, "DD-MM-YYYY").format(EDIT_FORMAT).toString();
			return (
				<tr>
					<td><input type="date" value={formattedDate} onChange={this.handleDateChange} /></td>
					<td><input type="number" min="0" step="any" placeholder="amount" value={this.state.expenseData.amount} onChange={this.handleAmountChange} /></td>
					<td><input type="text" placeholder="description" value={this.state.expenseData.description} onChange={this.handleDescriptionChange} /></td>
					<td>
						<input type="text" placeholder="category" value={this.state.expenseData.category} onChange={this.handleCategoryChange} />
						<input type="submit" value="Update" onClick={this.handleEditModeChange} />
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
