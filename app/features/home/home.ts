/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./home.css' />
/// <amd-dependency path='text!features/home/home.html' />

import angular = require('angular');
import homeController = require("./home-controller");

'use strict';

export var moduleName = 'cftvc.home';
export var template = window.require('text!features/home/home.html');
export var controllerName = homeController.controllerName;

angular.module(moduleName, [])
    .controller(homeController.controllerName, homeController.Controller);