import React from "react";
import {Redirect, Route} from "react-router-dom";
import {SIGNIN} from "../../settings/constants";
import JwtService from '../../services/authService/authService'

function PrivateRoute({children, ...rest}) {
    const access_token = JwtService.getAccessToken();
    const isAuthenticated = JwtService.isAuthTokenValid(access_token);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: SIGNIN,
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
