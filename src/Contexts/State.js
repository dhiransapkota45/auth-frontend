import { createContext, useState } from "react";

const stateContext = createContext()

const State = (props) => {
    const [credentials, setCredentials] = useState({username:"", email:"", password:"", cpassword:""})
    // const [fetched_data, setFetched_data] = useState({})
    return(
        <stateContext.Provider value={{credentials, setCredentials}}>
            {props.children}
        </stateContext.Provider>
    )
}

export default State
export {stateContext}