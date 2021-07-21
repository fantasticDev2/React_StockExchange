import axios from "axios";
import {SignupState} from "../reducer/signup.reducer";
import {Endpoints} from "../../../../shared/endpoints";

export function _setSignupButtonEnable(dispatch: any, param: boolean) {
    dispatch({
        type: "setIsButtonDisabled",
        payload: param
    })
}

export function _setSignupUsername(dispatch: any, username: string) {
    dispatch({
        type: "setUsername",
        payload: username
    });
}

export function _setFirstname(dispatch: any, firstname: string) {
    dispatch({
        type: "setFirstname",
        payload: firstname
    });
}

export function _setLastname(dispatch: any, lastname: string) {
    dispatch({
        type: "setLastname",
        payload: lastname
    });
}

export function _setEmail(dispatch: any, email: string) {
    dispatch({
        type: "setEmail",
        payload: email
    });
}

export function _setSignupPassword(dispatch: any, password: string) {
    dispatch({
        type: "setPassword",
        payload: password
    });
}

export function _setPhonenumber(dispatch: any, phonenumber: string) {
    dispatch({
        type: "setPhonenumber",
        payload: phonenumber
    });
}

export function _setAgreeTerms(dispatch: any, agree: boolean) {
    dispatch({
        type: "setAgreeTerm",
        payload: agree
    });
}

export function _signup(history: any, dispatch: any, params: SignupState) {
    const request = axios(Endpoints.auth.POST_CREATE_USER, {
        method: 'post',
        data: {
            userName: params.username,
            password: params.password,
            email: params.email,
            accessToken: "",
            refreshToken: "",
            roleId: 1,
            pic: "",
            firstName: params.firstname,
            lastName: params.lastname,
            fullname: params.firstname + ' ' + params.lastname,
            occupation: "",
            companyName: "",
            phone: params.phonenumber,
            adress: {
                addressLine: "",
                city: "",
                state: "",
                postCode: ""
            },
            socialNetworks: {
                linkedIn: "",
                facebook: "",
                twitter: "",
                instagram: ""
            },
            workspaceIds: []
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    request.then((response: any) => {
        /*if(response.data.email != null){
            history.replace(SIGNIN);
        }*/
        if (response.data.email != null) {
            dispatch({
                type: 'signupSuccess',
                payload: "SignUp Successfully"
            });
        }
    });
}
