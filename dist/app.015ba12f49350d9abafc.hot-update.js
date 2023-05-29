self["webpackHotUpdate_roots_bud"]("app",{

/***/ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global __webpack_require__ */
var Refresh = __webpack_require__(/*! react-refresh/runtime */ "../node_modules/react-refresh/runtime.js");

/**
 * Extracts exports from a webpack module object.
 * @param {string} moduleId A Webpack module ID.
 * @returns {*} An exports object from the module.
 */
function getModuleExports(moduleId) {
  if (typeof moduleId === 'undefined') {
    // `moduleId` is unavailable, which indicates that this module is not in the cache,
    // which means we won't be able to capture any exports,
    // and thus they cannot be refreshed safely.
    // These are likely runtime or dynamically generated modules.
    return {};
  }

  var maybeModule = __webpack_require__.c[moduleId];
  if (typeof maybeModule === 'undefined') {
    // `moduleId` is available but the module in cache is unavailable,
    // which indicates the module is somehow corrupted (e.g. broken Webpacak `module` globals).
    // We will warn the user (as this is likely a mistake) and assume they cannot be refreshed.
    console.warn('[React Refresh] Failed to get exports for module: ' + moduleId + '.');
    return {};
  }

  var exportsOrPromise = maybeModule.exports;
  if (typeof Promise !== 'undefined' && exportsOrPromise instanceof Promise) {
    return exportsOrPromise.then(function (exports) {
      return exports;
    });
  }
  return exportsOrPromise;
}

/**
 * Calculates the signature of a React refresh boundary.
 * If this signature changes, it's unsafe to accept the boundary.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L795-L816).
 * @param {*} moduleExports A Webpack module exports object.
 * @returns {string[]} A React refresh boundary signature array.
 */
function getReactRefreshBoundarySignature(moduleExports) {
  var signature = [];
  signature.push(Refresh.getFamilyByType(moduleExports));

  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return signature;
  }

  for (var key in moduleExports) {
    if (key === '__esModule') {
      continue;
    }

    signature.push(key);
    signature.push(Refresh.getFamilyByType(moduleExports[key]));
  }

  return signature;
}

/**
 * Creates a helper that performs a delayed React refresh.
 * @returns {function(function(): void): void} A debounced React refresh function.
 */
function createDebounceUpdate() {
  /**
   * A cached setTimeout handler.
   * @type {number | undefined}
   */
  var refreshTimeout;

  /**
   * Performs react refresh on a delay and clears the error overlay.
   * @param {function(): void} callback
   * @returns {void}
   */
  function enqueueUpdate(callback) {
    if (typeof refreshTimeout === 'undefined') {
      refreshTimeout = setTimeout(function () {
        refreshTimeout = undefined;
        Refresh.performReactRefresh();
        callback();
      }, 30);
    }
  }

  return enqueueUpdate;
}

/**
 * Checks if all exports are likely a React component.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L748-L774).
 * @param {*} moduleExports A Webpack module exports object.
 * @returns {boolean} Whether the exports are React component like.
 */
function isReactRefreshBoundary(moduleExports) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    return true;
  }
  if (moduleExports === undefined || moduleExports === null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return false;
  }

  var hasExports = false;
  var areAllExportsComponents = true;
  for (var key in moduleExports) {
    hasExports = true;

    // This is the ES Module indicator flag
    if (key === '__esModule') {
      continue;
    }

    // We can (and have to) safely execute getters here,
    // as Webpack manually assigns harmony exports to getters,
    // without any side-effects attached.
    // Ref: https://github.com/webpack/webpack/blob/b93048643fe74de2a6931755911da1212df55897/lib/MainTemplate.js#L281
    var exportValue = moduleExports[key];
    if (!Refresh.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }

  return hasExports && areAllExportsComponents;
}

/**
 * Checks if exports are likely a React component and registers them.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L818-L835).
 * @param {*} moduleExports A Webpack module exports object.
 * @param {string} moduleId A Webpack module ID.
 * @returns {void}
 */
function registerExportsForReactRefresh(moduleExports, moduleId) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    // Register module.exports if it is likely a component
    Refresh.register(moduleExports, moduleId + ' %exports%');
  }

  if (moduleExports === undefined || moduleExports === null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over the exports.
    return;
  }

  for (var key in moduleExports) {
    // Skip registering the ES Module indicator
    if (key === '__esModule') {
      continue;
    }

    var exportValue = moduleExports[key];
    if (Refresh.isLikelyComponentType(exportValue)) {
      var typeID = moduleId + ' %exports% ' + key;
      Refresh.register(exportValue, typeID);
    }
  }
}

/**
 * Compares previous and next module objects to check for mutated boundaries.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L776-L792).
 * @param {*} prevExports The current Webpack module exports object.
 * @param {*} nextExports The next Webpack module exports object.
 * @returns {boolean} Whether the React refresh boundary should be invalidated.
 */
function shouldInvalidateReactRefreshBoundary(prevExports, nextExports) {
  var prevSignature = getReactRefreshBoundarySignature(prevExports);
  var nextSignature = getReactRefreshBoundarySignature(nextExports);

  if (prevSignature.length !== nextSignature.length) {
    return true;
  }

  for (var i = 0; i < nextSignature.length; i += 1) {
    if (prevSignature[i] !== nextSignature[i]) {
      return true;
    }
  }

  return false;
}

var enqueueUpdate = createDebounceUpdate();
function executeRuntime(moduleExports, moduleId, webpackHot, refreshOverlay, isTest) {
  registerExportsForReactRefresh(moduleExports, moduleId);

  if (webpackHot) {
    var isHotUpdate = !!webpackHot.data;
    var prevExports;
    if (isHotUpdate) {
      prevExports = webpackHot.data.prevExports;
    }

    if (isReactRefreshBoundary(moduleExports)) {
      webpackHot.dispose(
        /**
         * A callback to performs a full refresh if React has unrecoverable errors,
         * and also caches the to-be-disposed module.
         * @param {*} data A hot module data object from Webpack HMR.
         * @returns {void}
         */
        function hotDisposeCallback(data) {
          // We have to mutate the data object to get data registered and cached
          data.prevExports = moduleExports;
        }
      );
      webpackHot.accept(
        /**
         * An error handler to allow self-recovering behaviours.
         * @param {Error} error An error occurred during evaluation of a module.
         * @returns {void}
         */
        function hotErrorHandler(error) {
          if (typeof refreshOverlay !== 'undefined' && refreshOverlay) {
            refreshOverlay.handleRuntimeError(error);
          }

          if (typeof isTest !== 'undefined' && isTest) {
            if (window.onHotAcceptError) {
              window.onHotAcceptError(error.message);
            }
          }

          __webpack_require__.c[moduleId].hot.accept(hotErrorHandler);
        }
      );

      if (isHotUpdate) {
        if (
          isReactRefreshBoundary(prevExports) &&
          shouldInvalidateReactRefreshBoundary(prevExports, moduleExports)
        ) {
          webpackHot.invalidate();
        } else {
          enqueueUpdate(
            /**
             * A function to dismiss the error overlay after performing React refresh.
             * @returns {void}
             */
            function updateCallback() {
              if (typeof refreshOverlay !== 'undefined' && refreshOverlay) {
                refreshOverlay.clearRuntimeErrors();
              }
            }
          );
        }
      }
    } else {
      if (isHotUpdate && typeof prevExports !== 'undefined') {
        webpackHot.invalidate();
      }
    }
  }
}

module.exports = Object.freeze({
  enqueueUpdate: enqueueUpdate,
  executeRuntime: executeRuntime,
  getModuleExports: getModuleExports,
  isReactRefreshBoundary: isReactRefreshBoundary,
  shouldInvalidateReactRefreshBoundary: shouldInvalidateReactRefreshBoundary,
  registerExportsForReactRefresh: registerExportsForReactRefresh,
});


/***/ }),

/***/ "./App.jsx":
/*!*****************!*\
  !*** ./App.jsx ***!
  \*****************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.css */ "./App.css");
/* harmony import */ var _components_AddTodo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AddTodo */ "./components/AddTodo.jsx");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Loading */ "./components/Loading.jsx");
/* harmony import */ var _components_TodoList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/TodoList */ "./components/TodoList.jsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");







/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  const [todoItems, setTodoItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [reFetch, setReFetch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const query = new URLSearchParams({
    _fields: 'id,title,status,menu_order,excerpt',
    status: 'pending,publish',
    per_page: 100,
    orderby: 'menu_order'
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: `/wp/v2/todo?${query}`
    }).then(posts => {
      setTodoItems(posts);
      setLoading(false);
      setLoading(false);
    }).catch(error => console.error(error?.message));
  }, [reFetch, setReFetch]);
  const created = () => {
    setReFetch(!reFetch);
  };
  const deleted = () => {
    setReFetch(!reFetch);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dash-todo-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dash-todo-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dash-todo-title-section"
  }, /*#__PURE__*/React.createElement("h1", null, "Todo"))), /*#__PURE__*/React.createElement("div", {
    className: "dash-todo-layout-body hide-if-no-js"
  }, /*#__PURE__*/React.createElement(_components_AddTodo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    created: created
  }), loading ? /*#__PURE__*/React.createElement(_components_Loading__WEBPACK_IMPORTED_MODULE_4__["default"], null) : /*#__PURE__*/React.createElement(_components_TodoList__WEBPACK_IMPORTED_MODULE_5__["default"], {
    items: todoItems,
    deleted: deleted
  })));
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./components/AddTodo.jsx":
/*!********************************!*\
  !*** ./components/AddTodo.jsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  let {
    created
  } = _ref;
  const measurePriority = number => {
    switch (number) {
      case 0:
        return 'No Priority';
        break;
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
        break;
      case 3:
        return 'High';
        break;
      default:
        return 'No Priority';
        break;
    }
  };
  const [todo, setTodo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [priority, setPriority] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(3);
  const [showForm, setShowForm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const toggleVisible = () => {
    setIsVisible(state => !state);
  };
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const createTodo = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/wp/v2/todo',
      method: 'POST',
      data: {
        title: todo,
        status: 'pending',
        excerpt: new Date(),
        menu_order: random(1, 3)
      }
    }).then(res => {
      setTodo('');
      created(true);
    }).catch(err => console.log(err?.message));
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleFormSubmit(event);
    }
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    if (todo.trim().length !== 0) {
      createTodo();
    }
  };
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    __experimentalIsFocusable: true,
    icon: 'plus-alt2',
    iconPosition: "left",
    onClick: () => setShowForm(!showForm),
    variant: "secondary",
    isSmall: true
  }, "Add New"), showForm && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleFormSubmit,
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
    gap: 5,
    expanded: true,
    align: "center"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexBlock, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    autoFocus: true,
    label: 'Add Todo item',
    hideLabelFromVision: true,
    placeholder: "Type here and press Enter \u21B5",
    onChange: value => setTodo(value),
    value: todo,
    onKeyDown: handleKeyDown,
    __nextHasNoMarginBottom: true
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "tertiary",
    onClick: toggleVisible,
    icon: 'flag',
    isSmall: true
  }, measurePriority(priority), isVisible && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, {
    variant: "unstyled",
    resize: ""
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
    style: {
      width: 100
    },
    label: "Priority",
    hideLabelFromVision: true,
    onChange: function noRefCheck() {},
    suffix: "Priority",
    options: [{
      label: 'No priority',
      value: 0
    }, {
      label: 'High',
      value: 3
    }, {
      label: 'Medium',
      value: 2
    }, {
      label: 'Low',
      value: 1
    }]
  }))))))));
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./components/Loading.jsx":
/*!********************************!*\
  !*** ./components/Loading.jsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null))));
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./components/TodoItem.jsx":
/*!*********************************!*\
  !*** ./components/TodoItem.jsx ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  let {
    title,
    id,
    status,
    deleted,
    priority,
    due
  } = _ref;
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const toggleVisible = () => {
    setIsVisible(state => !state);
  };
  const isMounted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  const [isChecked, setChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(status === 'publish');
  const setStatus = isChecked ? 'publish' : 'pending';
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isMounted.current) {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `/wp/v2/todo/${id}`,
        method: 'PUT',
        data: {
          status: setStatus
        }
      }).then(() => {}).catch(err => console.log(err?.message));
    } else {
      isMounted.current = true;
    }
  }, [isChecked, setChecked]);
  const deleteTodo = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `/wp/v2/todo/${id}?force=true`,
      method: 'DELETE'
    }).then(() => {
      deleted(true);
    }).catch(err => console.log(err?.message));
  };
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    alignment: "left",
    className: "single--todo"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
    label: title,
    checked: isChecked,
    onChange: setChecked,
    className: isChecked ? 'completed' : 'incomplete'
  }), /*#__PURE__*/React.createElement("div", null, priority, " - ", due), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    style: {
      height: 20
    },
    className: "delete",
    onClick: deleteTodo
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Icon, {
    icon: "trash",
    size: 15,
    style: {
      color: 'gray'
    }
  })));
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./components/TodoList.jsx":
/*!*********************************!*\
  !*** ./components/TodoList.jsx ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./components/TodoItem.jsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  let {
    items,
    deleted
  } = _ref;
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, null, items.map(_ref2 => {
    let {
      id,
      title,
      status,
      menu_order,
      excerpt
    } = _ref2;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: id,
      title: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeEntities)(title.rendered),
      id: id,
      status: status,
      deleted: deleted,
      due: excerpt.rendered,
      priority: menu_order
    }));
  }))));
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./App.jsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "../node_modules/react-refresh/runtime.js");




(0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById(`TodoApp`)).render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));
if (true) {
  module.hot.accept(console.error);
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../node_modules/core-js-pure/actual/global-this.js":
/*!**********************************************************!*\
  !*** ../node_modules/core-js-pure/actual/global-this.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../stable/global-this */ "../node_modules/core-js-pure/stable/global-this.js");

module.exports = parent;


/***/ }),

/***/ "../node_modules/core-js-pure/es/global-this.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js-pure/es/global-this.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../modules/es.global-this */ "../node_modules/core-js-pure/modules/es.global-this.js");

module.exports = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");


/***/ }),

/***/ "../node_modules/core-js-pure/features/global-this.js":
/*!************************************************************!*\
  !*** ../node_modules/core-js-pure/features/global-this.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../full/global-this */ "../node_modules/core-js-pure/full/global-this.js");


/***/ }),

/***/ "../node_modules/core-js-pure/full/global-this.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js-pure/full/global-this.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO: remove from `core-js@4`
__webpack_require__(/*! ../modules/esnext.global-this */ "../node_modules/core-js-pure/modules/esnext.global-this.js");

var parent = __webpack_require__(/*! ../actual/global-this */ "../node_modules/core-js-pure/actual/global-this.js");

module.exports = parent;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/a-callable.js":
/*!************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/a-callable.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../node_modules/core-js-pure/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/an-object.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/an-object.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../node_modules/core-js-pure/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/classof-raw.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/classof-raw.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!********************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!****************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/define-global-property.js":
/*!************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/define-global-property.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/descriptors.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/descriptors.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/document-all.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/document-all.js ***!
  \**************************************************************/
/***/ ((module) => {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/document-create-element.js":
/*!*************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/document-create-element.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/engine-user-agent.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "../node_modules/core-js-pure/internals/engine-v8-version.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../node_modules/core-js-pure/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/export.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/export.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "../node_modules/core-js-pure/internals/function-apply.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f);
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "../node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../node_modules/core-js-pure/internals/has-own-property.js");

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/fails.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js-pure/internals/fails.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-apply.js":
/*!****************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-apply.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-bind-context.js":
/*!***********************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-bind-context.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../node_modules/core-js-pure/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../node_modules/core-js-pure/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../node_modules/core-js-pure/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-bind-native.js":
/*!**********************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-bind-native.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-call.js":
/*!***************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-call.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../node_modules/core-js-pure/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-uncurry-this-clause.js":
/*!******************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-uncurry-this-clause.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../node_modules/core-js-pure/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/function-uncurry-this.js":
/*!***********************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/function-uncurry-this.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../node_modules/core-js-pure/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/get-built-in.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/get-built-in.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "../node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/get-method.js":
/*!************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/get-method.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../node_modules/core-js-pure/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../node_modules/core-js-pure/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/global.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/global.js ***!
  \********************************************************/
/***/ (function(module) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ "../node_modules/core-js-pure/internals/has-own-property.js":
/*!******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/has-own-property.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!****************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../node_modules/core-js-pure/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/indexed-object.js":
/*!****************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/indexed-object.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../node_modules/core-js-pure/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-callable.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-callable.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-forced.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-forced.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-null-or-undefined.js":
/*!**********************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-null-or-undefined.js ***!
  \**********************************************************************/
/***/ ((module) => {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-object.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-object.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");
var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../node_modules/core-js-pure/internals/document-all.js");

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-pure.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-pure.js ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = true;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/is-symbol.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/is-symbol.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../node_modules/core-js-pure/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../node_modules/core-js-pure/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/object-define-property.js":
/*!************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/object-define-property.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../node_modules/core-js-pure/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../node_modules/core-js-pure/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../node_modules/core-js-pure/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../node_modules/core-js-pure/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!************************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../node_modules/core-js-pure/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../node_modules/core-js-pure/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../node_modules/core-js-pure/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../node_modules/core-js-pure/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../node_modules/core-js-pure/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../node_modules/core-js-pure/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/object-is-prototype-of.js":
/*!************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/object-is-prototype-of.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "../node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/ordinary-to-primitive.js":
/*!***********************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/ordinary-to-primitive.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../node_modules/core-js-pure/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../node_modules/core-js-pure/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../node_modules/core-js-pure/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/path.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js-pure/internals/path.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/require-object-coercible.js":
/*!**************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../node_modules/core-js-pure/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/shared-store.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/shared-store.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../node_modules/core-js-pure/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "../node_modules/core-js-pure/internals/shared.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/shared.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../node_modules/core-js-pure/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../node_modules/core-js-pure/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/symbol-constructor-detection.js":
/*!******************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/symbol-constructor-detection.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/to-indexed-object.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/to-object.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js-pure/internals/to-object.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../node_modules/core-js-pure/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/to-primitive.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/to-primitive.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "../node_modules/core-js-pure/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../node_modules/core-js-pure/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../node_modules/core-js-pure/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../node_modules/core-js-pure/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "../node_modules/core-js-pure/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../node_modules/core-js-pure/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/to-property-key.js":
/*!*****************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/to-property-key.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../node_modules/core-js-pure/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../node_modules/core-js-pure/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/try-to-string.js":
/*!***************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/try-to-string.js ***!
  \***************************************************************/
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/uid.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js-pure/internals/uid.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../node_modules/core-js-pure/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "../node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../node_modules/core-js-pure/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../node_modules/core-js-pure/internals/v8-prototype-define-bug.js":
/*!*************************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/v8-prototype-define-bug.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../node_modules/core-js-pure/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "../node_modules/core-js-pure/internals/well-known-symbol.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../node_modules/core-js-pure/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../node_modules/core-js-pure/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../node_modules/core-js-pure/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../node_modules/core-js-pure/modules/es.global-this.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js-pure/modules/es.global-this.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "../node_modules/core-js-pure/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "../node_modules/core-js-pure/internals/global.js");

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true, forced: global.globalThis !== global }, {
  globalThis: global
});


/***/ }),

/***/ "../node_modules/core-js-pure/modules/esnext.global-this.js":
/*!******************************************************************!*\
  !*** ../node_modules/core-js-pure/modules/esnext.global-this.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// TODO: Remove from `core-js@4`
__webpack_require__(/*! ../modules/es.global-this */ "../node_modules/core-js-pure/modules/es.global-this.js");


/***/ }),

/***/ "../node_modules/core-js-pure/stable/global-this.js":
/*!**********************************************************!*\
  !*** ../node_modules/core-js-pure/stable/global-this.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(/*! ../es/global-this */ "../node_modules/core-js-pure/es/global-this.js");

module.exports = parent;


/***/ }),

/***/ "../node_modules/react-refresh/cjs/react-refresh-runtime.development.js":
/*!******************************************************************************!*\
  !*** ../node_modules/react-refresh/cjs/react-refresh-runtime.development.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-refresh-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

// ATTENTION
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_MEMO_TYPE = Symbol.for('react.memo');

var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // We never remove these associations.
// It's OK to reference families, but use WeakMap/Set for types.

var allFamiliesByID = new Map();
var allFamiliesByType = new PossiblyWeakMap();
var allSignaturesByType = new PossiblyWeakMap(); // This WeakMap is read by React, so we only put families
// that have actually been edited here. This keeps checks fast.
// $FlowIssue

var updatedFamiliesByType = new PossiblyWeakMap(); // This is cleared on every performReactRefresh() call.
// It is an array of [Family, NextType] tuples.

var pendingUpdates = []; // This is injected by the renderer via DevTools global hook.

var helpersByRendererID = new Map();
var helpersByRoot = new Map(); // We keep track of mounted roots so we can schedule updates.

var mountedRoots = new Set(); // If a root captures an error, we remember it so we can retry on edit.

var failedRoots = new Set(); // In environments that support WeakMap, we also remember the last element for every root.
// It needs to be weak because we do this even for roots that failed to mount.
// If there is no WeakMap, we won't attempt to do retrying.
// $FlowIssue

var rootElements = // $FlowIssue
typeof WeakMap === 'function' ? new WeakMap() : null;
var isPerformingRefresh = false;

function computeFullKey(signature) {
  if (signature.fullKey !== null) {
    return signature.fullKey;
  }

  var fullKey = signature.ownKey;
  var hooks;

  try {
    hooks = signature.getCustomHooks();
  } catch (err) {
    // This can happen in an edge case, e.g. if expression like Foo.useSomething
    // depends on Foo which is lazily initialized during rendering.
    // In that case just assume we'll have to remount.
    signature.forceReset = true;
    signature.fullKey = fullKey;
    return fullKey;
  }

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (typeof hook !== 'function') {
      // Something's wrong. Assume we need to remount.
      signature.forceReset = true;
      signature.fullKey = fullKey;
      return fullKey;
    }

    var nestedHookSignature = allSignaturesByType.get(hook);

    if (nestedHookSignature === undefined) {
      // No signature means Hook wasn't in the source code, e.g. in a library.
      // We'll skip it because we can assume it won't change during this session.
      continue;
    }

    var nestedHookKey = computeFullKey(nestedHookSignature);

    if (nestedHookSignature.forceReset) {
      signature.forceReset = true;
    }

    fullKey += '\n---\n' + nestedHookKey;
  }

  signature.fullKey = fullKey;
  return fullKey;
}

function haveEqualSignatures(prevType, nextType) {
  var prevSignature = allSignaturesByType.get(prevType);
  var nextSignature = allSignaturesByType.get(nextType);

  if (prevSignature === undefined && nextSignature === undefined) {
    return true;
  }

  if (prevSignature === undefined || nextSignature === undefined) {
    return false;
  }

  if (computeFullKey(prevSignature) !== computeFullKey(nextSignature)) {
    return false;
  }

  if (nextSignature.forceReset) {
    return false;
  }

  return true;
}

function isReactClass(type) {
  return type.prototype && type.prototype.isReactComponent;
}

function canPreserveStateBetween(prevType, nextType) {
  if (isReactClass(prevType) || isReactClass(nextType)) {
    return false;
  }

  if (haveEqualSignatures(prevType, nextType)) {
    return true;
  }

  return false;
}

function resolveFamily(type) {
  // Only check updated types to keep lookups fast.
  return updatedFamiliesByType.get(type);
} // If we didn't care about IE11, we could use new Map/Set(iterable).


function cloneMap(map) {
  var clone = new Map();
  map.forEach(function (value, key) {
    clone.set(key, value);
  });
  return clone;
}

function cloneSet(set) {
  var clone = new Set();
  set.forEach(function (value) {
    clone.add(value);
  });
  return clone;
} // This is a safety mechanism to protect against rogue getters and Proxies.


function getProperty(object, property) {
  try {
    return object[property];
  } catch (err) {
    // Intentionally ignore.
    return undefined;
  }
}

function performReactRefresh() {

  if (pendingUpdates.length === 0) {
    return null;
  }

  if (isPerformingRefresh) {
    return null;
  }

  isPerformingRefresh = true;

  try {
    var staleFamilies = new Set();
    var updatedFamilies = new Set();
    var updates = pendingUpdates;
    pendingUpdates = [];
    updates.forEach(function (_ref) {
      var family = _ref[0],
          nextType = _ref[1];
      // Now that we got a real edit, we can create associations
      // that will be read by the React reconciler.
      var prevType = family.current;
      updatedFamiliesByType.set(prevType, family);
      updatedFamiliesByType.set(nextType, family);
      family.current = nextType; // Determine whether this should be a re-render or a re-mount.

      if (canPreserveStateBetween(prevType, nextType)) {
        updatedFamilies.add(family);
      } else {
        staleFamilies.add(family);
      }
    }); // TODO: rename these fields to something more meaningful.

    var update = {
      updatedFamilies: updatedFamilies,
      // Families that will re-render preserving state
      staleFamilies: staleFamilies // Families that will be remounted

    };
    helpersByRendererID.forEach(function (helpers) {
      // Even if there are no roots, set the handler on first update.
      // This ensures that if *new* roots are mounted, they'll use the resolve handler.
      helpers.setRefreshHandler(resolveFamily);
    });
    var didError = false;
    var firstError = null; // We snapshot maps and sets that are mutated during commits.
    // If we don't do this, there is a risk they will be mutated while
    // we iterate over them. For example, trying to recover a failed root
    // may cause another root to be added to the failed list -- an infinite loop.

    var failedRootsSnapshot = cloneSet(failedRoots);
    var mountedRootsSnapshot = cloneSet(mountedRoots);
    var helpersByRootSnapshot = cloneMap(helpersByRoot);
    failedRootsSnapshot.forEach(function (root) {
      var helpers = helpersByRootSnapshot.get(root);

      if (helpers === undefined) {
        throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
      }

      if (!failedRoots.has(root)) {// No longer failed.
      }

      if (rootElements === null) {
        return;
      }

      if (!rootElements.has(root)) {
        return;
      }

      var element = rootElements.get(root);

      try {
        helpers.scheduleRoot(root, element);
      } catch (err) {
        if (!didError) {
          didError = true;
          firstError = err;
        } // Keep trying other roots.

      }
    });
    mountedRootsSnapshot.forEach(function (root) {
      var helpers = helpersByRootSnapshot.get(root);

      if (helpers === undefined) {
        throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
      }

      if (!mountedRoots.has(root)) {// No longer mounted.
      }

      try {
        helpers.scheduleRefresh(root, update);
      } catch (err) {
        if (!didError) {
          didError = true;
          firstError = err;
        } // Keep trying other roots.

      }
    });

    if (didError) {
      throw firstError;
    }

    return update;
  } finally {
    isPerformingRefresh = false;
  }
}
function register(type, id) {
  {
    if (type === null) {
      return;
    }

    if (typeof type !== 'function' && typeof type !== 'object') {
      return;
    } // This can happen in an edge case, e.g. if we register
    // return value of a HOC but it returns a cached component.
    // Ignore anything but the first registration for each type.


    if (allFamiliesByType.has(type)) {
      return;
    } // Create family or remember to update it.
    // None of this bookkeeping affects reconciliation
    // until the first performReactRefresh() call above.


    var family = allFamiliesByID.get(id);

    if (family === undefined) {
      family = {
        current: type
      };
      allFamiliesByID.set(id, family);
    } else {
      pendingUpdates.push([family, type]);
    }

    allFamiliesByType.set(type, family); // Visit inner types because we might not have registered them.

    if (typeof type === 'object' && type !== null) {
      switch (getProperty(type, '$$typeof')) {
        case REACT_FORWARD_REF_TYPE:
          register(type.render, id + '$render');
          break;

        case REACT_MEMO_TYPE:
          register(type.type, id + '$type');
          break;
      }
    }
  }
}
function setSignature(type, key) {
  var forceReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var getCustomHooks = arguments.length > 3 ? arguments[3] : undefined;

  {
    if (!allSignaturesByType.has(type)) {
      allSignaturesByType.set(type, {
        forceReset: forceReset,
        ownKey: key,
        fullKey: null,
        getCustomHooks: getCustomHooks || function () {
          return [];
        }
      });
    } // Visit inner types because we might not have signed them.


    if (typeof type === 'object' && type !== null) {
      switch (getProperty(type, '$$typeof')) {
        case REACT_FORWARD_REF_TYPE:
          setSignature(type.render, key, forceReset, getCustomHooks);
          break;

        case REACT_MEMO_TYPE:
          setSignature(type.type, key, forceReset, getCustomHooks);
          break;
      }
    }
  }
} // This is lazily called during first render for a type.
// It captures Hook list at that time so inline requires don't break comparisons.

function collectCustomHooksForSignature(type) {
  {
    var signature = allSignaturesByType.get(type);

    if (signature !== undefined) {
      computeFullKey(signature);
    }
  }
}
function getFamilyByID(id) {
  {
    return allFamiliesByID.get(id);
  }
}
function getFamilyByType(type) {
  {
    return allFamiliesByType.get(type);
  }
}
function findAffectedHostInstances(families) {
  {
    var affectedInstances = new Set();
    mountedRoots.forEach(function (root) {
      var helpers = helpersByRoot.get(root);

      if (helpers === undefined) {
        throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
      }

      var instancesForRoot = helpers.findHostInstancesForRefresh(root, families);
      instancesForRoot.forEach(function (inst) {
        affectedInstances.add(inst);
      });
    });
    return affectedInstances;
  }
}
function injectIntoGlobalHook(globalObject) {
  {
    // For React Native, the global hook will be set up by require('react-devtools-core').
    // That code will run before us. So we need to monkeypatch functions on existing hook.
    // For React Web, the global hook will be set up by the extension.
    // This will also run before us.
    var hook = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;

    if (hook === undefined) {
      // However, if there is no DevTools extension, we'll need to set up the global hook ourselves.
      // Note that in this case it's important that renderer code runs *after* this method call.
      // Otherwise, the renderer will think that there is no global hook, and won't do the injection.
      var nextID = 0;
      globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__ = hook = {
        renderers: new Map(),
        supportsFiber: true,
        inject: function (injected) {
          return nextID++;
        },
        onScheduleFiberRoot: function (id, root, children) {},
        onCommitFiberRoot: function (id, root, maybePriorityLevel, didError) {},
        onCommitFiberUnmount: function () {}
      };
    }

    if (hook.isDisabled) {
      // This isn't a real property on the hook, but it can be set to opt out
      // of DevTools integration and associated warnings and logs.
      // Using console['warn'] to evade Babel and ESLint
      console['warn']('Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). ' + 'Fast Refresh is not compatible with this shim and will be disabled.');
      return;
    } // Here, we just want to get a reference to scheduleRefresh.


    var oldInject = hook.inject;

    hook.inject = function (injected) {
      var id = oldInject.apply(this, arguments);

      if (typeof injected.scheduleRefresh === 'function' && typeof injected.setRefreshHandler === 'function') {
        // This version supports React Refresh.
        helpersByRendererID.set(id, injected);
      }

      return id;
    }; // Do the same for any already injected roots.
    // This is useful if ReactDOM has already been initialized.
    // https://github.com/facebook/react/issues/17626


    hook.renderers.forEach(function (injected, id) {
      if (typeof injected.scheduleRefresh === 'function' && typeof injected.setRefreshHandler === 'function') {
        // This version supports React Refresh.
        helpersByRendererID.set(id, injected);
      }
    }); // We also want to track currently mounted roots.

    var oldOnCommitFiberRoot = hook.onCommitFiberRoot;

    var oldOnScheduleFiberRoot = hook.onScheduleFiberRoot || function () {};

    hook.onScheduleFiberRoot = function (id, root, children) {
      if (!isPerformingRefresh) {
        // If it was intentionally scheduled, don't attempt to restore.
        // This includes intentionally scheduled unmounts.
        failedRoots.delete(root);

        if (rootElements !== null) {
          rootElements.set(root, children);
        }
      }

      return oldOnScheduleFiberRoot.apply(this, arguments);
    };

    hook.onCommitFiberRoot = function (id, root, maybePriorityLevel, didError) {
      var helpers = helpersByRendererID.get(id);

      if (helpers !== undefined) {
        helpersByRoot.set(root, helpers);
        var current = root.current;
        var alternate = current.alternate; // We need to determine whether this root has just (un)mounted.
        // This logic is copy-pasted from similar logic in the DevTools backend.
        // If this breaks with some refactoring, you'll want to update DevTools too.

        if (alternate !== null) {
          var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && mountedRoots.has(root);
          var isMounted = current.memoizedState != null && current.memoizedState.element != null;

          if (!wasMounted && isMounted) {
            // Mount a new root.
            mountedRoots.add(root);
            failedRoots.delete(root);
          } else if (wasMounted && isMounted) ; else if (wasMounted && !isMounted) {
            // Unmount an existing root.
            mountedRoots.delete(root);

            if (didError) {
              // We'll remount it on future edits.
              failedRoots.add(root);
            } else {
              helpersByRoot.delete(root);
            }
          } else if (!wasMounted && !isMounted) {
            if (didError) {
              // We'll remount it on future edits.
              failedRoots.add(root);
            }
          }
        } else {
          // Mount a new root.
          mountedRoots.add(root);
        }
      } // Always call the decorated DevTools hook.


      return oldOnCommitFiberRoot.apply(this, arguments);
    };
  }
}
function hasUnrecoverableErrors() {
  // TODO: delete this after removing dependency in RN.
  return false;
} // Exposed for testing.

function _getMountedRootCount() {
  {
    return mountedRoots.size;
  }
} // This is a wrapper over more primitive functions for setting signature.
// Signatures let us decide whether the Hook order has changed on refresh.
//
// This function is intended to be used as a transform target, e.g.:
// var _s = createSignatureFunctionForTransform()
//
// function Hello() {
//   const [foo, setFoo] = useState(0);
//   const value = useCustomHook();
//   _s(); /* Call without arguments triggers collecting the custom Hook list.
//          * This doesn't happen during the module evaluation because we
//          * don't want to change the module order with inline requires.
//          * Next calls are noops. */
//   return <h1>Hi</h1>;
// }
//
// /* Call with arguments attaches the signature to the type: */
// _s(
//   Hello,
//   'useState{[foo, setFoo]}(0)',
//   () => [useCustomHook], /* Lazy to avoid triggering inline requires */
// );

function createSignatureFunctionForTransform() {
  {
    var savedType;
    var hasCustomHooks;
    var didCollectHooks = false;
    return function (type, key, forceReset, getCustomHooks) {
      if (typeof key === 'string') {
        // We're in the initial phase that associates signatures
        // with the functions. Note this may be called multiple times
        // in HOC chains like _s(hoc1(_s(hoc2(_s(actualFunction))))).
        if (!savedType) {
          // We're in the innermost call, so this is the actual type.
          savedType = type;
          hasCustomHooks = typeof getCustomHooks === 'function';
        } // Set the signature for all types (even wrappers!) in case
        // they have no signatures of their own. This is to prevent
        // problems like https://github.com/facebook/react/issues/20417.


        if (type != null && (typeof type === 'function' || typeof type === 'object')) {
          setSignature(type, key, forceReset, getCustomHooks);
        }

        return type;
      } else {
        // We're in the _s() call without arguments, which means
        // this is the time to collect custom Hook signatures.
        // Only do this once. This path is hot and runs *inside* every render!
        if (!didCollectHooks && hasCustomHooks) {
          didCollectHooks = true;
          collectCustomHooksForSignature(savedType);
        }
      }
    };
  }
}
function isLikelyComponentType(type) {
  {
    switch (typeof type) {
      case 'function':
        {
          // First, deal with classes.
          if (type.prototype != null) {
            if (type.prototype.isReactComponent) {
              // React class.
              return true;
            }

            var ownNames = Object.getOwnPropertyNames(type.prototype);

            if (ownNames.length > 1 || ownNames[0] !== 'constructor') {
              // This looks like a class.
              return false;
            } // eslint-disable-next-line no-proto


            if (type.prototype.__proto__ !== Object.prototype) {
              // It has a superclass.
              return false;
            } // Pass through.
            // This looks like a regular function with empty prototype.

          } // For plain functions and arrows, use name as a heuristic.


          var name = type.name || type.displayName;
          return typeof name === 'string' && /^[A-Z]/.test(name);
        }

      case 'object':
        {
          if (type != null) {
            switch (getProperty(type, '$$typeof')) {
              case REACT_FORWARD_REF_TYPE:
              case REACT_MEMO_TYPE:
                // Definitely React components.
                return true;

              default:
                return false;
            }
          }

          return false;
        }

      default:
        {
          return false;
        }
    }
  }
}

exports._getMountedRootCount = _getMountedRootCount;
exports.collectCustomHooksForSignature = collectCustomHooksForSignature;
exports.createSignatureFunctionForTransform = createSignatureFunctionForTransform;
exports.findAffectedHostInstances = findAffectedHostInstances;
exports.getFamilyByID = getFamilyByID;
exports.getFamilyByType = getFamilyByType;
exports.hasUnrecoverableErrors = hasUnrecoverableErrors;
exports.injectIntoGlobalHook = injectIntoGlobalHook;
exports.isLikelyComponentType = isLikelyComponentType;
exports.performReactRefresh = performReactRefresh;
exports.register = register;
exports.setSignature = setSignature;
  })();
}


/***/ }),

/***/ "../node_modules/react-refresh/runtime.js":
/*!************************************************!*\
  !*** ../node_modules/react-refresh/runtime.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-refresh-runtime.development.js */ "../node_modules/react-refresh/cjs/react-refresh-runtime.development.js");
}


/***/ }),

/***/ "../node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* global __react_refresh_library__ */

const safeThis = __webpack_require__(/*! core-js-pure/features/global-this */ "../node_modules/core-js-pure/features/global-this.js");
const RefreshRuntime = __webpack_require__(/*! react-refresh/runtime */ "../node_modules/react-refresh/runtime.js");

if (true) {
  if (typeof safeThis !== 'undefined') {
    var $RefreshInjected$ = '__reactRefreshInjected';
    // Namespace the injected flag (if necessary) for monorepo compatibility
    if (true) {
      $RefreshInjected$ += '_' + "_roots_bud";
    }

    // Only inject the runtime if it hasn't been injected
    if (!safeThis[$RefreshInjected$]) {
      // Inject refresh runtime into global scope
      RefreshRuntime.injectIntoGlobalHook(safeThis);

      // Mark the runtime as injected to prevent double-injection
      safeThis[$RefreshInjected$] = true;
    }
  }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7149e1d1bd320f00016f")
/******/ })();
/******/ 
/******/ /* webpack/runtime/react refresh */
/******/ (() => {
/******/ 	__webpack_require__.i.push((options) => {
/******/ 		const originalFactory = options.factory;
/******/ 		options.factory = function (moduleObject, moduleExports, webpackRequire) {
/******/ 			__webpack_require__.$Refresh$.setup(options.id);
/******/ 			try {
/******/ 				originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 			} finally {
/******/ 				if (typeof Promise !== 'undefined' && moduleObject.exports instanceof Promise) {
/******/ 					options.module.exports = options.module.exports.then(
/******/ 						(result) => {
/******/ 							__webpack_require__.$Refresh$.cleanup(options.id);
/******/ 							return result;
/******/ 						},
/******/ 						(reason) => {
/******/ 							__webpack_require__.$Refresh$.cleanup(options.id);
/******/ 							return Promise.reject(reason);
/******/ 						}
/******/ 					);
/******/ 				} else {
/******/ 					__webpack_require__.$Refresh$.cleanup(options.id)
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})
/******/ 	
/******/ 	__webpack_require__.$Refresh$ = {
/******/ 		register: () => (undefined),
/******/ 		signature: () => ((type) => (type)),
/******/ 		runtime: {
/******/ 			createSignatureFunctionForTransform: () => ((type) => (type)),
/******/ 			register: () => (undefined)
/******/ 		},
/******/ 		setup: (currentModuleId) => {
/******/ 			const prevModuleId = __webpack_require__.$Refresh$.moduleId;
/******/ 			const prevRegister = __webpack_require__.$Refresh$.register;
/******/ 			const prevSignature = __webpack_require__.$Refresh$.signature;
/******/ 			const prevCleanup = __webpack_require__.$Refresh$.cleanup;
/******/ 	
/******/ 			__webpack_require__.$Refresh$.moduleId = currentModuleId;
/******/ 	
/******/ 			__webpack_require__.$Refresh$.register = (type, id) => {
/******/ 				const typeId = currentModuleId + " " + id;
/******/ 				__webpack_require__.$Refresh$.runtime.register(type, typeId);
/******/ 			}
/******/ 	
/******/ 			__webpack_require__.$Refresh$.signature = () => (__webpack_require__.$Refresh$.runtime.createSignatureFunctionForTransform());
/******/ 	
/******/ 			__webpack_require__.$Refresh$.cleanup = (cleanupModuleId) => {
/******/ 				if (currentModuleId === cleanupModuleId) {
/******/ 					__webpack_require__.$Refresh$.moduleId = prevModuleId;
/******/ 					__webpack_require__.$Refresh$.register = prevRegister;
/******/ 					__webpack_require__.$Refresh$.signature = prevSignature;
/******/ 					__webpack_require__.$Refresh$.cleanup = prevCleanup;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ }
);