import React from "react";
import { Route, Redirect } from "react-router-dom";


import { isLogged } from '../helpers/AuthHandler';


export default ({children, ...rest}) => {
    let logged = isLogged();
    let authoraized = (rest.private && !logged ? false : true)

    return (
        <Route
         {...rest}
        render={()=>
            authoraized ? children :  <Redirect to="/Signin" />
        }
        
        />
    );
}