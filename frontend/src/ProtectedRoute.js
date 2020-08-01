import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

//the application access pages are added under protected routes to confirm authentication
//The protected route logic is taken from https://www.youtube.com/watch?v=Y0-qdp-XBJg [14].
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />
                } else if (typeof Storage !== "undefined" && localStorage.getItem("authenticated") !== null) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />
                }
            }}
        />
    );
}