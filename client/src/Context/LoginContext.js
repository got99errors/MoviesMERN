import React, {useState, createContext} from 'react'

export const loginContextDefaultValue = {
    authenticated: false
}

export const LoginContext = createContext()

export const LoginContextProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    return (
        <LoginContext.Provider value={[authenticated, setAuthenticated]} >
            {props.children}
        </LoginContext.Provider>
    )
}


