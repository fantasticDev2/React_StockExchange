import {makeStyles} from "@material-ui/core/styles";

export const shadowStyles = makeStyles(({palette, ...theme}) => ({
    "@global": {
        ...generateShadows(theme),
    },
}));

const generateShadows = (theme: any) => {
    let classList = {};

    theme.shadows.map((shadow: any, ind: any) => {
        // @ts-ignore
        classList[`.elevation-z${ind}`] = {
            boxShadow: `${shadow} !important`,
        };
    });

    return classList;
};
