import React, {useEffect, useReducer, useState} from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Theme, useMediaQuery} from "@material-ui/core";
import Header from "./components/Header/Header";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import SettingsIcon from "@material-ui/icons/Settings";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import classNames from "classnames";
import Hidden from "@material-ui/core/Hidden";
import {MobileBreakpoint} from "../../styles/jss/_variables";

import Sidebar from "./components/Sidebar/Sidebar";
import NotificationCenter from "./components/NotificationCenter/NotificationCenter";
import useMountEffect from "../../shared/utils/mountEffect";
import Workspace from "./components/Workspace/Workspace";
import {useAppState} from "../../app/App";
import FormatTextdirectionLToRIcon from "@material-ui/icons/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@material-ui/icons/FormatTextdirectionRToL";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";


const defaultTheme = createMuiTheme();
const useStyles = makeStyles((theme: Theme) => ({
    content: {
        height: "100%"
    },
    panel: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        [theme.breakpoints.down("sm")]: {
            height: "auto",
            minHeight: "calc(100vh - 64px)",
            paddingTop: "64px"
        },
        [theme.breakpoints.down("xs")]: {
            height: "auto",
            minHeight: "calc(100vh - 56px)",
            paddingTop: "56px"
        },
        [theme.breakpoints.up("sm")]: {
            height: "calc(100vh - 64px)"
        },
        display: "flex",
        flexDirection: "row",
        flexGrow: 1
    },
    root: {
        paddingTop: 56,
        height: "100%",
        [defaultTheme.breakpoints.up("sm")]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    speedDial: {
        position: "absolute",
        bottom: theme.spacing(1) * 2,
        /*right: theme.spacing(1) * 3*/
    }
}));

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

const MainLayout = () => {
    const classes = useStyles();

    const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)');
    const [state, dispatch] = useReducer(reducer, {
        type: prefersDarkMode ? 'dark' : 'light',
        direction: 'ltr'
    });

    const customTheme = createMuiTheme(
        {
            direction: state.direction,
            palette: {
                type: state.type,
                primary: indigo,
                secondary: red,
                error: red
            },
            typography: {
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
            },
            shape: {
                borderRadius: 4
            }
        }
    );
    const isDesktop = useMediaQuery(customTheme.breakpoints.up("lg"), {
        defaultMatches: true
    });

    const [opened, setOpened] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);
    const [openSidebar, setOpenSidebar] = useState(false);
    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };
    const shouldOpenSidebar = isDesktop ? true : openSidebar;
    const resizeDispatch = () => {
        if (typeof Event === "function") {
            window.dispatchEvent(new Event("resize"));
        } else {
            const evt: any = window.document.createEvent("UIEvents");
            evt.initUIEvent("resize", true, false, window, 0);
            window.dispatchEvent(evt);
        }
    };

    const handleDrawerToggle = () => {
        setOpened(!opened);
        resizeDispatch();
    };

    const handleNotificationToggle = () =>
        setNotificationsOpen(!notificationsOpen);

    const handleFullscreenToggle = () => {
        interface fsDocument extends Document{
            exitFullscreen: any;
            webkitExitFullscreen: any;
            fullscreenElement: any;
            mozFullScreenElement: any;
            webkitCancelFullScreen: any;
            mozCancelFullScreen: any;
            cancelFullScreen: any;
            mozFullScreen: any;
            webkitIsFullScreen: any;
        }

        let doc = document as fsDocument;
        const element = doc.getElementById("root") as HTMLElement & {
            mozRequestFullScreen(): boolean;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
            webkitIsFullScreen(): Promise<void>;
            requestFullScreen(): boolean;
            webkitRequestFullScreen(): boolean;

        };
        const isFullscreen =
            doc.webkitIsFullScreen || doc.mozFullScreen || false;

        element.requestFullScreen =
            element.requestFullScreen ||
            element.webkitRequestFullScreen ||
            element.mozRequestFullScreen ||
            function () {
                return false;
            };
        doc.cancelFullScreen =
            doc.cancelFullScreen ||
            doc.webkitCancelFullScreen ||
            doc.mozCancelFullScreen ||
            function () {
                return false;
            };
        isFullscreen ? doc.cancelFullScreen() : element.requestFullScreen();
        return false;
    };

    const handleSpeedDialOpen = () => setOpenSpeedDial(true);

    const handleSpeedDialClose = () => setOpenSpeedDial(false);

    useMountEffect(() => {
        if (mediaMatcher.matches) setOpened(false);
        mediaMatcher.addListener(match => {
            setTimeout(() => {
                if (match.matches) setOpened(false);
                else setOpened(true);
            }, 300);
        });

        /*TODO const unlisten = history.listen(() => {
            if (mediaMatcher.matches) setOpened(false);
            document.querySelector("#root > div > main").scrollTop = 0;
        });*/

        return () => {
            // unlisten();
            mediaMatcher.removeListener(match => {
                setTimeout(() => {
                    if (match.matches) setOpened(false);
                    else setOpened(true);
                }, 300);
            });
        };
    });

    useEffect(() => {
        document.body.dir = state.direction;
    }, [state.direction]);

    return (
        <>
            <ThemeProvider theme={customTheme}>
                <Header
                    logoAltText="Graph Mgmt"
                    logo={`/assets/images/logo.svg`}
                    onSidebarOpen={handleSidebarOpen}
                    toogleNotifications={handleNotificationToggle}
                    toggleDrawer={handleDrawerToggle}
                    toggleFullscreen={handleFullscreenToggle}/>
                <div className={classNames(classes.panel, "theme-dark")}>
                    <Sidebar
                        opened={opened}
                        toggleDrawer={handleDrawerToggle}
                    />
                    <Workspace opened={opened}/>
                    <NotificationCenter
                        notificationsOpen={notificationsOpen}
                        toogleNotifications={handleNotificationToggle}
                    />
                </div>

                <Hidden xsDown>
                    <SpeedDial
                        ariaLabel="Settings"
                        className={classes.speedDial}
                        style={state.direction == 'ltr' ? {right: customTheme.spacing(1) * 3} : {left: customTheme.spacing(1) * 3}}
                        icon={<SpeedDialIcon icon={<SettingsIcon/>}/>}
                        onBlur={handleSpeedDialClose}
                        onClose={handleSpeedDialClose}
                        onFocus={handleSpeedDialOpen}
                        onMouseEnter={handleSpeedDialOpen}
                        onMouseLeave={handleSpeedDialClose}
                        open={openSpeedDial}
                    >
                        <SpeedDialAction
                            icon={<WbSunnyIcon/>}
                            tooltipTitle="Toggle light/dark theme"
                            onClick={() => dispatch({type: "type"})}
                        />
                        <SpeedDialAction
                            icon={
                                state.direction === "rtl" ? (
                                    <FormatTextdirectionLToRIcon/>
                                ) : (
                                    <FormatTextdirectionRToLIcon/>
                                )
                            }
                            tooltipTitle="Toggle LTR/RTL direction"
                            onClick={() => dispatch({type: "direction"})}
                        />
                    </SpeedDial>
                </Hidden>
            </ThemeProvider>
        </>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
