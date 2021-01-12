import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
	typography: {
		fontFamily: 'Aref Ruqaa'
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920
		}
	},
	palette: {
		type: 'light',
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff7961',
			main: '#f436be',
			dark: '#ba000d',
			contrastText: '#000'
		}
	},
	overrides: {
		// Style sheet name ⚛️
		MuiButton: {
			// Name of the rule
			text: {
				// Some CSS
				background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				borderRadius: 3,
				border: 0,
				color: 'white',
				height: 48,
				padding: '0 30px',
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
			}
		}
	}
});
