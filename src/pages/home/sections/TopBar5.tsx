import React, {useState, useEffect} from "react";
import {debounce, classList} from "../../../utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import {Button} from "@material-ui/core";

const TopBar5 = (props: any) => {
    const [isTop, setIsTop] = useState(true);
    const [isClosed, setIsClosed] = useState(true);

    let scrollableElement: any = document.querySelector(".scrollable-content");
    if (!scrollableElement) {
        scrollableElement = window;
    }

    let handleScrollRef: any = null;
    let toggleIcon = isClosed ? "menu" : "close";

    const handleScroll = () => {
        return debounce(({target: {scrollTop}}: any) => {
            let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
            setIsTop(isCurrentTop);
        }, 20, null);
    };
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
                        <NavLink to="/demos">Demos</NavLink>
                    </li>
                    <li>
                        <ScrollTo to="intro5" onScroll={close}>
                            Home
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="gallery1" onScroll={close}>
                            Works
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="work-process1" onScroll={close}>
                            Service
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="testimonial5" onScroll={close}>
                            Review
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="blog1" onScroll={close}>
                            Blog
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="about1" onScroll={close}>
                            About
                        </ScrollTo>
                    </li>
                    <li>
                        <ScrollTo to="contact2" onScroll={close}>
                            Contact
                        </ScrollTo>
                    </li>
                </ul>
                <div className="m-auto"/>
                <div className="navigation flex">
                    <NavLink to="/login" className="mr-1">
                        <Button
                            className="box-shadow-none px-8 rounded-l hover-bg-primary capitalize"
                            variant="outlined"
                            color="primary"
                        >
                            Login
                        </Button>
                    </NavLink>
                    <NavLink to="/signup">
                        <Button
                            className="box-shadow-none px-8 rounded-r hover-bg-primary capitalize"
                            variant="outlined"
                            color="primary"
                        >
                            Signup
                        </Button>
                    </NavLink>
                </div>
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

export default TopBar5;
