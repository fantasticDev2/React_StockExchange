import {createMuiTheme} from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {TypographyOptions} from "@material-ui/core/styles/createTypography";

const typography: TypographyOptions = {
    //useNextVariants: true,
};

const themeOptions: ThemeOptions = {
    palette: {
        type: "light",
        primary: indigo,
        secondary: orange,
        error: red,
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    typography,
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
            },
        },
        MuiCard: {
            root: {
                borderRadius: 8,
            },
        },
        MuiFab: {
            root: {
                textTransform: "none",
            },
        },
    },
};

export const Theme = createMuiTheme({
    ...themeOptions,
});

export const FooterTheme = createMuiTheme({
    ...themeOptions,
    palette: {
        type: "dark",
    },
});
