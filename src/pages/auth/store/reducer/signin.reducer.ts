import React from "react";
import PropTypes from "prop-types";

export type State = {
    email: string
    password: string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean,
    isAuthenticated: boolean
    isAuthFailed: boolean
};

export const initialState: State = {
    email: "",
    password: "",
    isButtonDisabled: true,
    helperText: "",
    isError: false,
    isAuthenticated: false,
    isAuthFailed: false
};

export type Action = { type: "setEmail", payload: string }
    | { type: "setPassword", payload: string }
    | { type: "setIsButtonDisabled", payload: boolean }
    | { type: "loginSuccess", payload: string }
    | { type: "loginFailed", payload: string }
    | { type: "setIsError", payload: boolean }
    | { type: "resetAuth", payload: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
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
        case "setIsButtonDisabled":
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case "loginSuccess":
            return {
                ...state,
                helperText: action.payload,
                isAuthenticated: true,
                isError: false
            };
        case "loginFailed":
            return {
                ...state,
                helperText: action.payload,
                isAuthFailed: true,
                isError: true
            };
        case "setIsError":
            return {
                ...state,
                isError: action.payload
            };
        case "resetAuth":
            return {
                ...state,
                isAuthFailed: action.payload,
                email: "",
                password: ""
            };
    }
};
