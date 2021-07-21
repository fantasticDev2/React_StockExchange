import React, {useEffect, useReducer} from "react";
import {Link as RouterLink, useHistory, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Checkbox, Grid, IconButton, Link, TextField, Typography} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {initialSignupState, signupreducer} from '../store/reducer';
import * as Actions from '../store/action/index';
import JwtService from "../../../services/authService/authService";
import {DASHBOARD, SIGNIN} from "../../../settings/constants";
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
        flexGrow: 1,
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
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center"
    },
    policyText: {},
    policyCheckbox: {
        marginLeft: "-14px"
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

const SignUp = (props: any) => {
    const history = useHistory();
    const classes = useStyles();

    const access_token = JwtService.getAccessToken();
    const isAuthenticated = JwtService.isAuthTokenValid(access_token);
    if (isAuthenticated) {
        history.replace(DASHBOARD);
    }

    const [state, dispatch] = useReducer(signupreducer, initialSignupState);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        if (state.agreeTems && state.username.trim() && state.firstname.trim() && state.lastname.trim() && state.email.trim() && state.password.trim()) {
            Actions._setSignupButtonEnable(dispatch, false);
        } else {
            Actions._setSignupButtonEnable(dispatch, true);
        }
        if (state.isSignupSuccess) {
            setModalShow(true);
        }
    }, [state.agreeTems, state.username, state.firstname, state.lastname, state.email, state.phonenumber, state.password, state.isSignupSuccess]);

    const handleSignup = () => {
        if (state.username === "abc@email.com" && state.password === "password") {
            dispatch({
                type: "signupSuccess",
                payload: "Sign up Successfully"
            });
        } else {
            Actions._signup(history, dispatch, state);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleSignup();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setSignupUsername(dispatch, event.target.value);
        };

    const handleFirstnameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setFirstname(dispatch, event.target.value);
        };

    const handleLastnameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setLastname(dispatch, event.target.value);
        };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setEmail(dispatch, event.target.value);
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setSignupPassword(dispatch, event.target.value);
        };

    const handlePhonenumberChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setPhonenumber(dispatch, event.target.value);
        };

    const handleAgreeTermsChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            Actions._setAgreeTerms(dispatch, event.target.checked);
        };

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        history.push("/");
    };

    return (
        <>
            <CustomModal
                show={modalShow}
                title="SignUp Success"
                content="You have registered successfully. You can sign in now..."
                action="Ok"
                onHide={() => {
                    setModalShow(false);
                    history.replace(SIGNIN);
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
                                <div className=''>
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
                                    onSubmit={handleSignup}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h3"
                                    >
                                        Create new account
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Use your email to create new account
                                    </Typography>
                                    <TextField
                                        error={state.isError}
                                        className={classes.textField}
                                        fullWidth
                                        id="username"
                                        type="email"
                                        label="Username"
                                        placeholder="Username"
                                        margin="normal"
                                        value={state.username}
                                        onChange={handleUsernameChange}
                                        onKeyPress={handleKeyPress}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="First name"
                                        name="firstName"
                                        type="text"
                                        value={state.firstname}
                                        onChange={handleFirstnameChange}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Last name"
                                        name="lastName"
                                        type="text"
                                        value={state.lastname}
                                        onChange={handleLastnameChange}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Email address"
                                        name="email"
                                        type="text"
                                        value={state.email}
                                        onChange={handleEmailChange}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={state.password}
                                        onChange={handlePasswordChange}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        fullWidth
                                        label="Phone number"
                                        name="phoneNumber"
                                        type="text"
                                        value={state.phonenumber}
                                        onChange={handlePhonenumberChange}
                                        variant="outlined"
                                    />
                                    <div className={classes.policy}>
                                        <Checkbox
                                            checked={state.agreeTems}
                                            onChange={handleAgreeTermsChange}
                                            className={classes.policyCheckbox}
                                            color="primary"
                                            name="policy"
                                        />
                                        <Typography
                                            className={classes.policyText}
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            I have read the{" "}
                                            <Link
                                                color="primary"
                                                component={RouterLink}
                                                to="#"
                                                underline="always"
                                            >
                                                Terms and Conditions
                                            </Link>
                                        </Typography>
                                    </div>
                                    <Button
                                        className={classes.signUpButton}
                                        color="primary"
                                        disabled={state.isButtonDisabled}
                                        fullWidth
                                        size="large"
                                        onClick={handleSignup}
                                        variant="contained"
                                    >
                                        Sign up now
                                    </Button>
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Have an account?{" "}
                                        <Link
                                            component={RouterLink}
                                            to={SIGNIN}
                                        >
                                            Sign in
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

SignUp.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignUp);
