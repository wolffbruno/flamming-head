"use strict";
exports.id = 476;
exports.ids = [476];
exports.modules = {

/***/ 476:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "Question": () => (/* binding */ Question),
/* harmony export */   "globalContext": () => (/* binding */ globalContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Player {
  constructor(name) {
    _defineProperty(this, "name", void 0);

    this.name = name;
  }

  changeNameToKarter() {
    console.log(this.name);
    this.name = 'Karter';
  }

}
class Question {
  constructor(question, alternatives, answer) {
    _defineProperty(this, "answer", void 0);

    _defineProperty(this, "question", void 0);

    _defineProperty(this, "alternatives", void 0);

    _defineProperty(this, "used", false);

    this.question = question;
    this.alternatives = alternatives;
    this.answer = answer;
  }

  use() {
    this.used = true;
  }

}
const globalContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  update: () => {},
  questions: []
});

function MyApp({
  Component,
  pageProps
}) {
  const {
    0: context,
    1: setContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    players: [new Player(''), new Player('')],
    update: () => {
      setContext(_objectSpread({}, context));
    },
    questions: [new Question('Qual é a fórmula do ácido carbônico?', ['H2CO3', 'H2O', 'HCl'], 1), new Question('Quais íons são formados a partir da decomposição da água?', ['H+ e OH-', 'H+ e O-', 'H2+ e O-'], 1), new Question('Nos compêndios do ensino médio são classificados os compostos como funções da química inorgânica os seguintes grupos:', ['aminas, amidas, álcoois e cetonas.', 'ácidos , bases, óxidos e sais.', 'aminoácidos, aldeídos, proteínas e sais'], 2), new Question('Um ácido é caracterizado pela presença majoritária de qual íon?', ['Cl-', 'H2', 'H+'], 3), new Question('Qual é o nome do fenômeno que caracteriza o fim de uma reação ácido-base?', ['Acidificação', 'Neutralização', 'Corrosão', 'Monopolização'], 2), new Question('Dadas as espécies químicas a seguir, qual delas pode ser classificada como um ácido de Arrhenius?', ['LiH', 'Na2O', 'HCl'], 3), new Question('HBr, H2Se e CaOH são, respectivamente:', ['Ácido, base e ácido', 'Ácido, base e base', 'Ácido, ácido e base'], 3)]
  });
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(globalContext.Provider, {
    value: context,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, _objectSpread({}, pageProps))
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

/***/ })

};
;