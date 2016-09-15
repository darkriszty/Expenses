var React = require('react');

var ExpensesForm = React.createClass({
	getInitialState: function() {
		return this.getDefaultState();
	},
	getDefaultState: function() {
		return {
			date: new Date().toISOString().split('T')[0],
			amount: "",
			description: "",
			category: ""
		};
	},
	handleDateChange: function(e) {
		this.setState({ date: e.target.value });
	},
	handleAmountChange: function(e) {
		this.setState({ amount: e.target.value });
	},
	handleDescriptionChange: function(e) {
		this.setState({ description: e.target.value });
	},
	handleCategoryChange: function(e) {
		this.setState({ category: e.target.value });
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var description = this.state.description.trim();
		var category = this.state.category.trim();
		if (!description || !category)
			return;
		this.props.onExpenseAdded({
			date: this.state.date,
			amount: this.state.amount,
			description: this.state.description,
			category: this.state.category,
		});
		this.setState(this.getDefaultState());
	},

	render: function() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="date" value={this.state.date} onChange={this.handleDateChange} />
					<input type="number" min="0" step="any" placeholder="amount" value={this.state.amount} onChange={this.handleAmountChange} />
					<input type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange} />
					<input type="text" placeholder="category" value={this.state.category} onChange={this.handleCategoryChange} />
					<input type="submit" value="Add" />
				</form>
			</div>
		);
	}
});

module.exports = ExpensesForm;
