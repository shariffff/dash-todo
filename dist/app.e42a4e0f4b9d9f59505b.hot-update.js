self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _roots_wordpress_hmr_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @roots/wordpress-hmr/blocks */ "../node_modules/@roots/wordpress-hmr/lib/blocks.js");
/* harmony import */ var _roots_wordpress_hmr_formats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @roots/wordpress-hmr/formats */ "../node_modules/@roots/wordpress-hmr/lib/formats.js");
/* harmony import */ var _roots_wordpress_hmr_variations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @roots/wordpress-hmr/variations */ "../node_modules/@roots/wordpress-hmr/lib/variations.js");
/* harmony import */ var _roots_wordpress_hmr_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @roots/wordpress-hmr/plugins */ "../node_modules/@roots/wordpress-hmr/lib/plugins.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom/client */ "../node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App */ "./App.jsx");

_roots_wordpress_hmr_blocks__WEBPACK_IMPORTED_MODULE_0__.register(() => __webpack_require__("./. sync recursive .*\\.block\\..*$"), (id, context) => {
  if (true) return module.hot.accept(id, context);
});

_roots_wordpress_hmr_formats__WEBPACK_IMPORTED_MODULE_1__.register(() => __webpack_require__("./. sync recursive .*\\.format\\..*$"), (id, context) => {
  if (true) return module.hot.accept(id, context);
});

_roots_wordpress_hmr_variations__WEBPACK_IMPORTED_MODULE_2__.register(() => __webpack_require__("./. sync recursive .*\\.variation\\..*$"), (id, context) => {
  if (true) return module.hot.accept(id, context);
});

_roots_wordpress_hmr_plugins__WEBPACK_IMPORTED_MODULE_3__.register(() => __webpack_require__("./. sync recursive .*\\.plugin\\..*$"), (id, context) => {
  if (true) return module.hot.accept(id, context);
});



(0,react_dom_client__WEBPACK_IMPORTED_MODULE_5__.createRoot)(document.getElementById(`TodoApp`)).render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_App__WEBPACK_IMPORTED_MODULE_6__["default"], null));
module.hot.accept(err => {
  console.err(err);
});

/***/ }),

/***/ "./. sync recursive .*\\.block\\..*$":
/*!********************************!*\
  !*** ././ sync .*\.block\..*$ ***!
  \********************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./. sync recursive .*\\.block\\..*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./. sync recursive .*\\.format\\..*$":
/*!*********************************!*\
  !*** ././ sync .*\.format\..*$ ***!
  \*********************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./. sync recursive .*\\.format\\..*$";
module.exports = webpackEmptyContext;

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

/***/ "./. sync recursive .*\\.variation\\..*$":
/*!************************************!*\
  !*** ././ sync .*\.variation\..*$ ***!
  \************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./. sync recursive .*\\.variation\\..*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

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

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["richText"];

/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/block.js":
/*!*********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/block.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.js */ "../node_modules/@roots/wordpress-hmr/lib/style.js");
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility.js */ "../node_modules/@roots/wordpress-hmr/lib/utility.js");
/* harmony import */ var _variation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./variation.js */ "../node_modules/@roots/wordpress-hmr/lib/variation.js");




/**
 * Register block
 */
const register = ({ name, filters = {}, styles, variations, ...settings }) => {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getBlockType)(name) && unregister({ name, filters, styles, variations });
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, settings);
    styles?.map(style => {
        _style_js__WEBPACK_IMPORTED_MODULE_1__.register({ block: name, ...style });
    });
    variations?.map(variation => _variation_js__WEBPACK_IMPORTED_MODULE_3__.register({ block: name, ...variation }));
    (0,_utility_js__WEBPACK_IMPORTED_MODULE_2__.filterCallback)(filters, name, (filter, api) => api.register(filter));
};
/**
 * Unregister block
 */
const unregister = ({ name, filters, styles, variations, }) => {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockType)(name);
    styles?.map(style => _style_js__WEBPACK_IMPORTED_MODULE_1__.unregister({ block: name, ...style }));
    variations?.map(variation => _variation_js__WEBPACK_IMPORTED_MODULE_3__.unregister({ block: name, ...variation }));
    (0,_utility_js__WEBPACK_IMPORTED_MODULE_2__.filterCallback)(filters, name, (filter, api) => api.unregister(filter));
};


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/blocks.js":
/*!**********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/blocks.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.js */ "../node_modules/@roots/wordpress-hmr/lib/block.js");
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.js */ "../node_modules/@roots/wordpress-hmr/lib/editor.js");



let selected = null;
const before = () => {
    selected = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)(`core/block-editor`).getSelectedBlockClientId();
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(`core/block-editor`).clearSelectedBlock();
};
const after = (changed) => {
    if (!changed?.length)
        return;
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)(`core/block-editor`)
        .getBlocks()
        .forEach(({ name, clientId }) => {
        changed
            ?.filter(module => module?.name)
            .map(module => module.name)
            .includes(name) &&
            (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(`core/block-editor`).selectBlock(clientId);
    });
    selected
        ? (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(`core/block-editor`).selectBlock(selected)
        : (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)(`core/block-editor`).clearSelectedBlock();
    selected = null;
};
const register = (getContext, accept) => _editor_js__WEBPACK_IMPORTED_MODULE_2__.load({ api: _block_js__WEBPACK_IMPORTED_MODULE_1__, getContext, accept, before, after });


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

/***/ "../node_modules/@roots/wordpress-hmr/lib/format.js":
/*!**********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/format.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isRegistered": () => (/* binding */ isRegistered),
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");


const isRegistered = (name) => {
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)(`core/rich-text`)
        .getFormatTypes()
        .some(({ name: registered }) => registered === name);
};
const register = ({ name, ...settings }) => {
    if (!name || !settings)
        return;
    isRegistered(name) && unregister({ name });
    (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.registerFormatType)(name, settings);
};
const unregister = ({ name }) => {
    if (!name)
        return;
    (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.unregisterFormatType)(name);
};


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/formats.js":
/*!***********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/formats.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ "../node_modules/@roots/wordpress-hmr/lib/editor.js");
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format.js */ "../node_modules/@roots/wordpress-hmr/lib/format.js");


const register = (getContext, accept) => _editor_js__WEBPACK_IMPORTED_MODULE_0__.load({ getContext, accept, api: _format_js__WEBPACK_IMPORTED_MODULE_1__ });


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

/***/ "../node_modules/@roots/wordpress-hmr/lib/style.js":
/*!*********************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/style.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");

const unregister = ({ block, ...style }) => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockStyle)(block, style.name);
const register = ({ block, ...style }) => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockStyle)(block, style);


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


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/variation.js":
/*!*************************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/variation.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "unregister": () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");

const unregister = ({ block, ...variant }) => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockVariation)(block, variant.name);
const register = ({ block, ...variant }) => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)(block, variant);


/***/ }),

/***/ "../node_modules/@roots/wordpress-hmr/lib/variations.js":
/*!**************************************************************!*\
  !*** ../node_modules/@roots/wordpress-hmr/lib/variations.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ "../node_modules/@roots/wordpress-hmr/lib/editor.js");
/* harmony import */ var _variation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variation.js */ "../node_modules/@roots/wordpress-hmr/lib/variation.js");


const register = (getContext, accept) => _editor_js__WEBPACK_IMPORTED_MODULE_0__.load({ getContext, accept, api: _variation_js__WEBPACK_IMPORTED_MODULE_1__ });


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("089965925c07a21efbe6")
/******/ })();
/******/ 
/******/ }
);