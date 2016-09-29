import ReactDOM from "react-dom";
import ExpensesContainer from "./ExpensesContainer"

ReactDOM.render(
	<ExpensesContainer expensesDataUrl='api/v1/expenses' />,
	document.getElementById('content')
);
