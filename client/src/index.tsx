import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiPickersUtilsProvider>
	</Provider>,
	document.getElementById("root")
);
