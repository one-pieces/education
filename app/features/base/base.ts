/// <reference path='../../app.d.ts' />
/// <amd-dependency path='css!./base.css' />
/// <amd-dependency path='text!features/base/base.html' />

import angular = require('angular');
import config = require('config');
import baseController = require("./base-controller");
import footerButtonDirective = require('../../components/directives/footer-button/footer-button-directive');
import goalPageDirective = require("../../components/directives/base-pages/goal-page/goal-page-directive");
import models = require('../../components/models');
import sketchVideoDirective = require("../../components/directives/base-pages/sketch-video/sketch-video-directive");
import sketchQuestionDirective = require("../../components/directives/base-pages/sketch-question/sketch-question-directive");
import scorePageDirective = require("../../components/directives/base-pages/score-page/score-page-directive");
import slickDirective = require("../../components/directives/slick/slick-directive");

'use strict';

export var moduleName = config.appName + '.base';
export var template = window.require('text!features/base/base.html');
export var controllerName = baseController.controllerName;

angular.module(moduleName, [
    'pageslide-directive',
    footerButtonDirective.moduleName,
    goalPageDirective.moduleName,
    models.moduleName,
    scorePageDirective.moduleName,
    sketchQuestionDirective.moduleName,
    sketchVideoDirective.moduleName,
    slickDirective.moduleName])
    .controller(baseController.controllerName, baseController.Controller);