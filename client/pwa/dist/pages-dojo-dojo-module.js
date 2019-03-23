(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-dojo-dojo-module"],{

/***/ "./src/app/pages/dojo/dojo-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/dojo/dojo-routing.module.ts ***!
  \***************************************************/
/*! exports provided: DojoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DojoRoutingModule", function() { return DojoRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/pages/dojo/settings/settings.component.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reports/reports.component */ "./src/app/pages/dojo/reports/reports.component.ts");
/* harmony import */ var _keep_records_keep_records_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keep-records/keep-records.component */ "./src/app/pages/dojo/keep-records/keep-records.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        redirectTo: 'keep-records',
        pathMatch: 'full'
    },
    {
        path: 'keep-records',
        component: _keep_records_keep_records_component__WEBPACK_IMPORTED_MODULE_4__["KeepRecordsComponent"],
        data: {
            title: 'Keep Records'
        }
    },
    {
        path: 'settings',
        component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_2__["SettingsComponent"],
        data: {
            title: 'User Settings'
        }
    },
    {
        path: 'reports',
        component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__["ReportsComponent"],
        data: {
            title: 'Reports'
        }
    }
    // {
    //   path: '',
    //   component: RootComponent,
    //   data: {
    //     title: 'Dojo'
    //   },
    //   children: [
    //     {
    //       path: 'keep-records',
    //       data: {
    //         title: 'Keep Records'
    //       },
    //     },
    //     {
    //       path: 'settings',
    //       component: SettingsComponent,
    //       data: {
    //         title: 'User Settings'
    //       },
    //     },
    //     {
    //       path: 'reports',
    //       component: ReportsComponent,
    //       data: {
    //         title: 'Reports'
    //       },
    //     }
    //   ]
    // }
];
var DojoRoutingModule = /** @class */ (function () {
    function DojoRoutingModule() {
    }
    DojoRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DojoRoutingModule);
    return DojoRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/dojo/dojo.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/dojo/dojo.module.ts ***!
  \*******************************************/
/*! exports provided: DojoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DojoModule", function() { return DojoModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _dojo_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dojo-routing.module */ "./src/app/pages/dojo/dojo-routing.module.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _root_root_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./root/root.component */ "./src/app/pages/dojo/root/root.component.ts");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/pages/dojo/settings/settings.component.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reports/reports.component */ "./src/app/pages/dojo/reports/reports.component.ts");
/* harmony import */ var _keep_records_keep_records_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./keep-records/keep-records.component */ "./src/app/pages/dojo/keep-records/keep-records.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DojoModule = /** @class */ (function () {
    function DojoModule() {
    }
    DojoModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _dojo_routing_module__WEBPACK_IMPORTED_MODULE_4__["DojoRoutingModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateModule"].forChild(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]
            ],
            declarations: [
                _root_root_component__WEBPACK_IMPORTED_MODULE_6__["RootComponent"],
                _settings_settings_component__WEBPACK_IMPORTED_MODULE_7__["SettingsComponent"],
                _reports_reports_component__WEBPACK_IMPORTED_MODULE_8__["ReportsComponent"],
                _keep_records_keep_records_component__WEBPACK_IMPORTED_MODULE_9__["KeepRecordsComponent"]
            ]
        })
    ], DojoModule);
    return DojoModule;
}());



/***/ }),

/***/ "./src/app/pages/dojo/keep-records/keep-records.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/pages/dojo/keep-records/keep-records.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<h1>{{ 'WELKOME' | translate:param }}!!</h1>-->\n\n<momo-purchase></momo-purchase>\n"

/***/ }),

/***/ "./src/app/pages/dojo/keep-records/keep-records.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/dojo/keep-records/keep-records.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dojo/keep-records/keep-records.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/dojo/keep-records/keep-records.component.ts ***!
  \*******************************************************************/
/*! exports provided: KeepRecordsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeepRecordsComponent", function() { return KeepRecordsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KeepRecordsComponent = /** @class */ (function () {
    function KeepRecordsComponent() {
        this.param = {
            value: 'Dojo'
        };
        this.today = new Date;
        this.price = null;
        this.name = '';
    }
    KeepRecordsComponent.prototype.ngOnInit = function () {
    };
    KeepRecordsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'momo-keep-records',
            template: __webpack_require__(/*! ./keep-records.component.html */ "./src/app/pages/dojo/keep-records/keep-records.component.html"),
            styles: [__webpack_require__(/*! ./keep-records.component.scss */ "./src/app/pages/dojo/keep-records/keep-records.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], KeepRecordsComponent);
    return KeepRecordsComponent;
}());



/***/ }),

/***/ "./src/app/pages/dojo/reports/reports.component.html":
/*!***********************************************************!*\
  !*** ./src/app/pages/dojo/reports/reports.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<momo-statistics></momo-statistics>\n"

/***/ }),

/***/ "./src/app/pages/dojo/reports/reports.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/dojo/reports/reports.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dojo/reports/reports.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/dojo/reports/reports.component.ts ***!
  \*********************************************************/
/*! exports provided: ReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsComponent", function() { return ReportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportsComponent = /** @class */ (function () {
    function ReportsComponent() {
    }
    ReportsComponent.prototype.ngOnInit = function () {
    };
    ReportsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'momo-reports',
            template: __webpack_require__(/*! ./reports.component.html */ "./src/app/pages/dojo/reports/reports.component.html"),
            styles: [__webpack_require__(/*! ./reports.component.scss */ "./src/app/pages/dojo/reports/reports.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/app/pages/dojo/root/root.component.css":
/*!****************************************************!*\
  !*** ./src/app/pages/dojo/root/root.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dojo/root/root.component.html":
/*!*****************************************************!*\
  !*** ./src/app/pages/dojo/root/root.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>{{ 'WELKOME' | translate:param }}!!</h1>\n"

/***/ }),

/***/ "./src/app/pages/dojo/root/root.component.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/dojo/root/root.component.ts ***!
  \***************************************************/
/*! exports provided: RootComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootComponent", function() { return RootComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RootComponent = /** @class */ (function () {
    function RootComponent() {
        this.param = {
            value: 'Dojo'
        };
    }
    RootComponent.prototype.ngOnInit = function () {
    };
    RootComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'momo-root',
            template: __webpack_require__(/*! ./root.component.html */ "./src/app/pages/dojo/root/root.component.html"),
            styles: [__webpack_require__(/*! ./root.component.css */ "./src/app/pages/dojo/root/root.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RootComponent);
    return RootComponent;
}());



/***/ }),

/***/ "./src/app/pages/dojo/settings/settings.component.html":
/*!*************************************************************!*\
  !*** ./src/app/pages/dojo/settings/settings.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  settings works!\n</p>\n"

/***/ }),

/***/ "./src/app/pages/dojo/settings/settings.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/dojo/settings/settings.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dojo/settings/settings.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/dojo/settings/settings.component.ts ***!
  \***********************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'momo-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/pages/dojo/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.scss */ "./src/app/pages/dojo/settings/settings.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-dojo-dojo-module.js.map