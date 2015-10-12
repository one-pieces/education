/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import config = require('config');
import base = require("./features/base/base");

'use strict';

export var moduleName = config.appName + '.routes';

angular.module(moduleName, ['ui.router', base.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base', {
                url: config.basePath,
                template: base.template,
                controller: base.controllerName
            });
    }]);