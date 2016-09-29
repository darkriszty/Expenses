import react from "react";
import Moment from "moment";

const EDIT_FORMAT = "YYYY-MM-DD";

export default class AddExpenseRow extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			date: Moment(new Date(), EDIT_FORMAT),
			amount: 0,
			description: "",
			category: ""
		};
	}

	componentDidMount() {
		this.focusInput();
	}

	focusInput() {
		document.getElementById("amount").focus();
	}
	handleDateChange(e) {
		this.setState({date: Moment(e.target.value, EDIT_FORMAT)});
	}
	handleAmountChange(e) {
		this.setState({amount: e.target.value});
	}
	handleDescriptionChange(e) {
		this.setState({description: e.target.value});
	}
	handleCategoryChange(e) {
		this.setState({category: e.target.value});
	}
	handleAddExpense(e) {
		e.preventDefault();
		let description = this.state.description.trim();
		let category = this.state.category.trim();
		if (!description || !category) {
			alert("Description and category can't be null");
			return;
		}
		// send the new data to the parent
		let newRowData = {
			date: this.state.date,
			amount: this.state.amount,
			description: this.state.description,
			category: this.state.category
		};
		this.props.onExpenseAdded(newRowData);
		// clear current state
		this.setState(s => {
			s.date = Moment(new Date(), EDIT_FORMAT);
			s.amount = 0;
			s.description = "";
			s.category = "";
		});
		this.focusInput();
	}
	handleInputKeyDown(e) {
		if (e.keyCode === 13)
			this.handleAddExpense(e);
	}
	render() {
		let formattedDate = this.state.date.format(EDIT_FORMAT).toString();
		return (
			<tr>
				<td><input type="date" value={formattedDate} onChange={this.handleDateChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
				<td><input id="amount" type="number" min="0" step="any" placeholder="amount" value={this.state.amount} onChange={this.handleAmountChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
				<td><input type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} /></td>
				<td>
					<input type="text" placeholder="category" value={this.state.category} onChange={this.handleCategoryChange.bind(this)} onKeyDown={this.handleInputKeyDown.bind(this)} />
					<input type="submit" value="Add" onClick={this.handleAddExpense.bind(this)} />
				</td>
			</tr>
		);
	}
}
