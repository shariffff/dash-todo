"use strict";
self["webpackHotUpdate_roots_bud"]("app",{

/***/ "./components/AddTodo.jsx":
/*!********************************!*\
  !*** ./components/AddTodo.jsx ***!
  \********************************/
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



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  let {
    created
  } = _ref;
  const [date, setDate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date());
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
  const [showForm, setShowForm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
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
        excerpt: date,
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
    onKeyDown: handleKeyDown
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, null)), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "link",
    onClick: toggleVisible
  }, date.toLocaleString(), isVisible && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.DatePicker, {
    style: {
      padding: 10
    },
    currentDate: date,
    onChange: newDate => setDate(newDate)
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, null))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
    className: "my-container-class-name",
    contentClassName: "my-dropdown-content-classname",
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: _ref2 => {
      let {
        isOpen,
        onToggle
      } = _ref2;
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "primary",
        onClick: onToggle,
        "aria-expanded": isOpen
      }, "Toggle Dropdown!");
    },
    renderContent: () => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.DatePicker, {
      style: {
        padding: 10
      },
      currentDate: date,
      onChange: newDate => setDate(newDate)
    })
  }))));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cc62816371ab7c91c947")
/******/ })();
/******/ 
/******/ }
);