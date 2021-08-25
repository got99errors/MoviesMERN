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
		  default: "#FAF55A",
		  paper: "#E6C522"
	  }
	},
  });

  export default theme;