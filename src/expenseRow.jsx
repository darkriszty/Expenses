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
			isEditing: false,
			rowData: {
				date: this.props.date,
				amount: this.props.amount,
				description: this.props.description,
				category: this.props.category
			}
		};
	},
	handleDateChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.rowData.date = moment(val, "EDIT_FORMAT");
			return s
		});
	},
	handleAmountChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.rowData.amount = val;
			return s
		});
	},
	handleDescriptionChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.rowData.description = val;
			return s
		});
	},
	handleCategoryChange: function(e) {
		var val = e.target.value;
		this.setState(s => {
			s.rowData.category = val;
			return s
		});
	},
	handleEditModeChange: function(e) {
		e.preventDefault();
		var description = this.state.rowData.description.trim();
		var category = this.state.rowData.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}

		//TODO: submit update to server
		this.setState(s => {
			s.isEditing = !s.isEditing;
			return s
		});
	},
	render: function() {
		var formattedDate = "";
		if (this.state.isEditing) {
			formattedDate = moment(this.state.rowData.date, "DD-MM-YYYY").format("EDIT_FORMAT").toString();
			return (
				<tr>
					<td><input type="date" value={formattedDate} onChange={this.handleDateChange} /></td>
					<td><input type="number" min="0" step="any" placeholder="amount" value={this.state.rowData.amount} onChange={this.handleAmountChange} /></td>
					<td><input type="text" placeholder="description" value={this.state.rowData.description} onChange={this.handleDescriptionChange} /></td>
					<td>
						<input type="text" placeholder="category" value={this.state.rowData.category} onChange={this.handleCategoryChange} />
						<input type="submit" value="Update" onClick={this.handleEditModeChange} />
					</td>
				</tr>
			);
		}

		formattedDate = moment(this.state.rowData.date, "DISPLAY_FORMAT", true).format("DISPLAY_FORMAT");
		return (
			<tr onClick={this.handleEditModeChange}>
				<td>{formattedDate}</td>
				<td>{this.state.rowData.amount}</td>
				<td>{this.state.rowData.description}</td>
				<td>{this.state.rowData.category}</td>
			</tr>
		);
	}
});

module.exports = ExpenseRow;
