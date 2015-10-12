/// <reference path='./app.d.ts' />
/// <amd-dependency path='ui.router' />

import angular = require('angular');
import config = require('config');
import home = require("./features/home/home");

'use strict';

export var moduleName = config.appName + '.routes';

angular.module(moduleName, ['ui.router', home.moduleName])
    .config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider
            .state('base', {
                url: config.basePath,
                template: home.template,
                controller: home.controllerName
            });
    }]);