var max = this;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	"3Jane": {
		"tempo": 92,
		"quantize": 7
	},
	"cthulu": {
		"tempo": 144
	},
	"falseFlag": {
		"tempo": 192
	},
	"deadCelebrity": {
		"tempo": 78,
		"quantize": 7
	},
	"butterflyKnife": {
		"tempo": 98
	},
	"california": {
		"tempo": 70
	},
	"marked": {
		"tempo": 90
	},
	"sattelites": {
		"tempo": 120,
		"quantize": 5
	},
	"smolder": {
		"tempo": 80,
		"quantize": 7
	},
	"neuromancer": {
		"tempo": 100
	},
	"solace": {
		"tempo": 140
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="@types/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
function setDelay(time, func) {
    var tsk = new Task(func, this);
    tsk.interval = time;
    tsk.repeat(1);
    return tsk;
}
exports.setDelay = setDelay;
function setInterval(time, func) {
    var tsk = new Task(func, this);
    tsk.interval = time;
    tsk.repeat(-1);
    return tsk;
}
exports.setInterval = setInterval;
function clearInterval(task) {
    if (task) {
        task.cancel();
    }
}
exports.clearInterval = clearInterval;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = __webpack_require__(1);
inlets = 1;
outlets = 4;
var config = __webpack_require__(0);
task_1.setInterval(2000, function () {
    post(JSON.stringify(config.solace.tempo));
});
max.onLoad = function () {
    post('recompiled');
};
max.myFunc = function () {
    post('myFunc');
};


/***/ })
/******/ ]);
});