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
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "m9.99609 14v-.2251l.00391.0001v6.225h1.5v-14.5h2.5v14.5h1.5v-14.5h3v-1.5h-8.50391c-2.76142 0-5 2.23858-5 5 0 2.7614 2.23858 5 5 5z"
    })),
    text: "Paragraph"
  })), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement("toolbar_item_ToolbarItem", null)), /*#__PURE__*/React.createElement(ToolbarGroup, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, null, "Text"), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"
    })),
    isPressed: true,
    label: "Bold"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "M12.5 5L10 19h1.9l2.5-14z"
    })),
    label: "Italic"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"
    })),
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
      icon: /*#__PURE__*/React.createElement(InlineImageIcon, null),
      title: 'Inline image'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M9.1 9v-.5c0-.6.2-1.1.7-1.4.5-.3 1.2-.5 2-.5.7 0 1.4.1 2.1.3.7.2 1.4.5 2.1.9l.2-1.9c-.6-.3-1.2-.5-1.9-.7-.8-.1-1.6-.2-2.4-.2-1.5 0-2.7.3-3.6 1-.8.7-1.2 1.5-1.2 2.6V9h2zM20 12H4v1h8.3c.3.1.6.2.8.3.5.2.9.5 1.1.8.3.3.4.7.4 1.2 0 .7-.2 1.1-.8 1.5-.5.3-1.2.5-2.1.5-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.5-2.2-.8L7 18.1c.5.2 1.2.4 2 .6.8.2 1.6.3 2.4.3 1.7 0 3-.3 3.9-1 .9-.7 1.3-1.6 1.3-2.8 0-.9-.2-1.7-.7-2.2H20v-1z"
      })),
      title: 'Strikethrough'
    }],
    isCollapsed: true,
    label: "More rich text controls"
  })), /*#__PURE__*/React.createElement(ToolbarGroup, {
    controls: [{
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"
      })),
      isActive: true,
      title: 'Align left'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"
      })),
      title: 'Align center'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"
      })),
      title: 'Align right'
    }],
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"
    })),
    isCollapsed: true,
    label: "Align"
  }), /*#__PURE__*/React.createElement(ToolbarDropdownMenu, {
    controls: [{
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M12 3.9 6.5 9.5l1 1 3.8-3.7V20h1.5V6.8l3.7 3.7 1-1z"
      })),
      title: 'Up'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "m14.5 6.5-1 1 3.7 3.7H4v1.6h13.2l-3.7 3.7 1 1 5.6-5.5z"
      })),
      title: 'Right'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "m16.5 13.5-3.7 3.7V4h-1.5v13.2l-3.8-3.7-1 1 5.5 5.6 5.5-5.6z"
      })),
      title: 'Down'
    }, {
      icon: /*#__PURE__*/React.createElement(SVG, {
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement(Path, {
        d: "M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z"
      })),
      title: 'Left'
    }],
    icon: /*#__PURE__*/React.createElement(SVG, {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement(Path, {
      d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"
    })),
    label: "Select a direction"
  })))))))));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ea1ed022c47c048c8729")
/******/ })();
/******/ 
/******/ }
);