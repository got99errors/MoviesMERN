import React from "react";
import MainContainerComp from "./_components/MainContainer";
import Container from "@material-ui/core/Container";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth={"sm"}>
				<React.StrictMode>
					<MainContainerComp />
				</React.StrictMode>
			</Container>
		</ThemeProvider>
	);
}

export default App;
