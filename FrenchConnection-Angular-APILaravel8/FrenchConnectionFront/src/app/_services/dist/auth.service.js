"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AUTH_API = 'http://localhost:8000/api/';
// const AUTH_API = 'http://localhost:80OO/api/auth/';
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (email, password) {
        return this.http.post(AUTH_API + 'login', {
            email: email,
            password: password
        }, httpOptions);
    };
    AuthService.prototype.register = function (username, email, address, phone, password, password_confirmation) {
        return this.http.post(AUTH_API + 'register', {
            username: username,
            email: email,
            address: address,
            phone: phone,
            password: password,
            password_confirmation: password_confirmation
        }, httpOptions);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
