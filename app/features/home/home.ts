/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./home.css' />
/// <amd-dependency path='text!features/home/home.html' />

import angular = require('angular');
import homeController = require("./home-controller");
import testDirective = require("../../components/directives/test/test-directive");
import scrollToFixedTopDirective = require("../../components/directives/scroll-to-fixed-top/scroll-to-fixed-top-directive");


'use strict';

export var moduleName = 'cftvc.home';
export var template = window.require('text!features/home/home.html');
export var controllerName = homeController.controllerName;

angular.module(moduleName, [
    testDirective.moduleName, 
    scrollToFixedTopDirective.moduleName])
    .controller(homeController.controllerName, homeController.Controller);