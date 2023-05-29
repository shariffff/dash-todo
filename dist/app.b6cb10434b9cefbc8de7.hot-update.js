"use strict";
self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./App.jsx":
/*!*****************!*\
  !*** ./App.jsx ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    className: "dash-todo-layout hi"
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1224265c148104d06468")
/******/ })();
/******/ 
/******/ }
);