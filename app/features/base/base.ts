/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./base.css' />
/// <amd-dependency path='text!features/base/base.html' />


import angular = require('angular');
import config = require('config');
import baseController = require("./base-controller");
import footerButtonDirective = require('../../components/directives/footer-button/footer-button-directive');
import goalPageDirective = require("../../components/directives/base-pages/goal-page/goal-page-directive");
import sketchQuestionDirective = require("../../components/directives/base-pages/sketch-question/sketch-question-directive");
import sketchVideoDirective = require("../../components/directives/base-pages/sketch-video/sketch-video-directive");
import models = require('../../components/models');
import slickDirective = require("../../components/directives/slick/slick-directive");
import mouseCaptureDirective = require("../../components/directives/mouse-capture/mouse-capture-directive");
import flowChartDirective = require("../../components/directives/flowchart/flowchart-directive");
'use strict';

export var moduleName = config.appName + '.base';
export var template = window.require('text!features/base/base.html');
export var controllerName = baseController.controllerName;

angular.module(moduleName, [
    'pageslide-directive',
    footerButtonDirective.moduleName,
    goalPageDirective.moduleName,
    models.moduleName,
    sketchQuestionDirective.moduleName,
    sketchVideoDirective.moduleName,
    slickDirective.moduleName,
    mouseCaptureDirective.moduleName,
    flowChartDirective.moduleName])
    .controller(baseController.controllerName, baseController.Controller);