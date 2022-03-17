/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/lib/core.js":
/*!****************************!*\
  !*** ./src/js/lib/core.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const $ = function (selector) {
  //из ф-цию мы будем возвращать конструктор(будем возвращать объект и у него будет вызываться метод штше)
  return new $.prototype.init(selector);
}; //будет получать элемент со страницы


$.prototype.init = function (selector) {
  if (!selector) {
    return this; //возвращаем просто пустой объект
  } //assign позволяет в какой-то объект добавить новые свойства. Первый аргумент - объект, в который добавляем


  Object.assign(this, document.querySelectorAll(selector));
  this.length = document.querySelectorAll(selector).length; //добавим в this свойство lenght

  return this; // в this будут храниться прототипы, которые мы назначили и элементы, которые получили со страницы
  //у возвращаемого объекта тоже есть свой прототип
}; // мы можем поменять прототип возвращаемого из ф-ции init объекта
//второй prototype относиться к объекту, который возвращает метод init. И мы его подредактируем. Запишем в него прототип главной функции $
//это дает нам - теперь на объекте, который будет создаваться с помощью $, мы можем использовать
//любые методы, которые будут внутри ф-ции init


$.prototype.init.prototype = $.prototype; //запишем заданнюу нами функцию в глобальный обхъект window. Теперь у нас есть глобальная ф-ция, которую мы можем вызывать по символу $

window.$ = $; //экспортируем функцию для использования в разных файлах

/* harmony default export */ __webpack_exports__["default"] = ($); //замыкание с помощью анонимной самовызывающейся функции
// (() => {
//     //создадим свою ф-цию под названием $, которая будет получать элемент со страницы
//     const $ = function(selector){
//         const elements = document.querySelectorAll(selector);
//         //console.log(elements);
//         const obj = {};
//         //ф-ция скрывает элементы
//         obj.hide = () => {
//             elements.forEach(elem => {
//                 elem.style.display = "none";
//             });
//             return obj; //для того, чтобы можно было сделать цепочку вызовов
//         };
//          //ф-ция показывает элементы
//          obj.show = () => {
//             elements.forEach(elem => {
//                 elem.style.display = "";
//             });
//             return obj;//для того, чтобы можно было сделать цепочку вызовов
//         };
//         //чтобы можно было вызывать ф-ции hide и show, нам ф-ция $ должна возвращать ojb. А это ф-ции объекта obj
//         return obj;
//     };
//     //запишем заданнюу нами функцию в глобальный обхъект window. Теперь у нас есть глобальная ф-ция, которую мы можем вызывать по символу $
//     window.$ = $;
// })();

/***/ }),

/***/ "./src/js/lib/lib.js":
/*!***************************!*\
  !*** ./src/js/lib/lib.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/js/lib/core.js");
/* harmony import */ var _modules_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/display */ "./src/js/lib/modules/display.js");


/* harmony default export */ __webpack_exports__["default"] = (_core__WEBPACK_IMPORTED_MODULE_0__["default"]); //Экспортируем ф-цию $, которая будет насыщена ф-циями

/***/ }),

/***/ "./src/js/lib/modules/display.js":
/*!***************************************!*\
  !*** ./src/js/lib/modules/display.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/js/lib/core.js");


_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.show = function () {
  //console.log(this);
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    this[i].style.display = '';
  }

  return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.hide = function () {
  //console.log(this);
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    this[i].style.display = 'none';
  }

  return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};

_core__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.toggle = function () {
  //console.log(this);
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) {
      continue;
    }

    if (this[i].style.display === 'none') {
      this[i].style.display = '';
    } else {
      this[i].style.display = 'none';
    }
  }

  return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/lib */ "./src/js/lib/lib.js");

$('div').hide().show();
$('.active').toggle(); // c самовызывающейся функцией
// import './lib/core';
// //$('div'); //получим все дивы, используя нашу ф-цью $ из core.js
// //получим элементы с классом active. И так как мы из ф-ции $ мы возвращаем объект, мы можем вызвать для объекта ф-цию
// $('.active').hide();
// //можно писать и цепочку вызовов, потому что каждый метод oбъекта obj (core.js)возвращает щио
// $('.active').hide().show();

/***/ })

/******/ });
//# sourceMappingURL=script.js.map