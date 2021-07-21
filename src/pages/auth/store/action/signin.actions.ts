import axios from "axios";
import JwtService from '../../../../services/authService/authService';
import {Endpoints} from "../../../../shared/endpoints";

export function _setSigninButtonEnable(dispatch: any, param: boolean) {
    dispatch({
        type: "setIsButtonDisabled",
        payload: param
    })
}

export function _setSigninEmail(dispatch: any, email: string) {
    dispatch({
        type: "setEmail",
        payload: email
    });
}

export function _setSigninPassword(dispatch: any, password: string) {
    dispatch({
        type: "setPassword",
        payload: password
    });
}

export function _login(history: any, dispatch: any, state: any) {
    const request = axios(Endpoints.auth.POST_GET_TOKEN, {
        method: 'post',
        data: {
            email: state.email,
            password: state.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    request.then((response: any) => {
        if (response.data != null && response.data.accessToken != null) {
            JwtService.setSession(response.data.accessToken);
            dispatch({
                type: "loginSuccess",
                payload: "Login Successfully"
            });
            history.replace('/admin');
        } else {
            dispatch({
                type: 'loginFailed',
                payload: 'Login Failed'/*error*/
            });
        }
    })
        .catch((error: any) => {
            dispatch({
                type: 'loginFailed',
                payload: 'Login Failed'/*error*/
            });
        });
}


