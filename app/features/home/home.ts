/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./home.css' />
/// <amd-dependency path='text!features/home/home.html' />

import angular = require('angular');
import exampleDirective = require("../../components/directives/example/example-directive");
import exampleService = require("../../components/services/example/example-service");
import homeController = require("./home-controller");
import models = require('../../components/models');
import scrollToFixedTopDirective = require("../../components/directives/scroll-to-fixed-top/scroll-to-fixed-top-directive");


'use strict';

export var moduleName = 'cftvc.home';
export var template = window.require('text!features/home/home.html');
export var controllerName = homeController.controllerName;

angular.module(moduleName, [
    exampleDirective.moduleName,
    exampleService.moduleName,
    models.moduleName,
    scrollToFixedTopDirective.moduleName])
    .controller(homeController.controllerName, homeController.Controller);