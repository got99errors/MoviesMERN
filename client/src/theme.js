import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
	palette: {
	  primary: {
		main: "#FF6C03"
	  },
	  secondary:{
		  main:"#E38902"
	  },
	  background:{
		//   default: "#E6C522",
		  paper: "#FAF55A"
	  }
	},
  });

  export default theme;