export function debounce(func: any, wait: any, immediate: any) {
    let timeout: any;
    return function () {
        // @ts-ignore
        const context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

function currentYPosition(elm: any) {
    if (!window && !elm) {
        return;
    }
    if (elm) return elm.scrollTop;
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) return window.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(elm: any) {
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

export function scrollTo(scrollableElement: any, elmID: any) {
    const elm = document.getElementById(elmID);

    if (!elmID || !elm) {
        return;
    }

    const startY = currentYPosition(scrollableElement);
    const stopY = elmYPosition(elm);

    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 50);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout(
                (function (leapY) {
                    return () => {
                        scrollableElement.scrollTo(0, leapY);
                    };
                })(leapY),
                timer * speed
            );
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout(
            (function (leapY) {
                return () => {
                    scrollableElement.scrollTo(0, leapY);
                };
            })(leapY),
            timer * speed
        );
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
    return false;
}

export function classList(classes: any) {
    return Object.entries(classes)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(" ");
}
