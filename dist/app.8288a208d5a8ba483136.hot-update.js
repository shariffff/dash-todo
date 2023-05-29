self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _roots_wordpress_hmr_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @roots/wordpress-hmr/plugins */ "../node_modules/@roots/wordpress-hmr/lib/plugins.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/client */ "../node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./App.jsx");

_roots_wordpress_hmr_plugins__WEBPACK_IMPORTED_MODULE_0__.register(() => __webpack_require__("./. sync recursive .*\\.plugin\\..*$"), (id, context) => {
  if (true) return module.hot.accept(id, context);
});



(0,react_dom_client__WEBPACK_IMPORTED_MODULE_2__.createRoot)(document.getElementById(`TodoApp`)).render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], null));
if (true) {
  module.hot.accept(console.error);
}

/***/ }),

/***/ "./. sync recursive .*\\.plugin\\..*$":
/*!*********************************!*\
  !*** ././ sync .*\.plugin\..*$ ***!
  \*********************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./. sync recursive .*\\.plugin\\..*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/cache.js":
/*!*********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/cache.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": () => (/* binding */ Cache)
/* harmony export */ });
class Cache {
    constructor() {
        this.store = {};
    }
    has(key) {
        return typeof this.store[key] !== `undefined`;
    }
    set(key, value) {
        this.store[key] = value;
    }
    get(key) {
        return this.store[key];
    }
    is(key, value) {
        return this.store[key] === value;
    }
}


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/editor.js":
/*!**********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/editor.js ***!
  \**********************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "load": () => (/* binding */ load),
/* harmony export */   "setNotify": () => (/* binding */ setNotify)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache.js */ "../node_modules/@roots/wordpress-hmr/lib/cache.js");


let initial = false;
let notify = true;
const setNotify = (value) => {
    notify = value;
};
const load = ({ api, getContext, accept, before = () => null, after = () => null, }) => {
    const cache = new _cache_js__WEBPACK_IMPORTED_MODULE_1__.Cache();
    const handler = () => {
        const changed = [];
        before();
        const context = getContext();
        context?.keys().forEach((key) => {
            const raw = context(key);
            const source = raw.default || raw;
            if (cache.is(key, source))
                return;
            if (cache.has(key))
                api.unregister(cache.get(key));
            api.register(source);
            changed.push(source);
            cache.set(key, source);
        });
        after(changed);
        if (notify && __webpack_module__.hot) {
            if (!initial) {
                initial = true;
                (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(`core/notices`).createInfoNotice(`🔥 Reload enabled`, {
                    id: `hmr-enabled`,
                    type: `snackbar`,
                });
            }
        }
        return context;
    };
    const { id } = handler();
    accept(id, handler);
};


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/filter.js":
/*!**********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/filter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");

const register = ({ hook, name, callback, }) => {
    (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.hasFilter)(hook, name) && unregister({ hook, name });
    (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)(hook, name, callback);
};
const unregister = ({ hook, name, }) => (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.removeFilter)(hook, name);


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/plugin.js":
/*!**********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/plugin.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isRegistered": () => (/* binding */ isRegistered),
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility.js */ "../node_modules/@roots/wordpress-hmr/lib/utility.js");


const isRegistered = (name) => {
    return (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.getPlugins)()?.some(plugin => plugin.name === name);
};
const register = ({ name, filters = {}, ...settings }) => {
    isRegistered(name) && unregister({ name, filters, ...settings });
    (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)(name, settings);
    (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__.filterCallback)(filters, name, (filter, api) => api.register(filter));
};
const unregister = ({ name, filters }) => {
    (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__.filterCallback)(filters, name, (filter, api) => api.unregister(filter));
    (0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.unregisterPlugin)(name);
};


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/plugins.js":
/*!***********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/plugins.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ "../node_modules/@roots/wordpress-hmr/lib/editor.js");
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin.js */ "../node_modules/@roots/wordpress-hmr/lib/plugin.js");


const register = (getContext, accept) => _editor_js__WEBPACK_IMPORTED_MODULE_0__.load({ getContext, accept, api: _plugin_js__WEBPACK_IMPORTED_MODULE_1__ });


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/utility.js":
/*!***********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/utility.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enforceNamespace": () => (/* binding */ enforceNamespace),
/* harmony export */   "filterCallback": () => (/* binding */ filterCallback)
/* harmony export */ });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "../node_modules/@roots/wordpress-hmr/lib/filter.js");

const enforceNamespace = (id, name) => id.startsWith(name) ? id : `${name}/${id}`;
const filterCallback = (filters, namespace, handle) => filters &&
    Object.entries(filters).map(([hook, records]) => Object.entries(records).map(([name, callback]) => {
        name = enforceNamespace(name, namespace);
        handle({ hook, name, callback }, _filter_js__WEBPACK_IMPORTED_MODULE_0__);
    }));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("da21ed489f35a6ed50e6")
/******/ })();
/******/ 
/******/ }
);