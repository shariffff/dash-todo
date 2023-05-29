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
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 280
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Toolbar, {
    id: "options-toolbar",
    label: "Options"
  }, /*#__PURE__*/React.createElement(React.Fragment, {
    key: ".0"
  }, /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: "",
    text: "Paragraph"
  })), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement("toolbar_item_ToolbarItem", null)), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, null, "Text"), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: "",
    isPressed: true,
    label: "Bold"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: "",
    label: "Italic"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: "",
    label: "Link"
  }), /*#__PURE__*/React.createElement(ToolbarGroup, {
    controls: [{
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"
      })),
      title: 'Inline code'
    }, {
      icon: '',
      title: 'Inline image'
    }, {
      icon: '',
      title: 'Strikethrough'
    }],
    isCollapsed: true,
    label: "More rich text controls"
  })), /*#__PURE__*/React.createElement(ToolbarGroup, {
    controls: [{
      icon: '',
      isActive: true,
      title: 'Align left'
    }, {
      icon: '',
      title: 'Align center'
    }, {
      icon: '',
      title: 'Align right'
    }],
    icon: "",
    isCollapsed: true,
    label: "Align"
  }), /*#__PURE__*/React.createElement(ToolbarDropdownMenu, {
    controls: [{
      icon: '',
      title: 'Up'
    }, {
      icon: '',
      title: 'Right'
    }, {
      icon: '',
      title: 'Down'
    }, {
      icon: '',
      title: 'Left'
    }],
    icon: "",
    label: "Select a direction"
  })))))))));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1b45693ea52bab6fc9d7")
/******/ })();
/******/ 
/******/ }
);