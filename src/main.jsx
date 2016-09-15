var ReactDOM = require('react-dom');
var ExpensesContainer = require('./expensesContainer');

ReactDOM.render(
	<ExpensesContainer expensesDataUrl='api/v1/expenses' />,
	document.getElementById('content')
);
