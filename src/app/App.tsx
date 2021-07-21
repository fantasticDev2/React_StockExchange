import React, {createContext, useContext, useEffect, useReducer} from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Scrollbar from "react-perfect-scrollbar";
import {Theme} from "../theme";
import GlobalCss from "../styles/jss/GlobalCss";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {TypographyOptions} from "@material-ui/core/styles/createTypography";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import {PaletteColor} from "@material-ui/core/styles/createPalette";
import {orange400} from "material-ui/styles/colors";
import orange from "@material-ui/core/colors/orange";

const Context = createContext(null);
const {Provider} = Context;
const reducer = (state, action) => {
    switch (action.type) {
        case 'direction':
            const newState = {
                ...state,
                direction: state.direction === 'ltr' ? 'rtl' : 'ltr'
            };
            return newState;
        case 'type':
            return {...state, type: state.type === 'light' ? 'dark' : 'light'};
        default:
            return state;
    }
};

function App({children}) {
    const [theme, setTheme] = React.useState(Theme); // defaultTheme
    const updateTheme = () => {
        setTheme(Theme);
    };

    // For Dashboard
    const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)');
    const [state, dispatch] = useReducer(reducer, {
        type: prefersDarkMode ? 'dark' : 'light',
        direction: 'ltr'
    });
    const typography: TypographyOptions = {
        /*TODO headline: {
            fontSize: '1rem'
        },*/
        subtitle1: {
            fontSize: '0.8125rem'
        },
        button: {
            fontWeight: 400,
            textTransform: 'initial'
        },
        body1: {
            fontSize: '0.875rem'
        }

    };

    const muiTheme = createMuiTheme({
        direction: state.direction,
        palette: {
            type: state.type,
            primary: indigo,
            secondary: orange,
            error: red
        },
        typography,
        shape:
            {
                borderRadius: 4
            }
    });

    useEffect(() => {
        document.body.dir = state.direction;
    }, [state.direction]);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <GlobalCss>
                <Scrollbar
                    className="h-full-screen scrollable-content"
                    option={{suppressScrollX: true}}
                >
                    <Provider value={[state, dispatch]}>{children}</Provider>

                </Scrollbar>
            </GlobalCss>
        </MuiThemeProvider>
    );
}

export default App;
export const useAppState = () => useContext(Context);
