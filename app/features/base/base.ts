/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./base.css' />
/// <amd-dependency path='text!features/base/base.html' />

import angular = require('angular');
import config = require('config');
import exampleDirective = require("../../components/directives/example/example-directive");
import exampleService = require("../../components/services/example/example-service");
import baseController = require("./base-controller");
import models = require('../../components/models');
import scrollToFixedTopDirective = require("../../components/directives/scroll-to-fixed-top/scroll-to-fixed-top-directive");
import slickDirective = require("../../components/directives/slick/slick-directive");

'use strict';

export var moduleName = config.appName + '.base';
export var template = window.require('text!features/base/base.html');
export var controllerName = baseController.controllerName;

angular.module(moduleName, [
    exampleDirective.moduleName,
    exampleService.moduleName,
    models.moduleName,
    scrollToFixedTopDirective.moduleName,
    slickDirective.moduleName])
    .controller(baseController.controllerName, baseController.Controller);