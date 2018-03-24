/**
 * /// <reference path="../types.d.ts" />
 * */

import './index.scss';

// import * as UIkit from 'uikit/dist/js/uikit';
import * as UIkit from 'uikit'; // UIkit сам делает require jquery
import * as Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);
// UIkit.notification('Hello world.');


const body: HTMLBodyElement = document.querySelector("body");
function setBodyminHeight(): void {
    body.style.minHeight = `${window.innerHeight}px`;
}

setBodyminHeight();
window.addEventListener("resize", setBodyminHeight);