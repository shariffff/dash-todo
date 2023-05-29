"use strict";
self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./components/TodoItem.jsx":
/*!*********************************!*\
  !*** ./components/TodoItem.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions */ "./functions.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  let {
    title,
    id,
    status,
    deleted,
    priority,
    due
  } = _ref;
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
    help: (0,_functions__WEBPACK_IMPORTED_MODULE_3__.textToDate)(due),
    checked: isChecked,
    onChange: setChecked,
    className: isChecked ? 'completed' : 'incomplete'
  }), /*#__PURE__*/React.createElement("div", null, priority, " - }"), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9b1ea05a58fcf133e2ba")
/******/ })();
/******/ 
/******/ }
);