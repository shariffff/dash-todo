"use strict";
self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./functions.js":
/*!**********************!*\
  !*** ./functions.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "priorityLabel": () => (/* binding */ priorityLabel),
/* harmony export */   "textToDate": () => (/* binding */ textToDate)
/* harmony export */ });
const priorityLabel = number => {
  const priorities = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High'
  };
  return priorities[number] || 'No Priority';
};
const formatDate = date => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  };
  return date ? date.toLocaleString('en-US', options) : '';
};
const textToDate = htmlString => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return formatDate(div.textContent) || formatDate(div.innerText) || '';
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("79910ecec849d689c529")
/******/ })();
/******/ 
/******/ }
);