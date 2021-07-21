import React, {useState, useEffect} from "react";
import {debounce, classList} from "../../../utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import {useMediaQuery, Fab} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";

const TopBar3 = (props: any) => {
    const [isTop, setIsTop] = useState(true);
    const [isClosed, setIsClosed] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    let scrollableElement: any = document.querySelector(".scrollable-content");
    if (!scrollableElement) scrollableElement = window;

    let handleScrollRef: any = null;
    let toggleIcon = isClosed ? "menu" : "close";

    const handleScroll = () => {
        return debounce(({target: {scrollTop}}: any) => {
            let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
            setIsTop(isCurrentTop);
        }, 20, null);
    };
    const handlePageChange = () => {
        window.location.href = "/signin";
    }

    handleScrollRef = handleScroll();

    const close = () => {
        setIsClosed(false);
    };

    useEffect(() => {
        if (scrollableElement) {
            scrollableElement.addEventListener("scroll", handleScrollRef);
        }

        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener("scroll", handleScrollRef);
            }
        };
    }, [scrollableElement, handleScrollRef]);

    return (
        <section
            className={classList({
                header: true,
                "bg-transparent": isTop && !isMobile,
                "header-fixed": !isTop,
                closed: isClosed,
            })}
        >
            <div className="container header-container">
                <div className="brand">
                    <img src="./assets/images/react-logo.svg" alt=""/>
                </div>
                <ul className="navigation">
                    <li>
                        <ScrollTo to="intro3" onScroll={close}>
                            Home
                        </ScrollTo>
                    </li>

                    <li>
                        <ScrollTo to="service3" onScroll={close}>
                            Service
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="service5" onScroll={close}>
                            Features
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="pricing1" onScroll={close}>
                            Pricing
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="contact1" onScroll={close}>
                            Contact
                        </ScrollTo>
                    </li>
                </ul>
                <div className="m-auto"/>
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    aria-label="Buy"
                    className=""
                    onClick={handlePageChange}
                >
                    <Icon className="mr-4">flight_takeoff</Icon>
                    Sign In
                </Fab>
                <IconButton
                    className="header__toggle"
                    onClick={() => {
                        setIsClosed(!isClosed);
                    }}
                >
                    <Icon>{toggleIcon}</Icon>
                </IconButton>
            </div>
        </section>
    );
};

export default TopBar3;
