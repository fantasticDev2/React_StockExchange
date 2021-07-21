import React, {useEffect, useReducer} from "react";
import {Link as RouterLink, useHistory, withRouter} from "react-router-dom";
import {makeStyles, Theme} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Button, Grid, IconButton, Link, TextField, Typography} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {initialState, reducer} from '../store/reducer/index';
import * as Actions from '../store/action/index';
import {DASHBOARD, SIGNUP} from "../../../settings/constants";
import JwtService from '../../../services/authService/authService'
import CustomModal from "../../../components/Modal/Modal";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%"
    },
    grid: {
        height: "100%"
    },
    quoteContainer: {
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
    },
    quote: {
        backgroundColor: "#FFF",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/assets/images/auth.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    quoteInner: {
        textAlign: "center",
        flexBasis: "600px"
    },
    quoteText: {
        color: "#FFF",
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: "#FFF"
    },
    bio: {
        color: "#FFF"
    },
    contentContainer: {},
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        /*paddingTop: theme.spacing(5),*/
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        /*flexGrow: 1,*/
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        width: 400,
        margin: `${theme.spacing(0)} auto`
    },
    header: {
        textAlign: "center",
        background: "#212121",
        color: "#fff"
    },
    card: {
        marginTop: theme.spacing(10)
    }
}));


const SignIn = (props: any) => {
    const history = useHistory();
    const classes = useStyles();

    const access_token = JwtService.getAccessToken();
    const isAuthenticated = JwtService.isAuthTokenValid(access_token);
    if (isAuthenticated) {
        history.replace(DASHBOARD);
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        if (state.email.trim() && state.password.trim()) {
            Actions._setSigninButtonEnable(dispatch, false);
        } else {
            Actions._setSigninButtonEnable(dispatch, true);
        }
        if (state.isAuthFailed) {
            setModalShow(true);
            dispatch({
                type: 'resetAuth',
                payload: false
            });
        }
    }, [state.email, state.password, state.isAuthFailed]);

    const handleLogin = () => {
        Actions._login(history, dispatch, state);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setSigninEmail(dispatch, event.target.value);
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setSigninPassword(dispatch, event.target.value);
        };

    const handleBack = () => {
        history.goBack();
    };

    const handleSignIn: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        console.log("here");
        //history.push("/admin");
    };

    return (
        <>
            <CustomModal
                show={modalShow}
                title="SignIn Failed"
                content="The credentials does not exist..."
                action="Ok"
                onHide={() => {
                    setModalShow(false);
                }}
            />
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                >
                    <Grid
                        className={classes.quoteContainer}
                        item
                        lg={5}
                    >
                        <div className={classes.quote}>
                            <div className={classes.quoteInner}>
                                <Typography
                                    className={classes.quoteText}
                                    variant="h1"
                                >
                                    Graph Management
                                </Typography>
                                <div className={""}>
                                    <Typography
                                        className={classes.name}
                                        variant="body1"
                                    >
                                        Graph Mgmt
                                    </Typography>
                                    <Typography
                                        className={classes.bio}
                                        variant="body2"
                                    >
                                        Neo4j UI Tool
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        className={classes.content}
                        item
                        lg={7}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <div className={classes.contentHeader}>
                                <IconButton onClick={handleBack}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </div>
                            <div className={classes.contentBody}>
                                <form
                                    className={classes.form}
                                    onSubmit={handleLogin}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h3"
                                    >
                                        Sign in
                                    </Typography>
                                    <TextField
                                        error={state.isError}
                                        className={classes.textField}
                                        fullWidth
                                        id="email"
                                        type="email"
                                        label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        onChange={handleEmailChange}
                                        onKeyPress={handleKeyPress}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={state.isError}
                                        className={classes.textField}
                                        fullWidth
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        margin="normal"
                                        helperText={state.helperText}
                                        onChange={handlePasswordChange}
                                        onKeyPress={handleKeyPress}
                                        variant="outlined"
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        className={classes.signInButton}
                                        fullWidth
                                        onClick={handleLogin}
                                        disabled={state.isButtonDisabled}>
                                        Sign In
                                    </Button>
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Don't have an account?{" "}
                                        <Link
                                            component={RouterLink}
                                            to={SIGNUP}
                                        >
                                            Sign up
                                        </Link>
                                    </Typography>
                                </form>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

SignIn.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignIn);
