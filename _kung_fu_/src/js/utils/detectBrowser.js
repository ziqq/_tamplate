// Browser environment sniffing
const inBrowser = typeof window !== 'undefined';
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const isEdge = UA && UA.indexOf('edge/') > 0;
const isInstagram = UA && UA.indexOf('Instagram') > 0;
export const isAndroid =
    (UA && UA.indexOf('android') > 0) || weexPlatform === 'android';
export const isIOS =
    (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios';
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isPWA = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://');

export function checkBrowserType() {
    const html = document.querySelector('html');

    if (isAndroid) {
        html.classList.add('is-android');
    } else {
        html.classList.remove('is-android');
    }

    if (isIOS) {
        html.classList.add('is-ios');
    } else {
        html.classList.remove('is-ios');
    }

    if (isInstagram) {
        html.classList.add('is-instagram');
    } else {
        html.classList.remove('is-instagram');
    }

    //Check PWA
    if (isPWA()) {
        html.classList.add('is-pwa');
    }

    const classList = ['is-chrome', 'is-safari', 'is-firefox'];

    if (isChrome) {
        html.classList.remove(...classList);
        html.classList.add('is-chrome');
    } else if (isSafari) {
        html.classList.remove(...classList);
        html.classList.add('is-safari');
    } else if (isFF) {
        html.classList.remove(...classList);
        html.classList.add('is-firefox');
    }
}
