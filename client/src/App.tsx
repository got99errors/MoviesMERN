import React from "react";
import MainContainerComp from "./_components/MainContainer";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth={"sm"}>
				<React.StrictMode>
					<MainContainerComp />
				</React.StrictMode>
			</Container>
		</ThemeProvider>
	);
}

export default App;
