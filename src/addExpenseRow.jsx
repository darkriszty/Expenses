var React = require('react');
var moment = require('moment');

var EDIT_FORMAT = "YYYY-MM-DD";

var AddExpenseRow = React.createClass({
	getInitialState: function() {
		return this.getDefaultState();
	},
	componentDidMount: function() {
		this.focusInput();
	},
	getDefaultState: function() {
		return {
			date: moment(new Date(), EDIT_FORMAT),
			amount: 0,
			description: "",
			category: ""
		};
	},
	focusInput: function() {
		document.getElementById("amount").focus();
	},
	handleDateChange: function(e) {
		this.setState({date: moment(e.target.value, EDIT_FORMAT)});
	},
	handleAmountChange: function(e) {
		this.setState({amount: e.target.value});
	},
	handleDescriptionChange: function(e) {
		this.setState({description: e.target.value});
	},
	handleCategoryChange: function(e) {
		this.setState({category: e.target.value});
	},
	handleAddExpense: function(e) {
		e.preventDefault();
		var description = this.state.description.trim();
		var category = this.state.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}
		// send the new data to the parent
		var newRowData = {
			date: this.state.date,
			amount: this.state.amount,
			description: this.state.description,
			category: this.state.category
		};
		this.props.onExpenseAdded(newRowData);
		// clear current state
		this.setState(s => {
			s.date = moment(new Date(), EDIT_FORMAT);
			s.amount = 0;
			s.description = "";
			s.category = "";
		});
		this.focusInput();
	},
	handleInputKeyDown: function(e) {
		if (e.keyCode === 13)
			this.handleAddExpense(e);
	},
	render: function() {
		var formattedDate = this.state.date.format(EDIT_FORMAT).toString();
		return (
			<tr>
				<td><input type="date" value={formattedDate} onChange={this.handleDateChange} onKeyDown={this.handleInputKeyDown} /></td>
				<td><input id="amount" type="number" min="0" step="any" placeholder="amount" value={this.state.amount} onChange={this.handleAmountChange} onKeyDown={this.handleInputKeyDown} /></td>
				<td><input type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange} onKeyDown={this.handleInputKeyDown} /></td>
				<td>
					<input type="text" placeholder="category" value={this.state.category} onChange={this.handleCategoryChange} onKeyDown={this.handleInputKeyDown} />
					<input type="submit" value="Add" onClick={this.handleAddExpense} />
				</td>
			</tr>
		);
	}
});

module.exports = AddExpenseRow;
