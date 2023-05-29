"use strict";
self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./components/TodoList.jsx":
/*!*********************************!*\
  !*** ./components/TodoList.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./components/TodoItem.jsx");



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
    }), console.log(id));
  }))));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8014556401fc6d003887")
/******/ })();
/******/ 
/******/ }
);