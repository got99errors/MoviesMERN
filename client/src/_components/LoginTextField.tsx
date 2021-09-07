import React from 'react'
import {
	TextField
} from "@material-ui/core";

interface LoginTextFieldProps {
    id: string,
    autoComplete?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    helperText: string
}

const LoginTextField = ({id, autoComplete=id, onChange, helperText}: LoginTextFieldProps) => {
    return (
        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name={id}
							label={id[0].toUpperCase()+id.substring(1)}
							type={id}
							id={id}
							autoComplete={autoComplete}
							onChange={onChange}
							helperText={helperText}
						/>
    )
}

export default LoginTextField
