import React from "react";

export type SignupState = {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    phonenumber: string
    agreeTems: boolean,
    isButtonDisabled: boolean
    isSignupSuccess: boolean
    helperText: string
    isError: boolean
};

export const initialSignupState: SignupState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    agreeTems: true,
    isButtonDisabled: true,
    isSignupSuccess: false,
    helperText: "",
    isError: false
};

export type SignupAction = { type: "setUsername", payload: string }
    | { type: "setFirstname", payload: string }
    | { type: "setLastname", payload: string }
    | { type: "setEmail", payload: string }
    | { type: "setPassword", payload: string }
    | { type: "setPhonenumber", payload: string }
    | { type: "setAgreeTerm", payload: boolean }
    | { type: "setIsButtonDisabled", payload: boolean }
    | { type: "signupSuccess", payload: string }
    | { type: "signupFailed", payload: string }
    | { type: "setIsError", payload: boolean };

export const signupreducer = (state: SignupState, action: SignupAction): SignupState => {
    switch (action.type) {
        case "setUsername":
            return {
                ...state,
                username: action.payload
            };
        case "setFirstname":
            return {
                ...state,
                firstname: action.payload
            };
        case "setLastname":
            return {
                ...state,
                lastname: action.payload
            };
        case "setEmail":
            return {
                ...state,
                email: action.payload
            };
        case "setPassword":
            return {
                ...state,
                password: action.payload
            };
        case "setPhonenumber":
            return {
                ...state,
                phonenumber: action.payload
            };
        case "setAgreeTerm":
            return {
                ...state,
                agreeTems: action.payload
            };
        case "setIsButtonDisabled":
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case "signupSuccess":
            return {
                ...state,
                helperText: action.payload,
                isSignupSuccess: true,
                isError: false
            };
        case "signupFailed":
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case "setIsError":
            return {
                ...state,
                isError: action.payload
            };
    }
};
