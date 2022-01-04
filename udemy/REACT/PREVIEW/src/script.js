"use strict"; //без babel - исходный код 
//классы пишутся с большой буквы
// function button() {
//     return 'button';
//   } 
// class Slider{
//     construct(width,height, count){
//         this.width = width;
//         this.height = height;
//         this.count = count;
//     }
//     nextSlide(){
//         console.log('Moving forward');
//     }
//     prevSlide(){
//         console.log('Moving back');
//     }
//     whoAmI(){
//         console.log(this.width,this.height,this.count);
//     }
// }
// const slider = new Slider(600,400,5),
//     someSlider = new Slider(300,450,10);
// slider.whoAmI();
// someSlider.whoAmI();
//наследование классов - extends
// class AutoSlider extends Slider{
//     construct(width,height, count, auto){
//         super(width,height,count);//вызов родительского конструктора
//         this.auto = auto;
//     }
//     play(){
//         console.log(`Autoplay ${this.auto}`);
//     }
// }
// const slider = new AutoSlider(500,500,4,true);
// slider.whoAmI();
// slider.play();
// что мы экспортируем из этого файла
//export {button,Slider};
//можно переименовывать сущности как при экспорте так и при импорте
//export {button as btn,Slider};
//экспорт по умолчанию . Он бывает только один в файле 
//export default Slider;
//можно миксовать экспорт и экпорт по умолчанию
//export {button};
//export default Slider;
//можно прописать дефолтный экспорт прямо перед классом 
// export default class Slider{
//     ...
// }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.get-prototype-of.js");

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;
exports.btn = button;

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function button() {
  return 'button';
}

var Slider = /*#__PURE__*/function () {
  function Slider(width, height, count) {
    _classCallCheck(this, Slider);

    this.width = width;
    this.height = height;
    this.count = count;
  }

  _createClass(Slider, [{
    key: "nextSlide",
    value: function nextSlide() {
      console.log('Moving forward');
    }
  }, {
    key: "prevSlide",
    value: function prevSlide() {
      console.log('Moving back');
    }
  }, {
    key: "whoAmI",
    value: function whoAmI() {
      console.log(this.width, this.height, this.count);
    }
  }]);

  return Slider;
}();

exports.Slider = Slider;

var AutoSlider = /*#__PURE__*/function (_Slider) {
  _inherits(AutoSlider, _Slider);

  var _super = _createSuper(AutoSlider);

  function AutoSlider(width, height, count, auto) {
    var _this;

    _classCallCheck(this, AutoSlider);

    _this = _super.call(this, width, height, count);
    _this.auto = auto;
    return _this;
  }

  _createClass(AutoSlider, [{
    key: "play",
    value: function play() {
      console.log("Autoplay ".concat(this.auto));
    }
  }]);

  return AutoSlider;
}(Slider);